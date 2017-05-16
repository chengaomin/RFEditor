
const { app } = nodeRequire('electron').remote;
const path = nodeRequire("path");
const exec = nodeRequire('child_process').exec;
const spawn = nodeRequire('child_process').spawn;
const iconv = nodeRequire('iconv-lite');
const { shell } = nodeRequire('electron');
const { BrowserWindow } = nodeRequire('electron').remote;;

var randomtime = 'RFEditor' + (new Date()).valueOf();

var temp_dir = path.join(app.getPath('temp'), randomtime);

var argfile_path = path.join(temp_dir, 'argfile.txt');

var pass_count = 0;
var fail_count = 0;


console.log(temp_dir);



function start_time() {
    $('#running-status-bar-time').timer({
        format: '%H:%M:%S'
    });
}

function stop_time() {
    $('#running-status-bar-time').timer('remove');
}

function reset_running_status() {
    $("#running-status-div").show();
    $("#running-status-progress").show();
    $("#running-status-bar-time").text("00:00:00");
    $("#running-status-bar-pass").text("0");
    $("#running-status-bar-fail").text("0");
    $("#running-status-bar-current-keyword").text("");

    $('#openreport_btn').attr("disabled", true);
    $('#openlog_btn').attr("disabled", true);

    $("#running-status-bar").attr("class", function (index, oldClass) {
        return oldClass.replace(/mdui-color-(.*?) /, 'mdui-color-grey-300 ');
    });

}

function hide_running_status_progress() {
    $("#running-status-progress").hide();
    $('#openreport_btn').attr("disabled", false);
    $('#openlog_btn').attr("disabled", false);
    $("#running-status-bar-current-keyword").text("");
    stop_time();


}

function hide_running_status() {
    $("#running-status-div").hide();
}

function runTest() {

    pass_count = 0;
    fail_count = 0;


    var inst = new mdui.Tab('#top-tab');
    inst.show('top-tab-run');

    reset_running_status();



    $('#console_log').html('');
    $('#running_log').html('');


    var checked_nodes = zTree.getCheckedNodes(true);

    argfile_data = ['--outputdir', temp_dir, '-C', 'off', '-W', parseInt($('#console_log').width() / 8).toString()]

    $.each(checked_nodes, function (index, node) {

        // console.log(index, node);

        if (node.iconSkin == 'testcase') {

            // var case_name = node.name;
            // var suite_name = node.getParentNode().name;
            // console.log(suite_name, case_name);
            get_suite_case_name(node);

            jetpack.write(argfile_path, argfile_data.join('\r\n'));

        }

    });


    const runargs = spawn('pybot.bat', ['--argumentfile', argfile_path, '--listener', 'E:/workspace/ColoRide/app/plugin/rflistener/RFListener.py:' + randomtime, $('#workspace_dir').text()]);
    console.log(runargs);
    runargs.stdout.on('data', (data) => {
        $('#console_log').append(html_encode(iconv.decode(data, 'gbk')));
        $('#console_log').scrollTop($('#console_log')[0].scrollHeight);

    });

    runargs.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    runargs.on('close', (code) => {
        console.log(`子进程退出码：${code}`);
        hide_running_status_progress();
    });



    // 开始计时
    start_time();
}

var argfile_data = [];

function get_suite_case_name(node) {

    var case_name = [];
    var suite_name = [];

    $.each(node.getPath(), function (i, n) {

        case_name.push(n.name);
        suite_name.push(n.name);

    });

    suite_name.pop();

    argfile_data.push('--suite');
    argfile_data.push(suite_name.join("."));
    argfile_data.push('--test');
    argfile_data.push(case_name.join("."));

    // console.log(case_name.join("."));
    // console.log(suite_name.join("."));
}

function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}

function html_encode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, ">");
    s = s.replace(/</g, "<");
    s = s.replace(/>/g, ">");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "'");
    s = s.replace(/\"/g, "\"");
    s = s.replace(/\n/g, "<br>");
    return s;
}



function openReport(ele) {
    if (!$(ele).attr('disabled')) {
        var file_path = path.join(temp_dir, 'report.html');
        shell.openExternal(file_path);
    }

}

function openLog(ele) {
    if (!$(ele).attr('disabled')) {
        var file_path = path.join(temp_dir, 'log.html');
        shell.openExternal(file_path);
    }

}