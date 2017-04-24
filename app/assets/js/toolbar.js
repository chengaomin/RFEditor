const { dialog } = nodeRequire('electron').remote;

const readline = nodeRequire('readline');
const fs = nodeRequire('fs');

function renderTestcaseNode(filepathlist){

        var rftype='';
        $.each(filepathlist, function (key, value) {
            rl = readline.createInterface({
                input: fs.createReadStream(value[0])
            });

            rl.on('line', (line) => {

                if (rftype == 'testcase') {
                    if (line[0] != ' ' && line.indexOf('***') != 0 && line) {

                        zTree.addNodes(zTree.getNodeByTId(value[1].toString()),{ name: line, isParent: false, iconSkin: "testcase" },true);

                    }
                }

                if (line == '*** Test Cases ***') {
                    rftype = 'testcase';
                } else if (line == '*** Keywords ***') {
                    rftype = 'keywords';
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


