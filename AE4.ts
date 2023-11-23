import CryptoJS from 'crypto-js';
// 解密函数
export function encryptData(data: string, keyWord: string) {
  const key = CryptoJS.enc.Utf8.parse(keyWord);
  const dataBytes = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(dataBytes, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  const encryptedData = encrypted.toString();
  return encryptedData;
}
// 加密函数
export function decryptData(encryptedData: string, keyWord: string) {
  const key = CryptoJS.enc.Utf8.parse(keyWord);
  const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);
  const decrypted = CryptoJS.AES.decrypt(encryptedBytes, key, {
    mode: CryptoJS.mode.ECB, // 加密模式
    padding: CryptoJS.pad.Pkcs7 // 填充模式
  });
  const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}
