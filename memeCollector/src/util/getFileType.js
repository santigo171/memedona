function getExtension(filename) {
  let parts = filename.split(".");
  return parts[parts.length - 1];
}

function getFileType(filename) {
  const ext = getExtension(filename).toLowerCase();
  switch (ext) {
    case "m4v":
    case "avi":
    case "mpg":
    case "mp4":
    case "mov":
    case "wmv":
    case "flv":
    case "webm":
      return "vid";
    case "jpg":
    case "jpeg":
    case "gif":
    case "gifv":
    case "bmp":
    case "png":
    case "webp":
      return "img";
  }
  throw new Error(`Extension ${ext} not recognized`);
}

export { getFileType };
