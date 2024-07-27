import { request } from "../../util/request";
import type {
    R
} from '../../util/types'

import type {
    // bannerVO
} from './Model'

// export async function getBannerList() {
//     const res = await request<R<bannerVO>>({
//         url: '/api/index.index/bannerList'
//     })
//     if (res.code === 1) {
//         return res.data
//     } else {
//         uni.showToast({
//             icon: 'none',
//             title: res.msg,
//         })
//     }
// }