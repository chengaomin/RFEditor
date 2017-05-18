var edit_table_tableDiv = document.getElementById('example'),
    edit_table_settings,
    edit_table_hot;

var UIedit_table = function () {


    var renderTable = function () {



        function getData() {
            return [
                [],
            ];
        }



        edit_table_settings = {
            data: getData(),
            startRows: 5,
            startCols: 5,
            minRows: 32,
            minCols: 10,
            rowHeaders: true,
            minSpareRows: 1,
            minSpareCols: 1,
            contextMenu: {
                callback: function (key, options) {
                    if (key === 'about') {
                        setTimeout(function () {
                            alert("This is a context menu with default and custom options mixed");
                        }, 100);
                    } else if (key === 'font-color') {
                        var selected_range = edit_table_hot.getSelected();
                        var cell = edit_table_hot.getCell(selected_range[0], selected_range[1]);
                        cell.style.color = 'red';

                    } else if (key === 'bg-color') {
                        var selected_range = edit_table_hot.getSelected();
                        var cell = edit_table_hot.getCell(selected_range[0], selected_range[1]);
                        cell.style.backgroundColor = 'gray';
                    }
                },
                items: {
                    "cell_above": { name: "向前插入一格" },
                    "cell_below": { name: "向后插入一格" },
                    "remove_cell": { name: "删除此格" },
                    "hsep1": "---------",
                    "row_above": { name: "向前插入一行" },
                    "row_below": { name: "向后插入一行" },
                    "remove_row": { name: "删除此行" },
                    "hsep2": "---------",
                    "about": { name: 'About this menu' },
                    "font-color": { name: '改变字体颜色' },
                    "bg-color": { name: '改变背景颜色' },
                }
            },
            rowHeights: 24,
            colWidths: 200
        };
        edit_table_hot = new Handsontable(edit_table_tableDiv, edit_table_settings);

        // edit_table_hot.updateSettings({
        //     afterDocumentKeyDown: function (e) {
        //         if (e.key === 'Control') {
        //             console.log('Control');
        //         }
        //     }
        // });
    }

    return {
        init: function () {
            renderTable();
        }

    };

}();


jQuery(document).ready(function () {
    UIedit_table.init();
});
