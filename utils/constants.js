const CATEGORIES = [
  { id: 1, name: '数码产品', icon: '📱' },
  { id: 2, name: '服饰鞋包', icon: '👕' },
  { id: 3, name: '家居用品', icon: '🏠' },
  { id: 4, name: '母婴用品', icon: '👶' },
  { id: 5, name: '美妆护肤', icon: '💄' },
  { id: 6, name: '运动户外', icon: '⚽' },
  { id: 7, name: '图书文具', icon: '📚' },
  { id: 8, name: '家电家具', icon: '📺' },
  { id: 9, name: '其他', icon: '📦' }
]

const CONDITION_OPTIONS = [
  { id: 1, name: '全新' },
  { id: 2, name: '几乎全新' },
  { id: 3, name: '轻微使用' },
  { id: 4, name: '明显使用' },
  { id: 5, name: '有瑕疵' }
]

const CIRCLE_TYPES = [
  { id: 1, name: '求购', color: '#FF6B35' },
  { id: 2, name: '以物换物', color: '#52c41a' },
  { id: 3, name: '免费赠送', color: '#1890ff' }
]

const CREDIT_LEVELS = [
  { level: 1, name: '信用一般', minScore: 0, color: '#999' },
  { level: 2, name: '信用良好', minScore: 60, color: '#52c41a' },
  { level: 3, name: '信用优秀', minScore: 80, color: '#1890ff' },
  { level: 4, name: '信用极好', minScore: 90, color: '#FF6B35' }
]

const REPORT_REASONS = [
  { id: 1, name: '虚假信息' },
  { id: 2, name: '违规内容' },
  { id: 3, name: '诈骗嫌疑' },
  { id: 4, name: '联系方式' },
  { id: 5, name: '其他' }
]

const SORT_OPTIONS = [
  { id: 'time', name: '最新发布' },
  { id: 'distance', name: '距离最近' },
  { id: 'price_asc', name: '价格最低' },
  { id: 'price_desc', name: '价格最高' }
]

const TOP_DURATION_OPTIONS = [
  { id: 2, name: '2小时', price: 2 },
  { id: 4, name: '4小时', price: 3 },
  { id: 6, name: '6小时', price: 5 },
  { id: 12, name: '12小时', price: 8 },
  { id: 24, name: '24小时', price: 15 }
]

const GOODS_STATUS = {
  SELLING: 1,
  SOLD: 2,
  OFF_SHELF: 3,
  REPORTED: 4,
  BANNED: 5
}

const REPORT_STATUS = {
  PENDING: 1,
  PROCESSING: 2,
  RESOLVED: 3,
  REJECTED: 4
}

const ADMIN_ROLES = {
  SUPER_ADMIN: 1,
  ADMIN: 2,
  MODERATOR: 3
}

module.exports = {
  CATEGORIES,
  CONDITION_OPTIONS,
  CIRCLE_TYPES,
  CREDIT_LEVELS,
  REPORT_REASONS,
  SORT_OPTIONS,
  TOP_DURATION_OPTIONS,
  GOODS_STATUS,
  REPORT_STATUS,
  ADMIN_ROLES
}
