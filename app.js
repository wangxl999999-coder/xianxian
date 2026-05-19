App({
  globalData: {
    userInfo: null,
    token: '',
    location: null,
    isLogin: false
  },

  onLaunch() {
    this.checkLogin()
    this.getLocation()
  },

  checkLogin() {
    const token = wx.getStorageSync('token')
    const userInfo = wx.getStorageSync('userInfo')
    if (token && userInfo) {
      this.globalData.token = token
      this.globalData.userInfo = userInfo
      this.globalData.isLogin = true
    }
  },

  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.globalData.location = {
          latitude: res.latitude,
          longitude: res.longitude
        }
      },
      fail: () => {
        console.log('获取位置失败')
      }
    })
  },

  login(callback) {
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: 'https://api.example.com/api/login',
            method: 'POST',
            data: {
              code: res.code
            },
            success: (result) => {
              if (result.data.code === 0) {
                const { token, userInfo } = result.data.data
                wx.setStorageSync('token', token)
                wx.setStorageSync('userInfo', userInfo)
                this.globalData.token = token
                this.globalData.userInfo = userInfo
                this.globalData.isLogin = true
                callback && callback(null, userInfo)
              } else {
                callback && callback(result.data.msg)
              }
            },
            fail: () => {
              callback && callback('登录失败')
            }
          })
        }
      }
    })
  },

  request(options) {
    const { url, method = 'GET', data, success, fail } = options
    wx.showLoading({ title: '加载中...' })
    wx.request({
      url: 'https://api.example.com' + url,
      method,
      data,
      header: {
        'Authorization': `Bearer ${this.globalData.token}`
      },
      success: (res) => {
        wx.hideLoading()
        if (res.data.code === 0) {
          success && success(res.data)
        } else if (res.data.code === 401) {
          wx.showToast({ title: '请先登录', icon: 'none' })
          wx.navigateTo({ url: '/pages/login/login' })
        } else {
          wx.showToast({ title: res.data.msg || '请求失败', icon: 'none' })
          fail && fail(res.data)
        }
      },
      fail: (err) => {
        wx.hideLoading()
        wx.showToast({ title: '网络错误', icon: 'none' })
        fail && fail(err)
      }
    })
  },

  uploadFile(filePath, success, fail) {
    wx.uploadFile({
      url: 'https://api.example.com/api/upload',
      filePath,
      name: 'file',
      header: {
        'Authorization': `Bearer ${this.globalData.token}`
      },
      success: (res) => {
        const data = JSON.parse(res.data)
        if (data.code === 0) {
          success && success(data.data)
        } else {
          fail && fail(data)
        }
      },
      fail: (err) => {
        fail && fail(err)
      }
    })
  }
})
