const app = getApp()
const { CATEGORIES } = require('../../utils/constants')
const { calculateDistance, getRelativeTime } = require('../../utils/util')

Page({
  data: {
    categories: CATEGORIES,
    currentCategory: 0,
    sortType: 'time',
    goodsList: [],
    loading: false,
    page: 1,
    pageSize: 10,
    hasMore: true
  },

  onLoad() {
    this.loadGoodsList()
  },

  onShow() {
    if (app.globalData.isLogin) {
      this.loadGoodsList(true)
    }
  },

  onPullDownRefresh() {
    this.loadGoodsList(true, () => {
      wx.stopPullDownRefresh()
    })
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadGoodsList()
    }
  },

  loadGoodsList(refresh = false, callback) {
    if (refresh) {
      this.setData({
        page: 1,
        goodsList: [],
        hasMore: true
      })
    }

    if (this.data.loading || !this.data.hasMore) return

    this.setData({ loading: true })

    const params = {
      page: this.data.page,
      pageSize: this.data.pageSize,
      categoryId: this.data.currentCategory || undefined,
      sortType: this.data.sortType
    }

    if (app.globalData.location) {
      params.latitude = app.globalData.location.latitude
      params.longitude = app.globalData.location.longitude
    }

    setTimeout(() => {
      const mockData = this.generateMockData()
      const newList = refresh ? mockData : [...this.data.goodsList, ...mockData]
      
      this.setData({
        goodsList: newList,
        loading: false,
        page: this.data.page + 1,
        hasMore: mockData.length === this.data.pageSize
      })

      callback && callback()
    }, 500)
  },

  generateMockData() {
    const conditions = ['全新', '几乎全新', '轻微使用', '明显使用', '有瑕疵']
    const titles = [
      'iPhone 13 Pro 256G 蓝色',
      '小米空气净化器 Pro H',
      'Nike Air Max 运动鞋 42码',
      '宜家 KALLAX 书架 白色',
      '戴森 V10 吸尘器',
      'MacBook Pro 14寸 M1 Pro',
      'Sony WH-1000XM4 降噪耳机',
      'iPad Pro 11寸 2021款',
      'Switch OLED 白色',
      '飞利浦电动牙刷'
    ]
    
    const list = []
    for (let i = 0; i < 10; i++) {
      const distance = Math.random() * 5
      const price = Math.floor(Math.random() * 5000) + 100
      const originalPrice = Math.floor(price * 1.5)
      
      list.push({
        id: Date.now() + i,
        title: titles[i % titles.length],
        cover: `https://picsum.photos/200/200?random=${Date.now() + i}`,
        price: price.toFixed(2),
        originalPrice: originalPrice.toFixed(2),
        condition: (i % 5) + 1,
        conditionName: conditions[i % conditions.length],
        distance: distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`,
        publishTime: Date.now() - i * 3600000,
        seller: {
          id: i + 1,
          nickname: `用户${i + 1}`,
          avatar: '',
          creditLevel: Math.floor(Math.random() * 4) + 1,
          creditLevelName: ['信用一般', '信用良好', '信用优秀', '信用极好'][Math.floor(Math.random() * 4)],
          sellCount: Math.floor(Math.random() * 50)
        }
      })
    }
    return list
  },

  selectCategory(e) {
    const categoryId = e.currentTarget.dataset.id
    this.setData({
      currentCategory: categoryId
    })
    this.loadGoodsList(true)
  },

  changeSort(e) {
    const sortType = e.currentTarget.dataset.type
    this.setData({ sortType })
    this.loadGoodsList(true)
  },

  goSearch() {
    wx.navigateTo({ url: '/pages/search/search' })
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
