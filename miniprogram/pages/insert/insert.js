// pages/insert/insert.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    important:'',
    array:['自己看着办','立刻马上','可以缓缓','与小祖宗商量','今天之内'],
    index:'',
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
  showHistory(){
    wx.navigateTo({
      url: '/pages/search/search',
      success:()=>{
        
      }
    })
  },
  bindPickerChange(e) {
    let that=this
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      important: that.data.array[e.detail.value]
    })
  },
  formSubmit(e) {//添加
    let that = this
    console.log(e.detail.value)
    if (e.detail.value.content == '') {
      wx.showModal({
        title: '提示',
        content: '需要吩咐点啥呢?',
        showCancel: false,
        success(res) {
        }
      })
      return
    }
    if (e.detail.value.important == '') {
      e.detail.value.important = '自己看着办'
    }
    let db = wx.cloud.database()
    db.collection('fenfu').add({
      data: { content: e.detail.value.content, important: e.detail.value.important },
      success: (res) => {
        console.log(res)
        if (res.data.errMsg =='collection.add:ok') {
          wx.showToast({
            title: '吩咐成功!',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            important: '',
            content: ''
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '被发现BUG了!再试一次吧',
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
    return
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      url: 'https://lwxandhmm66.com/love/insert.php',
      method: 'POST',
      data: { content: e.detail.value.content, important: e.detail.value.important },
      success: (res) => {
        console.log(res)
        if (res.data) {
          wx.showToast({
            title: '吩咐成功!',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            important: '',
            content: ''
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '被发现BUG了!再试一次吧',
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
  },
})