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
          orderNo: `ORD${Date.now()}${i}`,
          goodsId: i + 100,
          title: `卖出的商品${i + 1} - 这是商品标题描述`,
          cover: `https://picsum.photos/200/200?random=${400 + i}`,
          price: (Math.random() * 500 + 50).toFixed(2),
          status: i % 2 + 1,
          statusName: i % 2 === 0 ? '交易完成' : '待评价',
          buyerName: `买家${i + 1}`,
          buyerPhone: '138****8888',
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
  }
})
