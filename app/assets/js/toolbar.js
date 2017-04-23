const { dialog } = nodeRequire('electron').remote;




function openDirectory() {

    var directory = dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (directory) {
        var data=get_workspace_data(directory[0]);
        zTree.destroy();
        UITree.init();
        zTree.addNodes(null,data)
    }


}


