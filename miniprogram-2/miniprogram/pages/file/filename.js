var list=[]
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
    list = []
    this.setData({
      author: options.name
    })
    wx.showLoading({
      title: '马上就有诗来',
    })
    wx.cloud.init()
    console.log(options.name)
    const db = wx.cloud.database()
    db.collection('yang_poetry').where({
      writer: options.name
    }).get()
    .then(res => {
      for (var i = 0; i < res.data.length; i++) {
        list.push(res.data[i].title);}
    }).then(res => {
      this.setData({
        list
      })
      wx.hideLoading()
    })
  }
})