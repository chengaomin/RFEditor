function runTest() {

    var checked_nodes = zTree.getCheckedNodes(true);

    $.each(checked_nodes, function (index, node) {

        // console.log(index, node);

        if (node.iconSkin == 'testcase') {

            // var case_name = node.name;
            // var suite_name = node.getParentNode().name;
            // console.log(suite_name, case_name);
            get_suite_case_name(node);

        }


    });

}


function get_suite_case_name(node) {

    var case_name = [];
    var suite_name = [];
    


    $.each(node.getPath(), function (i, n) {

        case_name.push(n.name);
        suite_name.push(n.name);

    });

    suite_name.pop();
    


    console.log(case_name.join("."));
    console.log(suite_name.join("."));
}