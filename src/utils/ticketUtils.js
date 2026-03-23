import * as uuidv4 from "uuid";

export const ValidateAttachment = (comment) => {
  let raw = comment?.attachment;
  let attachments = [];

  try {
    // CASE 1: string (comma-separated)
    if (typeof raw === "string") {
      attachments = raw
        .split(",")
        .map((x) => x.trim())
        .filter((x) => x && x !== "null" && x !== "undefined");
    }
    // CASE 2: array
    else if (Array.isArray(raw)) {
      attachments = raw.filter((x) => x && x !== "" && x !== "null" && x !== "undefined");
    }
    // CASE 3: single object { imageUrl }
    else if (raw?.imageUrl?.trim()) {
      attachments = [raw.imageUrl];
    }

    // 🔥 Convert to attachment objects WITH FILE TYPE
    const finalAttachments = attachments.map((url) => {
      const ext = url.split(".").pop().toLowerCase();

      return {
        url,
        type: ext, // pdf, png, jpg, csv, xlsx, etc.
        user: comment?.Name || "",
        commentId: comment?.id,
        time: comment?.time || "",
        id: uuidv4.v4(),
      };
    });

    return {
      attachments: finalAttachments,
      isMultiple: finalAttachments.length > 1,
    };
  } catch (error) {
    return {
      attachments: [],
      isMultiple: false,
      error,
    };
  }
};

export const DataParser = (input, removeOfficeuseonly) => {
  try {
    if (!input) return { data: [], length: 0 };

    const parsed = JSON.parse(input);

    if (Array.isArray(parsed)) {
      const filtered = removeOfficeuseonly ? parsed.filter((off) => !off?.isOfficeUseOnly) : parsed;

      return { data: filtered, length: filtered.length };
    }

    return { data: [], length: 0 };
  } catch (e) {
    return { data: [], length: 0 };
  }
};

const getLatestCommentDate = (comments) => {
  try {
    let commentList;

    if (typeof comments === "string") {
      if (comments.trim() === "") {
        return null;
      }
      commentList = JSON.parse(comments);
    } else {
      commentList = comments;
    }
    if (!Array.isArray(commentList)) {
      return null;
    }
    const commentDates = commentList.map((c) => new Date(c.time)).filter((d) => d.toString() !== "Invalid Date");

    if (commentDates.length === 0) return null;
    const latestDate = new Date(Math.max(...commentDates));
    return latestDate.toISOString();
  } catch (e) {
    console.error("Failed to parse comments:", e);
    return null;
  }
};
