const { dialog } = nodeRequire('electron').remote;

const readline = nodeRequire('readline');
const fs = nodeRequire('fs');

var rf_data = {};

function renderTestcaseNode(filepathlist) {



    $.each(filepathlist, function (key, value) {

        var rftype = '';// case、keyword、setting、variable
        var filetype = 'resource';// 2种类型：suite和resource
        var parent_node_id = value[1].toString();
        var file_data = {};

        var case_name_id_tmp = "";
        var case_id_count = 1;


        rl = readline.createInterface({
            input: fs.createReadStream(value[0])
        });


        rl.on('line', (line) => {

            if (line == '*** Test Cases ***') {
                rftype = 'testcase';
                filetype = 'suite';
            } else if (line == '*** Keywords ***') {
                rftype = 'keywords';
            } else if (line == '*** Settings ***') {
                rftype = 'settings';
            } else if (line == '*** Variables ***') {
                rftype = 'variables';
            } else {



                if (rftype == 'testcase') {
                    if (line[0] != ' ' && line.indexOf('***') != 0 && line) {
                        var case_id = parent_node_id + '0' + case_id_count++;
                        zTree.addNodes(zTree.getNodeByParam("id", parent_node_id), { id: case_id, name: line, isParent: false, iconSkin: "testcase" }, true);
                        case_name_id_tmp = line + '_' + case_id;
                        file_data[case_name_id_tmp] = [];
                    } else {
                        if (case_name_id_tmp) {
                            file_data[case_name_id_tmp].push($.trim(line).split('    '));
                        }

                    }
                } else if (rftype == 'keywords') {
                    if (line[0] != ' ' && line.indexOf('***') != 0 && line) {
                        var case_id = parent_node_id + '0' + case_id_count++;
                        zTree.addNodes(zTree.getNodeByParam("id", parent_node_id), { id: case_id, name: line, isParent: false, iconSkin: "keyword", nocheck: true }, true);
                        case_name_id_tmp = line + '_' + case_id;
                        file_data[case_name_id_tmp] = [];
                    } else {
                        if (case_name_id_tmp) {
                            file_data[case_name_id_tmp].push($.trim(line).split('    '));
                        }

                    }
                }




            }
        });

        rl.on('close', function () {
            if (filetype == 'resource') {
                var update_node = zTree.getNodeByParam("id", parent_node_id);
                update_node.iconSkin = 'resource';
                zTree.updateNode(update_node);
            }

            console.log(file_data, value[2]);

            rf_data[value[2] + "_" + value[1]] = file_data;



        });

    });
}


function openDirectory() {

    var directory = dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (directory) {
        var dataArr = get_workspace_data(directory[0]);
        zTree.destroy();
        UITree.init();
        zTree.addNodes(null, dataArr[0])

        renderTestcaseNode(dataArr[1]);





    }


}


