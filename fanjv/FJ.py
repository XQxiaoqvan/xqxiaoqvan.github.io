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
url = "https://api.dandanplay.net/api/v2/bangumi/shin"
headers = {"Accept": "application/xml"}
response = requests.get(url, headers=headers)
response.raise_for_status()

# 解析XML数据
root = ET.fromstring(response.content)

# 初始化星期分类字典
weekdays = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []}

# 读取所有BangumiIntro
for bangumi_intro in root.find(".//bangumiList").iter("BangumiIntro"):
    anime_title = bangumi_intro.find("animeTitle").text
    image_url = bangumi_intro.find("imageUrl").text 
    air_day = int(bangumi_intro.find("airDay").text)
    rating = bangumi_intro.find("rating").text
    # 将数据按星期分类
    weekdays[air_day].append((anime_title, image_url, rating))  # 将rating也添加到元组中

# 生成HTML
html_content = "<html>"
html_content = "<head>"
html_content += """
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">'
"""
html_content += '<title>每日番剧详细</title>'
html_content += '<style>'
html_content += """
    @media screen and (max-width: 600px) {
  .anime-container {
    width: 47.6%; /* 在小屏幕上，一排只显示两个 */
  }
  .anime-image {
    max-width: 100%;
    max-height: 280px;
    object-fit: cover; /* 填充整个框，保持纵横比，可能会被裁剪 */
}
}
    .anime-container {
        position: relative;
        display: inline-block;
        margin: 3px; /* 设置图片容器之间的间距 */

     }
    .anime-container:hover {
    border-radius: 10px; /* 圆角 */
    transform: translateY(-10px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transition: transform 0.4s ease;
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
        width: 250px;
        height: 360px; /* 设置统一的高度 */
        object-fit: cover; /* 填充整个框，保持纵横比，可能会被裁剪 */
        border-radius: 10px; /* 添加10px的圆角 */
    }
    .anime-rating {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 30px; /* 你可以根据需要调整字体大小 */
  }
    .flex-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 7px; /* 适当的间距 */
    }

    .today-header {
        border-bottom: 1px solid #ccc;
        border-radius: 5px; /* 圆角 */
        display: inline-block; /* 让标题只占据内容的宽度 */
        padding: 5px 10px; /* 适当的内边距 */
        background: rgba(255, 255, 255, 0.7);
    }
.footer {
    width: 100%;
    padding: 10px 0;
    text-align: center;
    color: #ffffff;
    border-radius: 5px; /* 圆角 */
    backdrop-filter: blur(10px); /* 添加模糊玻璃效果 */
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5); /* 背景颜色，根据需要调整 */
    color: inherit;
    text-decoration: none;
}
.power {
    color: #ffffff; /* 设置文字颜色为白色 */
}
.power a {
    color: #ffffff; /* 设置链接文字颜色为白色 */
    text-decoration: none; /* 取消下划线 */
}
"""

html_content += "</style>"
html_content += """
<script>
window.onload = function() {
    var imageLinks = [
        "https://link.jscdn.cn/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L3AveGlhb3F2YW5fMzY1L0VVcVptdUVQeWVWRmxTaVVWWG9hZ000QjBPaVRLcTNOdXlsUGVZQ2RTaEFWcUE_ZT1IeEVjdmY.webp",
        "https://link.jscdn.cn/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L3AveGlhb3F2YW5fMzY1L0VZM2NGNU1wVUNSSm9qTkZYWGhJMkN3Ql9JUEowVDIwbDhudHZ4X2xtcG02aGc_ZT1PV1F2ck0.webp"
    ];

    // 检查本地存储中是否已经保存了链接
    var cachedImageUrl = localStorage.getItem('backgroundImageUrl');

    if (cachedImageUrl) {
        document.body.style.backgroundImage = "url('" + cachedImageUrl + "')";
    } else {
        var randomIndex = Math.floor(Math.random() * imageLinks.length);
        var randomImageUrl = imageLinks[randomIndex];

        // 保存链接到本地存储
        localStorage.setItem('backgroundImageUrl', randomImageUrl);

        document.body.style.backgroundImage = "url('" + randomImageUrl + "')";
    }

    // 设置背景图片裁剪为屏幕大小
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";

};
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
                    <td style="text-align: center;">
                <a href="https://github.com/XQxiaoqvan/Daily-drama-push" class="text-decoration-none" target="_blank" style="color: #000000; text-decoration: none;"
                            rel="nofollow"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                              </svg>GitHub
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
                <h1 class='today-header'>今天是{day_name}</h1>
            </div>
        """
        #番剧信息
        for anime_title, image_url, rating in weekdays[day]:
            html_content += f"""
           <div class='anime-container'>
              <img class='anime-image' src='{image_url}'>
              <div class='anime-title-container'>
                  <div class='anime-title'>{anime_title}</div>
              </div>
              <div class="anime-rating">{rating}</div>
          </div>
        """
# 将当前日期添加到 HTML 内容中
html_content += f"<p>生成日期：{china_time.strftime('%Y-%m-%d %H:%M:%S')}</p>"

# 底部栏
html_content += """
<footer class="footer">
    <div class="power">
                <span id="power">Copyright&nbsp;&copy;
                    <script>
                        document.write((new Date()).getFullYear());
                    </script>
                    <a href="https://github.com/XQxiaoqvan" id="power-text">xiaoqvan</a>
                </span>
                <!-- 站点备案 -->
                <!--<a href="https://beian.miit.gov.cn" id="beian" target="_blank">&amp;&nbsp;备ICP：</a>-->
                <a href="https://pages.github.com" class="text-decoration-none" target="_blank"
                            rel="nofollow">
                            &amp;&nbsp;本网站托管于 GitHub Pages
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                              </svg></a>
            </div>
</footer>

"""

html_content += "</body></html>"

# 保存HTML内容到文件
with open("FJ.html", "w", encoding="utf-8") as file:
    file.write(html_content)

print("HTML文件已生成为 FJ.html")
