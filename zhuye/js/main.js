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
    backgroundColor: '#00000040',
    titleColor: '#efefef',
    messageColor: '#efefef',
    icon: 'Fontawesome',
    iconColor: '#efefef',
});

/* 鼠标样式 */
const body = document.querySelector("body");
const element = document.getElementById("g-pointer-1");
const element2 = document.getElementById("g-pointer-2");
const halfAlementWidth = element.offsetWidth / 2;
const halfAlementWidth2 = element2.offsetWidth / 2;

function setPosition(x, y) {
    element2.style.transform = `translate(${x - halfAlementWidth2 + 1}px, ${y - halfAlementWidth2 + 1}px)`;
}

body.addEventListener('mousemove', (e) => {
    window.requestAnimationFrame(function() {
        setPosition(e.clientX, e.clientY);
    });
});



//加载完成后执行
window.addEventListener('load', function() {

    //载入动画
    $('#loading-box').attr('class', 'loaded');
    $('#bg').css("cssText", "transform: scale(1);filter: blur(0px);transition: ease 1.5s;");
    $('.cover').css("cssText", "opacity: 1;transition: ease 1.5s;");
    $('#section').css("cssText", "transform: scale(1) !important;opacity: 1 !important;filter: blur(0px) !important");

    //用户欢迎
    setTimeout(function() {
        iziToast.show({
            timeout: 2500,
            icon: false,
            title: hello,
            message: '欢迎来到我的主页'
        });
    }, 800);

    //延迟加载音乐播放器

    //中文字体缓加载-此处写入字体源文件 （暂时弃用）
    //先行加载简体中文子集，后续补全字集
    //由于压缩过后的中文字体仍旧过大，可转移至对象存储或 CDN 加载
    // const font = new FontFace(
    //     "MiSans",
    //     "url(" + "./zhuye/font/MiSans-Regular.woff2" + ")"
    // );
    // document.fonts.add(font);

    //移动端去除鼠标样式
    if (Boolean(window.navigator.userAgent.match(/AppWebKit.*Mobile.*/))) {
        $('#g-pointer-2').css("display", "none");
    }

}, false)

setTimeout(function() {
    $('#loading-text').html("字体及文件加载可能需要一定时间")
}, 3000);



//获取一言
fetch('https://v1.hitokoto.cn?max_length=24')
    .then(response => response.json())
    .then(data => {
        $('#hitokoto_text').html(data.hitokoto)
        $('#from_text').html(data.from)
    })
    .catch(console.error)

let times = 0;
$('#hitokoto').click(function() {
    // 获取音乐播放器的 display 属性
    let musicPlayerDisplay = document.getElementById('music-player').style.display;

    // 如果音乐播放器的 display 属性不是 'none'，则禁用点击刷新一言事件
    if (musicPlayerDisplay !== 'none') {
        iziToast.show({
            timeout: 1000,
            icon: "fa-solid fa-circle-exclamation",
            message: '音乐播放器正在使用，无法刷新一言'
        });
        return;
    }

    if (times == 0) {
        times = 1;
        let index = setInterval(function() {
            times--;
            if (times == 0) {
                clearInterval(index);
            }
        }, 1000);
        fetch('https://v1.hitokoto.cn?max_length=24')
            .then(response => response.json())
            .then(data => {
                $('#hitokoto_text').html(data.hitokoto)
                $('#from_text').html(data.from)
            })
            .catch(console.error)
    } else {
        iziToast.show({
            timeout: 1000,
            icon: "fa-solid fa-circle-exclamation",
            message: '你点太快了吧'
        });
    }
});

