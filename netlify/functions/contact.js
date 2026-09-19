/**
 * OmniApex — Contact Form Handler (Netlify Function)
 * ────────────────────────────────────────────────────
 * Endpoint: /.netlify/functions/contact
 *
 * This function receives form submissions and forwards them
 * to your Gmail via a transactional email provider (Resend or SendGrid).
 *
 * SETUP:
 *  1. Choose an email provider: Resend (recommended) or SendGrid
 *  2. Create an account and get an API key
 *  3. Add environment variables in Netlify dashboard:
 *       EMAIL_PROVIDER=resend          (or sendgrid)
 *       EMAIL_API_KEY=your_api_key
 *       EMAIL_TO=your_gmail@gmail.com  (destination inbox)
 *       EMAIL_FROM=noreply@your-domain.com  (verified sender)
 *  4. Deploy to Netlify
 *
 * NEVER put real API keys or passwords in this file.
 * Always use Netlify environment variables.
 */

exports.handler = async (event) => {

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Parse body
  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }

  // Basic server-side validation
  const required = ["name", "email", "service", "message"];
  for (const field of required) {
    if (!data[field] || !String(data[field]).trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Missing required field: ${field}` }),
      };
    }
  }

  // Sanitize inputs
  const name    = String(data.name).slice(0, 200).trim();
  const email   = String(data.email).slice(0, 200).trim();
  const phone   = String(data.phone || "Not provided").slice(0, 50).trim();
  const service = String(data.service).slice(0, 100).trim();
  const address = String(data.address || "").slice(0, 200).trim();
  const city    = String(data.city || "").slice(0, 100).trim();
  const state   = String(data.state || "").slice(0, 50).trim();
  const zip     = String(data.zip || "").slice(0, 20).trim();
  const message = String(data.message).slice(0, 5000).trim();

  const location = [address, city, state, zip].filter(Boolean).join(", ") || "Not provided";

  // Build email content
  const emailSubject = `New OmniApex Inquiry — ${name} (${service})`;
  const emailBody = `
New inquiry from the OmniApex website.

──────────────────────────────
Contact Information
──────────────────────────────
Name:    ${name}
Email:   ${email}
Phone:   ${phone}

──────────────────────────────
Service
──────────────────────────────
Service requested: ${service}

──────────────────────────────
Location (Roofing)
──────────────────────────────
Address: ${location}

──────────────────────────────
Message
──────────────────────────────
${message}

──────────────────────────────
Submitted via OmniApex website
  `.trim();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1A2540; }
  .header { background: #1B4FD8; color: white; padding: 24px; border-radius: 8px 8px 0 0; }
  .body { padding: 24px; background: #f5f8ff; border: 1px solid #d0dcff; }
  .section { margin-bottom: 24px; }
  .label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #5a6a85; margin-bottom: 6px; }
  .value { font-size: 15px; color: #1A2540; }
  .message-box { background: white; padding: 16px; border-radius: 6px; border: 1px solid #d0dcff; font-size: 15px; line-height: 1.65; white-space: pre-wrap; }
  .footer { font-size: 12px; color: #5a6a85; padding: 16px 24px; text-align: center; }
</style></head>
<body>
  <div class="header">
    <h2 style="margin:0;font-size:18px;">New Inquiry — OmniApex</h2>
    <p style="margin:4px 0 0;opacity:0.8;font-size:14px;">Service requested: ${service}</p>
  </div>
  <div class="body">
    <div class="section">
      <div class="label">Contact</div>
      <div class="value"><strong>${name}</strong><br>${email}<br>${phone}</div>
    </div>
    <div class="section">
      <div class="label">Location (Roofing)</div>
      <div class="value">${location}</div>
    </div>
    <div class="section">
      <div class="label">Message</div>
      <div class="message-box">${message.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}</div>
    </div>
  </div>
  <div class="footer">Submitted via OmniApex website</div>
</body>
</html>`;

  // ── Send via provider ─────────────────────────────────────────
  const provider  = process.env.EMAIL_PROVIDER || "resend";
  const apiKey    = process.env.EMAIL_API_KEY;
  const emailTo   = process.env.EMAIL_TO;
  const emailFrom = process.env.EMAIL_FROM || "noreply@omniapex.com";

  if (!apiKey || !emailTo) {
    console.error("Missing EMAIL_API_KEY or EMAIL_TO environment variable");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server configuration error" }),
    };
  }

  try {
    let response;

    if (provider === "resend") {
      // ── Resend (https://resend.com) ──────────────────────────────
      response = await fetch("https://api.resend.com/emails", {
        method:  "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type":  "application/json",
        },
        body: JSON.stringify({
          from:    emailFrom,
          to:      [emailTo],
          replyTo: email,
          subject: emailSubject,
          text:    emailBody,
          html:    htmlBody,
        }),
      });

    } else if (provider === "sendgrid") {
      // ── SendGrid (https://sendgrid.com) ──────────────────────────
      response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method:  "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type":  "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: emailTo }] }],
          from:             { email: emailFrom, name: "OmniApex Website" },
          reply_to:         { email },
          subject:          emailSubject,
          content: [
            { type: "text/plain", value: emailBody },
            { type: "text/html",  value: htmlBody  },
          ],
        }),
      });

    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Unknown email provider configured" }),
      };
    }

    if (!response.ok) {
      const text = await response.text();
      console.error(`Email provider error (${response.status}):`, text);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Failed to send email" }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };

  } catch (err) {
    console.error("Contact function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
