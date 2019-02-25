$(document).ready(function(){
    // This moves the bootstrap classes to the decoration tag in author mode,
    // so that the columns display in the author env correctly.
    var $bsLayoutComponents = $('.js-editor-fix-select-boxes');

    $bsLayoutComponents.each(function(index, item) {
        var $colItem = $(item);
        $colItem.removeClass('js-editor-fix-select-boxes');
        $colItem.parent().addClass($colItem.attr('class'));
        $colItem.removeAttr('class');
    })

    // Clear float to make row parsys appear at the bottom of the row container
    var $bsRows = $('.js-editor-add-clearfix');

    $bsRows.each(function(index, item) {
        var $rowItem = $(item);
        $rowItem.removeClass('js-editor-add-clearfix');
        $lastCol = $rowItem.find('.bootstrapLayout').last();
        $('<div class="clearfix"></div>').insertAfter($lastCol);
    })
})