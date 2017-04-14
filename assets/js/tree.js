var zTree;

var UITree = function () {


    var OnRightClick = function (event, treeId, treeNode) {


        if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
            zTree.cancelSelectedNode();
            showRMenu("root", event.clientX, event.clientY);
        } else if (treeNode && !treeNode.noR) {
            zTree.selectNode(treeNode);
            showRMenu("node", event.clientX, event.clientY);
        }
    }

    var showRMenu = function (type, x, y) {

        var options = {};

        if (type == "node") {

            //判断是否超出页面高度
            if (document.documentElement.clientHeight - y > 257) {
                options = { position: 'bottom' };
                $('#menu').css({ "top": y - 10 + "px", "left": x + "px" });
            } else {
                options = { position: 'top' };

                //判断菜单是否已经打开了
                if (!$('#menu').hasClass("mdui-menu-open")) {
                    $('#menu').css({ "top": y + "px", "left": x + "px" });
                } else {
                    $('#menu').css({ "top": y - 270 + "px", "left": x + "px" });
                }
            }

            var inst = new mdui.Menu('#menu', '#menu', options);
            inst.open();
        }
    }


    var setting = {


        check: {
            enable: true,
            nocheckInherit: true
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onRightClick: OnRightClick
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
        { id: 2, pId: 0, name: "随意勾选 2", checked: true, open: true },
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

        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
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
