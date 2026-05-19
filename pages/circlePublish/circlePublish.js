const { CIRCLE_TYPES, checkSensitiveWords } = require('../../utils/util')

Page({
  data: {
    types: [
      { id: 1, name: '求购', color: '#FF6B35' },
      { id: 2, name: '以物换物', color: '#52c41a' },
      { id: 3, name: '免费赠送', color: '#1890ff' }
    ],
    currentType: 1,
    content: '',
    imageList: [],
    selectedCommunity: ''
  },

  onLoad() {
    this.setData({ selectedCommunity: '阳光花园小区' })
  },

  selectType(e) {
    const typeId = e.currentTarget.dataset.id
    this.setData({ currentType: typeId })
  },

  onInput(e) {
    this.setData({ content: e.detail.value })
  },

  chooseImage() {
    const count = 9 - this.data.imageList.length
    wx.chooseMedia({
      count,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFiles = res.tempFiles.map(item => item.tempFilePath)
        this.setData({
          imageList: [...this.data.imageList, ...tempFiles]
        })
      }
    })
  },

  deleteImage(e) {
    const index = e.currentTarget.dataset.index
    const imageList = [...this.data.imageList]
    imageList.splice(index, 1)
    this.setData({ imageList })
  },

  selectCommunity() {
    wx.showActionSheet({
      itemList: ['阳光花园小区', '幸福家园', '锦绣小区', '城市花园', '东方明珠'],
      success: (res) => {
        const communities = ['阳光花园小区', '幸福家园', '锦绣小区', '城市花园', '东方明珠']
        this.setData({ selectedCommunity: communities[res.tapIndex] })
      }
    })
  },

  publishPost() {
    const { content } = this.data

    if (!content.trim()) {
      wx.showToast({ title: '请输入发布内容', icon: 'none' })
      return
    }

    if (!this.data.selectedCommunity) {
      wx.showToast({ title: '请选择所在小区', icon: 'none' })
      return
    }

    const { hasSensitive, filteredText } = checkSensitiveWords(content)

    if (hasSensitive) {
      wx.showModal({
        title: '内容审核提示',
        content: '您的内容包含联系方式或站外交易相关敏感词，已自动过滤。是否继续发布？',
        success: (res) => {
          if (res.confirm) {
            this.setData({ content: filteredText })
            this.doPublish()
          }
        }
      })
    } else {
      this.doPublish()
    }
  },

  doPublish() {
    wx.showLoading({ title: '发布中...' })

    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({ title: '发布成功', icon: 'success' })
      
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }, 1000)
  }
})
