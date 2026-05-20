Page({
  data: {
    stats: {
      totalGoods: 1256,
      todayGoods: 48,
      totalUsers: 892,
      todayUsers: 15,
      totalTrades: 368,
      todayTrades: 12,
      pendingReports: 8
    },
    menuList: [
      { id: 'dashboard', name: '数据看板', icon: '📊', color: '#1890FF' },
      { id: 'goods', name: '物品管理', icon: '📦', color: '#52C41A' },
      { id: 'users', name: '用户管理', icon: '👥', color: '#FA8C16' },
      { id: 'posts', name: '帖子管理', icon: '💬', color: '#722ED1' },
      { id: 'reports', name: '举报审核', icon: '⚠️', color: '#FF4D4F', badge: 8 },
      { id: 'admins', name: '管理员', icon: '🔐', color: '#13C2C2' }
    ]
  },

  onLoad() {
    this.loadStats()
  },

  loadStats() {
    wx.showLoading({ title: '加载中...' })
    setTimeout(() => {
      wx.hideLoading()
    }, 500)
  },

  goPage(e) {
    const page = e.currentTarget.dataset.page
    const pageMap = {
      'dashboard': '/pages/admin/dashboard',
      'goods': '/pages/admin/goodsManage',
      'users': '/pages/admin/userManage',
      'posts': '/pages/admin/postManage',
      'reports': '/pages/admin/reportManage',
      'admins': '/pages/admin/adminManage'
    }
    if (pageMap[page]) {
      wx.navigateTo({ url: pageMap[page] })
    }
  },

  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出管理后台吗？',
      success: (res) => {
        if (res.confirm) {
          wx.navigateBack()
        }
      }
    })
  }
})
