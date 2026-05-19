const app = getApp()
const { debounce } = require('../../utils/util')

Page({
  data: {
    keyword: '',
    searchHistory: [],
    hotSearch: ['iPhone', 'Switch', 'AirPods', '自行车', '书架', '沙发'],
    goodsList: [],
    loading: false,
    totalCount: 0
  },

  onLoad() {
    const history = wx.getStorageSync('searchHistory') || []
    this.setData({ searchHistory: history })
  },

  onInput: debounce(function(e) {
    const keyword = e.detail.value.trim()
    this.setData({ keyword })
    if (keyword) {
      this.onSearch()
    }
  }, 500),

  onSearch() {
    const keyword = this.data.keyword.trim()
    if (!keyword) return

    this.saveHistory(keyword)
    this.searchGoods(keyword)
  },

  searchHistoryItem(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({ keyword })
    this.searchGoods(keyword)
  },

  searchGoods(keyword) {
    this.setData({ loading: true })

    setTimeout(() => {
      const mockData = this.generateMockData(keyword)
      this.setData({
        goodsList: mockData,
        totalCount: mockData.length,
        loading: false
      })
    }, 500)
  },

  generateMockData(keyword) {
    const list = []
    for (let i = 0; i < 8; i++) {
      list.push({
        id: Date.now() + i,
        title: `${keyword} - 商品${i + 1}`,
        cover: `https://picsum.photos/200/200?random=${Date.now() + i}`,
        price: (Math.random() * 1000 + 50).toFixed(2),
        distance: `${(Math.random() * 5).toFixed(1)}km`
      })
    }
    return list
  },

  saveHistory(keyword) {
    let history = this.data.searchHistory.filter(item => item !== keyword)
    history.unshift(keyword)
    if (history.length > 10) {
      history = history.slice(0, 10)
    }
    this.setData({ searchHistory: history })
    wx.setStorageSync('searchHistory', history)
  },

  clearKeyword() {
    this.setData({
      keyword: '',
      goodsList: []
    })
  },

  clearHistory() {
    wx.showModal({
      title: '提示',
      content: '确定要清空搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ searchHistory: [] })
          wx.removeStorageSync('searchHistory')
        }
      }
    })
  },

  goBack() {
    wx.navigateBack()
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
