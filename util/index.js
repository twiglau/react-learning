
import CryptoJS from 'crypto-js'

const TokenKey = 'User-Token'
const LangKey = 'User-Lang'

export const setToken = (content) => {
	uni.setStorageSync(TokenKey,content);
}
export const getToken = () => {
    return uni.getStorageSync(TokenKey);
}
export const setLang = (content) => {
	uni.setStorageSync(LangKey,content);
}
export const getLang = () => {
    return uni.getStorageSync(LangKey);
}

/*----------------------*/
export function checkPassword(password) {
  var regu = '^[a-zA-Z][0-9a-zA-Z]{7,24}$'
  var re = new RegExp(regu)
  if (re.test(password)) {
    return true
  } else {
    return false
  }
}
export function formValidate(val, type) {
  let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
  let emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  if (val === '') {
    return false
  } else {
    // 非空验证
    if (type === 'require') {
      return !!removeSpace(val)
    }
    if (type === 'phone') {
      return phoneReg.test(val)
    }
    if (type === 'email') {
      return emailReg.test(val)
    }
  }
}
// 下拉动画
export function animation(obj, target, fn1) {
  // console.log(fn1);
  // fn是一个回调函数，在定时器结束的时候添加
  // 每次开定时器之前先清除掉定时器
  clearInterval(obj.timer)
  obj.timer = setInterval(function() {
    // 步长计算公式  越来越小
    // 步长取整
    var step = (target - obj.scrollTop) / 10
    step = step > 0 ? Math.ceil(step) : Math.floor(step)
    console.log('stemp:', step)
    if (obj.scrollTop >= target) {
      clearInterval(obj.timer)
      // 如果fn1存在，调用fn
      if (fn1) {
        fn1()
      }
    } else {
      // 每30毫秒就将新的值给obj.left
      obj.scrollTop = obj.scrollTop + step
    }
  }, 10)
}

// 获取url参数
export function getUrlKey(name) {
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
        location.href
      ) || [, ''])[1].replace(/\+/g, '%20')
    ) || null
  )
}

/**
 * @function 参数拼接
 * @param {object} obj 只支持非嵌套的对象
 * @returns {string}
 */
export function parseParams(obj) {
  let result = ''
  let item
  for (item in obj) {
    if (obj[item] && String(obj[item])) {
      result += `&${item}=${obj[item]}`
    }
  }
  console.log(result)
  if (result) {
    result = result.slice(1)
  }
  return result
}


const aseKey = '12345678' // 秘钥必须为：8/16/32位
const iv = '74E6D2720E5F73C0'

// 加密
export function encrypt(key, message) {
  return CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(key), {
    iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
}

// 解密
export function decrypt(key, message) {
  return CryptoJS.AES.decrypt(message, CryptoJS.enc.Utf8.parse(key), {
    iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8)
}

// Base64编码
export function base64Encode(text) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
}

// Base64解码
export function base64Decode(text) {
  return CryptoJS.enc.Base64.parse(text).toString(CryptoJS.enc.Utf8)
}

export function MakeDataPwd() {
  let result
  let i = 0
  let j = 0

  result = ''
  for (j = 0; j < 8; j++) {
    i = Math.floor(Math.random() * 16)
      .toString(16)
      .toUpperCase()
    result = result + i
  }
  return result
}

// 8--->12
// 数据加密
export function Make_Encrypt(sourceData) {
  // console.log("strKey--aaaaaa--");
  let contentData = base64Encode(sourceData)
  // console.log("strKey--11111--:",contentData);
  let strKey = MakeDataPwd()
  // console.log("strKey--22222--:",strKey);
  let keyEnctrypt = base64Encode(strKey)

  let keyLen = strKey.length
  let KeyInts = []
  let keyIndex = 0
  for (keyIndex = 0; keyIndex < keyLen; keyIndex++) {
    KeyInts[keyIndex] = strKey.charCodeAt(keyIndex) % 8
  }

  let loserStr = ''
  let totalContent_Area_Yu = contentData.length % keyLen
  let totalContent_Area_Count =
    (contentData.length - totalContent_Area_Yu) / keyLen

  if (totalContent_Area_Yu != 0) {
    loserStr = contentData.substring(contentData.length - totalContent_Area_Yu)
  }

  let getStr = ''
  for (let i = 0; i < totalContent_Area_Count; i++) {
    let substr = contentData.substring(i * keyLen, (i + 1) * keyLen)
    let getsub = []

    for (let k = 0; k < substr.length; k++) {
      getsub[k] = substr.charAt(k)
    }

    for (let m = keyLen / 2 - 1; m >= 0; m--) {
      let ind0 = KeyInts[m]
      let ind1 = KeyInts[substr.length - m - 1]

      let getchar1 = getsub[0 + ind0]
      let getchar2 = getsub[0 + ind1]
      getsub[0 + ind0] = getchar2
      getsub[0 + ind1] = getchar1
    }

    for (let n = 0; n < getsub.length; n++) {
      getStr += getsub[n]
    }
  }

  if (loserStr.length > 0) {
    getStr += loserStr
  }

  return 'POST:' + keyEnctrypt + getStr
}

// 数据解密
export function Make_Decrypt(data) {
  let point = data.search('POST:')
  let retStr = ''

  if (point == 0) {
    let strtotal = data.substring(5)
    let strKey = strtotal.substring(0, 12)
    let strcontent = strtotal.substring(12)

    // 解密用的秘钥
    let keyContent = base64Decode(strKey)
    // 解密用的秘钥的长度
    let keyLen = keyContent.length

    let KeyInts = []
    let keyIndex = 0
    for (keyIndex = 0; keyIndex < keyLen; keyIndex++) {
      KeyInts[keyIndex] = keyContent.charCodeAt(keyIndex) % 8
    }

    let loserStr = ''
    let totalContent_Area_Yu = strcontent.length % keyLen
    let totalContent_Area_Count =
      (strcontent.length - totalContent_Area_Yu) / keyLen
    if (totalContent_Area_Yu != 0) {
      loserStr = strcontent.substring(strcontent.length - totalContent_Area_Yu)
    }

    let getStr = ''
    for (let i = 0; i < totalContent_Area_Count; i++) {
      let substr = strcontent.substring(i * keyLen, (i + 1) * keyLen)
      let getsub = []

      for (let k = 0; k < substr.length; k++) {
        getsub[k] = substr.charAt(k)
      }

      for (let m = 0; m < keyLen / 2; m++) {
        let ind0 = KeyInts[m]
        let ind1 = KeyInts[substr.length - m - 1]

        let getchar1 = getsub[0 + ind0]
        let getchar2 = getsub[0 + ind1]
        getsub[0 + ind0] = getchar2
        getsub[0 + ind1] = getchar1
      }

      for (let n = 0; n < getsub.length; n++) {
        getStr += getsub[n]
      }
    }

    if (loserStr.length > 0) {
      getStr += loserStr
    }

    retStr = base64Decode(getStr)
  } else {
    retStr = data
  }

  return retStr
}

// end
