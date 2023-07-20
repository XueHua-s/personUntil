// import { tipsDuration } from '../utils/base'
import { idCardCheck } from '../utils/checkSetupApi'
const tipsDuration = 2000
/**
 * 
 * @param { number } maxlength 
 * @param { string } text 
 * @description - 如果超出某长度增加...返回
 */
export const detatilSubstring = (maxlength, text) => {
  if (text > maxlength) {
    return `${text.substring(0, maxlength)}...` 
  }
  return text
}
/**
  * 
  * @param { string } data.url - 小程序页面路径
  * @param { object } data.query - 小程序页面需要传递的参数
  * @param { object } data.close - 跳转页面时是否关闭当前页面
  * @description - vue路由风格的小程序页面跳转方法
*/
export const pushRedirectTo = (data) => {
  // console.log(data)
  data.close = data.close === false ? false : true
  // 拼接query
  let query = ''
  const keys = Object.keys(data.query)
  if (typeof data.query === 'object' && data.query) {
    keys.forEach((key, index) => {
      if (index === (keys.length - 1)) {
        query += `${key}=${data.query[key]}`
      } else {
        query += `${key}=${data.query[key]}&`
      }
    })
  }
  // console.log(query)
  console.log(data.close, 'close')
  // const queryString = query.toString()
  if (query) {
    if (data.close) {
      wx.redirectTo({
        url: `${data.url}?${query}`
      })
      // console.log('关闭跳转')
    } else {
      wx.navigateTo({
        url: `${data.url}?${query}`
      })
      // console.log('不关闭跳转')
    }
    return
  }
  if (data.close) {
    wx.redirectTo({
      url: data.url
    })
    // console.log('关闭跳转')
  } else {
    wx.navigateTo({
      url: data.url
    })
    // console.log('不关闭跳转')
  }
}
/**
 * 
 * @param { htmlNodes } html
 * @description - 处理富文本样式的方法
 */
export const formatRichText = (html) => {
  // 更换图片样式
  let newContent= html.replace(/\<img /gi,'<img style="max-width:100%;height:auto;display:block;margin-top:8px;margin-bottom:8px;border-radius: 12px;"')
  // console.log(newContent, 'aspectFill')
  newContent = newContent.replace(/style=\"\"/gi, (match) => {
    // console.log(match, 'newContent');
    match = ''
    return match
  })
  return newContent;
}
/**
 * @description - 判断用户有无填写手机号
 */
export const isWriteMobile = () => {
  const userInfo = wx.getStorageSync('userInfo')
  const app = getApp()
  if (userInfo && !userInfo.userMobile) {
    app.globalData.tabbarAlive = 'home'
    wx.reLaunch({
      url: '/pages/login/index'
    })
    return false
  }
  return true
}
/**
 * @description - 表单校验方法
 */
export const formRuleValid = (rules, data) => {
  let isSuccess = true
  // let titleArray = ''
  for (const key of Object.keys(rules)) {
    const rule = rules[key]
    if (rule.required) {
      if (typeof data[key] === 'string') {
        data[key] = data[key].trim()
      }
      if (typeof rule.customize === 'function') {
        // 启用自定义校验
        const over = rule.customize(data[key])
        if (!over) {
          // titleArray.push(rule.message)
          // titleArray = rule.message
          // return over
          isSuccess = over
          wx.showToast({
            title: rule.message,
            duration: tipsDuration,
            icon: 'error',
            mask: true
          })
          return isSuccess
        }
      } else {
        if (data[key] === '' || data[key] === undefined || data[key] === null) {
          isSuccess = false
          // titleArray.push(rule.message)
          // titleArray = rule.message
          wx.showToast({
            title: rule.message,
            duration: tipsDuration,
            icon: 'error',
            mask: true
          })
          return isSuccess
        }
      }
    }
  }
  return isSuccess
}
/**
 * @description - 身份证号码提取生日
 */
export const idCardGetBirth = (idCard) => {
  if (idCardCheck(idCard)) {
    const year = idCard.substring(6, 10);
    const month = idCard.substring(10,12);
    const day = idCard.substring(12,14);
    return `${year}-${month}-${day}`
  }
  return ''
}
/**
 * @description - 身份证号码提取性别
 */
export const idCardGetSex = (idCard) => {
  if (idCardCheck(idCard)) {
    if (idCard.at(-2) % 2 === 0) {
      return 2
    } else {
      return 1
    }
  }
  return ''
}
/**
 * @description - 打开电话号码弹窗
 */
export const openCallPhone = (phoneNumber) => new Promise((resolve, reject) => {
  wx.makePhoneCall({
    phoneNumber: phoneNumber,
    success: (res) => { resolve(res) },
    fail: (err) => { reject(err) }
  })
})
/**
 * @description 根据两组经纬度，来计算km距离
 */
export function GetDistance( lat1,  lng1,  lat2,  lng2){
  var radLat1 = lat1*Math.PI / 180.0;
  var radLat2 = lat2*Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
  Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
  s = s *6378.137 ;// EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s.toFixed(2);
}