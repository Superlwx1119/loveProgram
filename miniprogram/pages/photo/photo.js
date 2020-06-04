// miniprogram/pages/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvas:{},
    photo:{val:10},
    havePhoto:false,
    touches:0,
    opsition:{},
    move:{},
    offset:{},
    photoId:1,
    photoList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data)
    let that = this
    wx.createSelectorQuery().select('#canvasId').boundingClientRect(function (canvas) {
      // console.log(canvas)
      that.setData({
        canvas:canvas
      })
    }).exec();
    wx.getImageInfo({//图片信息
      src: '../../images/jing.jpeg',
      success: (res) => {
        that.setData({
          photo:res
        })
      }
    })
    setTimeout(() => { this.setCanvasSize()},250)
  },
  saveImg(){//保存图片
    let time=new Date().getTime()
    wx.cloud.uploadFile({
      cloudPath: 'myPhoto' +time+'.png',
      filePath:this.data.photo.path,
      success:(res)=>{
        console.log(res)
        this.addToDb(res.fileID)
        wx.showToast({
          icon:'success',
          title: '保存成功!',
        })
      }
    })
    
    // wx.uploadFile({
    //   url: 'https://lwxandhmm66.com/love/wxUpLoad.php',
    //   filePath: this.data.photo.path,
    //   name: 'imgfile',
    //   formData: null,
    //   success:(res)=>{
    //     console.log(res)
    //     if(res.statusCode==200&&res.errMsg=='uploadFile:ok'){
    //       wx.showToast({
    //         icon:'success',
    //         title: '保存成功!',
    //       })
    //     }
    //   }
    // })
  },
  showHistory(){//查看图片记录
    wx.navigateTo({
      url: '/pages/photoRecord/photoRecord',
      success:()=>{
      }
    })
  },
  addToDb(fileId){//添加数据库
    let db=wx.cloud.database()
    db.collection('photos').add({
      data:{
        img:fileId
      },
      success:(res)=>{
        console.log(res)
      }
    })
  },
  selectPhoto(){//选择照片
    let that=this
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res)
        that.setData({
          havePhoto:true
        })
        wx.getImageInfo({//图片信息
          src: res.tempFilePaths[0],
          success: (res) => {
            that.setData({
              photo: res
            })
            that.setCanvasSize();
          }
        })
      },
    })
  },
  startImg(e){//点击图片
    this.setData({
      opsition:e.touches[0]
    })
  },
  moveImg(e){//缩放图片
    let left=this.data.opsition.clientX
    let top=this.data.opsition.clientY
    if(e.touches.length==1){//单指移动
      let lefts = e.touches[0].clientX
      let tops = e.touches[0].clientY
        this.setData({
          move: { left: lefts - left, top: tops - top },
          offset: { left: lefts - left, top: tops - top }
        })
      // console.log(lefts-left)
      this.setCanvasSize()
      // console.log(this.data.opsition)
    }else{//双指缩放
    
    }
  },
  setCanvasSize(){//设置Canvas大小
    let width=''
    let height=''
    let that=this
    if (this.data.photo.height / this.data.photo.width > this.data.canvas.height / this.data.canvas.width){
      height=this.data.canvas.height
      width = this.data.photo.width * this.data.canvas.height / this.data.photo.height
    }else{
      width = this.data.canvas.width
      height = this.data.photo.height * this.data.canvas.width / this.data.photo.width
    }
    let cxt = wx.createCanvasContext('beatiPhoto');
    if(this.data.havePhoto){//绘制图片
      // cxt.drawImage(this.data.photo.path, 0, 0, width, height);
      if (this.data.touches.length == 0) {//默认位置
        cxt.drawImage(this.data.photo.path, 0, 0, width, height);
      } else if (this.data.touches.length == 1 || this.data.touches == 0) {
        cxt.drawImage(this.data.photo.path, this.data.move.left, this.data.move.top, width, height);
      } else if (this.data.touches.length >= 2 || this.data.touches == 0) {
        cxt.drawImage(this.data.photo.path, this.data.move.left, this.data.move.top, width, height)
      }
    }else{//绘制默认图片
      if(this.data.touches.length==0){//默认位置
        cxt.drawImage("../../images/jing.jpeg", 0,0, width, height);
      } else if (this.data.touches.length==1||this.data.touches==0){
        cxt.drawImage("../../images/jing.jpeg", this.data.move.left, this.data.move.top, width, height);
        // console.log(this.data.opsition)
      } else if (this.data.touches.length >= 2 || this.data.touches == 0){
        cxt.drawImage(this.data.photo.path, this.data.move.left, this.data.move.top, width, height)
      }
    }
    cxt.draw();
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