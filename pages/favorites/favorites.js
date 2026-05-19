Page({
  data: {
    favoritesList: []
  },

  onShow() {
    this.loadFavorites()
  },

  loadFavorites() {
    wx.showLoading({ title: '加载中...' })
    
    setTimeout(() => {
      const mockData = []
      for (let i = 0; i < 5; i++) {
        mockData.push({
          id: (i + 1).toString(),
          title: `收藏的商品${i + 1} - 这是一个很长的商品标题用来测试`,
          cover: `https://picsum.photos/200/200?random=${100 + i}`,
          price: (Math.random() * 1000 + 50).toFixed(2),
          originalPrice: (Math.random() * 2000 + 100).toFixed(2),
          distance: `${(Math.random() * 5).toFixed(1)}km`
        })
      }
      
      this.setData({ favoritesList: mockData })
      wx.hideLoading()
    }, 500)
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  deleteFavorite(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要取消收藏吗？',
      success: (res) => {
        if (res.confirm) {
          const favoritesList = this.data.favoritesList.filter(item => item.id !== id)
          this.setData({ favoritesList })
          wx.showToast({ title: '已取消收藏', icon: 'none' })
        }
      }
    })
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' })
  }
})
