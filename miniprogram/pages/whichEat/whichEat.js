// miniprogram/pages/whichEat/whichEat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    whichFood:'吃啥呢?',
    food: ['火锅', '烧烤', '煲仔饭', '自己做', '泡面', '粉面'],
    foodImg: ['../../images/huoguo.jpg', '../../images/kaorou.jpg', '../../images/baozaifan.jpg', '../../images/self.jpg', '../../images/paomian.jpg', '../../images/mifen.jpg'],
    origin:{},
    borderWidth:'',
    animationData:{},
    angle:0,
    touchEndTime:0,
    touchStartTime:0,
    lastTapTime:0,
    timer:null,
    canClick:true,
    w:0,
    h:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.createSelectorQuery().select('.canvasItem').boundingClientRect((res) => {
      // console.log(res)
      this.setData({
        w : res.width,
        h : res.height
      })
    }).exec();
    this.getNode()
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.drawImg()
    setTimeout(() => { this.drawCanvas()},200)
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
  getNode(){//旋转原点
    wx.createSelectorQuery().select('.bigCircle').boundingClientRect( (res) =>{
      // console.log(res)
      this.setData({
        origin:res
      })
    }).exec();
  },
  touchStart(e) {//开始点击
    this.setData({
      touchStartTime : e.timeStamp
    })
  },
  touchEnd(e) {//再次点击
    this.setData({
      touchEndTime : e.timeStamp
    })
  },
  startChoose(e){//开始选择
    if(this.data.canClick){//防止重复点击
      this.setData({
        canClick: false
      })
      clearTimeout(this.data.timer)
      this.data.timer = setTimeout(() => {
        this.setData({
          canClick: true
        })
      }, 3500)

      // 旋转动画
      let animation = wx.createAnimation({
        duration: 3000,
        timingFunction: 'ease-out'
      })
      let angle = parseInt(Math.random() * 100 + 360) + 1440
      angle=91
      animation.rotate(angle + this.data.angle).step()
      this.setData({
        animationData: animation.export(),
        angle: angle + this.data.angle
      })
      let whichFood = ((this.data.angle) % 360) % 6
      let food = this.data.food.reverse()
      console.log(this.data.angle, whichFood, food)
      this.setData({
        whichFood: food[whichFood]
      })
      food = this.data.food.reverse()
    }
    
    
  },
  drawCanvas(){//旋转画布
    let len=this.data.food.length
    let angle=Math.PI*2/len
    
    let ctx = wx.createCanvasContext('item')
    console.log(this.data.w / 2, this.data.h / 2)
    for(let i=0;i<len;i++){
      let item = this.data.food[i]
      ctx.beginPath()
      ctx.moveTo(this.data.w / 2, this.data.h / 2);
      ctx.lineTo(this.data.w - 2, this.data.h / 2);
      ctx.arc(this.data.w / 2, this.data.h / 2, this.data.h / 2 - 2, 0, angle);
      ctx.lineTo(this.data.w / 2, this.data.h / 2);
      let pattern = ctx.createPattern(this.data.foodImg[i], 'no-repeat')
      ctx.fillStyle = pattern
      
      ctx.fill();
      ctx.translate(this.data.w * 0.5, this.data.h * 0.5); // 设置原点为画布中心
      ctx.setFillStyle('black')
      ctx.setFontSize(15)
      ctx.setTextAlign('center')
      ctx.fillText(this.data.food[i], 90, 50);
      ctx.rotate(angle);
      ctx.translate(-this.data.w * 0.5, -this.data.h * 0.5); // 恢复画布中心到（0，0）
      ctx.save();

      //绘制文字
      // ctx.translate(this.data.w * 0.5, this.data.h * 0.5);
      
      // ctx.translate(-this.data.w * 0.5, -this.data.h * 0.5);
    
      ctx.restore();
      
    }
      ctx.draw()
  },
  drawImg() {//转盘画布  
    let ctx = wx.createCanvasContext('item')
    let time=0
    // for(let i=0;i<=6;i++){
    //   ctx.beginPath();
    //   ctx.setLineWidth(1)
    //   ctx.setStrokeStyle('black');
    //   ctx.arc(this.data.origin.width / 2, this.data.origin.height / 2, 180, time, i == 0 ? Math.PI / 4: i*(Math.PI / 8 * (2)))
    //   ctx.lineTo(this.data.origin.width / 2, this.data.origin.height / 2)
    //   ctx.lineTo(this.data.origin.width, this.data.origin.height / 2)
    //   ctx.closePath()
    //   time=i*(Math.PI/8*2)
    // }
    //   0, Math.PI / 4
    
    ctx.drawImage('../../images/mifen.jpg', this.data.origin.width / 2, this.data.origin.height / 2,330*Math.sin(Math.PI/6),330*Math.sin(Math.PI/6))
    ctx.drawImage('../../images/huoguo.jpg', this.data.origin.width / 2, 0, 330 * Math.sin(Math.PI / 6), 330 * Math.sin(Math.PI / 6))
    ctx.drawImage('../../images/kaorou.jpg', 0, 0, 330*Math.sin(Math.PI/6), 330*Math.sin(Math.PI/6))
    ctx.drawImage('../../images/self.jpg', 0, this.data.origin.height / 2, 330 * Math.sin(Math.PI / 6), 330 * Math.sin(Math.PI / 6) )
    ctx.stroke()
    ctx.draw()
  }
})