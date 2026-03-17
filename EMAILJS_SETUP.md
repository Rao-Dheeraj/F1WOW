# EmailJS Setup Guide for F1wow Newsletter

## Step 1: Create EmailJS Account (1 minute)
1. Go to **https://www.emailjs.com/**
2. Click **Sign Up** (use Gmail to sign up for fastest setup)
3. Verify your email if prompted

## Step 2: Add Email Service (1 minute)
1. After logging in, click **Add New Service**
2. Choose **Gmail** (recommended - free, uses your existing Gmail)
3. Click **Connect Account** and authorize EmailJS
4. Copy the **Service ID** (looks like: `service_xxxxx`)

## Step 3: Create Email Template (2 minutes)
1. Click **Email Templates** → **Create New Template**
2. Name it: `F1wow Welcome Email`
3. Use this template:

**Subject:**
```
🏁 Welcome to F1wow Newsletter!
```

**Email Body (HTML):**
```html
<html>
<body>
  <h2 style="color: #E10600;">Welcome to F1wow! 🏎️</h2>

  <p>Hi <strong>{{to_name}}</strong>,</p>

  <p>Thank you for subscribing to the <strong>F1wow Newsletter</strong>!</p>

  <div style="background: #1a1a1a; padding: 20px; border-radius: 10px; margin: 20px 0;">
    <h3 style="color: white;">You'll receive:</h3>
    <ul style="color: #ccc;">
      <li>🏁 Latest F1 news and race results</li>
      <li>🏎️ Driver updates and team news</li>
      <li>📊 Championship standings and analysis</li>
      <li>🔔 Exclusive content and predictions</li>
    </ul>
  </div>

  <p>We'll notify you whenever we publish a new article.</p>

  <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;">

  <p style="color: #888; font-size: 14px;">
    — Team F1wow<br>
    <a href="https://f1wow.com" style="color: #E10600;">Visit F1wow</a>
  </p>
</body>
</html>
```

**Variables to add:**
- `to_name` - The subscriber's name (from email)
- `to_email` - The subscriber's email

4. Click **Save Template**
5. Copy the **Template ID** (looks like: `template_xxxxx`)

## Step 4: Get Your Public Key
1. Go to **https://www.emailjs.com/admin/account/**
2. Copy your **Public Key** (starts with `user_`)

## Step 5: Provide the IDs to Claude
Give these three values to Claude:
- Service ID: `service_?????`
- Template ID: `template_?????`
- Public Key: `user_?????`

---

## Summary of IDs Needed:
```
SERVICE_ID    → From Add Email Service step
TEMPLATE_ID   → From Create Email Template step
PUBLIC_KEY    → From Account settings
```
