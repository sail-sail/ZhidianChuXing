import config from "./config"

async function uploadFile(tempFilePath: string, data: any) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: config.baseUrl + '/api/common/upload',
      filePath: tempFilePath,
      name: 'file',
      formData: data,
      success: function (res) {
        console.log(res, 'res')
        let path_str = JSON.parse(res.data);
        if (path_str.code >= 1) {
          resolve(path_str.data.fullurl);
        } else {
          reject("error");
        }
      }
    });

  });
}

export async function upLoadImg() {
  const imgs = $ref<string[]>([])
  const data = {
    token: config.token
  }
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: 1,
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册或者拍照
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths, 'tempFilePaths')
        imgs.push(tempFilePaths[0])
        // for (var i = 0; i < tempFilePaths.length; i++) {
        //   var path = await uploadFile(tempFilePaths[i], data);
        //   imgs.push(path);
        // }
        resolve(imgs);
      }
    });
  });
}