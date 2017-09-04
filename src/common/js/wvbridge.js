/**
 * WVBridge
 * @author songhao
 * @version 1.0
 * @todo 
 **/

let WVJsBridge = {
     /** 
     * 设置标题
     * @param {string} opt 字符串 title
     * @example
     * WVJsBridge.setLocalTitle(title)
     **/
    setLocalTitle(opt){
        try{
            csb.setLocalTitle(opt)
        }catch(e){
            try{
                window.webkit.messageHandlers.setLocalTitle.postMessage(opt)
            }catch(e){
                console.log('请在潍V内打开')
            }
        }
    },
    /** 
     * 显示或者隐藏标题栏bar
     * @param {Boolean} opt 布尔值 false,true
     * @example
     * WVJsBridge.showTitle(true)
     **/
    showTitlebar(opt){
        try{
            WVJsFunction.showTitle(opt)
        }catch(e){
            try{
                window.webkit.messageHandlers.WVJsFunction.postMessage({showTitle:opt})

            }catch(e){
                console.log('请在潍V内打开')
             }
        }
    },
    /** 
     * 扫码
     * @param {function} callback 回调函数 false,true
     * @example
     * WVJsBridge.sacn(function(res){
     *  // res 为base64编码，请先进行解码，并转换成json数组
     *  // res.scanCode即为编码值
     * })
     **/
    scan(scanCallback){
        var _callback = scanCallback
        window.scanCallback = function (result) {
            /* */
            
            _callback && _callback(result)
        }
        try{
            WVJsFunction.scan('scanCallback')
        }catch(e){
            try{
                window.webkit.messageHandlers.WVJsFunction.postMessage({scan:'scanCallback'})
            }catch(e){
                console.log('请在潍V内打开')
            }
        }
        // scanCallback && scanCallback('123')
    },
    /** 
     * 获取token
     * @param {function} callback 回调函数
     * @example
     * WVJsBridge.getToken(function(data){
     *  // data 即为token
     *  // 
     * })
     **/
    getToken(getToken){
        var _callback = getToken
         window.getToken = function (result) {
            /* */
            _callback && _callback(result)
        }
        try{
            WVJsFunction.getToken('getToken')
        }catch(e){
            try{
                window.webkit.messageHandlers.WVJsFunction.postMessage({getToken:'getToken'})
            }catch(e){
                console.log('请在潍V内打开')
            }
        }
    },
    /** 
     * 写入webview本地存储
     * @param {object} object 对象
     * @example
     *  WVJsBridge.setLocalData({
     *      key1:'value1',
     *      key2:'value2'
     *  })
     **/
    setLocalData(obj){
        const objstring = JSON.stringify(obj)
        try{
            WVJsFunction.WVSaveData(objstring)
        }catch(e){
            try{
                window.webkit.messageHandlers.WVSaveData.postMessage(objstring)
            }catch(e){
                console.log('请在潍V内打开')
            }
            
        }
    },
    /** 
     * 读取webview本地存储
     * @param {array} arr 数组
     * @param {function} callback 回调函数 
     * @example
     * WVJsBridge.getLocalData(function(data){
     *  // data 格式为json字符串 '{"sid":"52","wv_account":"457475"}'
     *  // 
     * })
     **/
    getLocalData(arr,getSellerData){
        var _callback = getSellerData
         window.getSellerData = function (result) {
            /* */
            _callback && _callback(result)
        }
        try{
			WVJsFunction.WVGetData('getSellerData',arr)
		}catch(e){
			try{
				window.webkit.messageHandlers.WVGetData.postMessage({'getSellerData':arr})
			}catch(e){
				console.log('请在潍V内打开')
			}
		}
    },
     /** 
     * 关闭webview
     * @param 
     * @example
     * WVJsBridge.close()
     **/
    close(opt){
            try{
                WVJsFunction.close()
        }catch(e){
                try{
                    window.webkit.messageHandlers.WVJsFunction.postMessage({close:''})
                }catch(e){
                    console.log('请在潍V内打开')
                }
        }
    },
     /** 
     * 第三方返回app刷新webview
     * @param 
     * @example
     * WVJsBridge.needRefresh(true)
     **/
    needRefresh(opt){
            try{
                WVJsFunction.needRefresh(opt)
        }catch(e){
                try{
                    window.webkit.messageHandlers.WVJsFunction.postMessage({needRefresh:opt})
                }catch(e){
                    console.log('请在潍V内打开')
                }
        }
    }

}

export default  WVJsBridge