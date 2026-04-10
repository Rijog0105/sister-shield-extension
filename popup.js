document.addEventListener("DOMContentLoaded", () => {
  const identityShieldBtn = document.getElementById("identityShieldBtn");
  const panicModeBtn = document.getElementById("panicModeBtn");

  const identitySection = document.getElementById("identitySection");
  const panicSection = document.getElementById("panicSection");

  const identityOutput = document.getElementById("identityOutput");
  const panicOutput = document.getElementById("panicOutput");

  const identityGuides = {
    fakeProfile: `
1. Take screenshots of the fake profile.
2. Report the account on Instagram/Facebook immediately.
3. Inform trusted friends not to interact with it.
4. Secure your own account with strong password + 2FA.
5. File a cybercrime complaint if impersonation continues.
    `,
    photoMisuse: `
1. Save proof (screenshots, profile URL, posts).
2. Report the content/platform immediately.
3. Ask trusted contacts not to share the image further.
4. Tighten privacy settings on social accounts.
5. File a cybercrime complaint if the misuse is harmful or repeated.
    `,
    impersonation: `
1. Collect screenshots and profile links.
2. Report the fake account on the platform.
3. Inform your close contacts about the impersonation.
4. Update your account security and enable 2FA.
5. Escalate through cybercrime reporting if needed.
    `,
    imageHarassment: `
1. Do not respond emotionally or negotiate.
2. Save all evidence (screenshots, usernames, messages).
3. Block and report the offender immediately.
4. Tell a trusted adult/friend/mentor.
5. File a formal cybercrime complaint if threats continue.
    `
  };

  const panicGuides = {
    cyberbullying: `
1. Save screenshots and evidence.
2. Block and report the harasser.
3. Do not engage further.
4. Inform a trusted person immediately.
5. Escalate to cybercrime reporting if severe.
    `,
    otpScam: `
1. Stop all communication immediately.
2. Check bank/UPI account activity.
3. Change banking passwords and UPI PIN if needed.
4. Contact your bank urgently.
5. File a cybercrime complaint as soon as possible.
    `,
    accountHacked: `
1. Change password immediately if access is available.
2. Log out of all devices.
3. Enable 2-factor authentication.
4. Recover the account using official platform recovery.
5. Inform close contacts not to trust suspicious messages from your account.
    `,
    blackmail: `
1. Do not panic and do not pay.
2. Save all evidence (messages, usernames, screenshots).
3. Block and report the person.
4. Inform a trusted person immediately.
5. File a cybercrime complaint without delay.
    `
  };

  identityShieldBtn.addEventListener("click", () => {
    identitySection.classList.toggle("hidden");
    panicSection.classList.add("hidden");
  });

  panicModeBtn.addEventListener("click", () => {
    panicSection.classList.toggle("hidden");
    identitySection.classList.add("hidden");
  });

  document.querySelectorAll(".issue-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const issue = btn.dataset.issue;
      identityOutput.textContent = identityGuides[issue] || "No guidance available.";
    });
  });

  document.querySelectorAll(".panic-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panic = btn.dataset.panic;
      panicOutput.textContent = panicGuides[panic] || "No guidance available.";
    });
  });
});