import datetime
import requests
import xml.etree.ElementTree as ET
import pytz
import os

# 获取中国的时区对象
china_timezone = pytz.timezone('Asia/Shanghai')

# 使用中国时区获取当前时间
china_time = datetime.datetime.now(china_timezone)

# 发送请求获取XML数据
url = "https://api.dandanplay.net/api/v2/homepage?filterAdultContent=true"
headers = {"Accept": "application/xml"}
response = requests.get(url, headers=headers)
response.raise_for_status()

# 解析XML数据
root = ET.fromstring(response.content)

# 初始化星期分类字典
weekdays = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []}

# 读取所有BangumiIntro
for bangumi_intro in root.find(".//shinBangumiList").iter("BangumiIntro"):
    anime_title = bangumi_intro.find("animeTitle").text
    image_url = bangumi_intro.find("imageUrl").text
    air_day = int(bangumi_intro.find("airDay").text)

    # 将数据按星期分类
    weekdays[air_day].append((anime_title, image_url))

# 生成HTML
html_content = "<html>"
html_content = '<head>'
html_content = '<title>每日番剧详细</title>'
html_content = '<style>'
html_content += """
    .anime-container {
        position: relative;
        display: inline-block;
        margin: 3px; /* 设置图片容器之间的间距 */

     }
    .anime-title-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        color: white;
        padding: 10px;
        box-sizing: border-box;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.3); /* 半透明背景颜色 */
        backdrop-filter: blur(10px); /* 添加模糊玻璃效果 */
    }
    .anime-title {
        text-align: center; /* 居中文字 */
    }
    .anime-image {
        width: 300px;
        height: 410px; /* 设置统一的高度 */
        object-fit: cover; /* 填充整个框，保持纵横比，可能会被裁剪 */
        border-radius: 10px; /* 添加10px的圆角 */
    }
    .flex-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 7px; /* 适当的间距 */
    }

    .today-header {
        background-color: #ccc; /* 灰色背景 */
        border-radius: 5px; /* 圆角 */
        display: inline-block; /* 让标题只占据内容的宽度 */
        padding: 5px 10px; /* 适当的内边距 */
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5); /* 阴影效果 */
    }
"""

html_content += "</style>"
html_content += """
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // 生成1到10的随机数
        var randomNum = Math.floor(Math.random() * 10) + 1;

        // 设置背景图片链接
        var backgroundImageUrl = 'https://xiaoqvan.top/zhuye/img/background' + randomNum + '.webp';

        // 应用背景样式
        document.body.style.backgroundImage = 'url(' + backgroundImageUrl + ')';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
    });
</script>
"""
html_content +='</head><body>'
# 首页头部标题
html_content += """
<table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
        <td style="background: rgba(255, 255, 255, 0.7); border-bottom: 1px solid #ccc; padding: 10px 20px; border-radius: 5px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td>
                        <img src="https://www.dandanplay.com/img/logo.png" alt="网站Logo" style="max-height: 50px;">
                    </td>
                    <td>
                        <a href="https://github.com/XQxiaoqvan/Daily-drama-push" style="text-decoration: none; color: #333; font-size: 16px;">
                            GitHub
                        </a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>


"""
# 内容部分
# 获取今天的星期几
today = (datetime.datetime.now(china_timezone).weekday() + 1) % 7
# 在控制台输出今天是星期几用于调试取消注释即可
# print(today)

# 按星期顺序生成内容
for day in range(7):
    if day == today:
        day_name = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][day]
        html_content += f"""
            <div class='flex-container'>
                <h1 class='today-header'>{day_name}</h1>
            </div>
        """
        #番剧信息
        for anime_title, image_url in weekdays[day]:
            html_content += f"""
           <div class='anime-container'>
              <img class='anime-image' src='{image_url}'>
              <div class='anime-title-container'>
                  <div class='anime-title'>{anime_title}</div>
              </div>
          </div>
        """
# 将当前日期添加到 HTML 内容中
html_content += f"<p>生成日期：{china_time.strftime('%Y-%m-%d %H:%M:%S')}</p>"

html_content += "</body></html>"

# 获取当前脚本的路径
script_dir = os.path.dirname(os.path.realpath(__file__))

# 生成HTML文件的路径
html_file_path = os.path.join(script_dir, 'FJ.html')

# 将HTML内容写入文件
with open(html_file_path, 'w', encoding='utf-8') as file:
    file.write(html_content)

print(f'文件生成成功！路径：{html_file_path}')