Page({
  data: {
    dateRange: '今日',
    totalStats: {
      goods: 1256,
      users: 892,
      trades: 368,
      reports: 156
    },
    todayStats: {
      goods: 48,
      users: 15,
      trades: 12,
      reports: 8
    },
    chartData: [
      { date: '1/15', goods: 52, trades: 8 },
      { date: '1/16', goods: 45, trades: 12 },
      { date: '1/17', goods: 68, trades: 15 },
      { date: '1/18', goods: 38, trades: 9 },
      { date: '1/19', goods: 55, trades: 11 },
      { date: '1/20', goods: 48, trades: 12 },
      { date: '1/21', goods: 42, trades: 10 }
    ],
    categoryStats: [
      { name: '数码产品', count: 328, percent: 26 },
      { name: '服饰鞋包', count: 256, percent: 20 },
      { name: '家居用品', count: 198, percent: 16 },
      { name: '母婴用品', count: 156, percent: 12 },
      { name: '美妆护肤', count: 132, percent: 11 },
      { name: '其他', count: 186, percent: 15 }
    ]
  },

  onLoad() {
    this.loadData()
  },

  loadData() {
    wx.showLoading({ title: '加载中...' })
    setTimeout(() => {
      wx.hideLoading()
    }, 500)
  },

  changeDateRange(e) {
    const range = e.currentTarget.dataset.range
    this.setData({ dateRange: range })
    wx.showToast({ title: `切换到${range}`, icon: 'none' })
  }
})
