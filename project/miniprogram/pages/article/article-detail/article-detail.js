var { articles } = require("../../../data/db.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var articleId = options.articleId;
    var article = articles[articleId];
    var isCollected = false;
    var articles_collection = wx.getStorageSync('articles_collection')
    if (articles_collection) {
      isCollected = !!articles_collection[articleId]
    }
    else {
      /**
       * articleId:false
       * {
       *  '0':false,
       *  '1':true
       * }
       */
      var data = {

      }
      data[articleId] = false;
      wx.setStorageSync('articles_collection', data);
    }
    //处理音乐
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.onPlay(function(){
      this.setData({ isPlaying:true })
    }.bind(this))
    backgroundAudioManager.onPause(function () {
      this.setData({ isPlaying: false })
    }.bind(this))
    this.setData({ ...article, isCollected: isCollected})
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

  },
  /**
   * 收藏功能
   */
  tapCollection: function () {
    //获取storage中的收藏对象
    var articles_collection = wx.getStorageSync('articles_collection');
    var currentIsCollected = articles_collection[this.data.articleId];
    articles_collection[this.data.articleId] = !currentIsCollected;
    wx.setStorageSync('articles_collection', articles_collection);
    this.setData({ isCollected: !currentIsCollected },function(){
      wx.showToast({
        title: currentIsCollected ? '收藏成功' : '取消成功',
        duration: 2000
      })
    });
  },
  /**
   * 分享功能
   */
  tapShare:function(){
    var itemList = ['分享到QQ','分享到微信','分享到微博'];
    wx.showActionSheet({
      itemList:itemList,
      success(res) {
        wx.showToast({
          title: itemList[res.tapIndex] + '成功'
        })
      }
    })
  },
  /**
   * 播放音乐功能
   */
  tapMusic:function(){
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    if(this.data.isPlaying){//暂停播放
      backgroundAudioManager.pause();
      // this.setData({ isPlaying:false });
    }
    else{//播放
      backgroundAudioManager.src = this.data.music.src;
      backgroundAudioManager.title = this.data.music.title;
      backgroundAudioManager.coverImgUrl = this.data.music.coverImgUrl;
      // this.setData({ isPlaying: true });
    }
  }
})