Page({
  data: {
    goodsList: []
  },

  onLoad() {
    this.loadGoodsList()
  },

  onShow() {
    this.loadGoodsList()
  },

  loadGoodsList() {
    wx.showLoading({ title: '加载中...' })
    
    setTimeout(() => {
      const mockData = []
      for (let i = 0; i < 5; i++) {
        const status = i % 3 + 1
        mockData.push({
          id: i + 1,
          title: `闲置物品${i + 1} - 这是商品标题描述`,
          cover: `https://picsum.photos/200/200?random=${300 + i}`,
          price: (Math.random() * 500 + 50).toFixed(2),
          status: status,
          statusName: status === 1 ? '出售中' : status === 2 ? '已卖出' : '已下架',
          publishTime: '2024-01-15',
          viewCount: Math.floor(Math.random() * 100) + 10
        })
      }
      
      this.setData({ goodsList: mockData })
      wx.hideLoading()
    }, 500)
  },

  editGoods(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '编辑功能开发中', icon: 'none' })
  },

  deleteGoods(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要删除这个发布吗？',
      success: (res) => {
        if (res.confirm) {
          const goodsList = this.data.goodsList.filter(item => item.id !== id)
          this.setData({ goodsList })
          wx.showToast({ title: '删除成功', icon: 'success' })
        }
      }
    })
  },

  markSold(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要标记为已卖出吗？',
      success: (res) => {
        if (res.confirm) {
          const goodsList = this.data.goodsList.map(item => {
            if (item.id === id) {
              return { ...item, status: 2, statusName: '已卖出' }
            }
            return item
          })
          this.setData({ goodsList })
          wx.showToast({ title: '标记成功', icon: 'success' })
        }
      }
    })
  },

  goPublish() {
    wx.switchTab({ url: '/pages/publish/publish' })
  }
})
