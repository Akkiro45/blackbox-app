import CryptoJS from 'react-native-crypto-js';

export const encrypt = (key, plainText) => {
  return CryptoJS.AES.encrypt(plainText, key).toString();
}

export const decrypt = (key, cipherText) => {
  const bytes  = CryptoJS.AES.decrypt(cipherText, key);
  return bytes.toString(CryptoJS.enc.Utf8); 
}

