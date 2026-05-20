const { ADMIN_ROLES } = require('../../utils/constants')

Page({
  data: {
    adminList: [],
    showAddModal: false
  },

  onLoad() {
    this.loadAdminList()
  },

  loadAdminList() {
    wx.showLoading({ title: '加载中...' })

    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          avatar: 'https://picsum.photos/100/100?random=5001',
          nickname: '超级管理员',
          phone: '138****8888',
          role: 1,
          roleName: '超级管理员',
          createTime: '2023-01-01',
          lastLoginTime: '2024-01-21 10:30'
        },
        {
          id: 2,
          avatar: 'https://picsum.photos/100/100?random=5002',
          nickname: '管理员A',
          phone: '139****9999',
          role: 2,
          roleName: '管理员',
          createTime: '2023-06-15',
          lastLoginTime: '2024-01-20 15:20'
        },
        {
          id: 3,
          avatar: 'https://picsum.photos/100/100?random=5003',
          nickname: '审核员B',
          phone: '137****7777',
          role: 3,
          roleName: '审核员',
          createTime: '2023-09-01',
          lastLoginTime: '2024-01-19 09:10'
        }
      ]

      this.setData({ adminList: mockData })
      wx.hideLoading()
    }, 500)
  },

  showAddModal() {
    this.setData({ showAddModal: true })
  },

  hideAddModal() {
    this.setData({ showAddModal: false })
  },

  deleteAdmin(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要删除该管理员吗？',
      success: (res) => {
        if (res.confirm) {
          const adminList = this.data.adminList.filter(item => item.id !== id)
          this.setData({ adminList })
          wx.showToast({ title: '删除成功', icon: 'success' })
        }
      }
    })
  }
})
