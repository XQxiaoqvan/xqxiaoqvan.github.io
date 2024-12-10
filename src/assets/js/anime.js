// 动画页面
// api接口：Bangumi
import axios from 'axios'

export class CalendarItem {
  constructor(id, url, images, name_cn, name, rating) {
    this.id = id
    this.url = url
    this.images = images
    this.name_cn = name_cn
    this.name = name
    this.rating = rating
  }
}

export class CalendarDay {
  constructor(weekday, items) {
    this.weekday = weekday // { id: number, cn: string }
    this.items = items // CalendarItem[]
  }
}

export async function fetchCalendarData() {
  const cachedData = localStorage.getItem('calendarData')
  const lastFetchTime = localStorage.getItem('lastFetchTime')
  const currentTime = new Date().getTime()

  if (cachedData && lastFetchTime && currentTime - parseInt(lastFetchTime) < 86400000) {
    return JSON.parse(cachedData)
  } else {
    try {
      const response = await axios.get('https://api.bgm.tv/calendar')
      localStorage.setItem('calendarData', JSON.stringify(response.data))
      localStorage.setItem('lastFetchTime', currentTime.toString())
      return response.data
    } catch (error) {
      console.error('API 请求失败:', error)
      throw error
    }
  }
}
