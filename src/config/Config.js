// 网站的配置数据
const Config = {
  // 【背景图片】
  // 填写背景图片链接
  // 外部图片使用
  // backgroundImg: "https://dlink.host/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L2cvcGVyc29uYWwveGlhb3F2YW5fMzY1X21lbmdhY2dfY29tL0VabnhPZXVLMkJKRW5EQkpGdC1Xd0lnQkU5cmZ0Mnhpd2NMNUpaRTQxQnk3OGc_ZT1KZ2lnWW8.webp",
  // 内部导入图片使用
  backgroundImg: () => import('@/assets/img/background4.webp'),

  // 【音乐播放器】
  // 填写明月浩空音乐播放器ID
  // 没有前往myhkw.cn获取，登录后在侧边栏的`主页`点击`我的播放器`获取ID
  // 侧边栏`歌单管理`→`我的全部歌单`→`新建歌单`可定义歌曲
  // 侧边栏`播放器管理`→`全部设置`设置你的域名授权和添加刚刚新建立的歌单
  playerId: '168460845260',

  // 【顶部栏】
  // 网站标题
  title: 'xiaoqvan',

  // 【个人信息界面】
  // 名称
  name: 'xiaoqvan',
  // 头像
  avatarUrl:
    'https://dlink.host/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOmk6L2cvcGVyc29uYWwveGlhb3F2YW5fMzY1X21lbmdhY2dfY29tL0VYV0U5TjAzS2tSS3ByRmZkd2JFVzJBQkVnaVN4ZFRyb1pLZ3c0T0RBMHdqZ0E.jpg',
  // 个人简介
  introduction: '欢迎来到我的个人主页',
  // 社交链接 (不需要的可以注释推荐最少2-3个)
  socialLinks: [
    { href: 'https://qm.qq.com/q/xwIReHzTLG', title: '添加QQ', icon: 'fa-qq' },
    { href: 'https://space.bilibili.com/171896697', title: 'bilibili', icon: 'fa-bilibili' },
    { href: 'https://github.com/xiaoqvan', title: '前往GitHub', icon: 'fa-github' },
    { href: 'https://twitter.com/xiao_qvan668', title: '前往x-twitter', icon: 'fa-twitter' },
    { href: 'https://t.me/xiaoqvan', title: '前往Telegram', icon: 'fa-telegram' },
  ],

  // 【底部栏】
  // icp备案号(没有可为空)
  icp: '蜀ICP备2023029793号-1',
  // 底部名称
  footername: 'xiaoqvan',
  // 底部名称跳转链接
  footerlink: 'https://xiaoqvan.top',
  // 是否启用公安备案
  beian_enabled: false,
  // 公安备案跳转链接
  beian_link: '',
  // 公安备案图片链接
  beian_imgSrc: '',
  // 公安备案号
  beian_text: '',

  // 【博客页面】(尚未开发完成)
  // 社交链接和头像采用个人信息页面
  // 文章在src/config/Article文件夹下新建立MD文件格式参考示例正确会自动识别添加
  // 博客标题
  blog: 'xiaoqvan',
  // 博客描述
  blogDescription: '原始人启动',

  // 【游戏信息】
  // 按照模板依次添加会自动遍历
  games: [
    {
      // 游戏简称
      gameclass: 'genshi',
      // 角色名称
      playerName: 'P•A•I•M•N',
      // 角色等级
      playerLevel: 'LV.60',
      // 角色头像
      avatar:
        'https://bbs-static.miyoushe.com/static/2023/11/09/4c327f3674bae7f329ad23fe7ed3230a_2210302293908001989.gif',
      // 游戏名称
      gameName: '原神',
      // 游戏图标
      gameIcon:
        'https://webstatic.mihoyo.com/upload/op-public/2021/10/09/def1f2abcfc2af0bbe2e5900a60a5ee1_5699547505742166353.png',
      // 游戏UID
      gameUID: 'UID:109087710',
      // 游戏服务器
      gameServer: '天空岛',
      // 游戏活跃信息
      gameActive: [
        { value: 1129, label: '活跃天数' },
        { value: 61, label: '角色数' },
        { value: 767, label: '成就' },
      ],
    },
    {
      gameclass: 'sr',
      playerName: '权酱啊',
      playerLevel: 'LV.69',
      gameName: '崩坏：星穹铁道',
      avatar:
        'https://act-webstatic.mihoyo.com/darkmatter/hkrpg/prod_gf_cn/item_icon_uad6cc/7b1f88cad0daba75b83d27f09f9b336f.png',
      gameIcon: 'https://www.miyoushe.com/assets/game-sr-pc-DpFPCqut.png',
      gameUID: 'UID:101342679',
      gameServer: '星穹列车',
      gameActive: [
        { value: 204, label: '活跃天数' },
        { value: 31, label: '角色数' },
        { value: 353, label: '成就' },
      ],
    },
    {
      gameclass: 'zzz',
      playerName: 'xiaoqvan',
      playerLevel: 'LV.36',
      gameName: '绝区零',
      avatar:
        'https://act.mihoyo.com/app/mihoyo-zzz-game-record/images/default-avatar-cn.0ae3195d.png',
      gameIcon:
        'https://bbs-static.miyoushe.com/upload/op_manual_upload/fe/game_list/game_icons/1715415535005zzz-logo-v2.png',
      gameUID: 'UID:10227066',
      gameServer: '新艾利都',
      gameActive: [
        { value: 15, label: '活跃天数' },
        { value: 13, label: '代理人' },
        { value: 12, label: '邦布' },
      ],
    },
  ],
}

export default Config
