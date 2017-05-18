var variable_table_tableDiv = document.getElementById('variable_table'),
    variable_table_settings,
    variable_table_hot;



var UIvariable_table = function () {

    var renderTable = function () {



        function getData() {
            return [
                ['', '', ''],

            ];
        }



        variable_table_settings = {
            data: getData(),
            minRows: 200,
            minCols: 3,
            rowHeights: 24,
            colWidths: 280,
            minSpareRows: 1,
            colHeaders: ['Variable', 'Value', 'Comment']
        };
        variable_table_hot = new Handsontable(variable_table_tableDiv, variable_table_settings);

    }

    return {
        init: function () {
            renderTable();
        },

    };

}();


jQuery(document).ready(function () {
    UIvariable_table.init();
});
