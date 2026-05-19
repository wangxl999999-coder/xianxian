Page({
  data: {
    pageTitle: '用户协议',
    type: 'user'
  },

  onLoad(options) {
    const type = options.type || 'user'
    this.setData({
      type,
      pageTitle: type === 'user' ? '用户协议' : '隐私政策'
    })
  }
})
