// pages/search/search.js 
Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    tableData: [],
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
  search(){//查询列表
    let that = this;
    let db = wx.cloud.database()
    db.collection('fenfu').get({
      success:(res)=>{
        console.log(res)
        that.setData({
          tableData: res.data
        })
      }
    })
    return
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值 
      },
      url: 'https://lwxandhmm66.com/love/index.php',
      method: 'POST',
      success: (res) => {
        console.log(res)
        that.setData({
          tableData: res.data
        })
      }
    })
  },
  /** 
   * 生命周期函数--监听页面显示 
   */
  onShow: function () {
    this.search()
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
  showDetail() {
    //事件详情 

  }
})