//获取天气
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
    fetch(amapIpApiUrl)
        .then(response => response.json())
        .then(data => {
            let adcode;

            // 如果adcode为空数组或没有值，尝试备用API
            if (!data.adcode || (Array.isArray(data.adcode) && data.adcode.length === 0)) {
                console.error("获取adcode时返回错误值为空数组或者未定义，尝试备用API");
                return jsonp(`${tencentIpApiUrl}&callback=jsonpCallback`);
            }

            adcode = data.adcode;

            return Promise.resolve(adcode); // 继续处理原始API返回的数据
        })
        .then(adcode => {
            // 如果备用API的adcode仍为空数组，输出错误信息并中止函数执行
            if (!adcode || (Array.isArray(adcode) && adcode.length === 0)) {
                console.error("备用原获取adcode时返回错误值为空数组");
                return;
            }

            const weatherApiUrl = `https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${apiKeyAmap}`;

            fetch(weatherApiUrl)
                .then(response => response.json())
                .then(data => {
                    const weatherInfo = data.lives[0];
                    const city = weatherInfo.city.replace("市", "");
                    const weather = weatherInfo.weather;
                    const temperature = weatherInfo.temperature + "℃";
                    const winddirection = weatherInfo.winddirection + "风";
                    const windpower = weatherInfo.windpower + "级";

                    // 更新页面元素
                    document.getElementById("city_text").textContent = city;
                    document.getElementById("wea_text").textContent = weather;
                    document.getElementById("tem_text").textContent = temperature;
                    document.getElementById("win_text").textContent = winddirection;
                    document.getElementById("win_speed").textContent = windpower;
                })
                .catch(error => console.error('获取天气信息时发生错误,请不要使用国外ip，或者内网ip地址访问'));
        })
        .catch(error => console.error('获取adcode时发生错误：', error));
}

// 调用函数获取天气信息
getWeather();

