var backgroundLinks = [
    "https://link.jscdn.cn/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L3AveGlhb3F2YW5fMzY1L0VVcVptdUVQeWVWRmxTaVVWWG9hZ000QjBPaVRLcTNOdXlsUGVZQ2RTaEFWcUE_ZT1IeEVjdmY.webp",
    "https://link.jscdn.cn/sharepoint/aHR0cHM6Ly9tZW5taWFvY3ktbXkuc2hhcmVwb2ludC5jb20vOnU6L3AveGlhb3F2YW5fMzY1L0VZM2NGNU1wVUNSSm9qTkZYWGhJMkN3Ql9JUEowVDIwbDhudHZ4X2xtcG02aGc_ZT1PV1F2ck0.webp"
    // 添加更多链接...
];
$(document).ready(function() {
    // 随机选择一个背景链接
    var randomIndex = Math.floor(Math.random() * backgroundLinks.length);
    var randomBackground = backgroundLinks[randomIndex];

    // 将随机选择的链接应用为背景
    $('body').css('background', 'url(' + randomBackground + ') no-repeat center center fixed');
    $('body').css('background-size', 'cover');
});
