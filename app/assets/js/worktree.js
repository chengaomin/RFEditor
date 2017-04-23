const jetpack = nodeRequire('fs-jetpack');

openDir='C:\\Users\\cheng\\bbbbbb\\aaaaaaa';

var openDirKeys=openDir.split('\\');

var worklist = jetpack.inspectTree(openDir);


var arr=[{ id: 1, pId: 0, name: openDirKeys[openDirKeys.length-1], open: true, isParent: true }];

var idcount=2;

function picker_tree_data(list,pid){

    $.each(list, function (key, value) {
        nid=idcount++;
        if (value.type=='dir' && value.name!='.git' && value.name!='node_modules'){
            arr.push({ id: nid, pId: pid, name: value.name, open: false, isParent: true });
            picker_tree_data(value.children,nid);
            
        }else{
            arr.push({ id: nid, pId: pid, name: value.name, open: false, isParent: true, iconSkin: "testsuite" });
        }
        
    });

}


picker_tree_data(worklist.children,'1');
