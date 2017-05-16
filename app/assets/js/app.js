
// 点击关闭app按钮
$("#close_app").click(function () {
    app.quit();
});


// 最小化
$("#minimize_app").click(function () {
    BrowserWindow.getFocusedWindow().minimize()
});


// 最大化
$("#maximize_app").click(function () {
    var win = BrowserWindow.getFocusedWindow()
    if (win.isMaximized()) {
        win.unmaximize()
    } else {
        win.maximize()
    }
});
