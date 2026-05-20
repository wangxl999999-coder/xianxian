const { REPORT_STATUS } = require('../../utils/constants')

Page({
  data: {
    status: 1,
    statusOptions: [
      { id: 1, name: '待处理' },
      { id: 2, name: '处理中' },
      { id: 3, name: '已解决' },
      { id: 4, name: '已驳回' }
    ],
    reportList: [],
    loading: false,
    page: 1,
    pageSize: 10,
    hasMore: true,
    showDetail: false,
    currentReport: null
  },

  onLoad() {
    this.loadReportList()
  },

  changeStatus(e) {
    const status = e.currentTarget.dataset.status
    this.setData({ 
      status,
      page: 1,
      reportList: [],
      hasMore: true
    })
    this.loadReportList()
  },

  loadReportList() {
    if (this.data.loading || !this.data.hasMore) return

    this.setData({ loading: true })
    wx.showLoading({ title: '加载中...' })

    setTimeout(() => {
      const reasons = ['虚假信息', '违规内容', '诈骗嫌疑', '联系方式', '其他']
      const types = ['商品', '帖子', '用户']
      const mockData = []
      
      for (let i = 0; i < 10; i++) {
        const reasonIndex = Math.floor(Math.random() * reasons.length)
        const typeIndex = Math.floor(Math.random() * types.length)
        mockData.push({
          id: Date.now() + i,
          type: types[typeIndex],
          targetTitle: `被举报的${types[typeIndex]}标题${this.data.page * 10 + i + 1}`,
          reason: reasons[reasonIndex],
          reporterName: `举报用户${Math.floor(Math.random() * 100) + 1}`,
          reportedName: `被举报用户${Math.floor(Math.random() * 100) + 1}`,
          reportTime: '2024-01-' + (Math.floor(Math.random() * 20) + 1) + ' ' + (Math.floor(Math.random() * 12) + 10) + ':' + Math.floor(Math.random() * 60),
          status: this.data.status,
          statusName: ['待处理', '处理中', '已解决', '已驳回'][this.data.status - 1],
          description: '举报内容描述，包含详细说明...',
          images: [
            `https://picsum.photos/200/200?random=${2000 + i}`,
            `https://picsum.photos/200/200?random=${2001 + i}`
          ]
        })
      }

      const newList = [...this.data.reportList, ...mockData]
      this.setData({
        reportList: newList,
        loading: false,
        page: this.data.page + 1,
        hasMore: this.data.page < 3
      })
      wx.hideLoading()
    }, 500)
  },

  onReachBottom() {
    this.loadReportList()
  },

  viewDetail(e) {
    const id = e.currentTarget.dataset.id
    const report = this.data.reportList.find(item => item.id === id)
    this.setData({ 
      showDetail: true,
      currentReport: report
    })
  },

  closeDetail() {
    this.setData({ showDetail: false, currentReport: null })
  },

  processReport(e) {
    const action = e.currentTarget.dataset.action
    const id = this.data.currentReport.id

    wx.showModal({
      title: '提示',
      content: action === 'ban' ? '确定要封禁该内容并下架吗？' : '确定要驳回该举报吗？',
      success: (res) => {
        if (res.confirm) {
          const reportList = this.data.reportList.map(item => {
            if (item.id === id) {
              const newStatus = action === 'ban' ? 3 : 4
              return { 
                ...item, 
                status: newStatus,
                statusName: ['待处理', '处理中', '已解决', '已驳回'][newStatus - 1]
              }
            }
            return item
          })
          this.setData({ reportList, showDetail: false })
          wx.showToast({ 
            title: action === 'ban' ? '已封禁处理' : '已驳回举报', 
            icon: 'success' 
          })
        }
      }
    })
  }
})
