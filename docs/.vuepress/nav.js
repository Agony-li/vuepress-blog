// 标题栏
module.exports = [
  {
    text: 'WEB前端',
    items: [
      {
        text: '前端页面',
        items: [
          { text: 'CSS', link: '/web/css/' },
          { text: 'HTML', link: '/web/html/' },
          { text: 'JavaScript', link: '/web/js/' },
        ]
      },
      {
        text: '前端框架',
        items: [
          { text: 'Vue.js', link: '/vue/' },
          { text: 'React', link: '' },
        ]
      },
      {
        text: '数据可视化',
        items: [
          { text: 'echarts', link: ''},
        ]
      },
    ]
  },
  {
    text: '微信端',
    items: [
      { text: '公众号', link: ''},
      { text: '小程序', link: '/miniapp/'},
    ]
  },
  {
    text: '原生APP开发',
    items: [
      { text: 'React Native', link: ''},
      { text: 'Flutter', link: ''},
    ]
  },
  {
    text: '服务器开发',
    items: [
      { text: 'Node.js', link: ''},
      { text: 'Mysql', link: ''},
    ]
  },
  {
    text: '站外链接',
    items: [
      { text: 'Echarts官网', link: 'https://echarts.apache.org/zh/index.html' },
      {
        text: 'UI组件库',
        items: [
          { text: 'Cube-UI', link: 'https://didi.github.io/cube-ui/#/zh-CN' },
          { text: 'Vant', link: 'https://youzan.github.io/vant/#/zh-CN/' },
          { text: 'Element-UI', link: 'https://element.eleme.cn/#/zh-CN' },
          { text: 'Vant-Weapp', link: 'https://youzan.github.io/vant-weapp/#/intro' },
        ]
      },
      {
        text: '在线服务',
        items: [
          { text: '阿里云', link: 'https://www.aliyun.com/' },
          { text: '腾讯云', link: 'https://cloud.tencent.com/' }
        ]
      },
      {
        text: '博客指南',
        items: [
          { text: '掘金', link: 'https://juejin.im/' },
          { text: 'CSDN', link: 'https://blog.csdn.net/' }
        ]
      }
    ]
  }
]