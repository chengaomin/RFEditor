var settings_table_tableDiv = document.getElementById('settings_table'),
    settings_table_settings,
    settings_table_hot;



var UIsettings_table = function () {

    var colorFirstCol = function () {
        for (var i = 0; i < 1; i++) {
            var cell = settings_table_hot.getCell(i,0);
            cell.style.backgroundColor = '#e6e6e6';
            cell.style.color='black';
            settings_table_hot.getCellMeta(i, 0).readOnly=true
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



        settings_table_settings = {
            data: getData(),
            minRows: 9,
            minCols: 20,
            rowHeights: 24,
            colWidths: 200,
            minSpareCols: 1,
            colHeaders: ['Type', 'Action/Name/Path','Action/Arguments','Action/Comment','','','','','','']
        };
        settings_table_hot = new Handsontable(settings_table_tableDiv, settings_table_settings);
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
    UIsettings_table.init();

    // Handsontable.hooks.add('afterRender', UIsettings_table.colorFirstCol, settings_table_hot);
});
