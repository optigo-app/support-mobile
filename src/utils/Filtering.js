export const getStatusColor = (status = "") => {
  const s = status.toLowerCase();

  // 🎨 CRM palette (light bg + strong text)
  const COLORS = {
    solved:           { bg: "#DCFCE7", color: "#166534" }, // green soft
    delivered:        { bg: "#E0F2FE", color: "#075985" }, // blue soft
    "support tracking": { bg: "#FFF7ED", color: "#9A3412" }, // orange
    "assign to testing": { bg: "#F3E8FF", color: "#6B21A8" }, // purple
    "waiting for developer": { bg: "#F1F5F9", color: "#475569" }, // slate
    "waiting for tester": { bg: "#F1F5F9", color: "#475569" },
    "developer tracking": { bg: "#FEF2F2", color: "#991B1B" }, // red light
    "maintenance done": { bg: "#DCFCE7", color: "#166534" },
    "permanant solution pending": { bg: "#FFF1F2", color: "#9F1239" },
    "temporary solution given": { bg: "#EFF6FF", color: "#1D4ED8" }, // vivid blue
    "show next time": { bg: "#EDE9FE", color: "#5B21B6" },
    "new requirement": { bg: "#E0F2FE", color: "#0369A1" },
    "ticket generated": { bg: "#E0E7FF", color: "#4338CA" },
    "they will call back": { bg: "#FEFCE8", color: "#854D0E" }, // amber
  };

  return COLORS[s] || { bg: "#F3F4F6", color: "#4B5563" }; // gray default
};



export const COLORS = {
  textPrimary: "#1A1A1A",
  textSecondary: "#6B7280",
  successBg: "rgba(58, 248, 126, 0.08)",
  successText: "#0f8c3a",
  processBg: "rgba(74, 102, 255, 0.08)",
  processText: "#4A66FF",
  warnBg: "rgba(255, 167, 38, 0.1)",
  warnText: "#F57C00",
  errorBg: "#FFEBEE",
  errorText: "#D32F2F",
  neutralBg: "rgba(0, 0, 0, 0.06)",
  neutralText: "#555",
  border: "rgba(0,0,0,0.06)",
};


export function getAvatarGradient(name) {
  const gradients = [
    "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
    "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
    "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)",
    "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    "linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)",
    "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)"
  ];

  // If you want truly random each time
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
}

export function extractRecordingLink(htmlString) {
  const cleanHtml = htmlString.trim().replace(/^"|"$/g, '');

  const paragraphs = cleanHtml.split('<p>');
  for (const p of paragraphs) {
    const urlMatch = p.match(/https?:\/\/[^\s"'>]+/i);
    if (urlMatch) {
      return urlMatch[0];
    }
  }
  return null;
}