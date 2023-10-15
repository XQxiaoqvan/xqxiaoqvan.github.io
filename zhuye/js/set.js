// 创建一个包含所有背景链接的数组
var backgroundLinks = [
    "https://link.jscdn.cn/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L3AveGlhb3F2YW5fMzY1L0VVcVptdUVQeWVWRmxTaVVWWG9hZ000QjBPaVRLcTNOdXlsUGVZQ2RTaEFWcUE_ZT1IeEVjdmY.webp",
    "https://link.jscdn.cn/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L3AveGlhb3F2YW5fMzY1L0VZM2NGNU1wVUNSSm9qTkZYWGhJMkN3Ql9JUEowVDIwbDhudHZ4X2xtcG02aGc_ZT1PV1F2ck0.webp",
    "https://link.jscdn.cn/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L3AveGlhb3F2YW5fMzY1L0VlTW1EWW9fREpSRGdfOGdDWEZ4NG1vQjhqMXl3cnl4dlcwR0gwUVBwc242Z2c_ZT1CODY0Wko.webp",
    "https://link.jscdn.cn/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L3AveGlhb3F2YW5fMzY1L0VZclIyYTVhR1ZKQnYwQTBldU01bHNJQkh3VkdWQkRZUmlINmNtME1FMjYwSHc_ZT05alVmT3k.webp",
    "https://link.jscdn.cn/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L3AveGlhb3F2YW5fMzY1L0VVOUMwbllCSGR0RnJfT1dmMnRJTjNvQktHajFpT2JqS3dvTVFzSjJqT1Ruenc_ZT1qd0JCeTg.webp"
];

// 清除本地存储中的背景链接
localStorage.removeItem("backgroundLink");

// 尝试从本地存储中获取背景链接
var storedBackgroundLink = localStorage.getItem("backgroundLink");

// 如果本地存储中有背景链接，则使用它，否则随机选择一个
var selectedBackgroundLink = storedBackgroundLink || backgroundLinks[Math.floor(Math.random() * backgroundLinks.length)];

// 将选定的链接设置为背景图片
var bgElement = document.getElementById("bg");
bgElement.src = selectedBackgroundLink;

// 将选定的链接存储到本地
localStorage.setItem("backgroundLink", selectedBackgroundLink);