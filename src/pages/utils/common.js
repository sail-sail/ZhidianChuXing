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

const common = {
  getImgUrl
}

export default common
