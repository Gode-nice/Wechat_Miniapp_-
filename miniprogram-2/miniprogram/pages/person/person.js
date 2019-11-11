var app = getApp()
var listt=[]
var have=true
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    logged: false,
    name:'点击登陆'
  },
  onLoad: function () {
    have=true
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        //here
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    //上面是获取用户唯一id
    //下面将获取头像
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                name:res.userInfo.nickName
              })
            }
          })
        }
      }
    })
  },
  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  coll:function(e){
    listt=[]
    if(have==false){
      this.setData({
        listt
      })
      have = true
    }else{
      const db = wx.cloud.database()
      db.collection('person').where({
        _openid: app.globalData.openid
      }).get()
        .then(res => {
          for (var i = 0; i < res.data.length; i++) {
            listt.push(res.data[i].title);
          }
        }).then(res => {
          this.setData({
            listt
          })
        })
        have=false
    }
  },
})