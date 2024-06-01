import validate from '@/common/js/validate.js';
import config from '@/common/js/config.js'
export default {
  data() {
    return {
      indent: 'all',
      memberInfoformData: {
        realName: '',
        nickName: '',
        userHeadImg: '',
        mobile: ''
      },
      formData: {
      	nickName: '', //昵称
      	realName: '', //真实姓名
      },
    }
  },
  filters: {
  	filterMobile(mobile) { 
      if(mobile) return mobile.substring(0, 3) + '****' + mobile.substring(7);
  		else return "";
  	},
  },
  onLoad(option) {
  	if (option.action) {
  		this.indent = option.action;
  		this.setNavbarTitle()
  	}
  	
  	this.isIphoneX = this.$util.uniappIsIPhoneX()
  },
  onShow() {
  	this.getInfo();
  },
  methods: {
    setNavbarTitle(){
    	let title = '个人资料';
    	switch (this.indent) {
    		case 'name':
    			title = '修改昵称';
    			break;
    		case 'realName':
    			title = '真实姓名';
    			break;
    	}
    	uni.setNavigationBarTitle({
    	    title: title
    	});
    },
    // 初始化用户信息
    getInfo() {
    	this.$api.sendRequest({
    		url: '/api/index.user/userInfo',
    		success: res => {
    			if (res.code == 1) {
    				this.memberInfo = res.data;
    				this.memberInfoformData.userHeadImg = this.memberInfo.avatar;
    				this.memberInfoformData.nickName = this.memberInfo.nickname; //昵称
    				this.memberInfoformData.realName = this.memberInfo.username; //真实姓名
    				this.memberInfoformData.mobile = this.memberInfo.mobile; //手机号
    				this.formData.nickName = this.memberInfo.nickname; //昵称
    				this.formData.realName = this.memberInfo.username; //真实姓名
    			}
    			if (this.$refs.loadingCover) this.$refs.loadingCover.hide();
    		},
    		fail: res => {
    			if (this.$refs.loadingCover) this.$refs.loadingCover.hide();
    		}
    	});
    },
    onChooseAvatar(e) {
      const {
        avatarUrl
      } = e.detail;
      var that = this;
      uni.uploadFile({
      	url: config.baseUrl + '/api/common/upload',
      	filePath: avatarUrl,
      	name: 'file',
      	formData: {
          token: uni.getStorageSync('token'),
        },
      	success: function(res) {
      		var path_str = JSON.parse(res.data);
      		if (path_str.code >= 1) {
           var img = path_str.data.url;
           that.saveImg(img)
      		} else {
            that.$util.showToast({title: '上传失败'})
      		}
      	}
      });
    },
    saveImg(imgurl) {
    	this.$api.sendRequest({
    		url: '/api/index.user/userEdit',
    		data: {
    			avatar: imgurl
    		},
    		success: res => {
    			if (res.code == 1) {
            this.getInfo()
    				this.$util.showToast({
    					title: '头像修改成功'
    				});
    			} else {
    				this.$util.showToast({
    					title: res.msg
    				});
    			}
    		}
    	});
    },
    modifyInfo(action) {
    	this.$util.redirectTo('/pages/info_edit/info_edit', { action });
    },
    save(type) {
    	switch (type) {
    		case 'name':
    			this.modifyNickName();
    			break;
    		case 'realName':
    			this.modifyRealName();
    			break;
    	}
    },
    // ------------------------修改昵称------------------------------
    
    modifyNickName() {
    	if (this.formData.nickName == this.memberInfo.nickname) {
    		this.$util.showToast({
    			title: '与原昵称一致，无需修改'
    		});
    		return;
    	}
    	var rule = [{
    		name: 'nickName',
    		checkType: 'required',
    		errorMsg: '昵称不能为空'
    	}];
    	if (!rule.length) return;
    	var checkRes = validate.check(this.formData, rule);
    	if (checkRes) {
    		this.$api.sendRequest({
    			url: '/api/index.user/userEdit',
    			data: {
    				nickname: this.formData.nickName
    			},
    			success: res => {
    				if (res.code == 1) {
    					this.$util.showToast({
    						title: '修改成功'
    					});
    					this.NavReturn();
    				} else {
    					this.$util.showToast({
    						title: res.msg
    					});
    				}
    			}
    		});
    	} else {
    		this.$util.showToast({
    			title: validate.error
    		});
    	}
    },
    // 导航返回
    NavReturn() {
    	uni.navigateBack({
    		delta: 1
    	})
    },
    // ------------------------修改真实姓名------------------------------
    modifyRealName() {
    	if (this.formData.realName == this.memberInfo.realname && this.memberInfo.realname) {
    		this.$util.showToast({
    			title: '与原真实姓名一致，无需修改'
    		});
    		return;
    	}
    	var rule = [{
    		name: 'realName',
    		checkType: 'required',
    		errorMsg: '真实姓名不能为空'
    	}];
    	if (!rule.length) return;
    	var checkRes = validate.check(this.formData, rule);
    	if (checkRes) {
    		this.$api.sendRequest({
    			url: '/api/index.user/userEdit',
    			data: {
    				username: this.formData.realName
    			},
    			success: res => {
    				if (res.code == 1) {
    					this.$util.showToast({
    						title: "修改成功"
    					});
    					this.NavReturn();
    				} else {
    					this.$util.showToast({
    						title: res.msg
    					});
    				}
    			}
    		});
    	} else {
    		this.$util.showToast({
    			title: validate.error
    		});
    	}
    },
  }
}