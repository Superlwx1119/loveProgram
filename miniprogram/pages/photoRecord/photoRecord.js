// miniprogram/pages/photoRecord/photoRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoList:[]
  },
  showBigImg(event){//查看大图
    console.log(this.data.photoList)
    // return
    let arr = []
    this.data.photoList.forEach(item=>{
      arr.push(item.img)
    })
    console.log(arr)
    wx.previewImage({
      current:event.currentTarget.dataset.id,
      urls: arr
    })
  },
  backTo(){//返回
    wx.navigateTo({
      url: "/pages/photo/photo",
      success: () => {
      }
    })

  },
  deleteImg(event){//删除图片
    console.log(event.currentTarget.dataset.id)
    let fileList = [event.currentTarget.dataset.id]
    let db=wx.cloud.database()
    db.collection('photos').doc(event.currentTarget.dataset.id).remove({
      success:(res)=>{
        this.getData()
      }
    })
    wx.cloud.deleteFile({
      fileList: fileList,
      success:(res)=>{
        console.log(res)
        wx.showToast({
          title: '删除成功!',
        })
      },
      fail:(res)=>{
        console.log(res)
      }
    })
  },
  getData(){//获取图片
    let db = wx.cloud.database()
    db.collection('photos').get({
      success: (res) => {
        console.log(res)
        this.setData({
          photoList: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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

  }
})