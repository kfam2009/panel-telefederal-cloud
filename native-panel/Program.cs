using System.Diagnostics;
using System.Drawing;
using System.Runtime.InteropServices;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace TeleFederalPanelNative;

static class Program
{
    [STAThread]
    static void Main()
    {
        ApplicationConfiguration.Initialize();
        Application.Run(new PanelForm());
    }
}

internal sealed class PanelForm : Form
{
    private readonly WebView2 webView = new();
    private readonly Label status = new();
    private readonly Button play = new();
    private readonly Button stop = new();

    public PanelForm()
    {
        Text = "PANEL TELEFEDERAL";
        StartPosition = FormStartPosition.CenterScreen;
        WindowState = FormWindowState.Maximized;
        MinimumSize = new Size(1180, 720);
        BackColor = Color.FromArgb(8, 12, 20);

        var bar = new Panel
        {
            Dock = DockStyle.Top,
            Height = 54,
            BackColor = Color.FromArgb(12, 18, 30),
            Padding = new Padding(12, 8, 12, 8)
        };

        var title = new Label
        {
            AutoSize = false,
            Text = "PANEL TELEFEDERAL",
            Dock = DockStyle.Left,
            Width = 260,
            TextAlign = ContentAlignment.MiddleLeft,
            Font = new Font("Segoe UI", 12, FontStyle.Bold),
            ForeColor = Color.White
        };

        play.Text = "Premiere Play";
        play.Width = 150;
        play.Dock = DockStyle.Right;
        play.Margin = new Padding(8, 0, 0, 0);
        StyleButton(play, Color.FromArgb(35, 94, 68));
        play.Click += async (_, _) => await SendTransportAsync("play");

        stop.Text = "Premiere Stop";
        stop.Width = 150;
        stop.Dock = DockStyle.Right;
        stop.Margin = new Padding(8, 0, 0, 0);
        StyleButton(stop, Color.FromArgb(118, 44, 55));
        stop.Click += async (_, _) => await SendTransportAsync("stop");

        status.Text = "Panel listo";
        status.Dock = DockStyle.Fill;
        status.TextAlign = ContentAlignment.MiddleRight;
        status.Font = new Font("Segoe UI", 10, FontStyle.Regular);
        status.ForeColor = Color.FromArgb(202, 212, 232);

        bar.Controls.Add(status);
        bar.Controls.Add(stop);
        bar.Controls.Add(play);
        bar.Controls.Add(title);

        webView.Dock = DockStyle.Fill;
        webView.DefaultBackgroundColor = Color.FromArgb(8, 12, 20);

        Controls.Add(webView);
        Controls.Add(bar);

        Shown += async (_, _) => await LoadPanelAsync();
    }

    private static void StyleButton(Button button, Color backColor)
    {
        button.FlatStyle = FlatStyle.Flat;
        button.FlatAppearance.BorderColor = Color.FromArgb(105, 120, 145);
        button.FlatAppearance.BorderSize = 1;
        button.BackColor = backColor;
        button.ForeColor = Color.White;
        button.Font = new Font("Segoe UI", 10, FontStyle.Bold);
        button.TabStop = false;
    }

    private async Task LoadPanelAsync()
    {
        try
        {
            var userData = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "TELEFEDERAL",
                "PanelWebView2");
            Directory.CreateDirectory(userData);

            var env = await CoreWebView2Environment.CreateAsync(null, userData);
            await webView.EnsureCoreWebView2Async(env);
            webView.CoreWebView2.Settings.AreDevToolsEnabled = true;
            webView.CoreWebView2.Navigate("http://127.0.0.1:3005/?layout-local=top-monitors");
            status.Text = "Panel cargado";
        }
        catch (Exception ex)
        {
            status.Text = "No pude abrir el panel: " + ex.Message;
        }
    }

    private async Task SendTransportAsync(string action)
    {
        play.Enabled = false;
        stop.Enabled = false;
        status.Text = action == "play" ? "Enviando Play a Premiere..." : "Enviando Stop a Premiere...";

        try
        {
            var returnHandle = Handle;
            await Task.Run(() => PremiereTransport.Send(action, returnHandle));
            WindowState = FormWindowState.Maximized;
            Activate();
            status.Text = action == "play" ? "Premiere Play enviado" : "Premiere Stop enviado";
        }
        catch (Exception ex)
        {
            status.Text = "Premiere: " + ex.Message;
        }
        finally
        {
            play.Enabled = true;
            stop.Enabled = true;
        }
    }
}

internal static class PremiereTransport
{
    private const int SW_RESTORE = 9;
    private const uint KEYEVENTF_KEYUP = 0x0002;

    [DllImport("user32.dll")]
    private static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

    [DllImport("user32.dll")]
    private static extern bool BringWindowToTop(IntPtr hWnd);

    [DllImport("user32.dll")]
    private static extern bool SetForegroundWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    private static extern IntPtr SetActiveWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    private static extern IntPtr SetFocus(IntPtr hWnd);

    [DllImport("user32.dll")]
    private static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, UIntPtr dwExtraInfo);

    public static void Send(string action, IntPtr returnHandle)
    {
        var premiere = Process.GetProcesses()
            .Where(p =>
            {
                try
                {
                    return p.MainWindowHandle != IntPtr.Zero
                        && (p.MainWindowTitle.Contains("Premiere Pro", StringComparison.OrdinalIgnoreCase)
                            || p.ProcessName.Contains("Adobe Premiere", StringComparison.OrdinalIgnoreCase));
                }
                catch
                {
                    return false;
                }
            })
            .OrderByDescending(p => p.MainWindowTitle.Contains("Adobe Premiere Pro", StringComparison.OrdinalIgnoreCase))
            .FirstOrDefault();

        if (premiere == null)
        {
            throw new InvalidOperationException("No encuentro Premiere abierto.");
        }

        var premiereHandle = premiere.MainWindowHandle;
        ShowWindow(premiereHandle, SW_RESTORE);
        Thread.Sleep(100);
        BringWindowToTop(premiereHandle);
        SetActiveWindow(premiereHandle);
        SetFocus(premiereHandle);
        SetForegroundWindow(premiereHandle);
        Thread.Sleep(500);

        SendShiftKey(0x33, 0x04);
        Thread.Sleep(250);

        if (string.Equals(action, "stop", StringComparison.OrdinalIgnoreCase))
        {
            SendKey(0x4B, 0x25);
        }
        else
        {
            SendKey(0x4B, 0x25);
            Thread.Sleep(200);
            SendKey(0x4C, 0x26);
        }

        Thread.Sleep(700);
        BringWindowToTop(returnHandle);
        SetForegroundWindow(returnHandle);
    }

    private static void SendKey(byte vk, byte scan, int holdMs = 100)
    {
        keybd_event(vk, scan, 0, UIntPtr.Zero);
        Thread.Sleep(holdMs);
        keybd_event(vk, scan, KEYEVENTF_KEYUP, UIntPtr.Zero);
    }

    private static void SendShiftKey(byte vk, byte scan)
    {
        keybd_event(0x10, 0x2A, 0, UIntPtr.Zero);
        Thread.Sleep(70);
        SendKey(vk, scan);
        Thread.Sleep(70);
        keybd_event(0x10, 0x2A, KEYEVENTF_KEYUP, UIntPtr.Zero);
    }
}
