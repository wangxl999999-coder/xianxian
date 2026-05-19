const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${formatNumber(month)}-${formatNumber(day)}`
}

const getRelativeTime = timestamp => {
  const now = Date.now()
  const diff = now - timestamp
  const minute = 60 * 1000
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30

  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`
  } else if (diff < week) {
    return `${Math.floor(diff / day)}天前`
  } else if (diff < month) {
    return `${Math.floor(diff / week)}周前`
  } else {
    return formatDate(new Date(timestamp))
  }
}

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`
}

const debounce = (fn, delay = 300) => {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

const throttle = (fn, delay = 300) => {
  let last = 0
  return function(...args) {
    const now = Date.now()
    if (now - last >= delay) {
      last = now
      fn.apply(this, args)
    }
  }
}

const formatPrice = price => {
  return parseFloat(price).toFixed(2)
}

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

const checkSensitiveWords = text => {
  const sensitiveWords = [
    '微信', 'vx', 'VX', 'V信', '微心', '加我', '加微', '+v', '+V',
    '电话', '手机号', '联系我', '扣扣', 'QQ', 'qq',
    '淘宝', '闲鱼', '转转', '支付宝', '银行卡',
    '线下交易', '当面交易', '私下', '加好友', '私聊'
  ]
  let hasSensitive = false
  let filteredText = text
  for (const word of sensitiveWords) {
    if (text.includes(word)) {
      hasSensitive = true
      const replaceStr = '*'.repeat(word.length)
      filteredText = filteredText.replace(new RegExp(word, 'g'), replaceStr)
    }
  }
  return { hasSensitive, filteredText }
}

module.exports = {
  formatTime,
  formatDate,
  getRelativeTime,
  calculateDistance,
  debounce,
  throttle,
  formatPrice,
  generateId,
  checkSensitiveWords
}
