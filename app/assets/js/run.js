
const { app } = nodeRequire('electron').remote;
var path = nodeRequire("path");


var temp_dir=path.join(app.getPath('temp'),'RFEditor'+(new Date()).valueOf());

var argfile_path=path.join(temp_dir,'argfile.txt');

console.log(temp_dir);


function runTest() {

    var checked_nodes = zTree.getCheckedNodes(true);

    argfile_data = ['--outputdir', temp_dir , '-C', 'off', '-W', '168']

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

