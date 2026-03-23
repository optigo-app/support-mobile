import React, { useMemo } from "react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions"; // Added for Title
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

const parseFileFromUrl = (url) => {
  if (!url) return { type: "unknown", src: "" };

  const cleanUrl = url.split("?")[0].split("#")[0];

  const extension = cleanUrl.split(".").pop().toLowerCase();

  const fileName = cleanUrl
    .split("/")
    .pop()
    .replace(/\.[^/.]+$/, "")
    .replace(/%20/g, " ");

  let type = "unknown";

  const imageExts = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico"];
  const videoExts = ["mp4", "webm", "ogg", "mov", "m4v"];
  const pdfExts = ["pdf"];

  if (imageExts.includes(extension)) type = "image";
  else if (videoExts.includes(extension)) type = "video";
  else if (pdfExts.includes(extension)) type = "pdf";

  return { type, src: url, title: fileName, extension };
};
const MediaViewer = ({ open, onClose, fileUrl }) => {
  const fileData = useMemo(() => parseFileFromUrl(fileUrl), [fileUrl]);

  const slides = useMemo(() => {
    if (!fileData.src) return [];

    if (fileData.type === "video") {
      return [
        {
          type: "video",
          width: 1280,
          height: 720,
          title: fileData.title, // Shows filename as caption
          sources: [{ src: fileData.src, type: `video/${fileData.extension}` }],
        },
      ];
    }

    if (fileData.type === "image") {
      return [
        {
          src: fileData.src,
          title: fileData.title,
        },
      ];
    }

    if (fileData.type === "pdf") {
      return [
        {
          type: "pdf",
          src: fileData.src,
          title: fileData.title,
        },
      ];
    }
    return [
      {
        type: "unknown",
        src: fileData.src,
        title: "Preview Unavailable",
      },
    ];
  }, [fileData]);

  if (!fileUrl) return null;

  return (
    <Lightbox
      open={open}
      close={onClose}
      slides={slides}
      plugins={[Video, Zoom, Captions]}
      render={{
        slide: ({ slide }) => {
          if (slide.type === "pdf") {
            return (
              <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                <div style={{ color: "white", marginBottom: 10, fontWeight: "bold" }}>{slide.title}</div>

                <iframe
                  src={slide.src}
                  title={slide.title}
                  style={{
                    width: "100%",
                    maxWidth: "800px",
                    height: "80%",
                    border: "none",
                    borderRadius: "8px",
                    background: "#fff",
                  }}
                />
              </div>
            );
          }
          if (slide.type === "unknown") {
            return (
              <div style={{ textAlign: "center", color: "white" }}>
                <h2>Preview not available</h2>
                <p>This file type cannot be viewed in the App.</p>
                <a href={slide.src} download target="_blank" rel="noreferrer" style={{ padding: "10px 20px", background: "white", color: "black", textDecoration: "none", borderRadius: "5px", marginTop: "15px", display: "inline-block" }}>
                  Download File
                </a>
              </div>
            );
          }
          return undefined;
        },
      }}
      carousel={{ padding: 0, spacing: 0 }}
      styles={{
        root: { zIndex: 99999999 }, // Ensures it sits on top of everything
        container: { backgroundColor: "rgba(0, 0, 0, 0.96)" },
      }}
      video={{
        autoPlay: true,
        controls: true,
      }}
    />
  );
};

export default MediaViewer;
