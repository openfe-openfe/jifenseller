import axios from 'axios'

export function getValidateAccount() {
  const url = 'http://rapapi.org/mockjsdata/13543/api/validate_account'

  const data = {
    sid:'test',
    seller_wv:'test',
    token:'test'
  }

  return axios.post(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}


export function getConsumptionLogs() {
  const url = 'http://rapapi.org/mockjsdata/13543/api/consumptionLogs'

  const data = {
    sid:'test',
    seller_wv:'test',
    token:'test'
  }

  return axios.post(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}