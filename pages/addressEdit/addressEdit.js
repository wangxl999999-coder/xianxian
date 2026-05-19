Page({
  data: {
    id: '',
    formData: {
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
      isDefault: false
    }
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ id: options.id })
      this.loadAddressDetail(options.id)
      wx.setNavigationBarTitle({ title: '编辑地址' })
    } else {
      wx.setNavigationBarTitle({ title: '新增地址' })
    }
  },

  loadAddressDetail(id) {
    const addressList = wx.getStorageSync('addressList') || []
    const address = addressList.find(item => item.id === id)
    if (address) {
      this.setData({ formData: address })
    }
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    this.setData({
      [`formData.${field}`]: value
    })
  },

  onSwitchChange(e) {
    this.setData({
      'formData.isDefault': e.detail.value
    })
  },

  chooseRegion() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          'formData.province': res.address || '北京市',
          'formData.city': res.address || '北京市',
          'formData.district': res.address || '朝阳区'
        })
      },
      fail: () => {
        wx.showToast({ title: '获取位置失败', icon: 'none' })
      }
    })
  },

  saveAddress() {
    const { name, phone, province, detail } = this.data.formData

    if (!name.trim()) {
      wx.showToast({ title: '请输入收货人姓名', icon: 'none' })
      return
    }

    if (!/^1\d{10}$/.test(phone)) {
      wx.showToast({ title: '请输入正确的手机号码', icon: 'none' })
      return
    }

    if (!province) {
      wx.showToast({ title: '请选择所在地区', icon: 'none' })
      return
    }

    if (!detail.trim()) {
      wx.showToast({ title: '请输入详细地址', icon: 'none' })
      return
    }

    let addressList = wx.getStorageSync('addressList') || []

    if (this.data.formData.isDefault) {
      addressList = addressList.map(item => ({
        ...item,
        isDefault: false
      }))
    }

    if (this.data.id) {
      const index = addressList.findIndex(item => item.id === this.data.id)
      if (index > -1) {
        addressList[index] = { ...this.data.formData }
      }
    } else {
      const newAddress = {
        ...this.data.formData,
        id: Date.now().toString()
      }
      addressList.unshift(newAddress)
    }

    wx.setStorageSync('addressList', addressList)
    wx.showToast({ title: '保存成功', icon: 'success' })
    
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
})
