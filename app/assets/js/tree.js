var zTree;
var menuObject;




function addTestCase() {
    menuObject.close();
    var treeNode = zTree.getSelectedNodes()[0];
    var newNode = { name: "", iconSkin: "testcase" };
    if (treeNode) {
        treeNode = zTree.addNodes(treeNode, newNode);
    }

    zTree.editName(treeNode[0]);


}

function addTestSuite() {
    menuObject.close();
    var treeNode = zTree.getSelectedNodes()[0];
    var newNode = { pId: treeNode.id, name: "", iconSkin: "testsuite", isParent: true };
    if (treeNode) {
        treeNode = zTree.addNodes(treeNode, newNode);

    }

    zTree.editName(treeNode[0]);



}


function rename() {
    var treeNode = zTree.getSelectedNodes()[0];
    zTree.editName(treeNode);
};



function moveUp() {
    var treeNode = zTree.getSelectedNodes()[0];
    // 如果前面还有节点，才可以往上移动。否则不动
    if (zTree.getSelectedNodes()[0].getPreNode()) {
        zTree.moveNode(treeNode.getPreNode(), treeNode, "prev");
    }

}

function moveDown() {
    var treeNode = zTree.getSelectedNodes()[0];
    // 如果后面还有节点，才可以往下移动。否则不动
    if (zTree.getSelectedNodes()[0].getNextNode()) {
        zTree.moveNode(treeNode.getNextNode(), treeNode, "next");
    }

}


function remove() {
    var treeNode = zTree.getSelectedNodes()[0];
    zTree.removeNode(treeNode, true);
};


function copyNode() {
    var treeNode = zTree.getSelectedNodes()[0];
    var copy = zTree.copyNode(treeNode, treeNode, "next");
    zTree.selectNode(copy);
    rename();
}




