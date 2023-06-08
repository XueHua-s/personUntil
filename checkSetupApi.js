// 手机号的校验API
export const mobileCheckApi = (value) => {
  const regTel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  return regTel.test(value)
}
// 姓名校验API
export const chineseNameCheck = (value) => {
  const nameTel = /^(?:[\u4e00-\u9fa5·]{2,4})$/
  return nameTel.test(value)
}
// 身份证号格式校验
export const idCardCheck = (value) => {
  const reg = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
  return reg.test(value)
}
// 对图片文件格式的校验API
export const picCheckApi = (value) => {
  const imgReg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/
  return imgReg.test(value)
}
