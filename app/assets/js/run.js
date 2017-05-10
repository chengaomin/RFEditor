
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

var runing_console_path = path.join(temp_dir, 'runing_console.txt');

jetpack.write(runing_console_path, '');

watch_running_log_file();


console.log(temp_dir);


function runTest() {

    $('#console_log').html('');
    $('#running_log').html('');


    var checked_nodes = zTree.getCheckedNodes(true);

    argfile_data = ['--outputdir', temp_dir, '-C', 'off', '-W', '168']

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

    var runargs = 'pybot.bat --argumentfile ' + argfile_path + ' --listener E:/workspace/ColoRide/app/plugin/rflistener/RFListener.py:' + randomtime + ' ' + $('#workspace_dir').text();// + ' > ' + runing_console_path;
    console.log(runargs);
    // exec(runargs);

    // exec(runargs, function (err, stdout, stderr) {
    //     if (err) throw err;
    //     else console.log(err, stdout, stderr);
    // });




    const ls = spawn('pybot.bat', ['--argumentfile', argfile_path, '--listener', 'E:/workspace/ColoRide/app/plugin/rflistener/RFListener.py:' + randomtime, $('#workspace_dir').text()]);

    ls.stdout.on('data', (data) => {
        console.log(iconv.decode(data, 'gbk'));
        $('#console_log').append(html_encode(iconv.decode(data, 'gbk')));

    });

    ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
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



function watch_running_log_file() {
    fs.watch(runing_log_path, 'utf8', (eventType, filename) => {
        console.log(`事件类型是: ${eventType}`);
        if (filename) {
            console.log(`提供的文件名: ${filename}`);
        } else {
            console.log('未提供文件名');
        }; fs.readFile(runing_log_path, 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data);
            $('#running_log').html(html_encode(data));
        });
    });


    fs.watch(runing_console_path, 'utf8', (eventType, filename) => {
        console.log(`事件类型是: ${eventType}`);
        if (filename) {
            console.log(`提供的文件名: ${filename}`);
        } else {
            console.log('未提供文件名');
        }; fs.readFile(runing_console_path, 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data);
            $('#console_log').html(html_encode(data));
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