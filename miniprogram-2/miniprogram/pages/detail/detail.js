// miniprogram/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '马上就有诗来',
    })
    wx.cloud.init()
    console.log(options.title,3)
    const db = wx.cloud.database()
    db.collection('poetry').where({
      title: options.title
    }).get({
      success: res => {
        console.log(res)
        if (res.data[0].translate==null){
          var translate="本首诗歌暂无翻译"
        }else{
          var translate= res.data[0].translate
        }
        this.setData({
          title: res.data[0].title,
          dynasty: res.data[0].dynasty,
          author: res.data[0].author,
          content: res.data[0].content,
          translate
        })
        wx.hideLoading()
      }
    })
    //
    // console.log(options)
    // if (options.translate == "null") {
    //   var translate = "暂无翻译"
    // } else {
    //   var translate = options.translate
    // }
    // var content= options.content.split("。,")
    // this.setData({
    //   title:options.title,
    //   author: options.author,
    //   dynasty: options.dynasty,
    //   content,
    //   translate
    // })
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