var UIPage = function () {


    var resizePage = function () {

        $('.mdui-card-content')[0].style.height = document.documentElement.clientHeight - 250 + 'px';
        $('.mdui-card-content')[1].style.height = document.documentElement.clientHeight - 198 + 'px';

        $('#tab4-content')[0].style.height = document.documentElement.clientHeight - 293 + 'px';
        $('#tab5-content')[0].style.height = document.documentElement.clientHeight - 293 + 'px';
        $('#tab6-content')[0].style.height = document.documentElement.clientHeight - 293 + 'px';

        $('#tab1-content')[0].style.height = document.documentElement.clientHeight - 220 + 'px';
        $('#tab2-content')[0].style.height = document.documentElement.clientHeight - 200 + 'px';
        $('#tab3-content>.frameset')[0].style.height = document.documentElement.clientHeight - 195 + 'px';

        $('#treeDemo')[0].style.height = document.documentElement.clientHeight - 240 + 'px';
    }

    return {
        init: function () {
            resizePage();
            $(window).resize(function () {
                resizePage();
            });
        }

    };

}();


jQuery(document).ready(function () {
    UIPage.init();
});
