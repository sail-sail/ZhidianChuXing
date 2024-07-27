import { request } from "@/util/request";
import common from "@/util/common";
import type {
    R
} from '@/util/types'

import type {
    bannerVO
} from './Model'

export async function getBannerList() {
    const res = await request<R<bannerVO>>({
        url: '/api/index.index/bannerList'
    })
    if (res.code === 1) {
        const banner = res.data.banner
        if (banner && Array.isArray(banner)) {
            banner.forEach((i) => {
                i.image = common.getImgUrl(i.image)
            })
        }
        return res.data
    } else {
        uni.showToast({
            icon: 'none',
            title: res.msg,
        })
    }
}