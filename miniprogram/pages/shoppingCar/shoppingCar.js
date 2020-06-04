// miniprogram/pages/shoppingCar/shoppingCar.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    checkAll:true,
    goodsList:[],
    edit:false,
    dealName:'编辑',
    subName:'确定',
    animation:{},
    animation2:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goodsList = app.globalData.foodList
    goodsList.forEach(item=>{
      item.check=false
    })
    this.setData({
      goodsList: goodsList
    })
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
    console.log(22)
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
  checkThis(e){//单品选中
    console.log(e.currentTarget.dataset.index)
  },
  coutSubtract(e) {//减
    if (this.data.goodsList[e.currentTarget.dataset.index].cout <= 0) {
      return
    }
    this.data.goodsList[e.currentTarget.dataset.index].cout--
    this.setData({
      goodsList: this.data.goodsList
    })
  },
  coutAdd(e) {
    this.data.goodsList[e.currentTarget.dataset.index].cout++
    this.setData({
      goodsList: this.data.goodsList
    })
  },
  showBingo(){
    this.data.animation.translateX(10).step()
    this.data.animation2.translateX(10).opacity(1).step()
    this.setData({
      animation: this.data.animation.export(),
      animation2: this.data.animation2.export()
    })
  },
  closeBingo(){
    this.data.animation.translateX(0).step()
    this.data.animation2.translateX(0).opacity(0).step()
    this.setData({
      animation: this.data.animation.export(),
      animation2: this.data.animation2.export()
    })
    setTimeout(()=>{
      this.setData({
        edit: false
      })
    },300)
  },
  startEdit(){//编辑
    if(this.data.dealName=='编辑'){
      this.setData({
        edit: true,
        dealName: '完成',
        subName: '删除',
        animation: wx.createAnimation({
          duration: 300,
          timingFunction: 'linear'
        }),
        animation2: wx.createAnimation({
          duration: 300,
          timingFunction: 'linear'
        }),
      })
      this.showBingo()
    }else{
      this.setData({
        dealName: '编辑',
        subName: '确定',
        animation: wx.createAnimation({
          duration: 300,
          timingFunction: 'linear'
        }),
        animation2: wx.createAnimation({
          duration: 300,
          timingFunction: 'linear'
        }),
      })
      this.closeBingo()
    }
    
  },
  checkAll(){//全选
    this.setData({
      checkAll: !this.data.checkAll
    })
  }
})