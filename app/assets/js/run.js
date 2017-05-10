
const { app } = nodeRequire('electron').remote;
const path = nodeRequire("path");
const exec = nodeRequire('child_process').exec;
const spawn = nodeRequire('child_process').spawn;
const iconv = nodeRequire('iconv-lite');

var randomtime = 'RFEditor' + (new Date()).valueOf();

var temp_dir = path.join(app.getPath('temp'), randomtime);

var argfile_path = path.join(temp_dir, 'argfile.txt');

var runing_log_path = path.join(temp_dir, 'runing.txt');

jetpack.write(runing_log_path, '');


watch_running_log_file();


console.log(temp_dir);


function runTest() {

    var inst = new mdui.Tab('#top-tab');
    inst.show('top-tab-run');

    $('#console_log').html('');
    $('#running_log').html('');


    var checked_nodes = zTree.getCheckedNodes(true);
    console.log(($('#console_log').width()/8).toString());

    argfile_data = ['--outputdir', temp_dir, '-C', 'off', '-W', parseInt($('#console_log').width()/8).toString()]

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
        console.log(iconv.decode(data, 'gbk'));
        $('#console_log').append(html_encode(iconv.decode(data, 'gbk')));

    });

    runargs.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    runargs.on('close', (code) => {
        console.log(`子进程退出码：${code}`);
    });
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

    console.log(case_name.join("."));
    console.log(suite_name.join("."));
}

function decodeUnicode(str) {  
    str = str.replace(/\\/g, "%");  
    return unescape(str);  
}  

function watch_running_log_file() {
    fs.watch(runing_log_path, 'utf8', (eventType, filename) => {
        console.log(`事件类型是: ${eventType}`);
        if (filename) {
            console.log(`提供的文件名: ${filename}`);
        } else {
            console.log('未提供文件名');
        }; fs.readFile(runing_log_path, 'utf8', (err, data) => {
            if (err) throw err;
            console.log(decodeUnicode(data));
            $('#running_log').html(html_encode(decodeUnicode(data)));
        });
    });

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