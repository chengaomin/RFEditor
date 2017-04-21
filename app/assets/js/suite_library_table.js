var suite_library_table_tableDiv = document.getElementById('suite_library_table'),
    suite_library_table_settings,
    suite_library_table_hot;



var UIsuite_library_table = function () {

    var renderTable = function () {



        function getData() {
            return [
                ['', '', '', ''],

            ];
        }



        suite_library_table_settings = {
            data: getData(),
            minRows: 6,
            minCols: 4,
            rowHeights: 30,
            colWidths: 205,
            minSpareRows: 1,
            colHeaders: ['Import', 'Name/Path', 'Arguments', 'Comment']
        };
        suite_library_table_hot = new Handsontable(suite_library_table_tableDiv, suite_library_table_settings);

    }

    return {
        init: function () {
            renderTable();
        },

    };

}();


jQuery(document).ready(function () {
    UIsuite_library_table.init();
});
