/*!
 * by.xiaoqvan
 * 魔改 https://myhkw.cn 播放器
 * 基于原版明月浩空播放器的音乐
 * 隐藏了明月浩空播放器，获取了播放器的数据用于网页内的播放器
 * 只对明月浩空的播放器进行了隐藏，没有修改内容，都是靠读取。
 */
import Config from '@/config/Config'
const myhkScript = document.createElement('script')
myhkScript.src = `https://myhkw.cn/api/player/${Config.playerId}` // 使用配置文件中的playerId
myhkScript.id = 'myhk'
myhkScript.setAttribute('key', Config.playerId) // 使用配置文件中的playerId
myhkScript.setAttribute('m', '1')
document.head.appendChild(myhkScript)

myhkScript.onload = () => {
  hideElements()
}
const hideElements = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // 隐藏 #myhkplayer
        const myhkplayerDiv = document.getElementById('myhkplayer')
        if (myhkplayerDiv) {
          myhkplayerDiv.style.visibility = 'hidden'
        }

        // 隐藏 #myhkLrc
        const myhkLrcDiv = document.getElementById('myhkLrc')
        if (myhkLrcDiv) {
          myhkLrcDiv.style.display = 'none'
        }

        // 隐藏 #myhkTips
        const myhkTipsDiv = document.getElementById('myhkTips')
        if (myhkTipsDiv) {
          myhkTipsDiv.style.display = 'none'
        }
      }
    })
  })

  const config = { childList: true, subtree: true }
  observer.observe(document.body, config)
}
