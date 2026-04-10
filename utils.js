function extractFeatures(text) {
    const input = text.toLowerCase().trim();
  
    const urgencyKeywords = ["urgent", "immediately", "now", "verify now", "act fast", "suspended"];
    const bankingKeywords = ["bank", "kyc", "otp", "upi", "account", "payment", "refund", "transaction"];
    const rewardKeywords = ["prize", "reward", "winner", "gift", "free", "bonus"];
    const impersonationKeywords = ["support", "official", "customer care", "verification", "secure login"];
    const dangerKeywords = ["click here", "login now", "download now", "install update", "confirm now"];
  
    const suspiciousDomains = ["bit.ly", "tinyurl", "rb.gy", "shorturl", "free-login", "verify-account"];
    const suspiciousExtensions = [".exe", ".apk", ".zip", ".msi"];
  
    const countMatches = (keywords) =>
      keywords.reduce((count, keyword) => count + (input.includes(keyword) ? 1 : 0), 0);
  
    const urgencyScore = Math.min(countMatches(urgencyKeywords) / 3, 1);
    const bankingScore = Math.min(countMatches(bankingKeywords) / 4, 1);
    const rewardScore = Math.min(countMatches(rewardKeywords) / 3, 1);
    const impersonationScore = Math.min(countMatches(impersonationKeywords) / 3, 1);
    const actionScore = Math.min(countMatches(dangerKeywords) / 3, 1);
  
    const urlRisk =
      suspiciousDomains.some(domain => input.includes(domain)) ||
      suspiciousExtensions.some(ext => input.includes(ext)) ||
      /https?:\/\/[^\s]+/.test(input) && input.includes("-")
        ? 1
        : 0;
  
    const numberHeavyScore = (input.match(/\d/g) || []).length > 6 ? 0.6 : 0;
    const symbolHeavyScore = /[@#$%^&*]{2,}/.test(input) ? 0.5 : 0;
  
    return [
      urgencyScore,
      bankingScore,
      rewardScore,
      impersonationScore,
      actionScore,
      urlRisk,
      numberHeavyScore,
      symbolHeavyScore
    ];
  }
  
  function runTensorThreatAnalysis(text) {
    const features = extractFeatures(text);
  
    const featureTensor = tf.tensor2d([features]);
    const weightTensor = tf.tensor2d([[0.18], [0.20], [0.10], [0.14], [0.14], [0.16], [0.04], [0.04]]);
  
    const rawScoreTensor = featureTensor.matMul(weightTensor);
    const rawScore = rawScoreTensor.dataSync()[0];
  
    featureTensor.dispose();
    weightTensor.dispose();
    rawScoreTensor.dispose();
  
    const score = Math.min(Math.round(rawScore * 100), 100);
  
    let threatLevel = "Safe";
    if (score >= 60) threatLevel = "High Risk";
    else if (score >= 30) threatLevel = "Suspicious";
  
    let scamType = "General Suspicious Activity";
    const input = text.toLowerCase();
  
    if (input.includes("otp") || input.includes("upi") || input.includes("transaction")) {
      scamType = "OTP / Payment Scam";
    } else if (input.includes("bank") || input.includes("kyc") || input.includes("account")) {
      scamType = "Banking / Phishing Scam";
    } else if (input.includes("prize") || input.includes("reward") || input.includes("winner")) {
      scamType = "Reward / Prize Scam";
    } else if (input.includes("download now") || input.includes(".exe") || input.includes(".apk")) {
      scamType = "Suspicious Download Risk";
    }
  
    const reasons = [];
    const [urgency, banking, reward, impersonation, action, urlRisk] = features;
  
    if (urgency > 0) reasons.push("Uses urgency or pressure language");
    if (banking > 0) reasons.push("Contains financial / banking-related terms");
    if (reward > 0) reasons.push("Uses reward or bait-style language");
    if (impersonation > 0) reasons.push("Looks like impersonation or fake support language");
    if (action > 0) reasons.push("Pushes immediate action such as clicking or downloading");
    if (urlRisk > 0) reasons.push("Contains a suspicious or risky URL pattern");
  
    if (reasons.length === 0) reasons.push("No strong scam indicators detected");
  
    return {
      score,
      threatLevel,
      scamType,
      reasons
    };
  }