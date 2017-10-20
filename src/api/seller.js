import axios from 'axios'

const api ={
  base:'http://api.wxtxcxxkj.com/jifen_3_4_00'
}

// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function obj2params(obj) {
  let result = '';
  for (let item in obj) {
      result += '&' + item + '=' + encodeURIComponent(obj[item]);
  }
  if (result) {
      //console.log(result)
      result = result.slice(1);
  }
  return result;
}

function paramsPrefilter(params) {
// params = Object.assign(params, {display: 'json'})
// params['display'] = 'json'
return params;
}

/* 获取商户中心 */
export function getValidateAccount(sid,seller_wv,token) {
  const url = api.base + '/api.php/home/seller/validate_account'

  const data = {
    sid:sid,
    seller_wv:seller_wv,
    token:token
  }
  return axios.post(url, obj2params(paramsPrefilter(data)),{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/*获取账单列表 */
export function getConsumptionLogs(sid,page) {
  const url = api.base + '/api.php/home/PayManage/consumptionLogs'

  const data = {
    sid:sid,
    p:page,
  }
  return axios.post(url, obj2params(paramsPrefilter(data)),{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/* 验证记录接口 */
export function getRecord(sid,user_account,page) {
  const url = api.base + '/api.php/home/seller/getValidateLog'

  const data = {
    sid:sid,
    user_account:user_account,
    page:page
  }

  return axios.post(url, obj2params(paramsPrefilter(data)),{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/*获取账单详情 */

export function getTixiandetail(sid,id) {
  const url = api.base + '/api.php/home/Tixian/tixianDetail'
  const data = {
    sid:sid,
    id:id
  }

  return axios.post(url, obj2params(paramsPrefilter(data)),{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}


/*提现接口 */

export function getApply(token,seller_id,amount,user_account) {
  const url = api.base + '/api.php/Home/Tixian/apply'
  const data = {
    token:token,
    seller_id:seller_id,
    amount:amount,
    user_account:user_account
  }

  return axios.post(url, obj2params(paramsPrefilter(data)),{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/*取消提现 */

export function getCancel(token,seller_id,tixian_id,user_account) {
  const url = api.base + '/api.php/Home/Tixian/cancel'
  const data = {
    token:token,
    seller_id:seller_id,
    user_account:user_account,
    tixian_id:tixian_id
  }

  return axios.post(url, obj2params(paramsPrefilter(data)),{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/*充值接口 */

export function getPay(token,seller_id,amount,user_account) {
  const url = 'http://con.icloudcity.cn/jifen/dev/api.php/Wxpay/Wp/pay'
  const data = {
    token:token,
    seller_id:seller_id,
    user_account:user_account,
    amount:amount
  }

  return axios.post(url, obj2params(paramsPrefilter(data)),{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}


/*扫码验证接口 */

export function getCode(seller_wv,token,code) {
  const url = api.base +'/api.php/home/seller/validate_qrcode'
  const data = {
    seller_wv:seller_wv,
    token:token,
    code:code
  }

  return axios.post(url, obj2params(paramsPrefilter(data)),{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/*确认兑换接口 */

export function getIs(validate,user_account,seller_wv,code,time,sid) {
  const url = api.base +'/api.php/home/seller/seller_confirm'
  const data = {
    validate:validate,
    user_account:user_account,
    seller_wv:seller_wv,
    time:time,
    code:code,
    sid:sid
  }

  return axios.post(url, obj2params(paramsPrefilter(data)),{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}