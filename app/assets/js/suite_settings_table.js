var suite_settings_table_tableDiv = document.getElementById('suite_settings_table'),
    suite_settings_table_settings,
    suite_settings_table_hot;



var UIsuite_settings_table = function () {

    var colorFirstCol = function () {
        for (var i = 0; i < 9; i++) {
            var cell = suite_settings_table_hot.getCell(i,0);
            cell.style.backgroundColor = '#e6e6e6';
            cell.style.color='black';
            suite_settings_table_hot.getCellMeta(i, 0).readOnly=true
        }

    }

    var renderTable = function () {



        function getData() {
            return [
                ['Documentation', '', '', '', ''],
                ['Suite Setup', '', '', '', ''],
                ['Suite Teardown', '', '', '', ''],
                ['Test Setup', '', '', '', ''],
                ['Test Teardown', '', '', '', ''],
                ['Test Template', '', '', '', ''],
                ['Test Timeout', '', '', '', ''],
                ['Force Tags', '', '', '', ''],
                ['Default Tags', '', '', '', ''],
                ['Metadata', '', '', '', ''],
                ['Library', '', '', '', ''],
                ['Resource', '', '', '', ''],
                ['Variables', '', '', '', ''],

            ];
        }



        suite_settings_table_settings = {
            data: getData(),
            minRows: 9,
            minCols: 5,
            rowHeights: 24,
            colWidths: 200,
            minSpareCols: 1,
            colHeaders: ['Type', 'Action/Name/Path','Action/Arguments','Action/Comment','','','','','','']
        };
        suite_settings_table_hot = new Handsontable(suite_settings_table_tableDiv, suite_settings_table_settings);
        // setTimeout('colorFirstCol()',1000);

    }

    return {
        init: function () {
            renderTable();
            // setTimeout('colorFirstCol()',1500);
        },
        colorFirstCol:function () {
            colorFirstCol()
        },
    };

}();


jQuery(document).ready(function () {
    UIsuite_settings_table.init();

    Handsontable.hooks.add('afterRender', UIsuite_settings_table.colorFirstCol, suite_settings_table_hot);
});
