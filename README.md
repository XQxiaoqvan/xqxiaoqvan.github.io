# 介绍

这里是权酱托管在 Github 的个人网站

##开始消极维护等待使用vue重新编写

### 主页界面

xiaoqvan 自写个人主页
![主页](/screenshots/1.png)

### 预览

- [权的主页](https://www.xiaoqvan.top)

### 功能

- [x] Hitokoto 一言
- [x] 日期及时间
- [x] 实时天气
- [x] 音乐播放器
- [ ] 移动端完全适配
- [x] 番剧内容

### 社交链接

在 `index.html` 中可以自定义社交链接。
更换#号里的链接为自己的链接

```html
<div>
  <a href="#" title="QQ">
    <i class="fa-brands fa-qq"></i>
  </a>
</div>
```

### 天气

天气及地区获取需要 `高德开放平台` API
还有一个备用的 `腾讯地图` API

- 前往 [高德开放平台控制台](https://console.amap.com/dev/index) 创建一个 `Web 服务` 类型的 `Key`，并将 `Key` 填入 `js`目录下的 `main.js` 中的 `apiKeyAmap`
- 前往 [腾讯位置服务控制台](https://console.amap.com/dev/index) 创建一个 `WebServiceAPI` 类型的 `Key`，域名白名单填入你自己的域名并将 `Key` 填入 `js` 目录下的 `main.js` 中的`apiKeyTencent` 里面
- 注意 `*` 腾讯的 API 需要分配额度

```js
const apiKeyAmap = "xxxxxxxxxxxxx"; // 高德地图key
const apiKeyTencent = "xxxxxxxxxxxxx"; // 腾讯地图备用key
```

也可自行更换其他方式

### 音乐

> 本项目采用了基于 `明月浩空` 的音乐播放器，可使用明月浩空的后台管理页面自定义歌单列表
> 请在 `js` 目录下的 `music.js` 中填写你自己的明月浩空播放器 id

```js
$(document).ready(function () {
  var myhkScript = $("<script/>", {
    //  https://myhkw.cn/api/player/后面填写自己的明月浩空播放器 id
    src: "https://myhkw.cn/api/player/168460845260",
    id: "myhk",
    //这里也是一样的
    key: "168460845260",
    m: "1",
  });

  $("head").append(myhkScript);
});
```

### 网站背景

使用自定义外部链接的可以在 `js` 目录下的 `bg.js` 里的 `var backgroundLinks = []` 里面自定义，每次加载网页会随机切换

想使用固定的背景的可以在 `index.html` 中的背景 `img` 里面的 `src` 里面填入你自己的图片

```html
<img
  id="bg"
  onerror="this.classList.add('error');"
  src="你自己的图片"
  alt="bg" />
```

### 番剧

番剧页面使用本人自写 Python 脚本加 Github Actions 实现每天实时更新。
感谢[弹弹 play 开放平台](https://github.com/kaedei/dandanplay-libraryindex/blob/master/api/OpenPlatform.md)的 API 接口
