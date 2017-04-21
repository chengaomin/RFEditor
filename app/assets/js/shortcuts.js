var UIShortcuts = function () {


    var keyfilter = function () {

        key.filter = function (event) {
            var tagName = (event.target || event.srcElement).tagName;
            key.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other');
            return true;
        }
    }

    var shortcuts = function () {

        key('ctrl+i', function () {
            var selected_range = hot.getSelected();
            hot.alter('insert_row', selected_range[0]);

        });
    }

    return {
        init: function () {
            keyfilter();
            shortcuts();

        }

    };

}();


jQuery(document).ready(function () {
    UIShortcuts.init();
});
