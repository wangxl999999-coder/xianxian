const { CIRCLE_TYPES } = require('../../utils/constants')
const app = getApp()

Page({
  data: {
    currentTab: 0,
    location: '',
    communityList: [],
    postList: []
  },

  onLoad() {
    console.log('circle page onLoad')
    this.getLocation()
    this.loadCommunityList()
    this.loadPostList()
  },

  onShow() {
    console.log('circle page onShow')
    this.loadPostList()
  },

  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        app.globalData.location = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        this.setData({
          location: '当前位置附近'
        })
      },
      fail: () => {
        this.setData({ location: '定位失败' })
      }
    })
  },

  refreshLocation() {
    this.setData({ location: '定位中...' })
    this.getLocation()
  },

  switchTab(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    console.log('switchTab to:', index)
    this.setData({ currentTab: index })
  },

  loadCommunityList() {
    const mockData = []
    for (let i = 0; i < 10; i++) {
      mockData.push({
        id: i + 1,
        name: `阳光花园小区${i + 1}号楼`,
        userCount: Math.floor(Math.random() * 200) + 50,
        postCount: Math.floor(Math.random() * 50) + 10,
        distance: `${(Math.random() * 2).toFixed(1)}km`
      })
    }
    console.log('communityList:', mockData)
    this.setData({ communityList: mockData })
  },

  loadPostList() {
    const mockData = []
    try {
      for (let i = 0; i < 10; i++) {
        const typeIndex = i % 3
        mockData.push({
          id: i + 1,
          user: {
            nickname: `用户${i + 1}`,
            avatar: ''
          },
          type: CIRCLE_TYPES[typeIndex].id,
          typeName: CIRCLE_TYPES[typeIndex].name,
          typeColor: CIRCLE_TYPES[typeIndex].color,
          content: `这是一条${CIRCLE_TYPES[typeIndex].name}动态，内容非常丰富，希望有人能看到联系我。`,
          time: `${Math.floor(Math.random() * 24)}小时前`,
          images: i % 2 === 0 ? [] : [],
          commentCount: Math.floor(Math.random() * 20),
          likeCount: Math.floor(Math.random() * 50),
          communityName: `阳光花园小区`
        })
      }
      console.log('postList:', mockData)
      this.setData({ postList: mockData })
    } catch (error) {
      console.error('loadPostList error:', error)
    }
  },

  goPublish() {
    wx.navigateTo({ url: '/pages/circlePublish/circlePublish' })
  },

  onPullDownRefresh() {
    console.log('onPullDownRefresh')
    if (this.data.currentTab === 0) {
      this.loadCommunityList()
    } else {
      this.loadPostList()
    }
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  }
})
