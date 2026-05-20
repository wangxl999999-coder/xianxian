Page({
  data: {
    userList: [],
    loading: false,
    page: 1,
    pageSize: 10,
    hasMore: true
  },

  onLoad() {
    this.loadUserList()
  },

  loadUserList() {
    if (this.data.loading || !this.data.hasMore) return

    this.setData({ loading: true })
    wx.showLoading({ title: '加载中...' })

    setTimeout(() => {
      const mockData = []
      for (let i = 0; i < 10; i++) {
        const isVerified = Math.random() > 0.3
        const isBanned = Math.random() > 0.9
        const creditLevel = Math.floor(Math.random() * 4) + 1
        mockData.push({
          id: Date.now() + i,
          avatar: `https://picsum.photos/100/100?random=${3000 + this.data.page * 10 + i}`,
          nickname: `用户${this.data.page * 10 + i + 1}`,
          phone: '138****' + Math.floor(Math.random() * 9000 + 1000),
          registerTime: '2023-' + (Math.floor(Math.random() * 12) + 1) + '-' + (Math.floor(Math.random() * 28) + 1),
          creditLevel: creditLevel,
          creditLevelName: ['信用一般', '信用良好', '信用优秀', '信用极好'][creditLevel - 1],
          publishCount: Math.floor(Math.random() * 50) + 1,
          tradeCount: Math.floor(Math.random() * 30) + 1,
          isVerified,
          isBanned
        })
      }

      const newList = [...this.data.userList, ...mockData]
      this.setData({
        userList: newList,
        loading: false,
        page: this.data.page + 1,
        hasMore: this.data.page < 5
      })
      wx.hideLoading()
    }, 500)
  },

  onReachBottom() {
    this.loadUserList()
  },

  viewUser(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '查看用户 ' + id, icon: 'none' })
  },

  toggleBan(e) {
    const id = e.currentTarget.dataset.id
    const user = this.data.userList.find(item => item.id === id)
    
    wx.showModal({
      title: '提示',
      content: user.isBanned ? '确定要解封该用户吗？' : '确定要封禁该用户吗？',
      success: (res) => {
        if (res.confirm) {
          const userList = this.data.userList.map(item => {
            if (item.id === id) {
              return { ...item, isBanned: !item.isBanned }
            }
            return item
          })
          this.setData({ userList })
          wx.showToast({ 
            title: user.isBanned ? '已解封' : '已封禁', 
            icon: 'success' 
          })
        }
      }
    })
  }
})
