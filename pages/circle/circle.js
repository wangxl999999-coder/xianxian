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
    this.getLocation()
    this.loadCommunityList()
    this.loadPostList()
  },

  onShow() {
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
    const index = e.currentTarget.dataset.index
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
    this.setData({ communityList: mockData })
  },

  loadPostList() {
    const mockData = []
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
        images: i % 2 === 0 ? [
          `https://picsum.photos/200/200?random=${200 + i}`,
          `https://picsum.photos/200/200?random=${201 + i}`
        ] : [],
        commentCount: Math.floor(Math.random() * 20),
        likeCount: Math.floor(Math.random() * 50),
        communityName: `阳光花园小区`
      })
    }
    this.setData({ postList: mockData })
  },

  goPublish() {
    wx.navigateTo({ url: '/pages/circlePublish/circlePublish' })
  }
})
