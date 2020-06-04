// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:'',
    man:'',
    woman:'',
  },
  onGetUserInfo(){//获取用户信息
    // wx.login({
    //   success:function(res){
    //     wx.getUserInfo({
    //       withCredentials:true,
    //       success:function(res){
    //         console.log(res)
    //       },
    //       fail:function(res){
    //         console.log(res)
    //       }
    //     })
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        that.setData({
          windowHeight: calc-10 + 'rpx'
        });
      }
    });
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formSubmit(e){//登录
    // console.log(e.detail.value)
    
    if (e.detail.value.man == '' || e.detail.value.woman==''){
      wx.showModal({
        title: '提示',
        content: '需输入双方姓名',
        showCancel:false,
        success(res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // } else if (res.cancel) {
          //   console.log('用户点击取消')
          // }
        }
      })
      return
    }
    let db = wx.cloud.database()
    db.collection('userMsg').where({
      man: e.detail.value.man,
      woman: e.detail.value.woman
    }).get({
        success: (res) => {
          if (res.data.length==1) {
            wx.showToast({
              title: '成功开启!',
              icon: 'success',
              duration: 2000
            })
            wx.switchTab({
              //目的页面地址
              url: '/pages/index/index',
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '抱歉,你不属于这里!',
              showCancel: false,
              success(res) {
                // if (res.confirm) {
                //   console.log('用户点击确定')
                // } else if (res.cancel) {
                //   console.log('用户点击取消')
                // }
              }
            })
          }
        }
    })
    // db.collection('userMsg').get({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    return
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      url: 'https://lwxandhmm66.com/love/login.php',
      method: 'POST',
      data: { man: e.detail.value.man, woman: e.detail.value.woman},
      success: (res) => {
        // console.log(res)
        if(res.data){
          
          wx.showToast({
            title: '成功开启!',
            icon: 'success',
            duration: 2000
          })
          wx.switchTab({
            //目的页面地址
            url: '/pages/index/index',
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '抱歉,你不属于这里!',
            showCancel:false,
            success(res) {
              // if (res.confirm) {
              //   console.log('用户点击确定')
              // } else if (res.cancel) {
              //   console.log('用户点击取消')
              // }
            }
          })
        }
      }
    })
  }
})