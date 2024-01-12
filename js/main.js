/*
 * @Date: 2024-01-08 18:51:52
 * @LastEditors: XQxiaoqvan xiaoqvandd@qq.com
 * @LastEditTime: 2024-01-12 15:45:28
 */

//弹窗样式
iziToast.settings({
    timeout: 10000,
    progressBar: false,
    close: false,
    closeOnEscape: true,
    position: 'topCenter',
    transitionIn: 'bounceInDown',
    transitionOut: 'flipOutX',
    displayMode: 'replace',
    layout: '1',
    backgroundColor: '#ffffffad',
    titleColor: '#000000',
    messageColor: '#000000',
    icon: 'Fontawesome',
    iconColor: '#000000',
});


//获取一言
function fetchHitokoto() {
    $.ajax({
        url: 'https://v1.hitokoto.cn?max_length=24',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // 使用 jQuery 更新元素的内容
            $('#hitokoto_text').html(data.hitokoto);
            $('#from_text').html(data.from);
        },
        error: function(error) {
            console.error(error);
        }
    });
}

$(document).ready(function() {
    fetchHitokoto();
});

// 时间
$(document).ready(function() {
    function updateTime() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();

        // 添加前导零，确保时、分、秒都是两位数
        hours = (hours < 10 ? "0" : "") + hours;
        minutes = (minutes < 10 ? "0" : "") + minutes;
        seconds = (seconds < 10 ? "0" : "") + seconds;

        var timeString = hours + ":" + minutes + ":" + seconds;

        // 更新时间显示
        $(".time-text").text(timeString);

        // 更新日期显示，这里只是示例，你可能需要根据实际需求修改日期的获取方式
        var dateString = currentTime.getFullYear() + "&nbsp;年&nbsp;" + (currentTime.getMonth() + 1) + "&nbsp;月&nbsp;" + currentTime.getDate() + "&nbsp;日&nbsp;";
        $(".time-info span:first-child").html(dateString);

        // 更新星期显示，根据当前时间获取星期几
        var weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var weekdayString = weekdays[currentTime.getDay()];
        $(".weekday").text(weekdayString);
    }

    // 初始化页面加载时即显示实时时间
    updateTime();

    // 每隔一秒更新一次时间
    setInterval(updateTime, 1000);
});

// 获取天气
// 请前往高德开放平台 https://lbs.amap.com 获取Web服务key
// 请前往腾讯位置服务 https://lbs.qq.com 获取WebService API服务key，注：需要分配key额度：ip定位
const apiKeyAmap = "0ea4f86a43f78a2972955f0973f05fb0"; // 高德地图key
const apiKeyTencent = "FF4BZ-QFDRB-FEIUN-NNMEF-3SKIV-QDBE3"; // 腾讯地图备用key

const amapIpApiUrl = `https://restapi.amap.com/v3/ip?key=${apiKeyAmap}`;
const tencentIpApiUrl = `https://apis.map.qq.com/ws/location/v1/ip?key=${apiKeyTencent}&output=jsonp`;

function jsonp(url, callbackName) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const callback = callbackName || `jsonpCallback_${Date.now()}`;

        window[callback] = data => {
            delete window[callback];
            document.body.removeChild(script);
            resolve(data);
        };

        script.src = `${url}&callback=${callback}`;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

function getWeather() {
    $.ajax({
        url: amapIpApiUrl,
        dataType: 'json',
        success: function(data) {
            let adcode;

            // 如果adcode为空数组或没有值，尝试备用API
            if (!data.adcode || (Array.isArray(data.adcode) && data.adcode.length === 0)) {
                console.error("获取adcode时返回错误值为空数组或者未定义，尝试备用API");
                return jsonp(`${tencentIpApiUrl}&callback=jsonpCallback`);
            }

            adcode = data.adcode;

            // 继续处理原始API返回的数据
            Promise.resolve(adcode)
                .then(adcode => {
                    // 如果备用API的adcode仍为空数组，输出错误信息并中止函数执行
                    if (!adcode || (Array.isArray(adcode) && adcode.length === 0)) {
                        console.error("备用原获取adcode时返回错误值为空数组");
                        return;
                    }

                    const weatherApiUrl = `https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${apiKeyAmap}`;

                    $.ajax({
                        url: weatherApiUrl,
                        dataType: 'json',
                        success: function(data) {
                            const weatherInfo = data.lives[0];
                            const city = weatherInfo.city.replace("市", "");
                            const weather = weatherInfo.weather;
                            const temperature = weatherInfo.temperature + "℃";
                            const winddirection = weatherInfo.winddirection + "风";
                            const windpower = weatherInfo.windpower + "级";

                            // 更新页面元素
                            $("#city_text").text(city);
                            $("#wea_text").text(weather);
                            $("#tem_text").text(temperature);
                            $("#win_text").text(winddirection);
                            $("#win_speed").text(windpower);
                        },
                        error: function(error) {
                            console.error('获取天气信息时发生错误,请不要使用国外ip，或者内网ip地址访问');
                        }
                    });
                })
                .catch(error => console.error('获取adcode时发生错误：', error));
        },
        error: function(error) {
            console.error('获取adcode时发生错误：', error);
        }
    });
}