let wea = 0;
$('#upWeather').click(function() {
    if (wea == 0) {
        wea = 1;
        let index = setInterval(function() {
            wea--;
            if (wea == 0) {
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
    }
}

// 使用adcode获取天气信息
function getWeatherByAdcode(adcode) {
    const weatherApiUrl = `https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${apiKeyAmap}`;

    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = data.lives[0];
            const city = weatherInfo.city.replace("市", "");
            const weather = weatherInfo.weather;
            const temperature = weatherInfo.temperature + "℃";
            const winddirection = weatherInfo.winddirection + "风";
            const windpower = weatherInfo.windpower + "级";

            // 更新页面元素
            document.getElementById("city_text").textContent = city;
            document.getElementById("wea_text").textContent = weather;
            document.getElementById("tem_text").textContent = temperature;
            document.getElementById("win_text").textContent = winddirection;
            document.getElementById("win_speed").textContent = windpower;
        })
        .catch(error => console.error('获取天气信息时发生错误,请不要使用国外ip，或者内网ip地址访问'));
}


//获取时间
let t = setInterval(time, 1000);

function time() {
    dt = new Date();
    let y = dt.getYear() + 1900;
    let mm = dt.getMonth() + 1;
    let d = dt.getDate();
    let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let day = dt.getDay();
    let h = dt.getHours();
    let m = dt.getMinutes();
    let s = dt.getSeconds();
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    $("#time").html(y + "&nbsp;年&nbsp;" + mm + "&nbsp;月&nbsp;" + d + "&nbsp;日&nbsp;" + "<span class='weekday'>" + weekday[day] + "</span><br>" + "<span class='time-text'>" + h + ":" + m + ":" + s + "</span>");
}

//链接提示文字
$("#social").mouseover(function() {
    $("#social").css({
        "background": "rgb(0 0 0 / 25%)",
        'border-radius': '6px',
        "backdrop-filter": "blur(5px)"
    });
    $("#link-text").css({
        "display": "block",
    });
}).mouseout(function() {
    $("#social").css({
        "background": "none",
        "border-radius": "6px",
        "backdrop-filter": "none"
    });
    $("#link-text").css({
        "display": "none"
    });
});

$("#github").mouseover(function() {
    $("#link-text").html("去 Github 看看");
}).mouseout(function() {
    $("#link-text").html("通过这里联系我");
});
$("#qq").mouseover(function() {
    $("#link-text").html("有什么事吗");
}).mouseout(function() {
    $("#link-text").html("通过这里联系我");
});
$("#email").mouseover(function() {
    $("#link-text").html("来封 Email");
}).mouseout(function() {
    $("#link-text").html("通过这里联系我");
});
$("#bilibili").mouseover(function() {
    $("#link-text").html("来 B 站看看 ~");
}).mouseout(function() {
    $("#link-text").html("通过这里联系我");
});
$("#telegram").mouseover(function() {
    $("#link-text").html("你懂的 ~");
}).mouseout(function() {
    $("#link-text").html("通过这里联系我");
});

//自动变灰
let myDate = new Date;
let mon = myDate.getMonth() + 1;
let date = myDate.getDate();
let days = ['4.4', '5.12', '7.7', '9.9', '9.18', '12.13'];
for (let day of days) {
    let d = day.split('.');
    if (mon == d[0] && date == d[1]) {
        document.write(
            '<style>html{-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);_filter:none}</style>'
        );
        $("#change").html("Silence&nbsp;in&nbsp;silence");
        $("#change1").html("今天是中国国家纪念日，全站已切换为黑白模式");
        window.addEventListener('load', function() {
            setTimeout(function() {
                iziToast.show({
                    timeout: 14000,
                    icon: "fa-solid fa-clock",
                    message: '今天是中国国家纪念日'
                });
            }, 3800);
        }, false);
    }
}

//更多页面切换
let shoemore = false;
$('#switchmore').on('click', function() {
    shoemore = !shoemore;
    if (shoemore && $(document).width() >= 990) {
        $('#container').attr('class', 'container mores');
        $("#change").html("Oops&nbsp;!");
        $("#change1").html("哎呀，这都被你发现了（ 再点击一次可关闭 ）");
    } else {
        $('#container').attr('class', 'container');
        $("#change").html("Hello&nbsp;World&nbsp;!");
        $("#change1").html("一个建立于 21 世纪的小站，存活于互联网的边缘");
    }
});

//更多页面关闭按钮
$('#close').on('click', function() {
    $('#switchmore').click();
});

//移动端菜单栏切换
let switchmenu = false;
$('#switchmenu').on('click', function() {
    switchmenu = !switchmenu;
    if (switchmenu) {
        $('#row').attr('class', 'row menus');
        $("#menu").html("<i class='fa-solid fa-xmark'></i>");
    } else {
        $('#row').attr('class', 'row');
        $("#menu").html("<i class='fa-solid fa-bars'></i>");
    }
});

//更多弹窗页面
$('#openmore').on('click', function() {
    $('#box').css("display", "block");
    $('#row').css("display", "none");
    $('#more').css("cssText", "display:none !important");
});
$('#closemore').on('click', function() {
    $('#box').css("display", "none");
    $('#row').css("display", "flex");
    $('#more').css("display", "flex");
});

//监听网页宽度
window.addEventListener('load', function() {
    window.addEventListener('resize', function() {
        //关闭移动端样式
        if (window.innerWidth >= 600) {
            $('#row').attr('class', 'row');
            $("#menu").html("<i class='fa-solid fa-bars'></i>");
            //移除移动端切换功能区
            $('#rightone').attr('class', 'row rightone');
        }

        if (window.innerWidth <= 990) {
            //移动端隐藏更多页面
            $('#container').attr('class', 'container');
            $("#change").html("Hello&nbsp;World&nbsp;!");
            $("#change1").html("一个建立于 21 世纪的小站，存活于互联网的边缘");

            //移动端隐藏弹窗页面
            $('#box').css("display", "none");
            $('#row').css("display", "flex");
            $('#more').css("display", "flex");
        }
    })
})

//移动端切换功能区
let changemore = false;
$('#changemore').on('click', function() {
    changemore = !changemore;
    if (changemore) {
        $('#rightone').attr('class', 'row menus mobile');
    } else {
        $('#rightone').attr('class', 'row menus');
    }
});

//更多页面显示关闭按钮
$("#more").hover(function() {
    $('#close').css("display", "block");
}, function() {
    $('#close').css("display", "none");
})

//屏蔽右键
document.oncontextmenu = function() {
    iziToast.show({
        timeout: 2000,
        icon: "fa-solid fa-circle-exclamation",
        message: '为了浏览体验，本站禁用右键'
    });
    return false;
}

//控制台输出
//console.clear();
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
let title1 = '無名の主页'
let title2 = `
 _____ __  __  _______     ____     __
|_   _|  \\/  |/ ____\\ \\   / /\\ \\   / /
  | | | \\  / | (___  \\ \\_/ /  \\ \\_/ / 
  | | | |\\/| |\\___ \\  \\   /    \\   /  
 _| |_| |  | |____) |  | |      | |   
|_____|_|  |_|_____/   |_|      |_|                                                     
`
let content = `
版 本 号：3.4
更新日期：2022-07-24

主页:  https://www.imsyy.top
Github:  https://github.com/imsyy/home
`
console.log(`%c${title1} %c${title2}
%c${content}`, styleTitle1, styleTitle2, styleContent)