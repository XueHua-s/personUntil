import CryptoJS from 'crypto-js';
// 定义加密函数
export function encryptData(tex: string, key: string) {
  return  CryptoJS.AES.encrypt(tex, key).toString()
}
// 定义解密函数
export function decryptData(text: string, key: string) {
  return CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8)
}
