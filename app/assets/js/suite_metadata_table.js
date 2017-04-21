var suite_metadata_table_tableDiv = document.getElementById('suite_metadata_table'),
    suite_metadata_table_settings,
    suite_metadata_table_hot;



var UIsuite_metadata_table = function () {

    var renderTable = function () {



        function getData() {
            return [
                ['', '', ''],

            ];
        }



        suite_metadata_table_settings = {
            data: getData(),
            minRows: 6,
            minCols: 3,
            rowHeights: 30,
            colWidths: 273,
            minSpareRows: 1,
            colHeaders: ['Metadata', 'Value', 'Comment']
        };
        suite_metadata_table_hot = new Handsontable(suite_metadata_table_tableDiv, suite_metadata_table_settings);

    }

    return {
        init: function () {
            renderTable();
        },

    };

}();


jQuery(document).ready(function () {
    UIsuite_metadata_table.init();
});
