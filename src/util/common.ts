import config from './config';

function getImgUrl(img_path) {
  let path = ''
  if (img_path.indexOf("http://") == -1 && img_path.indexOf("https://") == -1) {
    path = config.imgDomain + "/" + img_path;
  } else {
    path = img_path;
  }

  return path;
}
function extractImageSrc(html) {
  // 正则表达式解释：
  // <img\s+ 匹配以 <img 开头，后面跟着一个或多个空白字符和属性
  // (?:[^>]*?\s+)? 匹配0个或多个非>字符，后面可能跟着空白字符，这是为了处理属性之间的空格
  // src="([^"]*)" 匹配 src= 后跟着双引号括起来的任意字符（非贪婪模式），并捕获这部分内容
  // (?:[^>]*?) 匹配直到标签结束（>）之前的任意字符（非贪婪模式）
  // > 匹配标签的结束
  const regex = /<img\s+(?:[^>]*?\s+)?src="([^"]*)"(?:[^>]*?)>/gi;
  let match;
  let srcs = [];

  // 使用全局标志g来找到所有匹配项
  while ((match = regex.exec(html)) !== null) {
    // match[1] 是捕获组的内容，即src属性的值
    srcs.push(match[1]);
  }

  return srcs;
}

function replaceImageSrc(html, oldSrc, newSrc) {
  // 正则表达式匹配 src 属性的值并捕获周围的HTML结构
  const regex = /(<img\s+(?:[^>]*?\s+)?src=")[^"]*("(?:[^>]*?)>)/gi;

  // 回调函数用于替换匹配的 src 值
  function replacer(match, p1, p2, offset, string) {
      // 检查是否需要替换当前的 src 值
      if (match.includes(oldSrc)) {
          // 替换 src 属性的值
          return p1 + newSrc + p2;
      }
      // 如果不需要替换，则返回原始匹配项
      return match;
  }

  // 使用正则表达式和回调函数替换HTML字符串中的 src 值
  return html.replace(regex, replacer);
}



const common = {
  getImgUrl,
  extractImageSrc,
  replaceImageSrc
}

export default common
