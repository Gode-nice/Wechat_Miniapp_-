const jinrishici = require('../../utils/jinrishici.js')
var author=''
var dynasty=''
var content=''
var title=''
var translate=''
var sentence=[]
Page({
  //
  data: {

  },
  //
  onLoad: function (options) {
    var sentence3 = []
    jinrishici.load(result => {
      // 下面是处理逻辑示例
      sentence = result.data.content.split("，")
      //判断有几个句子
      if (sentence.length >= 3) {
        console.log(3)
        var sentence2 = sentence[0] + '，'
        var sentence1 = sentence[1] + "，"
        var sentence0 = sentence[2]
        var sentence4 = sentence1[0] + sentence1[1]
        var sentence5 = sentence0[0] + sentence0[1]
      } else if (sentence.length == 2) {
        console.log(2)
        var sentence2 = sentence[0] + "，"
        var sentence1 = sentence[1]
        var sentence0 = ''
        var sentence4 = sentence1[0] + sentence1[1]
      } else if (sentence.length == 1) {
        console.log(1)
        var sentence2 = sentence[0]
        var sentence1 = ''
        var sentence0 = ''
      }
      //文章渲染
      author = result.data.origin.author,//作者
        dynasty = result.data.origin.dynasty,//年代
        title = result.data.origin.title,//标题
        this.setData({
          sentence0,
          sentence1,
          sentence2,
          author,
          dynasty,
        })
      //背景句子渲染
      var sent3 = sentence[0].split('')
      var z = 0;
      var r;
      var rgb;
      var that = this;
      var t = setInterval(function (res) {
        if (z >= sent3.length) {
          that.setData({
            sentence4,
            sentence5
          })
          clearInterval(t)
        } else {
          r = Math.floor(Math.random() * 26) + 170 + (z * 10);
          rgb = 'rgb(' + r + ',' + r + ',' + r + ')';
          sentence3.push({
            color: rgb,
            word: sent3[z]
          })
          that.setData({
            sentence3,
          })
          z++;
        }
      }, 500)
      //存入数据库
      wx.cloud.init()
      const db = wx.cloud.database()
      db.collection('poetry').add({
        data: {
          _id: result.data.id,
          sentence: result.data.content,
          match: result.data.matchTags,
          author: result.data.origin.author,//作者
          content: result.data.origin.content,//作者
          dynasty: result.data.origin.dynasty,//年代
          title: result.data.origin.title,//标题
          translate: result.data.origin.translate,//翻译
          warning: result.warning
        },
      })
    })
  },
  //
  onReady: function () {

  },//
  onShow: function () {

  },//
  onHide: function () {

  },//
  onUnload: function () {

  },//
  onPullDownRefresh: function () {
    this.setData({ sentence3: '', sentence4: '', sentence5: '',})
    var sentence3 = []
    jinrishici.load(result => {
      // 下面是处理逻辑示例
      sentence = result.data.content.split("，")
      //判断有几个句子
      if (sentence.length >= 3) {
        console.log(3)
        var sentence2 = sentence[0] + '，'
        var sentence1 = sentence[1] + "，"
        var sentence0 = sentence[2]
        var sentence4 = sentence1[0] + sentence1[1]
        var sentence5 = sentence0[0] + sentence0[1]
      } else if (sentence.length == 2) {
        console.log(2)
        var sentence2 = sentence[0] + "，"
        var sentence1 = sentence[1]
        var sentence0 = ''
        var sentence4 = sentence1[0] + sentence1[1]
      } else if (sentence.length == 1) {
        console.log(1)
        var sentence2 = sentence[0]
        var sentence1 = ''
        var sentence0 = ''
      }
      //文章渲染
      author = result.data.origin.author,//作者
        dynasty = result.data.origin.dynasty,//年代
        title = result.data.origin.title,//标题
        this.setData({
          sentence0,
          sentence1,
          sentence2,
          author,
          dynasty,
        })
      //背景句子渲染
      var sent3 = sentence[0].split('')
      var z = 0;
      var r;
      var rgb;
      var that = this;
      var t = setInterval(function (res) {
        if (z >= sent3.length) {
          that.setData({
            sentence4,
            sentence5
          })
          clearInterval(t)
        } else {
          r = Math.floor(Math.random() * 26) + 170 + (z * 10);
          rgb = 'rgb(' + r + ',' + r + ',' + r + ')';
          sentence3.push({
            color: rgb,
            word: sent3[z]
          })
          that.setData({
            sentence3,
          })
          z++;
        }
      }, 500)
      //存入数据库
      wx.cloud.init()
      const db = wx.cloud.database()
      db.collection('poetry').add({
        data: {
          _id: result.data.id,
          sentence: result.data.content,
          match: result.data.matchTags,
          author: result.data.origin.author,//作者
          content: result.data.origin.content,//作者
          dynasty: result.data.origin.dynasty,//年代
          title: result.data.origin.title,//标题
          translate: result.data.origin.translate,//翻译
          warning: result.warning
        },
      })
    })
    wx.stopPullDownRefresh()
  },//
  onReachBottom: function () {

  },//
  onShareAppMessage: function () {

  },//
  detail:function(){
    //这是点击后跳转到详情页面的函数。
    wx.navigateTo({
      url: '../detail/detail?title=' + title,
    })
  },//hello
})