Page({
  data: {
    orderList: []
  },

  onLoad() {
    this.loadOrderList()
  },

  loadOrderList() {
    wx.showLoading({ title: '加载中...' })
    
    setTimeout(() => {
      const mockData = []
      for (let i = 0; i < 5; i++) {
        mockData.push({
          id: i + 1,
          orderNo: `ORD${Date.now()}${i + 100}`,
          goodsId: i + 200,
          title: `买入的商品${i + 1} - 这是商品标题描述`,
          cover: `https://picsum.photos/200/200?random=${500 + i}`,
          price: (Math.random() * 500 + 50).toFixed(2),
          status: i % 2 + 1,
          statusName: i % 2 === 0 ? '交易完成' : '待评价',
          sellerName: `卖家${i + 1}`,
          sellerPhone: '139****9999',
          dealTime: '2024-01-15',
          isRated: i % 2 === 0
        })
      }
      
      this.setData({ orderList: mockData })
      wx.hideLoading()
    }, 500)
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  goRate(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '评价功能开发中', icon: 'none' })
  },

  contactSeller(e) {
    wx.openCustomerServiceChat({
      extInfo: { url: '' },
      corpId: 'YOUR_CORP_ID',
      fail: () => {
        wx.showToast({ title: '客服功能暂未开放', icon: 'none' })
      }
    })
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' })
  }
})
