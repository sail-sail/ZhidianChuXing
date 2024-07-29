// import { request } from "@/util/request";
// import common from "@/util/common";

// import type {
//     R
// } from '@/util/types'

export async function getBannerList() {
  // "index.index/bannerList",
  const host = "https://car.zhidianchuxing.com.cn";
  const data = {
    "banner": [{
      "id": 10,
      "name": "打造品质出行",
      "image": "/uploads/20240203/0c6c00a5336a15262b199367560a58ed.jpg"
    }, {
      "id": 11,
      "name": "全新用车",
      "image": "/uploads/20240203/b089e0a90d46d8e3c2ce806b28b18ac3.jpg"
    }, {
      "id": 14,
      "name": "购车前体验",
      "image": "/uploads/20240203/1e738ee1842a2ead37580d42cfe187cd.jpg"
    }, {
      "id": 12,
      "name": "购车享受免费试驾",
      "image": "/uploads/20240203/e7ebbb841b3d6e54fd62e978c04ec68b.jpg"
    }, {
      "id": 13,
      "name": "可开票",
      "image": "/uploads/20240203/5c643475768b87944a87fee61787b656.jpg"
    }],
    "notice": [{
      "id": 4,
      "title": "租车须知",
      "createtime": "2024-01-20"
    }]
  };
  // 给图片加前缀
  data.banner = data.banner.map((item: any) => {
    return {
      ...item,
      image: host + "/" + item.image,
    };
  });
  return data;
}
