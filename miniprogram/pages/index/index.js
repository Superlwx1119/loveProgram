//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    image:{ 
      we: '../../images/lovers2.png',
      ground:'../../images/ground.png',
      grass:'../../images/grass.png',
      contactCloud:'../../images/contact-cloud-1.png',
      biaozhipai:'../../images/biaozhipai.png',
      changsha:'../../images/changsha.png',
      cloud:'../../images/cloud.png',
      dongche:'../../images/dongche.png',
      mountain:'../../images/mountain-1.png',
      yushannanzhan:'../../images/yushannanzhan.png',
      tree:'../../images/tree-1.png',
      stool:'../../images/stool.png',
      lamp:'../../images/lamp.png',
      hainanhouse:'../../images/hainanhouse.png',
      biaoti:'../../images/biaoti.png'
    },
    time:'2016-06-06',
    days:'1',
    setTime:[],
    windowHeight:'',
    imgMove:'imgMove',
    imgMoveLeft:0,
    imgLeft:'0',
    cloudMove:0,
    cloudLeft:'0',
    biaozhiMove:900,
    biaozhiLeft:'0',
    dongcheMove:1500,
    dongecheImage:-5,
    didi:'didi',
    dongcheLeft:'0',
    guilinMove:3000,
    guilinLeft:'0',
    changshaMove:4300,
    changshaLeft:'0',
    mountainMove:2500,
    mountainLeft:'0',
    treeMove:5000,
    treeLeft:'0',
    lampMove:700,
    lampLeft:'0',
    stoolMove:1100,
    stoolLeft:'0',
    hainanhouseMove:6400,
    hainanhouseLeft:'0',
    biaotiLeft:'0',
    biaotiMove:750,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sort:true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  personMove() {//人物移动
    let time=0;
    setInterval(() => {
      time++;
      if(time==4&&this.data.sort == false){
        time=2;
        this.setData({
          sort: true
        })
      } else if (this.data.sort==true&&time==2){
        time++
        this.setData({
          sort: false
        })
      }
      if(time>3){
        time=1
      }
      //1323
      // console.log(time,this.data.sort)
      if (time == 1) {
        this.setData({
          imgMove: 'imgMove'
        })
      } else if (time == 2){
        this.setData({
          imgMove: 'imgMove2'
        })
      } else if (time == 3) {
        this.setData({
          imgMove: 'imgMove3'
        })
      }

    }, 400)
  },
  showList(){//请求表格
    wx.request({
      url: 'https://lwxandhmm66.com/index.php/select',
      method:'post',
      success:(res)=>{
        console.log(res)
      }
    })
  },
  groundMove() {//地面移动
    setInterval(()=>{
      this.setData({
        imgMoveLeft: this.data.imgMoveLeft-5
      })
      if (this.data.imgMoveLeft <= -750) {
        this.setData({
          imgMoveLeft: 0
        })
      }
      this.setData({
        imgLeft: this.data.imgMoveLeft+'rpx'
      })
    },30)
  },
  backgroundMove() {//背景移动
    setInterval(() => {
      this.setData({
        cloudMove: this.data.cloudMove - 3,
        stoolMove: this.data.stoolMove - 3,
        lampMove: this.data.lampMove - 3,
        biaozhiMove:this.data.biaozhiMove-5,
        dongcheMove:this.data.dongcheMove+this.data.dongecheImage,
        changshaMove:this.data.changshaMove-5,
        guilinMove:this.data.guilinMove-5,
        mountainMove: this.data.mountainMove-5,
        treeMove: this.data.treeMove-5,
        hainanhouseMove: this.data.hainanhouseMove-5,
        biaotiMove: this.data.biaotiMove-5,
      })
      if (this.data.biaotiMove<=0){
        this.setData({
          biaotiMove:0
        })
      }
      if (this.data.cloudMove <= -750) {
        this.setData({
          cloudMove: (Math.random() * 10+8)*100,
          lampMove: (Math.random() * 10 + 7) * 100,
          stoolMove: (Math.random() * 10 + 7) * 100,
        })
      }
      if(this.data.dongcheMove<=-500){
        this.setData({
          dongecheImage:9 //动车触发
        })
      }
      this.setData({
        cloudLeft: this.data.cloudMove + 'rpx',
        lampLeft: this.data.lampMove + 'rpx',
        stoolLeft: this.data.stoolMove + 'rpx',
        biaozhiLeft: this.data.biaozhiMove + 'rpx',
        dongcheLeft: this.data.dongcheMove + 'rpx',
        changshaLeft: this.data.changshaMove + 'rpx',
        guilinLeft: this.data.guilinMove + 'rpx',
        mountainLeft: this.data.mountainMove + 'rpx',
        treeLeft: this.data.treeMove + 'rpx',
        hainanhouseLeft: this.data.hainanhouseMove + 'rpx',
        biaotiLeft: this.data.biaotiMove+'rpx'
      })
    }, 30)
  },
  time(){//时间计算
    let time = new Date(2016, 6, 6, 0, 0, 0)
    let year = time.getFullYear()
    let mou = Number(time.getMonth())
    let day = Number(time.getDate())
    let timer=null
    let now = new Date()
    let yearnow = now.getFullYear()
    let mounow = Number(now.getMonth())+1
    let daynow = Number(now.getDate())
    let cha=1
    let first=true
    timer=setInterval(()=>{
        day++
        
      if (mou == 1 || mou == 3 || mou == 5 || mou == 7 || mou == 8 || mou == 10 || mou == 12){
        if(day>31){
          mou++
          day=1
        }
      } else if (mou == 4 || mou == 6 || mou == 9 || mou == 11){
        if (day > 30){
          mou++
          day = 1
        }
      }else if(mou==2&&(year/4!=0||year/400!=0)){
        if (day > 28) {
          mou++
          day = 1
        }
      } else if (mou == 2 && (year / 4 == 0 || year / 400 == 0)){
        if (day > 29) {
          mou++
          day = 1
        }
      }
      if(mou>12){
        year++
        mou=1
      }
      if (mou < 10) {
        mou = '0' + Number(mou)
      }
      if (day < 10) {
        day = '0' + Number(day)
      }
      if (mounow < 10) {
        mounow = '0' + Number(mounow)
      }
      if (daynow < 10) {
        daynow = '0' + Number(daynow)
      }
      let sDate1 = Date.parse(this.data.time);
      let sDate2 = Date.parse(yearnow + '-' + mounow + '-' + daynow);
      let dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
      if(first){
        cha = dateSpan
        first=false
      }
      let iDays = Math.floor((cha-dateSpan+1) / (24 * 3600 * 1000));
      // console.log(dateSpan / (24 * 3600 * 1000))
      if(this.data.time==yearnow+'-'+mounow+'-'+daynow){
        clearInterval(timer)
        return
      }
        this.setData({
          time: year + '-' + mou + '-' + day,
          days: iDays
        })
      },45)
  },
  onReady: function () {//加载完成
    this.audioCtx = wx.createAudioContext('myLove')
    this.personMove()
    this.groundMove()
    this.backgroundMove()
    setTimeout(() => { this.time()},3000)
    // this.audioCtx.play()//配乐
    let that=this
    wx.getSystemInfo({
           success: function (res) {
              let clientHeight = res.windowHeight,
                clientWidth = res.windowWidth,
                rpxR = 750 / clientWidth;
              var calc = clientHeight * rpxR;
              that.setData({
                    windowHeight: calc-10+'rpx'
              });
           }
      });
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
