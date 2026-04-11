chrome.runtime.onInstalled.addListener(() => {
  console.log("Sister Shield background service worker active");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "panicMode") {
    handlePanicMode(sendResponse);
    return true; // keeps sendResponse alive for async
  }
});

function handlePanicMode(sendResponse) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs.length) {
      sendResponse({ success: false, error: "No active tab found" });
      return;
    }

    const activeTab = tabs[0];
    const threatLog = {
      url: activeTab.url || "Unknown URL",
      title: activeTab.title || "Unknown Page",
      time: new Date().toLocaleString(),
      riskScore: "Emergency Exit",
      threatType: detectThreatType(activeTab),
      mode: "panic_mode_triggered"
    };

    chrome.storage.local.get(["panicLogs", "blockedSites", "threatsBlocked"], (data) => {
      const panicLogs = data.panicLogs || [];
      const blockedSites = data.blockedSites || [];
      const threatsBlocked = data.threatsBlocked || 0;

      // Save panic log
      panicLogs.unshift(threatLog);

      // Also store in blockedSites for dashboard consistency
      blockedSites.unshift({
        url: threatLog.url,
        score: 100,
        time: new Date().toLocaleTimeString(),
        source: "Panic Mode Threat Lock"
      });

      chrome.storage.local.set(
        {
          panicLogs: panicLogs.slice(0, 10),
          blockedSites: blockedSites.slice(0, 12),
          threatsBlocked: threatsBlocked + 1,
          lastRiskScore: 100,
          protectionStatus: "PANIC MODE ACTIVATED",
          lastPanicEvent: threatLog
        },
        () => {
          // Close active suspicious tab immediately
          chrome.tabs.remove(activeTab.id, () => {
            if (chrome.runtime.lastError) {
              sendResponse({
                success: false,
                error: chrome.runtime.lastError.message
              });
              return;
            }

            sendResponse({
              success: true,
              message: "Panic Mode activated. Threat stored locally and tab closed."
            });
          });
        }
      );
    });
  });
}

function detectThreatType(tab) {
  const url = (tab.url || "").toLowerCase();
  const title = (tab.title || "").toLowerCase();

  if (url.includes("bank") || title.includes("bank")) {
    return "Banking Phishing";
  }

  if (url.includes("mail") || title.includes("gmail") || title.includes("internship")) {
    return "Email Scam / Phishing";
  }

  if (
    url.includes("instagram") ||
    title.includes("instagram") ||
    title.includes("fake account") ||
    title.includes("photo misuse")
  ) {
    return "Social Media Impersonation / Photo Misuse";
  }

  return "Suspicious Session";
}