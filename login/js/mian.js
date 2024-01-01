// BY: xiaoqvan
// 2024-1-1
// Copyright © 2023 萌喵次元社版权所有


var loginVisible = true;

function toggleVisibility() {
    var loginDiv = document.getElementById("login");
    var regDiv = document.getElementById("reg");

    // 切换显示状态
    if (loginVisible) {
        loginDiv.style.display = "none";
        regDiv.style.display = "block";
    } else {
        loginDiv.style.display = "block";
        regDiv.style.display = "none";
    }

    // 切换状态变量
    loginVisible = !loginVisible;
}

function checkInput() {
    var usernameInput = document.getElementById("login-username").value;
    var regTip = document.getElementById("reg-tip-2");

    // 检查输入是否为空
    if (usernameInput.trim() === "") {
        regTip.innerHTML = "内容为空!";
    } else {
        // 检查是否为电话号码或邮箱
        if (/^\d{11}$/.test(usernameInput)) {
            // 发送电话号码的POST请求
            sendData('media', usernameInput);
        } else if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(usernameInput)) {
            // 发送邮箱的POST请求
            sendData('mail', usernameInput);
        } else {
            regTip.innerHTML = "请输入正确的手机号或邮箱";
        }
    }
}
// 登录请求代码
function sendData(className, data) {
    // 发送POST请求的逻辑，使用 fetch 或其他适当的方式发送请求
    // 以下是使用 fetch 的示例
    fetch('http://127.0.0.1:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ class: className, data: data }),
        })
        .then(response => response.json())
        .then(data => {
            // 处理服务器响应的逻辑
            console.log('服务器响应:', data);
        })
        .catch(error => {
            console.error('请求错误:', error);
        });
}

var onSubmit = function(token) {
    console.log('成功!');
};

var onloadCallback = function() {
    grecaptcha.render('submit', {
        'sitekey': '6LdzfikpAAAAABsUkvALU1we86ShAlFSnGt0GMMP',
        'callback': onSubmit
    });
};