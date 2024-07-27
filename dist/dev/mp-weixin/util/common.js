"use strict";
const util_config = require("./config.js");
function getImgUrl(img_path) {
  let path = "";
  if (img_path.indexOf("http://") == -1 && img_path.indexOf("https://") == -1) {
    path = util_config.config.imgDomain + "/" + img_path;
  } else {
    path = img_path;
  }
  return path;
}
function extractImageSrc(html) {
  const regex = /<img\s+(?:[^>]*?\s+)?src="([^"]*)"(?:[^>]*?)>/gi;
  let match;
  let srcs = [];
  while ((match = regex.exec(html)) !== null) {
    srcs.push(match[1]);
  }
  return srcs;
}
function replaceImageSrc(html, oldSrc, newSrc) {
  const regex = /(<img\s+(?:[^>]*?\s+)?src=")[^"]*("(?:[^>]*?)>)/gi;
  function replacer(match, p1, p2, offset, string) {
    if (match.includes(oldSrc)) {
      return p1 + newSrc + p2;
    }
    return match;
  }
  return html.replace(regex, replacer);
}
const common = {
  getImgUrl,
  extractImageSrc,
  replaceImageSrc
};
exports.common = common;
