const app = getApp()

Page({
  data: {
    agreed: false,
    showAuthModal: false,
    isVerified: false,
    isPhoneBound: false
  },

  onLoad(options) {
    if (app.globalData.isLogin) {
      wx.switchTab({ url: '/pages/index/index' })
    }
  },

  onAgreementChange(e) {
    this.setData({
      agreed: e.detail.value.includes('agree')
    })
  },

  onWechatLogin(e) {
    if (!this.data.agreed) {
      wx.showToast({ title: '请先同意用户协议', icon: 'none' })
      return
    }

    wx.showLoading({ title: '登录中...' })
    
    app.login((err, userInfo) => {
      wx.hideLoading()
      if (err) {
        wx.showToast({ title: err, icon: 'none' })
        return
      }
      
      this.setData({
        showAuthModal: true,
        isVerified: userInfo.isVerified || false,
        isPhoneBound: userInfo.isPhoneBound || false
      })
    })
  },

  goVerify() {
    wx.showToast({ title: '请先进行实名认证', icon: 'none' })
  },

  getPhoneNumber(e) {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      wx.showLoading({ title: '绑定中...' })
      app.request({
        url: '/api/bind-phone',
        method: 'POST',
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        },
        success: () => {
          wx.hideLoading()
          this.setData({ isPhoneBound: true })
          wx.showToast({ title: '绑定成功', icon: 'success' })
        },
        fail: () => {
          wx.hideLoading()
        }
      })
    }
  },

  closeModal() {
    this.setData({ showAuthModal: false })
    wx.switchTab({ url: '/pages/index/index' })
  },

  skipAuth() {
    this.setData({ showAuthModal: false })
    wx.switchTab({ url: '/pages/index/index' })
  },

  confirmAuth() {
    this.setData({ showAuthModal: false })
    wx.switchTab({ url: '/pages/index/index' })
  },

  stopPropagation() {},

  showAgreement() {
    wx.navigateTo({ url: '/pages/agreement/agreement?type=user' })
  },

  showPrivacy() {
    wx.navigateTo({ url: '/pages/agreement/agreement?type=privacy' })
  }
})
