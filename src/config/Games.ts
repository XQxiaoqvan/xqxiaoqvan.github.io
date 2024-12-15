import { Game } from '../types/config'

export const games: Game = {
  games: [
    {
      gameclass: 'genshi',
      playerName: 'P•A•I•M•N',
      playerLevel: 'LV.60',
      avatar:
        'https://bbs-static.miyoushe.com/static/2023/11/09/4c327f3674bae7f329ad23fe7ed3230a_2210302293908001989.gif',
      gameName: '原神',
      gameIcon:
        'https://webstatic.mihoyo.com/upload/op-public/2021/10/09/def1f2abcfc2af0bbe2e5900a60a5ee1_5699547505742166353.png',
      gameUID: 'UID:109087710',
      gameServer: '天空岛',
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
      gameUID: '1022706',
      gameServer: '新艾利都',
      gameActive: [
        { value: 15, label: '活跃天数' },
        { value: 13, label: '代理人' },
        { value: 12, label: '邦布' },
      ],
    },
  ],
}
