import imageCompression from "browser-image-compression";

export async function compressImagesToWebP(files, customOptions = {}) {
  const inputFiles = Array.isArray(files) ? files : [files];

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.8,
    ...customOptions,
  };

  const results = [];

  for (const file of inputFiles) {
    if (!file?.type?.startsWith("image/")) continue;

    const compressedFile = await imageCompression(file, options);

    results.push({
      id: `${file.name}-${Date.now()}`,
      originalName: file.name,
      originalSize: file.size,
      compressedName:
        file.name.replace(/\.[^/.]+$/, "") + ".webp",
      compressedSize: compressedFile.size,
      blob: compressedFile,
      previewUrl: URL.createObjectURL(compressedFile),
    });
  }

  return results;
}
