'''
Date: 2024-01-10 16:43:15
LastEditors: XQxiaoqvan xiaoqvandd@qq.com
LastEditTime: 2024-01-12 22:12:52
'''
import datetime
import requests
import json
import os
import pytz

# 获取中国的时区对象
china_timezone = pytz.timezone('Asia/Shanghai')

# 使用中国时区获取当前时间
china_time = datetime.datetime.now(china_timezone).strftime('%Y-%m-%d')

# 发送请求获取JSON数据
url = "https://api.dandanplay.net/api/v2/bangumi/shin"
headers = {"Accept": "application/json"}  # 修改为接受JSON
response = requests.get(url, headers=headers)
response.raise_for_status()

# 解析JSON数据
data = json.loads(response.text)
# 初始化星期分类字典
weekdays = {i: [] for i in range(7)}

# 读取所有BangumiIntro
for bangumi_intro in data['bangumiList']:
    anime_title = bangumi_intro['animeTitle']
    image_url = bangumi_intro['imageUrl']
    air_day = int(bangumi_intro['airDay'])
    rating = bangumi_intro.get('rating', 'N/A')  # 使用get以处理没有评分的情况
    # 将数据按星期分类
    weekdays[air_day].append((anime_title, image_url, str(rating)))  # 将rating转换为字符串并添加到元组中

# 开始构建HTML内容
html_content = f"""<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>每日番剧详细</title>
</head>
<body>
    <div class='fanjv-all' id='fanjv-python'>
        <div class='fanjv-top'>
            <div class='fanjv-top-1'>
                <div class='fanjv-header'>
                    <h1>番剧</h1>
                </div>
                <div class='fanjv-scrq'>
                    <p>更新时间：{china_time}</p>
                </div>
            </div>
        </div>
        <div class='fanjv-times'>
"""

# 星期标题
day_names = ["日", "一", "二", "三", "四", "五", "六"]
for day_name in day_names:
    html_content += f"<div><p class='today-header'><span id='xq'>星期</span>{day_name}</p></div>"

html_content += "</div><div class='fanjv-main'>"

# 按星期顺序生成内容
for day in range(7):
    html_content += f"<div id='day-{day}' class='day-container'><div class='anime-list'>"
    # 番剧信息
    for anime_title, image_url, rating in weekdays[day]:
        html_content += f"""
            <div class='anime-container'>
                <img alt='{anime_title}' class='anime-image' src='{image_url}'>
                <div class='anime-title'>{anime_title}</div>
                <div class="anime-rating">{rating}</div>
            </div>
        """
    html_content += "</div></div>"  # 关闭anime-list和day-container div

html_content += "</div></div></body></html>"

# 确保目录存在
os.makedirs('fanjv', exist_ok=True)

# 写入文件
with open("fanjv/index.html", "w", encoding="utf-8") as file:
    file.write(html_content)

print("HTML文件已生成为 index.html")
