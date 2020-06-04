//app.js
App({
  onLaunch: function () {
    //云开发
    if(!wx.cloud){
      console.log('error')
    }else{
      wx.cloud.init({
        traceUser:true,
        env:'mylove-di8h4'
      })
    }
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userInfo']) {
    //       // wx.authorize({
    //       //   scope: 'scope.userInfo',
    //       //   success() {
    //       //     // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //       //     wx.startRecord()
    //       //   }
    //       // })
    //     }
    //   }
    // })
    // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res)
    //     wx.request({
    //       header: {
    //         'content-type': 'application/x-www-form-urlencoded' // 默认值
    //       },
    //       url: 'https://lwxandhmm66.com/love/wxLogin.php',
    //       method: 'POST',
    //       data: { code: res.code},
    //       success: (res) => {
    //         console.log(res)
    //         this.globalData.session_key = res.data.session_key;
    //         this.globalData.openid = res.data.openid;
    //         // 获取用户信息
    //         wx.getSetting({
    //           success: res => {
    //             console.log(res)
    //             if (res.authSetting['scope.userInfo']) {
    //               // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //               wx.getUserInfo({
    //                 withCredentials: true,
    //                 success: res => {
    //                   // 可以将 res 发送给后台解码出 unionId
    //                   this.globalData.userInfo = res.userInfo
    //                   console.log(res)
    //                   console.log({ openid: this.globalData.openid, session_key: this.globalData.session_key, iv: res.iv, encryptedData: res.encryptedData })
    //                   wx.request({
    //                     header: {
    //                       'content-type': 'application/x-www-form-urlencoded' // 默认值
    //                     },
    //                     url: 'https://lwxandhmm66.com/love/indexLogin.php',
    //                     method: 'POST',
    //                     data: { openid: this.globalData.openid, session_key: this.globalData.session_key, iv: res.iv, encryptedData: res.encryptedData },
    //                     success: (res) => {
    //                       console.log(res)
    //                       wx.request({
    //                         header: {
    //                           'content-type': 'application/x-www-form-urlencoded' // 默认值
    //                         },
    //                         url: 'https://lwxandhmm66.com/love/wxGetUsers.php',
    //                         method:'POST',
    //                         data:{
    //                           avatarUrl: res.data.avatarUrl,
    //                           city:res.data.city,
    //                           country:res.data.country,
    //                           gender:res.data.gender,
    //                           nickName:res.data.nickName,
    //                           openId:res.data.openId,
    //                           province:res.data.province
    //                         },
    //                         success:(res)=>{
    //                           console.log(res)
    //                         }
    //                       })
    //                     }
    //                   })
    //                   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //                   // 所以此处加入 callback 以防止这种情况
    //                   if (this.userInfoReadyCallback) {
    //                     this.userInfoReadyCallback(res)
    //                   }
    //                 }
    //               })
    //             }
    //           }
    //         })
    //       }
    //     })
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    
  },
  globalData: {
    userInfo: null,
    openid:null,
    session_key:null,
    foodList:[]
  },
  
})