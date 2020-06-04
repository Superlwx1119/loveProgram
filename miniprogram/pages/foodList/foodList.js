// miniprogram/pages/foodList/foodList.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAdd:false,
    foodName:'',
    imgUrl:'../../images/paomian.jpg',
    animation:{},
    name:'',
    foodList:[],
    hasChoose:[],
    chooseCout:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBase()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(){
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // console.log(this.data.foodList)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
  },
  addCar(e){//添加购物车
    wx.hideToast()
    let hasChoose = this.data.hasChoose
    let pass = false
    if (e.currentTarget.dataset.info.cout==0){
      wx.showToast({
        title: '请添加数量',
        icon:'none'
      })
      return
    }
    hasChoose.forEach(item=>{
      if (item._id == e.currentTarget.dataset.info._id){
        pass=true
        wx.showToast({
          title: '该零食已经添加',
          icon:'none'
        })
        return
      }
    })
    if(pass){
      return
    }
    hasChoose.push(e.currentTarget.dataset.info)
    this.setData({
      hasChoose: hasChoose,
      chooseCout:hasChoose.length
    })
    console.log(this.data.hasChoose)
  },
  getBase(){//获取列表
    let db = wx.cloud.database()
    db.collection('foodList').get({
      success: (res) => {
        this.setData({
          foodList: res.data
        })
      }
    })
  },
  selectPhoto(){//选择图片
    let that=this
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res=>{
        console.log(res)
        
        this.setData({
          imgUrl:res.tempFilePaths[0]
        })
      },
    })
  },
  addFood(){//添加零食
    this.setData({
      showAdd: true
    })
    this.showAnimation()
  },
  closeAnimation(){
    this.setData({
      animation: wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-in'
      })
    })
    this.data.animation.opacity(0).step()
    this.setData({
      animation: this.data.animation.export(),
      imgUrl: '../../images/paomian.jpg'
    })
    setTimeout(()=>{
      this.setData({
        showAdd: false
      })
    },400)
  },
  showAnimation(){
    this.setData({
      animation: wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-in'
      })
    })
    this.data.animation.opacity(1).step()
    this.setData({
      animation: this.data.animation.export()
    })
  },
  shopCar() {//购物车
    let data=this.data.hasChoose
    app.globalData.foodList=data
    wx.navigateTo({
      url: '/pages/shoppingCar/shoppingCar',
      success: () => {
      }
    })
  },
  coutSubtract(e){//减
    if (this.data.foodList[e.currentTarget.dataset.index].cout<=0){
      return
    }
    this.data.foodList[e.currentTarget.dataset.index].cout--
    this.setData({
      foodList: this.data.foodList
    })
  },
  coutAdd(e){
    this.data.foodList[e.currentTarget.dataset.index].cout++
    this.setData({
      foodList:this.data.foodList
    })
  },
  formSubmit(e){//提交
    if(e.detail.value.name==''||this.data.imgUrl=='../../images/paomian.jpg'){
      wx.showToast({
        title: '请添加图片和名字',
        icon:'none',
        success:()=>{

        }
      })
      return
    }
    let db = wx.cloud.database()
    let time = new Date().getTime()
    wx.cloud.uploadFile({
      cloudPath: 'myPhoto' + time + '.png',
      filePath: this.data.imgUrl,
      success: (res) => {
        console.log(res)
        db.collection('foodList').add({
          data: {
            img: res.fileID,
            name: e.detail.value.name,
            cout: 0
          },
          success: () => {
            wx.showToast({
              title: '添加成功!',
              icon: 'success'
            })
            this.closeAnimation()
            this.getBase()
          }
        })
      }
    })
    
  }
})