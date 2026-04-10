(function () {
    if (window.__SISTER_SHIELD_ACTIVE__) return;
    window.__SISTER_SHIELD_ACTIVE__ = true;
  
    const PROCESSED_ATTR = "data-sister-shield-processed";
    const OVERLAY_ID = "sister-shield-overlay-root";
    const TOOLTIP_ID = "sister-shield-hover-tooltip";
  
    let activeModal = null;
    let pageBannerShown = false;
  
    function createRootContainer() {
      let root = document.getElementById(OVERLAY_ID);
      if (root) return root;
  
      root = document.createElement("div");
      root.id = OVERLAY_ID;
      root.style.position = "fixed";
      root.style.top = "0";
      root.style.left = "0";
      root.style.width = "0";
      root.style.height = "0";
      root.style.zIndex = "2147483647";
      root.style.pointerEvents = "none";
      document.documentElement.appendChild(root);
  
      return root;
    }
  
    function showTopBanner(message, level = "warning") {
      if (pageBannerShown) return;
      pageBannerShown = true;
  
      const root = createRootContainer();
      const banner = document.createElement("div");
  
      banner.style.all = "initial";
      banner.style.position = "fixed";
      banner.style.top = "0";
      banner.style.left = "0";
      banner.style.right = "0";
      banner.style.zIndex = "2147483647";
      banner.style.background =
        level === "danger"
          ? "linear-gradient(90deg, #7f1d1d, #991b1b)"
          : "linear-gradient(90deg, #78350f, #92400e)";
      banner.style.color = "#ffffff";
      banner.style.padding = "12px 18px";
      banner.style.fontFamily = "Arial, sans-serif";
      banner.style.fontSize = "14px";
      banner.style.fontWeight = "700";
      banner.style.boxShadow = "0 2px 12px rgba(0,0,0,0.35)";
      banner.style.pointerEvents = "auto";
      banner.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
      banner.textContent = `🛡️ Sister Shield: ${message}`;
  
      root.appendChild(banner);
    }
  
    function showTooltip(target, message) {
      removeTooltip();
  
      const rect = target.getBoundingClientRect();
      const root = createRootContainer();
  
      const tip = document.createElement("div");
      tip.id = TOOLTIP_ID;
      tip.style.all = "initial";
      tip.style.position = "fixed";
      tip.style.top = `${Math.max(rect.top - 42, 8)}px`;
      tip.style.left = `${Math.min(rect.left, window.innerWidth - 280)}px`;
      tip.style.zIndex = "2147483647";
      tip.style.background = "linear-gradient(90deg, #7f1d1d, #991b1b)";
      tip.style.color = "#ffffff";
      tip.style.padding = "8px 12px";
      tip.style.borderRadius = "12px";
      tip.style.fontFamily = "Arial, sans-serif";
      tip.style.fontSize = "12px";
      tip.style.fontWeight = "700";
      tip.style.boxShadow = "0 6px 16px rgba(0,0,0,0.35)";
      tip.style.pointerEvents = "none";
      tip.style.border = "1px solid rgba(255,255,255,0.08)";
      tip.textContent = `⚠ ${message}`;
  
      root.appendChild(tip);
    }
  
    function removeTooltip() {
      const tip = document.getElementById(TOOLTIP_ID);
      if (tip) tip.remove();
    }
  
    function closeModal() {
      if (activeModal) {
        activeModal.remove();
        activeModal = null;
      }
    }
  
    function showWarningModal({ url, score, reasons, onProceed }) {
      closeModal();
  
      const root = createRootContainer();
      const overlay = document.createElement("div");
      activeModal = overlay;
  
      overlay.style.all = "initial";
      overlay.style.position = "fixed";
      overlay.style.inset = "0";
      overlay.style.background = "rgba(2, 6, 23, 0.78)";
      overlay.style.backdropFilter = "blur(6px)";
      overlay.style.webkitBackdropFilter = "blur(6px)";
      overlay.style.zIndex = "2147483647";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.pointerEvents = "auto";
  
      const card = document.createElement("div");
      card.style.all = "initial";
      card.style.width = "min(92vw, 500px)";
      card.style.background = "linear-gradient(180deg, #0f172a 0%, #111827 100%)";
      card.style.color = "#f8fafc";
      card.style.borderRadius = "24px";
      card.style.padding = "24px";
      card.style.boxShadow = "0 0 0 1px rgba(239,68,68,0.2), 0 20px 60px rgba(0,0,0,0.55), 0 0 30px rgba(239,68,68,0.15)";
      card.style.fontFamily = "Arial, sans-serif";
      card.style.border = "1px solid rgba(239, 68, 68, 0.25)";
      card.style.display = "block";
      card.style.position = "relative";
  
      const topGlow = document.createElement("div");
      topGlow.style.all = "initial";
      topGlow.style.position = "absolute";
      topGlow.style.top = "0";
      topGlow.style.left = "0";
      topGlow.style.right = "0";
      topGlow.style.height = "5px";
      topGlow.style.borderTopLeftRadius = "24px";
      topGlow.style.borderTopRightRadius = "24px";
      topGlow.style.background = "linear-gradient(90deg, #ef4444, #f97316, #ef4444)";
  
      const headerRow = document.createElement("div");
      headerRow.style.display = "flex";
      headerRow.style.alignItems = "center";
      headerRow.style.justifyContent = "space-between";
      headerRow.style.marginBottom = "16px";
  
      const leftHeader = document.createElement("div");
      leftHeader.style.display = "flex";
      leftHeader.style.alignItems = "center";
      leftHeader.style.gap = "12px";
  
      const iconWrap = document.createElement("div");
      iconWrap.style.width = "52px";
      iconWrap.style.height = "52px";
      iconWrap.style.borderRadius = "16px";
      iconWrap.style.display = "flex";
      iconWrap.style.alignItems = "center";
      iconWrap.style.justifyContent = "center";
      iconWrap.style.background = "rgba(239, 68, 68, 0.14)";
      iconWrap.style.border = "1px solid rgba(239, 68, 68, 0.25)";
      iconWrap.style.fontSize = "26px";
      iconWrap.textContent = "🛡️";
  
      const titleWrap = document.createElement("div");
  
      const title = document.createElement("div");
      title.style.fontSize = "20px";
      title.style.fontWeight = "800";
      title.style.marginBottom = "4px";
      title.textContent = "Sister Shield Security Alert";
  
      const subtitle = document.createElement("div");
      subtitle.style.fontSize = "12px";
      subtitle.style.color = "#cbd5e1";
      subtitle.textContent = "Risky action intercepted before navigation";
  
      titleWrap.appendChild(title);
      titleWrap.appendChild(subtitle);
  
      leftHeader.appendChild(iconWrap);
      leftHeader.appendChild(titleWrap);
  
      const badge = document.createElement("div");
      badge.style.padding = "8px 12px";
      badge.style.borderRadius = "999px";
      badge.style.background = score >= 65 ? "rgba(239,68,68,0.16)" : "rgba(245,158,11,0.16)";
      badge.style.border = score >= 65
        ? "1px solid rgba(239,68,68,0.28)"
        : "1px solid rgba(245,158,11,0.28)";
      badge.style.color = score >= 65 ? "#fca5a5" : "#fcd34d";
      badge.style.fontSize = "12px";
      badge.style.fontWeight = "800";
      badge.textContent = `Threat Score: ${score}/100`;
  
      headerRow.appendChild(leftHeader);
      headerRow.appendChild(badge);
  
      const riskBox = document.createElement("div");
      riskBox.style.background = "rgba(239,68,68,0.08)";
      riskBox.style.border = "1px solid rgba(239,68,68,0.16)";
      riskBox.style.borderRadius = "16px";
      riskBox.style.padding = "14px";
      riskBox.style.marginBottom = "14px";
  
      const riskTitle = document.createElement("div");
      riskTitle.style.fontSize = "13px";
      riskTitle.style.fontWeight = "700";
      riskTitle.style.color = "#fca5a5";
      riskTitle.style.marginBottom = "8px";
      riskTitle.textContent = "Suspicious destination detected";
  
      const urlLine = document.createElement("div");
      urlLine.style.fontSize = "12px";
      urlLine.style.color = "#e2e8f0";
      urlLine.style.wordBreak = "break-word";
      urlLine.style.lineHeight = "1.5";
      urlLine.textContent = url;
  
      riskBox.appendChild(riskTitle);
      riskBox.appendChild(urlLine);
  
      const reasonCard = document.createElement("div");
      reasonCard.style.background = "rgba(15,23,42,0.65)";
      reasonCard.style.border = "1px solid #334155";
      reasonCard.style.borderRadius = "16px";
      reasonCard.style.padding = "14px";
      reasonCard.style.marginBottom = "18px";
  
      const reasonTitle = document.createElement("div");
      reasonTitle.style.fontSize = "13px";
      reasonTitle.style.fontWeight = "800";
      reasonTitle.style.marginBottom = "10px";
      reasonTitle.style.color = "#f8fafc";
      reasonTitle.textContent = "Why it was flagged";
  
      const ul = document.createElement("ul");
      ul.style.margin = "0";
      ul.style.paddingLeft = "18px";
      ul.style.fontSize = "13px";
      ul.style.lineHeight = "1.7";
      ul.style.color = "#cbd5e1";
  
      reasons.slice(0, 4).forEach((reason) => {
        const li = document.createElement("li");
        li.textContent = reason;
        ul.appendChild(li);
      });
  
      reasonCard.appendChild(reasonTitle);
      reasonCard.appendChild(ul);
  
      const footerNote = document.createElement("div");
      footerNote.style.fontSize = "12px";
      footerNote.style.color = "#94a3b8";
      footerNote.style.marginBottom = "18px";
      footerNote.style.lineHeight = "1.5";
      footerNote.textContent =
        "This action was paused to protect the user before potential phishing, fraud, or unsafe redirection.";
  
      const btnWrap = document.createElement("div");
      btnWrap.style.display = "flex";
      btnWrap.style.gap = "12px";
  
      const backBtn = document.createElement("button");
      backBtn.textContent = "Go Back";
      backBtn.style.flex = "1";
      backBtn.style.padding = "12px 14px";
      backBtn.style.border = "1px solid #475569";
      backBtn.style.borderRadius = "14px";
      backBtn.style.background = "#1e293b";
      backBtn.style.color = "#ffffff";
      backBtn.style.fontWeight = "800";
      backBtn.style.cursor = "pointer";
      backBtn.style.fontSize = "14px";
  
      const proceedBtn = document.createElement("button");
      proceedBtn.textContent = "Proceed Anyway";
      proceedBtn.style.flex = "1";
      proceedBtn.style.padding = "12px 14px";
      proceedBtn.style.border = "none";
      proceedBtn.style.borderRadius = "14px";
      proceedBtn.style.background = "linear-gradient(90deg, #dc2626, #ef4444)";
      proceedBtn.style.color = "#ffffff";
      proceedBtn.style.fontWeight = "800";
      proceedBtn.style.cursor = "pointer";
      proceedBtn.style.fontSize = "14px";
      proceedBtn.style.boxShadow = "0 8px 20px rgba(239,68,68,0.25)";
  
      backBtn.addEventListener("click", () => {
        closeModal();
      });
  
      proceedBtn.addEventListener("click", () => {
        closeModal();
        onProceed();
      });
  
      btnWrap.appendChild(backBtn);
      btnWrap.appendChild(proceedBtn);
  
      card.appendChild(topGlow);
      card.appendChild(headerRow);
      card.appendChild(riskBox);
      card.appendChild(reasonCard);
      card.appendChild(footerNote);
      card.appendChild(btnWrap);
  
      overlay.appendChild(card);
      root.appendChild(overlay);
    }
  
    function analyzePageNow() {
      const pageText = (document.body?.innerText || "").slice(0, 3000);
      const url = window.location.href;
  
      const result = window.SisterShieldAI.analyzeThreat({
        url,
        text: pageText
      });
  
      if (result.threatLevel !== "Safe") {
        showTopBanner(
          result.threatLevel === "High Risk"
            ? `High-risk page detected (${result.score}/100)`
            : `Suspicious page detected (${result.score}/100)`,
          result.threatLevel === "High Risk" ? "danger" : "warning"
        );
      }
    }
  
    function markSuspiciousElement(el, result) {
      if (result.threatLevel === "Safe") return;
      el.style.outline = "2px solid rgba(239, 68, 68, 0.85)";
      el.style.outlineOffset = "2px";
      el.style.boxShadow = "0 0 0 4px rgba(239,68,68,0.08)";
    }
  
    function attachHover(el, result) {
      if (result.threatLevel === "Safe") return;
  
      el.addEventListener("mouseenter", () => {
        showTooltip(el, `${result.threatLevel} link (${result.score}/100)`);
      });
  
      el.addEventListener("mouseleave", () => {
        removeTooltip();
      });
    }
  
    function scanLinks() {
      const links = document.querySelectorAll(`a[href]:not([${PROCESSED_ATTR}])`);
  
      links.forEach((link) => {
        link.setAttribute(PROCESSED_ATTR, "true");
  
        const href = link.href || "";
        const anchorText = (link.innerText || link.textContent || "").trim();
  
        const result = window.SisterShieldAI.analyzeThreat({
          url: href,
          anchorText,
          text: anchorText
        });
  
        markSuspiciousElement(link, result);
        attachHover(link, result);
  
        if (result.threatLevel !== "Safe") {
          link.dataset.sisterShieldRisk = JSON.stringify({
            url: href,
            score: result.score,
            reasons: result.reasons
          });
  
          // Also disable default browser hint behavior slightly
          link.setAttribute("data-sister-shield-block", "true");
        }
      });
    }
  
    function scanButtons() {
      const buttons = document.querySelectorAll(
        `button:not([${PROCESSED_ATTR}]), input[type='button']:not([${PROCESSED_ATTR}]), input[type='submit']:not([${PROCESSED_ATTR}])`
      );
  
      buttons.forEach((btn) => {
        btn.setAttribute(PROCESSED_ATTR, "true");
  
        const text = (btn.innerText || btn.value || btn.textContent || "").trim();
  
        const result = window.SisterShieldAI.analyzeThreat({
          buttonText: text,
          text
        });
  
        if (result.threatLevel !== "Safe") {
          markSuspiciousElement(btn, result);
  
          btn.addEventListener(
            "click",
            (event) => {
              event.preventDefault();
              event.stopImmediatePropagation();
              event.stopPropagation();
  
              showWarningModal({
                url: "Suspicious button action",
                score: result.score,
                reasons: result.reasons,
                onProceed: () => {
                  btn.removeAttribute(PROCESSED_ATTR);
                  btn.click();
                }
              });
            },
            true
          );
        }
      });
    }
  
    function scanForms() {
      const forms = document.querySelectorAll(`form[action]:not([${PROCESSED_ATTR}])`);
  
      forms.forEach((form) => {
        form.setAttribute(PROCESSED_ATTR, "true");
  
        const action = form.action || "";
        const text = (form.innerText || "").trim();
  
        const result = window.SisterShieldAI.analyzeThreat({
          url: action,
          text
        });
  
        if (result.threatLevel !== "Safe") {
          form.addEventListener(
            "submit",
            (event) => {
              event.preventDefault();
              event.stopImmediatePropagation();
              event.stopPropagation();
  
              showWarningModal({
                url: action || "Suspicious form submission",
                score: result.score,
                reasons: result.reasons,
                onProceed: () => {
                  HTMLFormElement.prototype.submit.call(form);
                }
              });
            },
            true
          );
        }
      });
    }
  
    function setupGlobalHardInterceptor() {
      document.addEventListener(
        "click",
        (event) => {
          const anchor = event.target.closest("a[href]");
          if (!anchor) return;
  
          const riskData = anchor.dataset.sisterShieldRisk;
          if (!riskData) return;
  
          const parsed = JSON.parse(riskData);
  
          event.preventDefault();
          event.stopImmediatePropagation();
          event.stopPropagation();
  
          showWarningModal({
            url: parsed.url,
            score: parsed.score,
            reasons: parsed.reasons,
            onProceed: () => {
              window.location.assign(parsed.url);
            }
          });
        },
        true
      );
  
      // Backup interception for auxclick (middle click)
      document.addEventListener(
        "auxclick",
        (event) => {
          const anchor = event.target.closest("a[href]");
          if (!anchor) return;
  
          const riskData = anchor.dataset.sisterShieldRisk;
          if (!riskData) return;
  
          event.preventDefault();
          event.stopImmediatePropagation();
          event.stopPropagation();
        },
        true
      );
    }
  
    function fullScan() {
      scanLinks();
      scanButtons();
      scanForms();
    }
  
    function observeDynamicChanges() {
      const observer = new MutationObserver(() => {
        fullScan();
      });
  
      observer.observe(document.documentElement || document.body, {
        childList: true,
        subtree: true
      });
    }
  
    function init() {
      analyzePageNow();
      fullScan();
      setupGlobalHardInterceptor();
      observeDynamicChanges();
    }
  
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  })();