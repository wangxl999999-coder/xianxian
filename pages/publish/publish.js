const app = getApp()
const { CATEGORIES, CONDITION_OPTIONS } = require('../../utils/constants')
const { checkSensitiveWords } = require('../../utils/util')

Page({
  data: {
    imageList: [],
    formData: {
      title: '',
      description: '',
      condition: '',
      conditionName: '',
      originalPrice: '',
      price: '',
      categoryId: '',
      categoryName: ''
    },
    location: '',
    publishing: false,
    showConditionPicker: false,
    conditionIndex: 0,
    conditionOptions: CONDITION_OPTIONS,
    showCategoryPicker: false,
    categoryIndex: 0,
    categories: CATEGORIES
  },

  onLoad() {
    this.getLocation()
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
          location: `${res.latitude.toFixed(4)}, ${res.longitude.toFixed(4)}`
        })
      },
      fail: () => {
        this.setData({ location: '获取失败，点击重试' })
      }
    })
  },

  refreshLocation() {
    this.setData({ location: '获取中...' })
    this.getLocation()
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

  onInput(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    this.setData({
      [`formData.${field}`]: value
    })
  },

  selectCondition() {
    this.setData({ showConditionPicker: true })
  },

  hideConditionPicker() {
    this.setData({ showConditionPicker: false })
  },

  onConditionChange(e) {
    this.setData({ conditionIndex: e.detail.value[0] })
  },

  confirmCondition() {
    const index = this.data.conditionIndex
    const condition = this.data.conditionOptions[index]
    this.setData({
      'formData.condition': condition.id,
      'formData.conditionName': condition.name,
      showConditionPicker: false
    })
  },

  selectCategory() {
    this.setData({ showCategoryPicker: true })
  },

  hideCategoryPicker() {
    this.setData({ showCategoryPicker: false })
  },

  onCategoryChange(e) {
    this.setData({ categoryIndex: e.detail.value[0] })
  },

  confirmCategory() {
    const index = this.data.categoryIndex
    const category = this.data.categories[index]
    this.setData({
      'formData.categoryId': category.id,
      'formData.categoryName': category.name,
      showCategoryPicker: false
    })
  },

  stopPropagation() {},

  publishGoods() {
    const { imageList, formData } = this.data
    const { title, description, condition, price, categoryId } = formData

    if (imageList.length === 0) {
      wx.showToast({ title: '请至少上传一张图片', icon: 'none' })
      return
    }

    if (!title.trim()) {
      wx.showToast({ title: '请输入物品标题', icon: 'none' })
      return
    }

    if (!description.trim()) {
      wx.showToast({ title: '请输入物品描述', icon: 'none' })
      return
    }

    if (!condition) {
      wx.showToast({ title: '请选择新旧程度', icon: 'none' })
      return
    }

    if (!price || parseFloat(price) <= 0) {
      wx.showToast({ title: '请输入合理的价格', icon: 'none' })
      return
    }

    if (!categoryId) {
      wx.showToast({ title: '请选择分类', icon: 'none' })
      return
    }

    const titleCheck = checkSensitiveWords(title)
    const descCheck = checkSensitiveWords(description)

    if (titleCheck.hasSensitive || descCheck.hasSensitive) {
      wx.showModal({
        title: '内容审核提示',
        content: '您的内容包含联系方式或站外交易相关敏感词，已自动过滤。是否继续发布？',
        success: (res) => {
          if (res.confirm) {
            this.doPublish({
              ...formData,
              title: titleCheck.filteredText,
              description: descCheck.filteredText
            })
          }
        }
      })
    } else {
      this.doPublish(formData)
    }
  },

  doPublish(formData) {
    this.setData({ publishing: true })

    setTimeout(() => {
      wx.showToast({ title: '发布成功', icon: 'success' })
      this.setData({ publishing: false })
      
      setTimeout(() => {
        wx.switchTab({ url: '/pages/index/index' })
      }, 1500)
    }, 1500)
  }
})
