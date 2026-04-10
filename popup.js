const resultBox = document.getElementById("resultBox");
const identitySection = document.getElementById("identitySection");
const panicSection = document.getElementById("panicSection");
const identityOutput = document.getElementById("identityOutput");
const panicOutput = document.getElementById("panicOutput");

function renderResult(result, title = "Analysis Result") {
  const badgeClass =
    result.threatLevel === "High Risk"
      ? "high-risk"
      : result.threatLevel === "Suspicious"
      ? "suspicious"
      : "safe";

  const reasonsHtml = result.reasons.map(reason => `<li>${reason}</li>`).join("");

  resultBox.innerHTML = `
    <div class="badge ${badgeClass}">${result.threatLevel}</div>
    <p><strong>${title}</strong></p>
    <p><strong>Threat Score:</strong> ${result.score}/100</p>
    <p><strong>Type:</strong> ${result.scamType}</p>
    <ul>${reasonsHtml}</ul>
  `;
}

document.getElementById("analyzeTextBtn").addEventListener("click", () => {
  const inputText = document.getElementById("inputText").value.trim();

  if (!inputText) {
    resultBox.innerHTML = `<p>Please paste a suspicious message, link, or email first.</p>`;
    return;
  }

  const result = runTensorThreatAnalysis(inputText);
  renderResult(result, "Smart Scam Analyzer");
});

document.getElementById("analyzePageBtn").addEventListener("click", async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab || !tab.url) {
      resultBox.innerHTML = `<p>Could not read the current page URL.</p>`;
      return;
    }

    const result = runTensorThreatAnalysis(tab.url);
    renderResult(result, "Current Page Analysis");
  } catch (error) {
    resultBox.innerHTML = `<p>Error analyzing current page.</p>`;
    console.error(error);
  }
});

document.getElementById("identityShieldBtn").addEventListener("click", () => {
  identitySection.classList.toggle("hidden");
});

document.getElementById("panicModeBtn").addEventListener("click", () => {
  panicSection.classList.toggle("hidden");
});

document.querySelectorAll(".issue-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const issue = button.dataset.issue;
    const guides = {
      fakeProfile: [
        "Take screenshots of the fake profile immediately.",
        "Copy and save the fake account link or username.",
        "Report the profile as impersonation on the platform.",
        "Ask trusted friends to report the account too.",
        "Inform your close contacts not to trust the fake profile.",
        "Secure your real account by changing your password and enabling 2FA."
      ],
      photoMisuse: [
        "Take screenshots of the post, profile, or messages using your image.",
        "Save the profile URL or content link as evidence.",
        "Report the content on the platform immediately.",
        "Make your account private temporarily if needed.",
        "Inform trusted contacts so they are aware of the misuse.",
        "Escalate to cybercrime reporting if the misuse is severe."
      ],
      impersonation: [
        "Document the fake or duplicate account with screenshots.",
        "Compare it with your original account for proof.",
        "Report the account for impersonation.",
        "Tell your followers which account is genuine.",
        "Change your password if any data overlap exists.",
        "Enable 2FA on all linked accounts."
      ],
      imageHarassment: [
        "Do not respond emotionally or engage with the attacker.",
        "Take screenshots of all messages, posts, and profile details.",
        "Save URLs and usernames before content disappears.",
        "Block and report the account immediately.",
        "Inform a trusted adult, friend, or mentor.",
        "Use cybercrime reporting support if threats or blackmail continue."
      ]
    };

    const steps = guides[issue].map(step => `<li>${step}</li>`).join("");
    identityOutput.innerHTML = `<ul>${steps}</ul>`;
  });
});

document.querySelectorAll(".panic-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const panic = button.dataset.panic;
    const guides = {
      cyberbullying: [
        "Take screenshots of abusive messages or comments.",
        "Block the user immediately.",
        "Report the content on the platform.",
        "Avoid replying in anger or panic.",
        "Inform a trusted person for support.",
        "Escalate if harassment continues."
      ],
      otpScam: [
        "Stop interacting with the scammer immediately.",
        "Do not share any OTP or personal details.",
        "Check your bank or UPI app activity right away.",
        "Change passwords for related accounts.",
        "Contact your bank if money is involved.",
        "Keep evidence and report the incident."
      ],
      accountHacked: [
        "Try changing the password immediately.",
        "Use 'Forgot Password' if access is lost.",
        "Log out from other devices if possible.",
        "Enable 2FA after recovery.",
        "Check recovery email and phone settings.",
        "Warn close contacts if suspicious messages were sent."
      ],
      blackmail: [
        "Do not comply with threats or demands.",
        "Take screenshots of all threats and evidence.",
        "Block the person only after saving proof.",
        "Report the account or content immediately.",
        "Inform a trusted adult, friend, or authority.",
        "Escalate through cybercrime support if threats continue."
      ]
    };

    const steps = guides[panic].map(step => `<li>${step}</li>`).join("");
    panicOutput.innerHTML = `<ul>${steps}</ul>`;
  });
});