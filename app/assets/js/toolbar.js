const { dialog } = nodeRequire('electron').remote;

const readline = nodeRequire('readline');
const fs = nodeRequire('fs');

var rf_data = {};


// 把斜杠换成空白
function handle_one_line_data(anArray) {

    for (var k = 0, length = anArray.length; k < length; k++) {
        if (anArray[k] == '\\') {
            anArray[k] = ''
        }
    }
    return anArray

}

function renderTestcaseNode(filepathlist) {



    $.each(filepathlist, function (key, value) {

        var rftype = '';// case、keyword、setting、variable
        var filetype = 'resource';// 2种类型：suite和resource
        var parent_node_id = value[1].toString();
        var file_data = {};

        var case_name_id_tmp = "";
        var case_id_count = 1;
        var pre_line = '';


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
                case_name_id_tmp = 'settings';
                file_data[case_name_id_tmp] = [
                    ['Documentation', '', '', '', ''],
                    ['Suite Setup', '', '', '', ''],
                    ['Suite Teardown', '', '', '', ''],
                    ['Test Setup', '', '', '', ''],
                    ['Test Teardown', '', '', '', ''],
                    ['Test Template', '', '', '', ''],
                    ['Test Timeout', '', '', '', ''],
                    ['Force Tags', '', '', '', ''],
                    ['Default Tags', '', '', '', '']
                ];
            } else if (line == '*** Variables ***') {
                rftype = 'variables';
                case_name_id_tmp = 'variables';
                file_data[case_name_id_tmp] = [];
            } else {



                if (rftype == 'testcase') {
                    if (line[0] != ' ' && line.indexOf('***') != 0 && line) {
                        var case_id = parent_node_id + '0' + case_id_count++;
                        zTree.addNodes(zTree.getNodeByParam("id", parent_node_id), { id: case_id, name: line, isParent: false, iconSkin: "testcase" }, true);
                        case_name_id_tmp = line + '_' + case_id;
                        file_data[case_name_id_tmp] = [];
                    } else {
                        if (case_name_id_tmp) {
                            file_data[case_name_id_tmp].push(handle_one_line_data($.trim(line).split('    ')));
                        }

                    }
                } else if (rftype == 'keywords') {
                    if (line[0] != ' ' && line.indexOf('***') != 0 && line) {
                        var case_id = parent_node_id + '0' + case_id_count++;
                        if (value[2] == '__init__.txt') {
                            zTree.addNodes(zTree.getNodeByParam("id", parent_node_id).getParentNode(), { id: case_id, name: line, isParent: false, iconSkin: "keyword", nocheck: true }, true);
                        } else {
                            zTree.addNodes(zTree.getNodeByParam("id", parent_node_id), { id: case_id, name: line, isParent: false, iconSkin: "keyword", nocheck: true }, true);
                        }
                        case_name_id_tmp = line + '_' + case_id;
                        file_data[case_name_id_tmp] = [];
                    } else {
                        if (case_name_id_tmp) {
                            file_data[case_name_id_tmp].push(handle_one_line_data($.trim(line).split('    ')));
                        }

                    }
                } else if (rftype == 'variables') {

                    if ($.trim(line)) {

                        var variable_line = $.trim(line).split('}');

                        var variable_name = variable_line.shift() + '}';
                        var variable_other = variable_line.join("}");
                        var variable_data = $.trim(variable_other).split('    ');
                        variable_data.splice(0, 0, variable_name);

                        var case_id = parent_node_id + '0' + case_id_count++;

                        if (value[2] == '__init__.txt') {
                            zTree.addNodes(zTree.getNodeByParam("id", parent_node_id).getParentNode(), { id: case_id, name: variable_name, isParent: false, iconSkin: "variable", nocheck: true }, true);
                        } else {
                            zTree.addNodes(zTree.getNodeByParam("id", parent_node_id), { id: case_id, name: variable_name, isParent: false, iconSkin: "variable", nocheck: true }, true);

                        }
                        case_name_id_tmp = 'variables';
                        if (case_name_id_tmp) {
                            file_data[case_name_id_tmp].push(variable_data);
                        }
                    }


                } else if (rftype == 'settings') {

                    if ($.trim(line)) {
                        console.log(rftype, line);
                        var settings_type = $.trim($.trim(line).substring(0, 17));
                        var settings_args = $.trim($.trim(line).substring(18)).split('    ');
                        settings_args.splice(0, 0, settings_type);


                        case_name_id_tmp = 'settings';

                        console.log(settings_type, settings_args);

                        if (case_name_id_tmp) {

                            switch (settings_type) {
                                case 'Documentation':
                                    file_data[case_name_id_tmp][0] = settings_args;
                                    pre_line = 0;
                                    break;
                                case 'Suite Setup':
                                    file_data[case_name_id_tmp][1] = settings_args;
                                    pre_line = 1;
                                    break;
                                case 'Suite Teardown':
                                    file_data[case_name_id_tmp][2] = settings_args;
                                    pre_line = 2;
                                    break;
                                case 'Test Setup':
                                    file_data[case_name_id_tmp][3] = settings_args;
                                    pre_line = 3;
                                    break;
                                case 'Test Teardown':
                                    file_data[case_name_id_tmp][4] = settings_args;
                                    pre_line = 4;
                                    break;
                                case 'Test Template':
                                    file_data[case_name_id_tmp][5] = settings_args;
                                    pre_line = 5;
                                    break;
                                case 'Test Timeout':
                                    file_data[case_name_id_tmp][6] = settings_args;
                                    pre_line = 6;
                                    break;
                                case 'Force Tags':
                                    file_data[case_name_id_tmp][7] = settings_args;
                                    pre_line = 7;
                                    break;
                                case 'Default Tags':
                                    file_data[case_name_id_tmp][8] = settings_args;
                                    pre_line = 8;
                                    break;
                                case '...':
                                    console.log(pre_line, settings_args);
                                    settings_args.shift();
                                    file_data[case_name_id_tmp][pre_line].push.apply(file_data[case_name_id_tmp][pre_line], settings_args);
                                    break;
                                default:
                                    file_data[case_name_id_tmp].push(settings_args);
                                    break;
                            }


                            // file_data[case_name_id_tmp].push(settings_args);
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

            // __init__.txt 文件，setting种没有 Test Template、Default Tags、Test Timeout
            if (value[2] == '__init__.txt') {
                file_data['settings'].splice(8, 1);
                file_data['settings'].splice(6, 1);
                file_data['settings'].splice(5, 1);

                var node_id = zTree.getNodeByParam("id", parent_node_id).getParentNode().id
                rf_data[value[2] + "_" + node_id] = file_data;

            } else {

                rf_data[value[2] + "_" + value[1]] = file_data;

            }



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


