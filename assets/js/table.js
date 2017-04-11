var UITable = function () {


    var renderTable = function () {



        function getData() {
            return [
                ['${names}', 'Create List', 'Tom', 'Peter', 'Linda'],
                [':FOR', '${name}', 'in', '${names}'],
                ['', 'Log', '${name}'],
                ['Run Keyword If', '1==2', 'Log', 'error'],
                ['...', 'ELSE', 'Log', 'success']
            ];
        }

        var tableDiv = document.getElementById('example'),
            settings,
            hot;

        settings = {
            data: getData(),
            startRows: 5,
            startCols: 5,
            minRows: 220,
            minCols: 20,
            rowHeaders: true,
            minSpareRows: 1,
            minSpareCols: 1,
            contextMenu: true,
            rowHeights:30,
            colWidths:200
        };
        hot = new Handsontable(tableDiv, settings);
    }

    return {
        init: function () {
            renderTable();
        }

    };

}();


jQuery(document).ready(function () {
    UITable.init();
});
