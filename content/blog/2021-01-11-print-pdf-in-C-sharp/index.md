---
title: Print PDF in C#
date: "2021-01-11T13:28:03.284Z"
description:
hashtag: C#,技術隨筆
cover:  cover.jpg
---

近來工作需要要用到 Print PDF 嘅 function，所以就上網周圍搵點 print PDF

最直接嘅方法係 Call Command，前題係 User 要有裝到 Adobe PDF Reader
```
AcroRd32.exe \p <filename>
```

唔係就要 Send 個 Print command 出去等 System 自己 Call default 嘅 Print process
```csharp
private void PrintPDF()
{
  Process printProcess = new Process()
  {
      StartInfo = new ProcessStartInfo()
      {
          FileName = filePath,
          Verb = "Print",
          UseShellExecute = true,
          CreateNoWindow = true,
          WindowStyle = ProcessWindowStyle.Hidden
      }
  };
  printProcess.Start();
}
```

但係唔知點解個 Print Command 成日都唔 Work (我用緊 Adobe PDF Reader DC)

本來都唔想搵 3rd Party Library，但個Reader成日唔Work最後都係要靠人地

而我用嘅Library就係 `PDFium.Viewer`，係 `NuGet` 打就搵到架喇！

段 Code 大約係咁嘅:

```csharp
public void Print(string filePath)
{
  System.Windows.Forms.PrintDialog printDialog = new System.Windows.Forms.PrintDialog();

  using (PdfiumViewer.PdfDocument document = PdfDocument.Load(filePath))
  {
    printDialog.AllowPrintToFile = true;
    printDialog.AllowSomePages = true;
    printDialog.PrinterSettings.MinimumPage = 1;
    printDialog.PrinterSettings.MaximumPage = document.PageCount;
    printDialog.PrinterSettings.FromPage = 1;
    printDialog.PrinterSettings.ToPage = document.PageCount;

    if (printDialog.ShowDialog() == System.Windows.Forms.DialogResult.OK)
    {
      try
      {
        PageSettings pageSettings = new PageSettings(printDialog.PrinterSettings)
        {
          Margins = new Margins(0, 0, 0, 0),
          PaperSize = printDialog.PrinterSettings.DefaultPageSettings.PaperSize
        };

        using (var printDocument = document.CreatePrintDocument())
        {
          printDocument.PrinterSettings = printDialog.PrinterSettings;
          printDocument.DefaultPageSettings = pageSettings;
          printDocument.PrintController = new StandardPrintController();
          printDocument.Print();
        }
      }
      catch (Exception ex)
      {
        System.Diagnostics.Debug.WriteLine(ex.ToString());
      }
    }
  }
}
```

首先就彈一個 `PrintDialog` 出來比 User 揀佢想用嘅 Printer，頁數同埋份數，之後就會射番比 `PdfiumViewer` 個邊 Create 個 `PdfDocument`. 最後就經番 `PdfiumViewer` 根據 `PrintDialog.PrinterSettings` 去 Print 番份 PDF 出黎. 就係咁簡單！