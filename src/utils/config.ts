// const config = {
//     // api请求地址
//     baseUrl: 'https://car.zhidianchuxing.com.cn',
//     // 图片域名
//     imgDomain: 'https://car.zhidianchuxing.com.cn',
//     // H5端域名
//     h5Domain: 'https://car.zhidianchuxing.com.cn',
//     // 腾讯地图key
//     mpKey: 'ME2BZ-OAGLQ-JGX5N-GNMHJ-3NMRV-BQFWS',
//     //客服地址
//     webSocket: '',
//     //本地端主动给服务器ping的时间, 0 则不开启 , 单位秒
//     pingInterval: 1500,
//     token:'414a5b01-bcb0-4bdf-baf5-1ad75e8da098'
// };
// export default config

import pages from "@/pages.json";

import type {
  Pinia,
} from "pinia";

let host = "";
let port: string | undefined = undefined;
let protocol = "http:";
let domain = "";
let wsProt = "ws:";
let appid = "wxaa019d2d8007e62f";
let agentid = "";

const homePage = `/${pages.pages[0]?.path}`;

if(import.meta.env.MODE === "development") {
  // #ifndef H5
  host = "localhost";
  port = undefined;
  domain = `${ host }${ port ? `:${ port }` : "" }`;
  protocol = "http:";
  wsProt = "ws:";
  host = "car.zhidianchuxing.com.cn";
  // #endif
  // #ifdef H5
  host = location.hostname;
  port = location.port;
  domain = location.host;
  protocol = location.protocol;
  if(protocol === "https:") {
    wsProt = "wss:";
  } else {
    wsProt = "ws:";
  }
  // #endif
  domain = "localhost:4000";
}
if (import.meta.env.MODE === "production") {
  // #ifndef H5
  host = "localhost";
  port = undefined;
  domain = `${ host }${ port ? `:${ port }` : "" }`;
  protocol = "https:";
  wsProt = "wss:";
  // #endif
  // #ifdef H5
  host = location.hostname;
  port = location.port;
  domain = location.host;
  protocol = location.protocol;
  if(protocol === "https:") {
    wsProt = "wss:";
  } else {
    wsProt = "ws:";
  }
  // #endif
}

let urlBase = `${protocol}//${host}`;
if(port) {
  urlBase += `:${port}`;
}
const url = `${urlBase}/api`;
let wss = `${wsProt}//${host}`;
if(port) {
  wss += `:${port}`;
}

const config: {
  urlBase: string;
  url: string;
  wss: string;
  host: string;
  port: string | undefined;
  protocol: string;
  wsProt: string;
  homePage: string;
  domain: string;
  appid: string;
  agentid: string;
  pinia: Pinia | undefined;
} = {
  urlBase,
  url,
  wss,
  host,
  port,
  protocol,
  wsProt,
  homePage,
  domain,
  appid,
  agentid,
  pinia: undefined,
};

export default config;

