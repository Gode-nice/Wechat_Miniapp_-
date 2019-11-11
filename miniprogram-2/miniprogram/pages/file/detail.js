var app = getApp()
var title
var list=[]
var list_
var content
var translation
var remark
var shangxi
var havecoll=false
var idd=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:"../../images/starb.png",
    word:"收藏"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    list = []
    havecoll = false
    wx.showLoading({
      title: '马上就有诗来',
    })
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        }})
    title = options.name
    const db = wx.cloud.database()
    db.collection('yang_poetry').where({
      title: options.name
    }).get({
      success: res => {
//
        content = res.data[0].content.split("\\n")
        translation = res.data[0].translation.split("\\n")
        remark = res.data[0].remark.split("\\n")
        shangxi = res.data[0].shangxi.split("\\n")
        this.setData({
          title:res.data[0].title,
          dynasty: res.data[0].dynasty,
          author: res.data[0].writer,
          list : content,
          list_:"content"
        })
        //coll
        db.collection('person').where({
          title: title
        }).get({
          success: res => {
            idd=res.data[0]._id
            for (var i=0;i<res.data.length;i++){
              if (res.data[i].title == options.name){
                havecoll = true
                this.setData({
                  img:"../../images/starr.png",
                  word:"已收藏"
                })
              }
            }
          }
        })
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  change: function (res) {
    console.log(res.currentTarget.id)
    var i = res.currentTarget.id
    if(i==1){
      list = content,
        list_ ="content"
    }else if(i==2){
      list = translation,
        list_ = "translation"
    }else if(i==3){
      list = remark,
        list_ = "remark"
    }else if(i==4){
      list = shangxi,
        list_ = "shangxi"
    }else{
      list = content,
        list_ = "content"
    }
    this.setData({
      list,
      list_
    })
  },
  coll: function (e) {
    if (havecoll == true){
      const db = wx.cloud.database()
      db.collection('person').doc(idd).remove({
        success: console.log,
        fail: console.error
      })
      wx.showToast({
        title: '取消收藏',
      })
      havecoll=false
      this.setData({
        img: "../../images/starb.png",
        word: "收藏"
      })
    } else if (havecoll == false){
      const db = wx.cloud.database()
      db.collection('person').add({
        data: {
          title
        }
    })
    wx.showToast({
      title: '收藏成功',
    })
      this.setData({
        img: "../../images/starr.png",
        word:"已收藏"
      })
  }}
})