var suite_variable_table_tableDiv = document.getElementById('suite_variable_table'),
    suite_variable_table_settings,
    suite_variable_table_hot;



var UIsuite_variable_table = function () {

    var renderTable = function () {



        function getData() {
            return [
                ['', '', ''],

            ];
        }



        suite_variable_table_settings = {
            data: getData(),
            minRows: 200,
            minCols: 3,
            rowHeights: 24,
            colWidths: 200,
            minSpareRows: 1,
            colHeaders: ['Variable', 'Value', 'Comment']
        };
        suite_variable_table_hot = new Handsontable(suite_variable_table_tableDiv, suite_variable_table_settings);

    }

    return {
        init: function () {
            renderTable();
        },

    };

}();


jQuery(document).ready(function () {
    UIsuite_variable_table.init();
});
