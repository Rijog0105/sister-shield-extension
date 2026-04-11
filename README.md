# 🛡️ Sister Shield – AI-Powered Browser Safety Extension

Sister Shield is a **Chrome Extension (Manifest V3)** designed to protect users — especially **women, students, and first-time internet users** — from real-world online threats such as **phishing links, fake recovery pages, scam downloads, impersonation traps, cyberbullying-related social engineering, and manipulated image misuse**.

Built as a **browser-first protection system**, Sister Shield works **inside the browser** and blocks risky actions **before the user is redirected, tricked, or exploited**.

---

## 🚀 Problem Statement

In today’s online world, many users face threats such as:

- Fake account recovery pages  
- Phishing links  
- Scam emails and fake internship/job offers  
- Malicious downloads  
- Social media impersonation  
- Morphed / manipulated image misuse  
- Cyberbullying-related digital traps  

Most people realize the danger **only after the damage is done**.

### Our solution:
Instead of expecting users to identify threats manually, **Sister Shield automatically detects risky actions inside the browser and intervenes in real time.**

---

## 💡 What Makes Sister Shield Different?

Unlike traditional awareness-only tools, Sister Shield is:

- **Mostly automated**
- **Browser-native**
- **Real-time**
- **Action-blocking**
- **Extension-based, not just a website**
- **Designed around actual user behavior**

It does not just warn the user — it **actively intercepts risky clicks, blocks suspicious actions, blacklists malicious sources, and redirects the user safely.**

---

## 🧠 Core Features

### 1. Real-Time Threat Detection
The extension scans the webpage content, buttons, and risky elements in real time.

### 2. AI / Tensor-Based Risk Scoring
A lightweight **TensorFlow-style local inference engine** analyzes page signals and computes a **dynamic risk score (0–100)** based on:

- urgency language
- phishing keywords
- recovery bait
- suspicious downloads
- social engineering terms
- risky CTA count
- manipulated image markers

### 3. Click Interception & Action Blocking
Before the malicious page executes, Sister Shield intercepts risky interactions using:

- `preventDefault()`
- `stopPropagation()`
- `stopImmediatePropagation()`

This prevents fake navigation, malicious redirection, or unsafe flow execution.

### 4. Hover Warning Layer
High-risk elements are visually highlighted and show a warning tooltip before click.

### 5. Threat Modal + Safe Recovery Flow
When a dangerous action is triggered:

- a **Sister Shield protection modal** appears
- a countdown begins
- the unsafe action is blocked
- the user is redirected or protected safely

### 6. Page Blacklisting
Once a malicious source is detected, it is **stored locally** and treated as blacklisted for future interactions.

### 7. Social Media Scam Protection
Special protection for social engineering / fake social support scenarios:

- fake account recovery blocked
- fake evidence download blocked
- suspicious report review redirected to safe Sister Shield page

### 8. Morphed / Manipulated Image Warning (Prototype Layer)
Images marked as suspicious are automatically highlighted with:

- red danger outline
- AI warning badge
- anomaly detection status

### 9. Popup Dashboard
The extension dashboard can display:

- protection status
- threats blocked
- last risk score
- blocked site history
- AI feature data
- emergency actions

---

## 🏗️ Project Architecture

```text
sister-shield-extension/
├── manifest.json
├── tf-lite.js
├── content.js
├── background.js
├── popup.html
├── popup.js
├── demo-phishing.html
├── gmail-demo.html
├── insta-photo-scam.html
└── README.md