var img = document.getElementById('logo-img');

img.onerror = function() {
    img.src = 'zhuye/img/tx.jpg'; // 替换为正确的本地图片路径
};




// 创建一个包含所有背景链接的数组
var backgroundLinks = [
    "https://dlink.host/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L2cvcGVyc29uYWwveGlhb3F2YW5fMzY1X21lbmdhY2dfY29tL0VabnhPZXVLMkJKRW5EQkpGdC1Xd0lnQkU5cmZ0Mnhpd2NMNUpaRTQxQnk3OGc_ZT1KZ2lnWW8.webp",
    "https://dlink.host/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L2cvcGVyc29uYWwveGlhb3F2YW5fMzY1X21lbmdhY2dfY29tL0VVcVptdUVQeWVWRmxTaVVWWG9hZ000QlN5Z0l2T1hpZ09yWkRpN3IweWkwTUE.webp",
    "https://dlink.host/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L2cvcGVyc29uYWwveGlhb3F2YW5fMzY1X21lbmdhY2dfY29tL0VlTW1EWW9fREpSRGdfOGdDWEZ4NG1vQjhRRkFxMWRhOWF4TjRwazh2RnUxdGc.webp",
    "https://dlink.host/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L2cvcGVyc29uYWwveGlhb3F2YW5fMzY1X21lbmdhY2dfY29tL0VRcXRKNGpLS0lWQ2h6NHFwZEZSQmFVQmllVHpzZDk4Qmc0R0tra3dJMEo4U1E_ZT1mU3ZhV0Y.webp",
    "https://dlink.host/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L2cvcGVyc29uYWwveGlhb3F2YW5fMzY1X21lbmdhY2dfY29tL0VZclIyYTVhR1ZKQnYwQTBldU01bHNJQkh3VkdWQkRZUmlINmNtME1FMjYwSHc.webp",
    "https://dlink.host/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L2cvcGVyc29uYWwveGlhb3F2YW5fMzY1X21lbmdhY2dfY29tL0VZX1VSVmx6Z081S25WbEg3enhNcENJQkhual9lM3M3bWhXMWtJcW90WTE0Q3c_ZT1hMGZmMjk.webp",
    "https://dlink.host/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L2cvcGVyc29uYWwveGlhb3F2YW5fMzY1X21lbmdhY2dfY29tL0VYUjRQcVRnQnM5R250R2VQRWVndDRjQk5qa21IeUx3d3EyWE1yMm9OQzh3MVE_ZT01d213dFg.webp",
    "https://dlink.host/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L2cvcGVyc29uYWwveGlhb3F2YW5fMzY1X21lbmdhY2dfY29tL0VmNGhMYXNNdU1WT2dxVWhWTVdZSTVRQkE5dnhrOHFmZjFLN2VRNUJJVFdxemc.webp",
    "https://dlink.host/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L2cvcGVyc29uYWwveGlhb3F2YW5fMzY1X21lbmdhY2dfY29tL0VVOUMwbllCSGR0RnJfT1dmMnRJTjNvQlpOZ0xsakNzZnRQWjVJMTJvY3dubFE.webp",
    "https://dlink.host/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L2cvcGVyc29uYWwveGlhb3F2YW5fMzY1X21lbmdhY2dfY29tL0VZM2NGNU1wVUNSSm9qTkZYWGhJMkN3Ql9JUEowVDIwbDhudHZ4X2xtcG02aGc.webp"
];

// 创建一个函数来检查图片链接是否有效
function checkImage(url, success, failure) {
    var img = new Image();
    img.onload = function() { success(url); };
    img.onerror = function() { failure(url); };
    img.src = url;
}

// 创建一个函数来随机设置背景图片
function setBackgroundLink(links, defaultLink) {
    if (links.length === 0) {
        // 如果所有链接都已尝试过，就使用默认链接
        setAndStoreBackgroundLink(defaultLink);
    } else {
        // 随机选择一个链接
        var index = Math.floor(Math.random() * links.length);
        var url = links[index];

        // 尝试设置背景图片
        checkImage(
            url,
            function(url) {
                // 如果链接有效，就设置背景图片
                setAndStoreBackgroundLink(url);
            },
            function(url) {
                // 如果链接无效，就从数组中移除它并尝试下一个链接
                links.splice(index, 1);
                setBackgroundLink(links, defaultLink);
            }
        );
    }
}

// 创建一个函数来设置并存储背景链接
function setAndStoreBackgroundLink(link) {
    var bgElement = document.getElementById("bg");
    bgElement.src = link;
    localStorage.setItem("backgroundLink", link);
}

// 清除本地存储中的背景链接
localStorage.removeItem("backgroundLink");

// 尝试从本地存储中获取背景链接
var storedBackgroundLink = localStorage.getItem("backgroundLink");

// 如果本地存储中有背景链接，则使用它，否则尝试设置背景链接
if (storedBackgroundLink) {
    setAndStoreBackgroundLink(storedBackgroundLink);
} else {
    var randomIndex = Math.floor(Math.random() * 11); // 生成一个0到10之间的随机整数
    setBackgroundLink(backgroundLinks, randomIndex, "zhuye/img/background" + randomIndex + ".webp");
}