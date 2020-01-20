module.exports = {
  title: '王者峡谷',
  description: '人生要有目标',
  // dest: './dist', // 默认在 .vuepress下
  port: '8080',
  head: [
    ['link', {rel: 'icon', href: '/img/logo.jpg'}],
    ['link', {rel: 'stylesheet', href: '/css/style.css'}],
    ['script', {charset: 'utf-8', src: '/js/main.js'}]
  ],
  markdown: {
    lineNumbers: true
  },
  // base:'blog',
  themeConfig: {
    // rep 'Agony-li/vuepress-blog',
    // repoLabel: '查看源码',
    // 标题栏配置
    nav: require('./nav.js'),

    // 侧边栏配置
    sidebar: require('./sidebar.js'),

    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    searchMaxSuggestoins: 10,
    serviceWorker: {
        updatePopup: {
            message: "有新的内容.",
            buttonText: '更新'
        }
    },
    editLinks: true,
    editLinkText: '编辑文档 ！'
  }
}