// 调用函数获取天气信息
getWeather();

let wea = 0;
$('#upWeather').click(function() {
    if (wea === 0) {
        wea = 1;
        let index = setInterval(function() {
            wea--;
            if (wea === 0) {
                clearInterval(index);
            }
        }, 60000);
        getWeather();
        iziToast.show({
            timeout: 2000,
            icon: "fa-solid fa-cloud-sun",
            message: '实时天气已更新'
        });
    } else {
        iziToast.show({
            timeout: 1000,
            icon: "fa-solid fa-circle-exclamation",
            message: '请稍后再更新哦'
        });
    }
});

// JSONP 回调函数
function jsonpCallback(data) {
    // 处理从腾讯地图 API 返回的数据
    const ad_info = data.result.ad_info;
    if (ad_info && ad_info.adcode) {
        const adcode = ad_info.adcode;
        getWeatherByAdcode(adcode);
    } else {
        console.error("备用原获取adcode时返回错误值为空数组");
        iziToast.show({
            timeout: 1000,
            icon: "fa-solid fa-circle-exclamation",
            message: '天气获取失败'
        });
    }
}


// 使用adcode获取天气信息
function getWeatherByAdcode(adcode) {
    // 构建天气API请求URL
    const weatherApiUrl = `https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${apiKeyAmap}`;

    $.ajax({
        url: weatherApiUrl,
        dataType: 'json',
        success: function(data) {
            const weatherInfo = data.lives[0];
            const city = weatherInfo.city.replace("市", "");
            const weather = weatherInfo.weather;
            const temperature = weatherInfo.temperature + "℃";
            const winddirection = weatherInfo.winddirection + "风";
            const windpower = weatherInfo.windpower + "级";

            // 更新页面元素
            $("#city_text").text(city);
            $("#wea_text").text(weather);
            $("#tem_text").text(temperature);
            $("#win_text").text(winddirection);
            $("#win_speed").text(windpower);

            // 根据天气情况更改天气图片
            // 天气图标的基础URL
            const baseWeatherIconUrl = "https://weather.cma.cn/static/img/w/icon/";

            // 定义天气对应的图标文件名
            const weatherIcons = {
                "晴": "w0.png",
                "多云": "w1.png",
                "阴": "w2.png",
                "小雨": "w7.png"
            };

            // 根据天气情况获取对应的图标文件名，如果未定义则显示提示信息
            const iconFileName = weatherIcons[weather];
            if (iconFileName) {
                // 构建完整的天气图标URL
                const weatherIconUrl = baseWeatherIconUrl + iconFileName;

                // 更新天气图标
                $("#weather-icon").attr("src", weatherIconUrl);
            } else {
                // 未定义的天气情况，显示提示信息
                iziToast.show({
                    timeout: 3000,
                    icon: "fa-solid fa-cloud",
                    message: '天气图标未被定义，请联系网站管理员'
                });
            }
        },
        error: function(error) {
            console.error('获取天气信息时发生错误，请不要使用国外IP，或者内网IP地址访问');
        }
    });
}



//控制台输出
let styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`
let styleTitle2 = `
font-size:12px;
color: rgb(244,167,89);
`
let styleContent = `
color: rgb(30,152,255);
`
let title1 = ''
let title2 = `
 _  _  __   __    __    __   _  _   __   __ _ 
( \\/ )(  ) / _\\  /  \\  /  \\ / )( \\ / _\\ (  ( \\
 )  (  )( /    \\(  O )(  O )\\ \\/ //    \\/    /
(_/\\_)(__)\\_/\\_/ \\__/  \\__\\) \\__/ \\_/\\_/\\_)__)                             
`
let content = `
2024-01-8
主页:  https://www.xiaoqvan.top
Github:  https://github.com/XQxiaoqvan/xqxiaoqvan.github.io
`
console.log(`%c${title2}
%c${content}`, styleTitle2, styleContent)