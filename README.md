# UDID Tools

**UDID Tools** is a simple web service for extracting the **UDID** and other unique identifiers of iOS devices (iPhone, iPad).  
The service works fully online — no apps or Mac required.

🔗 Website: [https://www.udid.tools](https://www.udid.tools)

---

## How It Works

1. Open the website in Safari on your iPhone or iPad.
2. Tap the **Get UDID** button.
3. The device will download and install a temporary configuration profile (signed MDM profile).
4. Once confirmed, the profile securely sends unique identifiers to the server.
5. You are automatically redirected to a result page showing:
    - **UDID**
    - **IMEI**
    - **MEID**
    - **SERIAL**
    - **PRODUCT**
    - **VERSION**

The profile can be safely removed from device settings right after use.

### Available Parameters

As of **2025/08/18**, the available parameters are:

```js
["IMEI","MEID","PRODUCT","SERIAL","UDID","VERSION"]
```

_Source: [StackOverflow answer](https://stackoverflow.com/a/13845371) (Dec 12, 2012)_

---

## Usage

1. Go to [https://www.udid.tools](https://www.udid.tools)
2. Tap **Download Profile**
3. Install and confirm the profile
4. Instantly see your **UDID** in the browser

---

## Development

This project is built with [Next.js](https://nextjs.org).

To run locally, you **must provide valid Apple certificates** to sign the configuration profile:

- An **Apple Distribution Certificate** in `.p12` format (converted to base64, password protected).
- Apple’s **Root** and **Intermediate** certificates to complete the trust chain.

### Required environment variables:

```bash
MDM_SERVER_P12_BASE64=        # Base64 string of your .p12 distribution certificate
MDM_SERVER_P12_PASSCODE=      # Password for the .p12 certificate
APPLE_ROOT_CERT_URL=https://www.apple.com/appleca/AppleIncRootCertificate.cer
APPLE_INTERMEDIATE_CERT_URL=https://www.apple.com/certificateauthority/AppleWWDRCAG3.cer
```

### Run locally:
```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.
