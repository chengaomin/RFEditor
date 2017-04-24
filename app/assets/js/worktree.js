const jetpack = nodeRequire('fs-jetpack');



function get_workspace_data(openDir) {

    // openDir = 'C:\\Users\\cheng\\bbbbbb\\aaaaaaa';

    var openDirKeys = openDir.split('\\');

    var worklist = jetpack.inspectTree(openDir, { relativePath: true });


    var workTreeArr = [{ id: 1, pId: 0, name: openDirKeys[openDirKeys.length - 1], open: true, isParent: true }];

    var filepath = '';
    
    var filepathArr =[];

    var idcount = 2;

    



    function picker_tree_data(list, pid) {

        $.each(list, function (key, value) {
            nid = idcount++;
            if (value.type == 'dir' && value.name != '.git' && value.name != 'node_modules') {
                workTreeArr.push({ id: nid, pId: pid, name: value.name, open: false, isParent: true });
                picker_tree_data(value.children, nid);

            } else {
                workTreeArr.push({ id: nid, pId: pid, name: value.name, open: false, isParent: true, iconSkin: "testsuite" });
                filepath = (openDir + '/' + value.relativePath).replace('/./', '/');

                filepathArr.push([filepath,nid]);



            }

        });

    }

    picker_tree_data(worklist.children, '1');

    return [workTreeArr,filepathArr];

}

// get_workspace_data('C:\\Users\\cheng\\bbbbbb\\aaaaaaa');




