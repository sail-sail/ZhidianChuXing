<template>
  <view class="container">
    <view class="main">
      <view class="title">{{title}}</view>
      <view class="font-size-tag color-sub">加入{{title}}租车可得大额优惠券</view>
      <image :src="$util.img(invite_img)" mode="" class="codeimg"></image>
    </view>
    
    <view class="invite_btn">
      <view class="btn cancel" @click="saveImage()">保存图片</view>
      <button class="btn confirm" open-type="share" style="margin: 0;padding: 0;">邀请好友</button>
    </view>
    
    <view class="record">
      <view class="name"> <text class="line"></text>邀请记录</view>
      <view class="card acea-row row-middle" v-for="(item,index) in inviteList" :key="index">
        <image :src="item.avatar" mode="aspectFill" class="avatar" ></image>
        <view class="user-info">
          <view class="font-30 font-weight">{{item.nickname}}</view>
          <view class="color-sub font-size-tag">{{item.mobile | filterMobile}}</view>
        </view>
        <view class="">{{item.createtime}}</view>
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: getApp().globalData.title,
        invite_img: '',
        inviteList: [],
        page: 1,
        pageSize: 15,
        total: 1,
      }
    },
    filters: {
    	filterMobile(mobile) {
    	  if(mobile) return mobile.substring(0, 3) + '****' + mobile.substring(7);
    		else return "";
    	}
    },
    onLoad() {
      //返回的是不带域名的前缀的png图片
      this.getInviteImage()
      this.getInviteRecord()
    },
    onReachBottom() {
      if(this.page > this.total) return;
      this.page++;
      this.getInviteRecord()
    },
    methods: {
      //获取邀请图
      getInviteImage() {
        this.$api.sendRequest({
          url: '/api/index.user/qrCode',
          data: {},
          success: res => {
            if(res.code == 1 && res.data) {
              this.invite_img = res.data.qr_code;
            }else {
              this.$util.showToast({title: res.msg})
            }
          }
        })
      },
      //获取邀请记录
      getInviteRecord() {
        this.$api.sendRequest({
          url: '/api/index.user/bindSaleLog',
          data: {
            page: this.page,
            number: this.pageSize
          },
          success: res => {
            if(res.code == 1) {
              //设置列表数据
              if (this.page == 1) this.inviteList = res.data.list; //如果是第一页需手动制空列表
              else this.inviteList = this.inviteList.concat(res.data.list); //追加新数据
              this.total = res.data.page_count;
            }
          }
        })
      },
      saveImage() {
        uni.downloadFile({
        	url: this.$util.img(this.invite_img),
        	success: res => {
        		if (res.statusCode === 200) {
        			uni.saveImageToPhotosAlbum({
        				filePath: res.tempFilePath,
        				success: () => {
        					this.$util.showToast({
        						title: '保存成功'
        					});
        				},
        				fail: res => {
        						this.$util.showToast({
        							title: '保存失败，请稍后重试'
        						});
        				}
        			});
        		} else {
        			this.$util.showToast({
        				title: '下载失败'
        			});
        		}
        	},
        	fail: res => {
        		this.$util.showToast({
        			title: '下载失败'
        		});
        	}
        });
      },
      //保存图片 base64
      saveImageBase64() {
        //获取到报告数据流后，先用writeFile将base64转为图片，将图片地址放到image组件src属性中
        let base64 = this.invite_img.replace(/^data:image\/\w+;base64,/, "");//去掉data:image/png;base64,
        let filePath=wx.env.USER_DATA_PATH + '/invite_qrcode.png';
        uni.getFileSystemManager().writeFile({
            filePath:filePath ,  //创建一个临时文件名
            data: base64,    //写入的文本或二进制数据
            encoding: 'base64',  //写入当前文件的字符编码
            success: res => {
                uni.saveImageToPhotosAlbum({
                    filePath: filePath,
                    success: function(res2) {
                        uni.showToast({
                            title: '保存成功，请从相册选择再分享',
                            icon:"none",
                            duration:5000
                        })
                    },
                    fail: function(err) {
                    }
                })
            },
            fail: err => {
            }
        })
        
      },
    },
    /**
     * 自定义分享内容
     * @param {Object} res
     */
    onShareAppMessage(res) {
    	var path = '/pages/index/index';
      let sale_id = 0;
      if(uni.getStorageSync('token')) {
        sale_id = uni.getStorageSync('userInfo').id;
      }
    	path += '?saleid=' + sale_id;
    	return {
    		title: '快来加入我的团队吧',
    		path: path,
    		success: res => {},
    		fail: res => {}
    	};
    }
  }
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFFFFF;
  margin: 48rpx 32rpx;
  padding: 32rpx 0 150rpx;
  .title {
    font-size: 40rpx;
    font-weight: 500;
    color: rgba(0,0,0,0.8);
  }
  .codeimg {
    width: 360rpx;
    height: 360rpx;
    margin-top: 88rpx;
  }
}
.invite_btn {
  display: flex;
  justify-content: space-between;
  margin: 0 32rpx;
  .btn {
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    background: #FFFFFF;
    border-radius: 46rpx;
  }
  .cancel {
     width: 284rpx;
     background-color: #fff;
     color: rgba(0,0,0,0.3);
  }
  .confirm {
    width: 386rpx;
    background-color: $color-title2;
    color: #fff;
  }
}
.record {
  margin: 32rpx;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 22rpx 0;
  .name {
    position: relative;
    padding-left: 28rpx;
    color: #343434;
    font-weight: bold;
    margin-bottom: 40rpx;
    .line {
      position: absolute;
      left: 0;
      top: 10rpx;
      display: inline-block;
      width: 4rpx;
      height: 32rpx;
      background: #00BC7E;
      border-radius: 3rpx;
    }
  }
}
.card {
  padding: 0 24rpx 32rpx 24rpx;
  .avatar {
    width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
    margin-right: 20rpx;
  }
  .user-info {
    flex: 1;
  }
}
</style>
