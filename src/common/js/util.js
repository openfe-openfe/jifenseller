function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 打乱数组
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    // console.log(j)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  // console.log(_arr)
  return _arr
}

export function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      // func.apply(this,args)
      func(...args)
    }, delay)
  }
}

export function getPhoneType(){
  let phonetype = ''
  var ua = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(ua)){
    phonetype = 'iOS'
  }else if (/android/.test(ua)) {
    phonetype = 'Android'
  }
  return phonetype
}
