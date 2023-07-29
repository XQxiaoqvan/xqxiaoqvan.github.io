// 动画页面
// api接口：Bangumi
import axios from 'axios';

export interface CalendarItem {
    id: number;
    url: string;
    images: { large: string } | null;
    name_cn: string | null;
    name: string;
    rating: { score: number } | null;
}

export interface CalendarDay {
    weekday: { id: number; cn: string };
    items: CalendarItem[];
}

export async function fetchCalendarData(): Promise<CalendarDay[]> {
    const cachedData = localStorage.getItem('calendarData');
    const lastFetchTime = localStorage.getItem('lastFetchTime');
    const currentTime = new Date().getTime();

    if (cachedData && lastFetchTime && currentTime - parseInt(lastFetchTime) < 86400000) {
        return JSON.parse(cachedData) as CalendarDay[];
    } else {
        try {
            const response = await axios.get<CalendarDay[]>('https://api.bgm.tv/calendar');
            localStorage.setItem('calendarData', JSON.stringify(response.data));
            localStorage.setItem('lastFetchTime', currentTime.toString());
            return response.data;
        } catch (error) {
            console.error('API 请求失败:', error);
            throw error;
        }
    }
}