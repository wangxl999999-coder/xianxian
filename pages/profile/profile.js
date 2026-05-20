const app = getApp()

Page({
  data: {
    userInfo: {},
    isAdmin: true
  },

  onLoad() {
    this.loadUserInfo()
  },

  onShow() {
    this.loadUserInfo()
  },

  loadUserInfo() {
    const userInfo = {
      nickname: '小明同学',
      avatar: '',
      creditLevel: 4,
      creditLevelName: '信用极好',
      creditScore: 92,
      tradeCount: 28,
      isVerified: true,
      isPhoneBound: true
    }
    this.setData({ userInfo })
  },

  goEdit() {
    wx.showToast({ title: '编辑资料功能开发中', icon: 'none' })
  },

  goMyPublish() {
    wx.navigateTo({ url: '/pages/myPublish/myPublish' })
  },

  goMySold() {
    wx.navigateTo({ url: '/pages/mySold/mySold' })
  },

  goMyBought() {
    wx.navigateTo({ url: '/pages/myBought/myBought' })
  },

  goFavorites() {
    wx.navigateTo({ url: '/pages/favorites/favorites' })
  },

  goAddress() {
    wx.navigateTo({ url: '/pages/address/address' })
  },

  goVerify() {
    if (this.data.userInfo.isVerified) {
      wx.showToast({ title: '已完成实名认证', icon: 'success' })
      return
    }
    wx.showToast({ title: '实名认证功能开发中', icon: 'none' })
  },

  goBindPhone() {
    if (this.data.userInfo.isPhoneBound) {
      wx.showToast({ title: '已绑定手机号', icon: 'success' })
      return
    }
    wx.showToast({ title: '绑定手机功能开发中', icon: 'none' })
  },

  goAgreement() {
    wx.navigateTo({ url: '/pages/agreement/agreement?type=user' })
  },

  goPrivacy() {
    wx.navigateTo({ url: '/pages/agreement/agreement?type=privacy' })
  },

  contactService() {
    wx.openCustomerServiceChat({
      extInfo: { url: '' },
      corpId: 'YOUR_CORP_ID',
      fail: () => {
        wx.showToast({ title: '客服功能暂未开放', icon: 'none' })
      }
    })
  },

  goAdmin() {
    wx.navigateTo({ url: '/pages/admin/index' })
  },

  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('token')
          wx.removeStorageSync('userInfo')
          app.globalData.userInfo = null
          app.globalData.token = ''
          app.globalData.isLogin = false
          
          wx.showToast({ title: '已退出登录', icon: 'success' })
          
          setTimeout(() => {
            wx.reLaunch({ url: '/pages/login/login' })
          }, 1500)
        }
      }
    })
  }
})