var UITree = function () {


    var beforeRename = function (treeId, treeNode, newName) {
        if (newName.length == 0) {
            alert("节点名称不能为空.");
            setTimeout(function () { zTree.editName(treeNode) }, 10);
            return false;
        }
        return true;
    }


    var OnRightClick = function (event, treeId, treeNode) {



        if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
            zTree.cancelSelectedNode();
        } else if (treeNode && !treeNode.noR) {
            zTree.selectNode(treeNode);
            showRMenu("node", event.clientX, event.clientY, treeNode);
        }
    }


    var zTreeOnClick = function (event, treeId, treeNode) {
        var inst = new mdui.Tab('#bottom-tab');

        if (treeNode.iconSkin == 'testcase' || treeNode.iconSkin == 'keyword') {
            var name_id = treeNode.name + '_' + treeNode.id;
            var parentNode = treeNode.getParentNode();
            var parent_name_id = parentNode.name + '_' + parentNode.id;
            console.log(parent_name_id, name_id);
            edit_table_hot.loadData(rf_data[parent_name_id][name_id]);
            inst.show('bottom-tab-table-edit');
        } else if (treeNode.iconSkin == 'variable') {

            var parentNode = treeNode.getParentNode();

            if (parentNode.iconSkin == undefined) {
                var parent_name_id = '__init__.txt_' + parentNode.id;
            } else {
                var parent_name_id = parentNode.name + '_' + parentNode.id;
            }
            var name_id = 'variables';
            console.log(parent_name_id, name_id);
            variable_table_hot.loadData(rf_data[parent_name_id][name_id]);
            inst.show('bottom-tab-variables');

        } else if (treeNode.iconSkin == 'testsuite') {

            var my_name_id = treeNode.name + '_' + treeNode.id;
            var name_id = 'settings';
            console.log(my_name_id, name_id);
            settings_table_hot.loadData(rf_data[my_name_id][name_id]);
        } else if (treeNode.iconSkin == undefined) {
            var my_name_id = '__init__.txt_' + treeNode.id;
            console.log(my_name_id);
            settings_table_hot.loadData(rf_data[my_name_id]['settings']);
            inst.show('bottom-tab-settings');


        }





    };

    var checkMenuType = function (treeNode) {
        var menu_id = '';
        switch (treeNode.iconSkin) {
            case "testcase":
            case "testcase_pass":
            case "testcase_fail":
                menu_id = '#menu_case';
                break;
            case "testsuite":
                menu_id = '#menu_suite';
                break;
            default:
                menu_id = '#menu_directory';
        }


        return menu_id;
    }

    var showRMenu = function (type, x, y, treeNode) {

        var options = {};

        var menu_id = checkMenuType(treeNode);

        if (type == "node") {

            //判断是否超出页面高度
            if (document.documentElement.clientHeight - y > 257) {
                options = { position: 'bottom' };
                $(menu_id).css({ "top": y - 10 + "px", "left": x + "px" });
            } else {
                options = { position: 'top' };

                //判断菜单是否已经打开了
                if (!$(menu_id).hasClass("mdui-menu-open")) {
                    $(menu_id).css({ "top": y + "px", "left": x + "px" });
                } else {
                    $(menu_id).css({ "top": y - 270 + "px", "left": x + "px" });
                }
            }
            try {
                console.log(menuObject.menu.id, menu_id);
                if ('#' + menuObject.menu.id != menu_id) {
                    menuObject.close();
                }

            } catch (error) {

            }


            menuObject = new mdui.Menu(menu_id, menu_id, options);
            menuObject.open();
        }
    }




    var setting = {
        edit: {
            enable: true,
            showRemoveBtn: false,
            showRenameBtn: false
        },
        check: {
            enable: true,
            nocheckInherit: true
        },
        data: {
            simpleData: {
                enable: true
            }, keep: {
                parent: true,
                leaf: true
            }
        },
        callback: {
            onRightClick: OnRightClick,
            beforeRename: beforeRename,
            onClick: zTreeOnClick
        }
    };

    var zNodes = [
        { id: 1, pId: 0, name: "随意勾选 1", open: true },
        { id: 11, pId: 1, name: "随意勾选 1-1", open: true },
        { id: 111, pId: 11, name: "checkbox 1-1-1", nocheck: true },
        { id: 112, pId: 11, name: "随意勾选 1-1-2" },
        { id: 12, pId: 1, name: "无 checkbox 1-2", nocheck: true, open: true },
        { id: 121, pId: 12, name: "无 checkbox 1-2-1" },
        { id: 122, pId: 12, name: "无 checkbox 1-2-2" },
        { id: 2, pId: 0, name: "随意勾选 22222222222", open: true, isParent: true },
        { id: 22, pId: 2, name: "随意勾选 2-2", open: true, iconSkin: "testsuite" },
        { id: 219, pId: 22, name: "随意勾选 2-2-1", iconSkin: "testcase" },
        { id: 220, pId: 22, name: "随意勾选 2-2-1", iconSkin: "testcase" },
        { id: 221, pId: 22, name: "随意勾选 2-2-1", iconSkin: "testcase_pass" },
        { id: 222, pId: 22, name: "随意勾选 2-2-1", iconSkin: "testcase_pass" },
        { id: 223, pId: 22, name: "随意勾选 2-2-1", iconSkin: "testcase_pass" },
        { id: 224, pId: 22, name: "随意勾选 2-2-1", iconSkin: "testcase_pass" },
        { id: 225, pId: 22, name: "随意勾选 2-2-2", iconSkin: "testcase_fail" },
        { id: 226, pId: 22, name: "随意勾选 2-2-2", iconSkin: "testcase_fail" },
        { id: 227, pId: 22, name: "随意勾选 2-2-2", iconSkin: "testcase_fail" },
        { id: 3, pId: 1, name: "随意勾选 2", checked: true, open: true },
        { id: 31, pId: 3, name: "随意勾选 2-1" },
        { id: 32, pId: 3, name: "随意勾选 2-2", open: true },
        { id: 321, pId: 32, name: "随意勾选 2-2-1", checked: true },
        { id: 322, pId: 32, name: "随意勾选 2-2-2" },
        { id: 33, pId: 3, name: "随意勾选 2-3" },

    ];



    var showTree = function () {

        $.fn.zTree.init($("#treeDemo"), setting);
        zTree = $.fn.zTree.getZTreeObj("treeDemo");
    }



    return {
        init: function () {
            showTree();

        }

    };

}();


jQuery(document).ready(function () {
    UITree.init();
});
