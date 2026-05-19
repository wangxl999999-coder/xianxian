const { REPORT_REASONS } = require('../../utils/constants')

Page({
  data: {
    id: '',
    type: '',
    reasons: REPORT_REASONS,
    selectedReason: '',
    description: '',
    contact: '',
    imageList: []
  },

  onLoad(options) {
    this.setData({
      id: options.id || '',
      type: options.type || 'goods'
    })
  },

  selectReason(e) {
    const reasonId = e.currentTarget.dataset.id
    this.setData({ selectedReason: reasonId })
  },

  onInput(e) {
    this.setData({ description: e.detail.value })
  },

  onContactInput(e) {
    this.setData({ contact: e.detail.value })
  },

  chooseImage() {
    const count = 3 - this.data.imageList.length
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

  submitReport() {
    if (!this.data.selectedReason) {
      wx.showToast({ title: '请选择举报原因', icon: 'none' })
      return
    }

    wx.showLoading({ title: '提交中...' })

    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({ title: '举报提交成功，我们会尽快审核', icon: 'success' })
      
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }, 1000)
  }
})
