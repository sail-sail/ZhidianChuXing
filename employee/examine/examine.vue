<template>
  <view class="container">
    
    <view class="row">
      <text>车辆里程:</text>
      <view class="acea-row row-middle">
        <input type="text"   v-model="form.mileage">
        <text class="m-l-10">KM</text>
      </view>
    </view>
    <view class="row">
      <text>剩余油量:</text>
      <view class="acea-row row-middle">
        <input type="text"   v-model="form.oil_num">
        <text class="m-l-10">L</text>
      </view>
    </view>
    <view class="row">
      <text>交付电量:</text>
      <view class="acea-row row-middle">
        <input type="text"   v-model="form.quantity">
        <text class="m-l-10">%</text>
      </view>
    </view>
    
    <view class="uploadCon">
      <view class="m-b-24">车辆瑕疵图片</view>
      <view class="upload">
       <u-upload
       		:fileList="fileList1"
       		@afterRead="afterRead"
       		@delete="deletePic"
       		name="1"
       		multiple
       		:maxCount="5"
          :previewFullImage="true"
       	></u-upload>
      </view>
     <!-- <view class="upload" v-else>
        <image :src="item" mode="" v-for="(item,index) in fileList1" class="img" @click="previewImage(item,index)"></image>
      </view> -->
    </view>
    
    <view class="uploadCon">
      <view class="m-b-24">车辆环绕一周视频</view>
      <!-- <view class="upload">
        <u-upload
        	:fileList="fileList2"
        	@afterRead="afterRead"
        	@delete="deletePic"
        	name="2"
        	multiple
        	:maxCount="1"
        	accept="video"
          :previewFullImage="true"
        ></u-upload>
      </view> -->
     <!-- <view class="upload" >
        <video :src="$util.img(video)" objectFit="fill" class="video"></video>
      </view> -->
      <view class="upload">
        <image src="../../static/36.png" class="video" mode=""  @click="uploadvideo" v-if="!video"></image>
        <view  class="imgbox" v-else>
        	<video :src="$util.img(video)" class="video" mode="" objectFit="fill"></video>
        	<view class="deleicon" @click="deletevideo">
        		<u-icon name="close-circle-fill" color="#333" size="40rpx"></u-icon>
        	</view>
        </view>
      </view>
     
      
    </view>
    
    <view class="footer">
      <button type="primary" @click="submit()">保存</button>
    </view>
    
  </view>
</template>

