const { CIRCLE_TYPES } = require('../../utils/constants')

Page({
  data: {
    status: 'all',
    statusOptions: [
      { id: 'all', name: '全部' },
      { id: 1, name: '求购' },
      { id: 2, name: '以物换物' },
      { id: 3, name: '免费赠送' }
    ],
    postList: [],
    loading: false,
    page: 1,
    pageSize: 10,
    hasMore: true
  },

  onLoad() {
    this.loadPostList()
  },

  changeStatus(e) {
    const status = e.currentTarget.dataset.status
    this.setData({ 
      status,
      page: 1,
      postList: [],
      hasMore: true
    })
    this.loadPostList()
  },

  loadPostList() {
    if (this.data.loading || !this.data.hasMore) return

    this.setData({ loading: true })
    wx.showLoading({ title: '加载中...' })

    setTimeout(() => {
      const mockData = []
      for (let i = 0; i < 10; i++) {
        const type = (i % 3) + 1
        const isBanned = Math.random() > 0.9
        mockData.push({
          id: Date.now() + i,
          type: type,
          typeName: CIRCLE_TYPES[type - 1].name,
          title: `帖子标题${this.data.page * 10 + i + 1} - 这是社区帖子内容描述`,
          content: '这是帖子的详细内容，包含用户发布的信息...',
          images: [
            `https://picsum.photos/200/200?random=${4000 + this.data.page * 10 + i}`,
            `https://picsum.photos/200/200?random=${4001 + this.data.page * 10 + i}`
          ],
          authorName: `用户${Math.floor(Math.random() * 100) + 1}`,
          publishTime: '2024-01-' + (Math.floor(Math.random() * 20) + 1),
          viewCount: Math.floor(Math.random() * 500) + 10,
          likeCount: Math.floor(Math.random() * 100),
          commentCount: Math.floor(Math.random() * 50),
          isBanned
        })
      }

      const newList = [...this.data.postList, ...mockData]
      this.setData({
        postList: newList,
        loading: false,
        page: this.data.page + 1,
        hasMore: this.data.page < 5
      })
      wx.hideLoading()
    }, 500)
  },

  onReachBottom() {
    this.loadPostList()
  },

  viewDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '查看帖子 ' + id, icon: 'none' })
  },

  toggleBan(e) {
    const id = e.currentTarget.dataset.id
    const post = this.data.postList.find(item => item.id === id)
    
    wx.showModal({
      title: '提示',
      content: post.isBanned ? '确定要恢复该帖子吗？' : '确定要删除/封禁该帖子吗？',
      success: (res) => {
        if (res.confirm) {
          const postList = this.data.postList.map(item => {
            if (item.id === id) {
              return { ...item, isBanned: !item.isBanned }
            }
            return item
          })
          this.setData({ postList })
          wx.showToast({ 
            title: post.isBanned ? '已恢复' : '已封禁', 
            icon: 'success' 
          })
        }
      }
    })
  }
})
