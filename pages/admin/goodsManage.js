const { GOODS_STATUS } = require('../../utils/constants')

Page({
  data: {
    status: 'all',
    statusOptions: [
      { id: 'all', name: '全部' },
      { id: 1, name: '出售中' },
      { id: 2, name: '已卖出' },
      { id: 3, name: '已下架' },
      { id: 4, name: '被举报' },
      { id: 5, name: '已封禁' }
    ],
    goodsList: [],
    loading: false,
    page: 1,
    pageSize: 10,
    hasMore: true
  },

  onLoad() {
    this.loadGoodsList()
  },

  changeStatus(e) {
    const status = e.currentTarget.dataset.status
    this.setData({ 
      status,
      page: 1,
      goodsList: [],
      hasMore: true
    })
    this.loadGoodsList()
  },

  loadGoodsList() {
    if (this.data.loading || !this.data.hasMore) return

    this.setData({ loading: true })
    wx.showLoading({ title: '加载中...' })

    setTimeout(() => {
      const mockData = []
      for (let i = 0; i < 10; i++) {
        const status = (i % 5) + 1
        const isReported = i < 3
        mockData.push({
          id: Date.now() + i,
          title: `闲置物品${this.data.page * 10 + i + 1} - 这是商品标题描述`,
          cover: `https://picsum.photos/200/200?random=${1000 + this.data.page * 10 + i}`,
          price: (Math.random() * 500 + 50).toFixed(2),
          status: status,
          statusName: ['出售中', '已卖出', '已下架', '被举报', '已封禁'][status - 1],
          viewCount: Math.floor(Math.random() * 500) + 10,
          sellerName: `用户${Math.floor(Math.random() * 100) + 1}`,
          publishTime: '2024-01-' + (Math.floor(Math.random() * 20) + 1),
          isReported,
          reportCount: isReported ? Math.floor(Math.random() * 5) + 1 : 0
        })
      }

      const newList = [...this.data.goodsList, ...mockData]
      this.setData({
        goodsList: newList,
        loading: false,
        page: this.data.page + 1,
        hasMore: this.data.page < 5
      })
      wx.hideLoading()
    }, 500)
  },

  onReachBottom() {
    this.loadGoodsList()
  },

  viewDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '查看详情 ' + id, icon: 'none' })
  },

  takeOff(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要下架该商品吗？',
      success: (res) => {
        if (res.confirm) {
          const goodsList = this.data.goodsList.map(item => {
            if (item.id === id) {
              return { ...item, status: 3, statusName: '已下架' }
            }
            return item
          })
          this.setData({ goodsList })
          wx.showToast({ title: '下架成功', icon: 'success' })
        }
      }
    })
  },

  deleteGoods(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要删除该商品吗？此操作不可恢复。',
      success: (res) => {
        if (res.confirm) {
          const goodsList = this.data.goodsList.filter(item => item.id !== id)
          this.setData({ goodsList })
          wx.showToast({ title: '删除成功', icon: 'success' })
        }
      }
    })
  },

  restore(e) {
    const id = e.currentTarget.dataset.id
    const goodsList = this.data.goodsList.map(item => {
      if (item.id === id) {
        return { ...item, status: 1, statusName: '出售中' }
      }
      return item
    })
    this.setData({ goodsList })
    wx.showToast({ title: '恢复成功', icon: 'success' })
  }
})