<script>
  import config from '@/common/js/config.js'
  export default {
    data() {
      return {
        form: {
          mileage: '',
          oil_num: '',
          quantity: ''
        },
        fileList1: [],
        fileList2: [],
        id: '',
        edit: 0, //0提交  1查看详情
        video: '',
        type: '', //验收类型　'取车','还车'
      }
    },
    onLoad(option) {
      this.id = option.id;
      this.type = option.type;
      this.edit = option.edit;
      if(this.edit == 1) this.getOrderDetail();
    },
    methods: {
      //订单详情
      getOrderDetail() {
        this.$api.sendRequest({
          url: '/api/sale/Index/orderDetails',
          data: {id: this.id},
          success: res => {
            if(res.code == 1 && res.data) {
             var mileage = '',oil_num='',quantity='',video='',images=[];
             let result = res.data.order_checkaccept;
             result.forEach((v,k) => {
               if(v.type == this.type) {
                 mileage = v.mileage;
                 oil_num = v.oil_num;
                 quantity = v.quantity;
                 video = v.video_image;
                 images = v.images;
               }
             })
             this.form.mileage = mileage;
             this.form.oil_num = oil_num;
             this.form.quantity = quantity;
             this.video = video;
             if(images.length) {
               images.forEach((v,k) => {
                 var img = this.$util.img(v);
                this.fileList1.push({
                  url: img,
                  half_url: v
                })
               })
             }
            }else {
              this.$util.showToast({title: res.msg})
            }
          }
        })
      },
      //预览图片
      previewImage(item,index) {
        uni.previewImage({
          current: index,
          urls: this.fileList1
        })
      },
      // 上传视频
      uploadvideo(){
      	var that = this;
      	uni.chooseMedia({
      	  count: 1,
      	  mediaType: ['video'],
      	  sourceType: ['camera','album'],
      	  maxDuration: 30,
      	  // camera: 'back',
      	  success(res) {
      			that.upload_file_server(res.tempFiles[0].tempFilePath).then(res=>{
      					that.video = res;
      			})
      	  }
      	})
      },
      //上传
      upload_file_server(tempFilePath) {
      	var uploadUrl = config.baseUrl + '/api/common/upload'
      	return new Promise((resolve, reject) => {
      		uni.uploadFile({
      			url: uploadUrl,
      			filePath: tempFilePath,
      			name: 'file',
      			formData: {
              token: uni.getStorageSync('token')
            },
      			success: function(res) {
              console.log('999',res)
      				var path_str = JSON.parse(res.data);
      				if (path_str.code >= 1) {
      					resolve(path_str.data.url);
      				} else {
      					reject("error");
      				}
      			}
      		});
      
      	});
      
      },
      // 删除视频
      deletevideo(){
      	this.video='';
      },
      // 提交数据
      submit() {
        if(!this.form.mileage) {
          this.$util.showToast({title: '请填写车辆里程'});
          return
        }
        if(!this.form.oil_num) {
          this.$util.showToast({title: '请填写车剩余油量'});
          return
        }
        let images = [];
        if(this.fileList1.length) {
          this.fileList1.forEach((v,k) => {
            images.push(v.half_url)
          })
          images = images.join(',')
        }
        this.$api.sendRequest({
          url: '/api/sale/Index/orderCheckaccept',
          data: {
            order_id: this.id,
            type: this.type,
            mileage: this.form.mileage,
            oil_num: this.form.oil_num,
            quantity: this.form.quantity,
            images: this.fileList1.length?images:'',
            video_image: this.video?this.video:''
          },
          success: res => {
            if(res.code == 1) {
              this.$util.showToast({title: '验车成功'});
              setTimeout(function() {
                uni.navigateBack({
                  delta:1
                })
              },1000)
            }else {
              this.$util.showToast({title: res.msg});
            }
          }
        })
      },
      // 删除图片
      			deletePic(event) {
      				this[`fileList${event.name}`].splice(event.index, 1)
      			},
      			// 新增图片
      			async afterRead(event) {
              console.log(event)
      				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      				let lists = [].concat(event.file)
      				let fileListLen = this[`fileList${event.name}`].length
      				lists.map((item) => {
      					this[`fileList${event.name}`].push({
      						...item,
      						status: 'uploading',
      						message: '上传中'
      					})
      				})
      				for (let i = 0; i < lists.length; i++) {
      					const result = await this.uploadFilePromise(lists[i].url)
      					let item = this[`fileList${event.name}`][fileListLen]
      					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
      						status: 'success',
      						message: '',
      						url: result.fullurl,
                  half_url: result.url
      					}))
      					fileListLen++
      				}
      			},
      			uploadFilePromise(url) {
      				return new Promise((resolve, reject) => {
      					let a = uni.uploadFile({
      						url: config.baseUrl + '/api/common/upload', // 仅为示例，非真实的接口地址
      						filePath: url,
      						name: 'file',
      						formData: {
                    token: uni.getStorageSync('token')
                  },
      						success: (res) => {
                    let data = JSON.parse(res.data);
      							setTimeout(() => {
      								resolve(data.data)
      							}, 1000)
      						}
      					});
      				})
      			},
    }
  }
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20rpx;
  padding-bottom: 20rpx;
}
.row {
  display: flex;
  justify-content: space-between;
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 24rpx;
  margin: 0 32rpx 24rpx;
  color: #323232;
  input {
    text-align: right;
  }
  text {
    color: #323232;
  }
  .placeholder {
    color: #9A9A9A;
  }
}
.uploadCon {
  padding: 24rpx;
  background: #FFFFFF;
  border-radius: 16rpx;
  margin: 0 32rpx 24rpx;
  view {color: #323232;}
  .upload {
    .img {
      width: 160rpx;
      height: 160rpx;
      background: #F6F6F6;
      margin-right: 20rpx;
    }
    .video {
      width: 160rpx;
      height: 160rpx;
      object-fit: fill;
    }
    .imgbox {
       position: relative;
       width: 160rpx;
       height: 160rpx;
      .video {
        width: 160rpx;
        height: 160rpx;
        object-fit: fill;
      }
      .deleicon{
      	position: absolute;
      	right: -10rpx;
      	top: -3rpx;
      	width: 40rpx;
      	height: 40rpx;
      	border-radius: 50%;
      	text-align: center;
        z-index: 99;
      }
    }
  }
}
.footer {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin: 10% 28rpx 0;
  button {
    margin: 0;
    width: 100%;
    background: $color-title2;
    border-radius: 8rpx;
    color: #fff;
  }
}
</style>
