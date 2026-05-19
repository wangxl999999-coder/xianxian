const app = getApp()

Page({
  data: {
    addressList: []
  },

  onLoad() {
    this.loadAddressList()
  },

  onShow() {
    this.loadAddressList()
  },

  loadAddressList() {
    const addressList = wx.getStorageSync('addressList') || []
    this.setData({ addressList })
  },

  addAddress() {
    wx.navigateTo({ url: '/pages/addressEdit/addressEdit' })
  },

  editAddress(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/addressEdit/addressEdit?id=${id}` })
  },

  setDefault(e) {
    const id = e.currentTarget.dataset.id
    const addressList = this.data.addressList.map(item => ({
      ...item,
      isDefault: item.id === id
    }))
    wx.setStorageSync('addressList', addressList)
    this.setData({ addressList })
    wx.showToast({ title: '设置成功', icon: 'success' })
  },

  deleteAddress(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要删除这个地址吗？',
      success: (res) => {
        if (res.confirm) {
          const addressList = this.data.addressList.filter(item => item.id !== id)
          wx.setStorageSync('addressList', addressList)
          this.setData({ addressList })
          wx.showToast({ title: '删除成功', icon: 'success' })
        }
      }
    })
  }
})
