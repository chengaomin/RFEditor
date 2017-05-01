var UIPage = function () {


    var resizePage = function () {

        $('.mdui-card-content')[0].style.height = document.documentElement.clientHeight - 250 + 'px';
        $('.mdui-card-content')[1].style.height = document.documentElement.clientHeight - 198 + 'px';

        $('#bottom-tab-table-edit-content')[0].style.height = document.documentElement.clientHeight - 261 + 'px';
        $('#bottom-tab-settings-content')[0].style.height = document.documentElement.clientHeight - 261 + 'px';
        $('#bottom-tab-variables-content')[0].style.height = document.documentElement.clientHeight - 261 + 'px';

        $('#top-tab-table-edit-content')[0].style.height = document.documentElement.clientHeight - 220 + 'px';
        $('#top-tab-text-edit-content')[0].style.height = document.documentElement.clientHeight - 200 + 'px';
        $('#top-tab-run-content>.frameset')[0].style.height = document.documentElement.clientHeight - 195 + 'px';

        $('#treeDemo')[0].style.height = document.documentElement.clientHeight - 240 + 'px';

        
    }

    return {
        init: function () {
            resizePage();
            $(window).resize(function () {
                resizePage();
                setTimeout("edit_table_hot.render()",100);
                setTimeout("settings_table_hot.render()",100);
                setTimeout("variable_table_hot.render()",100);
                
            });
        }

    };

}();


jQuery(document).ready(function () {
    UIPage.init();
});
