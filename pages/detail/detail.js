const app = getApp()

Page({
  data: {
    goodsId: '',
    goodsInfo: {},
    sellerInfo: {},
    reviewList: [],
    isFavorite: false
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ goodsId: options.id })
      this.loadGoodsDetail()
      this.checkFavorite()
    }
  },

  loadGoodsDetail() {
    wx.showLoading({ title: '加载中...' })
    
    setTimeout(() => {
      const goodsInfo = {
        id: this.data.goodsId,
        title: 'iPhone 13 Pro 256G 蓝色 95新',
        price: '4500.00',
        originalPrice: '7999.00',
        conditionName: '几乎全新',
        categoryName: '数码产品',
        description: '自用iPhone 13 Pro，256G蓝色，一直带壳带膜使用，无划痕无磕碰，电池健康92%，功能一切正常，配件齐全，同城可面交。',
        distance: '1.2km',
        images: [
          'https://picsum.photos/800/800?random=1',
          'https://picsum.photos/800/800?random=2',
          'https://picsum.photos/800/800?random=3'
        ]
      }

      const sellerInfo = {
        id: 1,
        nickname: '小明同学',
        avatar: '',
        creditLevel: 4,
        creditLevelName: '信用极好',
        sellCount: 28,
        goodRate: 98
      }

      const reviewList = [
        {
          id: 1,
          user: { nickname: '买家A', avatar: '' },
          content: '东西很新，卖家很靠谱，面交顺利，推荐！',
          time: '2024-01-15',
          images: ['https://picsum.photos/200/200?random=10']
        },
        {
          id: 2,
          user: { nickname: '买家B', avatar: '' },
          content: '价格实惠，物品描述真实，交易愉快',
          time: '2024-01-10',
          images: []
        }
      ]

      this.setData({ goodsInfo, sellerInfo, reviewList })
      wx.hideLoading()
    }, 500)
  },

  checkFavorite() {
    const favorites = wx.getStorageSync('favorites') || []
    const isFavorite = favorites.includes(this.data.goodsId)
    this.setData({ isFavorite })
  },

  toggleFavorite() {
    const favorites = wx.getStorageSync('favorites') || []
    const goodsId = this.data.goodsId

    if (this.data.isFavorite) {
      const newFavorites = favorites.filter(id => id !== goodsId)
      wx.setStorageSync('favorites', newFavorites)
      this.setData({ isFavorite: false })
      wx.showToast({ title: '已取消收藏', icon: 'none' })
    } else {
      favorites.push(goodsId)
      wx.setStorageSync('favorites', favorites)
      this.setData({ isFavorite: true })
      wx.showToast({ title: '收藏成功', icon: 'success' })
    }
  },

  contactService() {
    wx.openCustomerServiceChat({
      extInfo: { url: '' },
      corpId: 'YOUR_CORP_ID',
      success: () => {
        console.log('打开客服会话成功')
      },
      fail: (err) => {
        wx.showToast({ title: '客服功能暂未开放', icon: 'none' })
      }
    })
  },

  showReport() {
    wx.navigateTo({
      url: `/pages/report/report?id=${this.data.goodsId}&type=goods`
    })
  },

  goSellerHome() {
    wx.showToast({ title: '卖家主页功能开发中', icon: 'none' })
  },

  buyNow() {
    wx.showModal({
      title: '交易提示',
      content: '建议线下当面交易，一手交钱一手交货，确认物品无误后再付款。是否联系卖家？',
      confirmText: '联系卖家',
      success: (res) => {
        if (res.confirm) {
          this.contactService()
        }
      }
    })
  }
})
