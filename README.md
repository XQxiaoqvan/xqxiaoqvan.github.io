# xiaoqvan 的个人主页

这里是 xiaoqvan 的个人主页，使用 vue3 + vite + JS 构建

## 访问量

![:xiaoqvan.github.io](https://count.getloli.com/@xiaoqvan.github.io?name=xiaoqvan.github.io&theme=rule34&padding=9&offset=0&align=top&scale=1&pixelated=1&darkmode=auto)

## 未来

- 更换天气显示卡片

- 设置页面

- 博客页面

## 主页界面

xiaoqvan 的个人主页
![主页](/screenshots/image.png)

### 预览

- [权的主页](https://www.xiaoqvan.top)

## 功能

- [x] Hitokotod 一言
- [x] 音乐播放器
- [ ] 移动端适配
- [x] 动漫番剧
- [ ] 博客页面
- [x] 游戏信息页面

## 构建并部署

### 克隆

```bash
# 克隆仓库
git clone https://github.com/xiaoqvan/xiaoqvan.github.io.git
# 进入
cd xiaoqvan.github.io
# 安装依赖
npm install
```

### 构建

```bash
# 预览
npm run dev
# 构建
npm run build
```

### 自动部署

- `settings > Actions > General`，拉到页面底部，在 `Workflow permissions` 下，勾选 `Read and write permissions`，并点击保存按钮

- `settings > Pages`, 在 `Build and deployment` 中，`Source` 选择 `Deploy from a branch`, `Branch` 选择 `gh-pages`，并点击保存按钮
  (首次创建可能没有 `gh-pages`分支，你可以先完成上面的设置后，推送一次构建后的代码到`gh-pages`分支，等待 `github actions` 自动部署完成)

- 修改 `vite.config.ts` 中的 `base` 选项：
  - 如果你准备发布到 `https://<USERNAME>.github.io/` ，你可以省略这一步，因为 `base` 默认就是 `"/"` 。
  - 如果你准备发布到 `https://<USERNAME>.github.io/<REPO>/` ，也就是说你的仓库地址是 `https://github.com/<USERNAME>/<REPO>` ，则将 `base` 设置为 `"/<REPO>/"`。
  - REPO 代表仓库名，USERNAME 为你的 github 用户名

如需要自定义域名，请查看 [Github Pages 文档](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)

```js
export default defineConfig({
  base: '/', // <<设置这行
  plugins: [
    // ... 其他代码 ...
  ],
  // ... 其他代码 ...
})
```

### 开启 pages 功能

在 github 仓库进入 Settings → Pages → 选择 gh-pages 分支作为 github 仓库的 Pages 分支
![Pages](/screenshots/image1.png)

## 修改页面内容

### 社交链接

在 `src/config/Config.js` 中的 `socialLinks` 可以自定义社交链接。
更换 `href` 为自己的链接

```js
  socialLinks: [
      { href: "#", title: "添加QQ", icon: "fa-qq" },
      { href: "#", title: "bilibili", icon: "fa-bilibili" },
      { href: "#", title: "前往GitHub", icon: "fa-github" },
      { href: "#", title: "前往x-twitter", icon: "fa-x-twitter" },
      { href: "#", title: "前往Telegram", icon: "fa-telegram" },
    ],
```

### 音乐

> 本项目采用了基于免费使用的 `明月浩空` 的音乐播放器，可使用明月浩空的后台管理页面自定义歌单列表
> 请在 `src/config/Config.js` 中的 `playerId` 中填写你自己的明月浩空播放器 id

```js
  // 【音乐播放器】
  // 填写明月浩空音乐播放器ID
  // 没有前往myhkw.cn获取，登录后在侧边栏的`主页`点击`我的播放器`获取ID
  // 侧边栏`歌单管理`→`我的全部歌单`→`新建歌单`可定义歌曲
  // 侧边栏`播放器管理`→`全部设置`设置你的域名授权和添加刚刚新建立的歌单
  playerId: "#############",
```

### 网站背景

使用自定义外部链接的可以在 `src/config/Config.ts` 中的 `backgroundImg` 中自定义.

```ts
  // 【背景图片】
  // 填写背景图片链接
  backgroundImg: "#",
```

### 游戏页面

在 `src/config/Config.js` 中的 `games` 中自定义游戏信息

```ts
  games: [
    {
      // 游戏简称
      gameclass: "#",
      // 角色名称
      playerName: "#",
      // 角色等级
      playerLevel: "LV.#",
      // 角色头像
      avatar: "#",
      // 游戏名称
      gameName: "#",
      // 游戏图标
      gameIcon: "#",
      // 游戏UID
      gameUID: "UID:##########",
      // 游戏服务器
      gameServer: "#",
      // 游戏活跃信息
      gameActive: [
        { value: "100", label: "活跃天数" },
        { value: "100", label: "角色数" },
        { value: "100", label: "成就" }
      ]
    },
  ],
```

### 番剧

番剧页面使用 Bangumi 的 api 接口实时更新。
感谢[Bangumi](https://bangumi.github.io/api/)的 API 接口

## 技术栈

- [Vue](https://cn.vuejs.org/)
- [Vite](https://vitejs.cn/vite3-cn/)
- [Pinia](https://pinia.vuejs.org/zh/)
- [typeit](https://github.com/alexmacarthur/typeit)
- [Vue-router](https://router.vuejs.org/zh/)
- [Vue DevTools](https://devtools-next.vuejs.org/)
- [Vue3toastify](https://vue3-toastify.netlify.app/)

## API

- [Bangumi](https://bangumi.github.io/api/)
- [Hitokoto](https://hitokoto.cn/)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=xiaoqvan/xiaoqvan.github.io&type=Date)](https://star-history.com/#xiaoqvan/xiaoqvan.github.io&Date)
