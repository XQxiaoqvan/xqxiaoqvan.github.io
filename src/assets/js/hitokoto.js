import axios from 'axios'

export default async function getHitokoto() {
  try {
    const { data } = await axios.get('https://v1.hitokoto.cn')
    return data
  } catch (error) {
    throw new Error(`获取一言失败: ${error.message}`)
  }
}
