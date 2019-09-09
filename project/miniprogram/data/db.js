var articles = [
  {
    articleId:'0',
    avatar: '/images/2.jpg',
    date: '2019-04-08',
    title: '我的秘密',
    img: '/images/rabbit.jpg',
    desc: '歌曲',
    star: 30,
    view: 20,
    content: '《我的秘密》可以算是邓紫棋创作中较有代表性的作品，虽然没有极为深刻的记忆点，但是全曲流畅，主副歌分明，过度又自然，使得整首作品构架完整、流畅，也有传唱的潜质。《我的秘密》这首歌无论是前奏的连绵人声合唱，还是第二段加入的钢琴独奏，都爆发力出摇滚演唱方式，使得这首作品成为专辑中最为独特的一曲',
    time:'3天前',
    author:'by',
    music: {
      src: 'https://win-web-ra01-sycdn.kuwo.cn/41c0b2de6fc6d9ac01c0872cd4b7fd9f/5d74e489/resource/n2/128/11/29/1596827352.mp3',
      title: '我的秘密',
      coverImgUrl: 'http://img1.kuwo.cn/star/albumcover/300/97/58/2718009240.jpg'
    },
  },
  {
    articleId: '1',
    avatar: '/images/3.jpg',
    date: '2019-04-16',
    title: '老街',
    img: '/images/tea.jpg',
    desc: '歌曲',
    star: 30,
    view: 20,
    content: '李荣浩《老街》，整个MV时长3分25秒，在整个视频中以灰色系为主，背景采用了八十年代的街道视频以及图片，整段视频所呈现出淡淡的忧伤味道，这样更体现出了歌曲的主题，在暗色系的衬托下更让人感觉到一种小忧伤让人怀恋起老街旧巷，老街茶馆。',
    time: '5天前',
    author: 'zyl',
    music: {
      src: 'https://win-web-rf01-sycdn.kuwo.cn/1b979f772671989646b336a9d97fa9c8/5d74e363/resource/n2/50/2/37073549.mp3',
      title: '老街',
      coverImgUrl:'http://img2.kuwo.cn/star/albumcover/300/53/63/3476779007.jpg'
    }  
  },
]

module.exports = {
  articles:articles
}

/**
 * 1.为爱痴狂：
封面：http://oxoxtpvtn.bkt.clouddn.com/%E4%B8%BA%E7%88%B1%E7%97%B4%E7%8B%82.jpg
歌曲：http://oxoxtpvtn.bkt.clouddn.com/%E9%87%91%E5%BF%97%E6%96%87%20-%20%E4%B8%BA%E7%88%B1%E7%97%B4%E7%8B%82.mp3
2.风吹麦浪
封面：http://oxoxtpvtn.bkt.clouddn.com/%E9%A3%8E%E5%90%B9%E9%BA%A6%E6%B5%AA.jpg
歌曲：http://oxoxtpvtn.bkt.clouddn.com/%E6%9D%8E%E5%81%A5%E3%80%81%E5%AD%99%E4%BF%AA%20-%20%E9%A3%8E%E5%90%B9%E9%BA%A6%E6%B5%AA%20%28Live%29.mp3
3.最远的你是我最近的爱
封面：http://oxoxtpvtn.bkt.clouddn.com/%E8%BD%A6%E7%BB%A7%E9%93%83%E6%9C%80%E8%BF%9C%E7%9A%84%E4%BD%A0%E6%98%AF%E6%88%91%E6%9C%80%E8%BF%91%E7%9A%84%E7%88%B1.jpg
歌曲：http://oxoxtpvtn.bkt.clouddn.com/%E8%BD%A6%E7%BB%A7%E9%93%83%20-%20%E6%9C%80%E8%BF%9C%E7%9A%84%E4%BD%A0%E6%98%AF%E6%88%91%E6%9C%80%E8%BF%91%E7%9A%84%E7%88%B1.mp3
4.演员
封面;http://oxoxtpvtn.bkt.clouddn.com/%E8%96%9B%E4%B9%8B%E8%B0%A6%E6%BC%94%E5%91%98.jpg
歌曲：http://oxoxtpvtn.bkt.clouddn.com/%E8%96%9B%E4%B9%8B%E8%B0%A6%20-%20%E6%BC%94%E5%91%98.mp3
5.喜欢你
封面：http://oxoxtpvtn.bkt.clouddn.com/%E9%82%93%E7%B4%AB%E6%A3%8B%E5%96%9C%E6%AC%A2%E4%BD%A0.jpg
歌曲：http://oxoxtpvtn.bkt.clouddn.com/G.E.M.%E9%82%93%E7%B4%AB%E6%A3%8B%20-%20%E5%96%9C%E6%AC%A2%E4%BD%A0.mp3
6.听海
封面：http://oxoxtpvtn.bkt.clouddn.com/%E5%90%AC%E6%B5%B7.jpg
歌曲：http://oxoxtpvtn.bkt.clouddn.com/%E5%BC%A0%E6%83%A0%E5%A6%B9%20-%20%E5%90%AC%E6%B5%B7%20%28Live%29.mp3
7.白色风车
src:'https://win-web-ra03-sycdn.kuwo.cn/56092fd7939db07a39cac667f49a6cfb/5d74ea32/resource/a1/48/29/68/3595396126.aac',
 */

/*
豆瓣api:
正在热映
http://t.yushu.im/v2/movie/in_theaters?start=0&count=3
即将上映
http://t.yushu.im/v2/movie/coming_soon?start=0&count=3
豆瓣Top250
http://t.yushu.im/v2/movie/top250?start=0&count=3
*/