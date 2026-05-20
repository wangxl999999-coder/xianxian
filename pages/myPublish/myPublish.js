const { TOP_DURATION_OPTIONS } = require('../../utils/constants')

Page({
  data: {
    goodsList: [],
    showTopModal: false,
    topOptions: TOP_DURATION_OPTIONS,
    currentGoodsId: null
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
        const isPolished = i === 1
        const isTop = i === 0
        mockData.push({
          id: i + 1,
          title: `闲置物品${i + 1} - 这是商品标题描述`,
          cover: `https://picsum.photos/200/200?random=${300 + i}`,
          price: (Math.random() * 500 + 50).toFixed(2),
          status: status,
          statusName: status === 1 ? '出售中' : status === 2 ? '已卖出' : '已下架',
          publishTime: '2024-01-15',
          viewCount: Math.floor(Math.random() * 100) + 10,
          isPolished,
          lastPolishTime: isPolished ? '2024-01-19 10:30' : null,
          canPolish: !isPolished,
          isTop,
          topExpireTime: isTop ? '2024-01-20 18:00' : null
        })
      }
      
      this.setData({ goodsList: mockData })
      wx.hideLoading()
    }, 500)
  },

  polishGoods(e) {
    const id = e.currentTarget.dataset.id
    const goods = this.data.goodsList.find(item => item.id === id)
    
    if (!goods.canPolish) {
      wx.showToast({ title: '今天已擦亮过，明天再来吧~', icon: 'none' })
      return
    }

    wx.showModal({
      title: '一键擦亮',
      content: '擦亮后商品将重新曝光，获得更多浏览量。确定要擦亮吗？',
      success: (res) => {
        if (res.confirm) {
          const goodsList = this.data.goodsList.map(item => {
            if (item.id === id) {
              return { 
                ...item, 
                isPolished: true, 
                canPolish: false,
                lastPolishTime: new Date().toLocaleString()
              }
            }
            return item
          })
          this.setData({ goodsList })
          wx.showToast({ title: '✨擦亮成功！', icon: 'success' })
        }
      }
    })
  },

  showTopModal(e) {
    const id = e.currentTarget.dataset.id
    this.setData({ 
      showTopModal: true,
      currentGoodsId: id
    })
  },

  hideTopModal() {
    this.setData({ showTopModal: false })
  },

  selectTopDuration(e) {
    const duration = e.currentTarget.dataset.duration
    const price = e.currentTarget.dataset.price
    
    wx.showModal({
      title: '确认置顶',
      content: `支付 ¥${price}，将商品置顶${duration}小时，获得更多曝光机会`,
      confirmText: `支付¥${price}`,
      success: (res) => {
        if (res.confirm) {
          const goodsList = this.data.goodsList.map(item => {
            if (item.id === this.data.currentGoodsId) {
              return { 
                ...item, 
                isTop: true,
                topExpireTime: this.getExpireTime(duration)
              }
            }
            return item
          })
          this.setData({ goodsList, showTopModal: false })
          wx.showToast({ title: '置顶成功！', icon: 'success' })
        }
      }
    })
  },

  getExpireTime(hours) {
    const date = new Date()
    date.setHours(date.getHours() + hours)
    return date.toLocaleString()
  },

  stopPropagation() {
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
