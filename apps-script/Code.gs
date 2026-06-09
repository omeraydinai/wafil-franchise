// ============================================================
//  WAFIL Franchise Başvuru — Google Apps Script Backend
//  • Başvuruları Google Sheet'e kaydeder
//  • wafil.turkiye@gmail.com'a bildirim emaili gönderir
//  • Başvurucuya otomatik yanıt (auto-reply) gönderir
// ============================================================

var CONFIG = {
  NOTIFY_EMAIL : "wafil.turkiye@gmail.com",
  SHEET_NAME   : "Başvurular",
  BRAND_NAME   : "WAFIL",
};

function doGet(e) {
  try {
    var data = {
      name:    (e.parameter.name    || "").trim(),
      phone:   (e.parameter.phone   || "").trim(),
      email:   (e.parameter.email   || "").trim(),
      city:    (e.parameter.city    || "").trim(),
      message: (e.parameter.message || "").trim(),
    };

    // Sadece ping isteği (parametre yok)
    if (!data.name && !data.email) {
      return jsonResponse({ status: "WAFIL Franchise API çalışıyor." });
    }

    Logger.log("Başvuru alındı: " + JSON.stringify(data));

    var required = ["name", "phone", "email", "city", "message"];
    for (var i = 0; i < required.length; i++) {
      if (!data[required[i]]) {
        Logger.log("Eksik alan: " + required[i]);
        return jsonResponse({ success: false, error: "Eksik alan: " + required[i] });
      }
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return jsonResponse({ success: false, error: "Geçersiz e-mail formatı." });
    }

    var timestamp = new Date();
    saveToSheet(data, timestamp);
    sendNotification(data, timestamp);
    sendAutoReply(data);

    Logger.log("Tüm işlemler başarılı.");
    return jsonResponse({ success: true, message: "Başvurunuz alındı." });

  } catch (err) {
    Logger.log("HATA: " + err.toString());
    return jsonResponse({ success: false, error: "Sunucu hatası: " + err.toString() });
  }
}

function doPost(e) {
  return doGet(e);
}

function saveToSheet(data, timestamp) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    sheet.appendRow(["Tarih", "İsim", "Telefon", "E-mail", "Şehir", "Mesaj"]);
    var header = sheet.getRange(1, 1, 1, 6);
    header.setBackground("#0b2e1f");
    header.setFontColor("#ffd21f");
    header.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "dd.MM.yyyy HH:mm"),
    data.name,
    data.phone,
    data.email,
    data.city,
    data.message,
  ]);

  sheet.autoResizeColumns(1, 6);
}

function sendNotification(data, timestamp) {
  var dateStr = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "dd.MM.yyyy HH:mm");
  var subject = CONFIG.BRAND_NAME + " Franchise Başvurusu — " + data.name;

  var htmlBody = [
    '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">',
    '<div style="background:#0b2e1f;padding:24px 32px;border-radius:12px 12px 0 0">',
    '<h2 style="color:#ffd21f;margin:0;font-size:22px">WAFIL — Yeni Franchise Başvurusu</h2>',
    '<p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:13px">' + dateStr + '</p>',
    '</div>',
    '<div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">',
    '<table style="width:100%;border-collapse:collapse;font-size:15px">',
    row("İsim",    data.name),
    row("Telefon", data.phone),
    row("E-mail",  '<a href="mailto:' + data.email + '" style="color:#0b2e1f">' + data.email + '</a>'),
    row("Şehir",   data.city),
    '</table>',
    '<div style="margin-top:20px;background:#f9fafb;border-radius:8px;padding:16px">',
    '<p style="margin:0 0 6px;font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase">Mesaj</p>',
    '<p style="margin:0;color:#111827;font-size:15px;line-height:1.6">' + escapeHtml(data.message) + '</p>',
    '</div>',
    '<div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb">',
    '<a href="mailto:' + data.email + '" style="display:inline-block;background:#0b2e1f;color:#ffd21f;padding:10px 22px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px">Yanıtla</a>',
    '</div>',
    '</div>',
    '<p style="text-align:center;font-size:12px;color:#9ca3af;margin-top:16px">Bu email WAFIL Franchise başvuru sistemi tarafından otomatik gönderilmiştir.</p>',
    '</div>',
  ].join("");

  GmailApp.sendEmail(CONFIG.NOTIFY_EMAIL, subject, data.message, {
    htmlBody: htmlBody,
    replyTo:  data.email,
    name:     CONFIG.BRAND_NAME + " Başvuru Sistemi",
  });

  Logger.log("Bildirim emaili gönderildi: " + CONFIG.NOTIFY_EMAIL);
}

function sendAutoReply(data) {
  var subject = "Başvurunuz Alındı — WAFIL Franchise";

  var htmlBody = [
    '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">',
    '<div style="background:#0b2e1f;padding:32px;border-radius:12px 12px 0 0;text-align:center">',
    '<div style="display:inline-block;background:#ffd21f;color:#0b2e1f;font-weight:900;font-size:22px;padding:8px 22px;border-radius:30px;letter-spacing:2px">WAFIL</div>',
    '</div>',
    '<div style="background:#fff;padding:36px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;text-align:center">',
    '<div style="width:56px;height:56px;background:#ffd21f;border-radius:50%;margin:0 auto 20px;line-height:56px;font-size:28px">✓</div>',
    '<h2 style="color:#0b2e1f;margin:0 0 12px;font-size:22px">Başvurunuz Alındı!</h2>',
    '<p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 8px">Merhaba <strong>' + escapeHtml(data.name) + '</strong>,</p>',
    '<p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 24px">WAFIL franchise başvurunuzu aldık. Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>',
    '<div style="background:#f9fafb;border-radius:10px;padding:20px;text-align:left;margin-bottom:28px">',
    '<p style="margin:0 0 10px;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase">Başvuru Özeti</p>',
    '<table style="width:100%;font-size:14px;color:#374151">',
    miniRow("Şehir",   data.city),
    miniRow("Telefon", data.phone),
    '</table>',
    '</div>',
    '<p style="color:#6b7280;font-size:13px;margin:0">Sorularınız için <a href="mailto:' + CONFIG.NOTIFY_EMAIL + '" style="color:#0b2e1f;font-weight:bold">' + CONFIG.NOTIFY_EMAIL + '</a> adresine yazabilirsiniz.</p>',
    '</div>',
    '<p style="text-align:center;font-size:12px;color:#9ca3af;margin-top:16px">© ' + new Date().getFullYear() + ' WAFIL. Tüm hakları saklıdır.</p>',
    '</div>',
  ].join("");

  GmailApp.sendEmail(data.email, subject, "", {
    htmlBody: htmlBody,
    name:     CONFIG.BRAND_NAME,
    replyTo:  CONFIG.NOTIFY_EMAIL,
  });

  Logger.log("Auto-reply gönderildi: " + data.email);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label, value) {
  return '<tr><td style="padding:10px 0;color:#6b7280;font-size:13px;width:90px;vertical-align:top">' + label + '</td><td style="padding:10px 0;color:#111827;font-weight:600">' + value + '</td></tr>';
}

function miniRow(label, value) {
  return '<tr><td style="padding:4px 0;color:#9ca3af;width:80px">' + label + '</td><td style="padding:4px 0;font-weight:600">' + escapeHtml(value) + '</td></tr>';
}
