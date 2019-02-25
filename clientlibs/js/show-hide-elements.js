/**
 * Enables showing/hiding of other components based on the selection made in the checkbox.
 *
 * How to use:
 *
 * - add the class js-show-hide-element to the controller element
 * - add the data attribute show-hide-target to the controller element, value should be the
 *   selector, usually a specific class name, to find all possible target elements that can be shown/hidden.
 * - add the target class to each target component that can be shown/hidden
 * - if the controller element is a radio button, add the attribute show-hide-value to each target component, 
 *   the value should equal the value of the select option that will unhide this element.
  */
(function(document, $) {
    "use strict";

    // when dialog gets injected
    $(document).on("foundation-contentloaded", function(e) {
        // if there is already an inital value make sure the target element becomes visible
        $(".js-show-hide-element").each( function() {
            showHide($(this));
        });

    });

    $(document).on("change", ".js-show-hide-element", function(e) {
        showHide($(this));
    });

    function showHide(el){

        var target = el.data("show-hide-target");
        var checked = el.prop('checked');

        // For checkbox - hide the target if the checkbox is unchecked, show target if it is checked
        if(checked !== undefined) {
            // Checkbox
            $(target).each(function(index, targetItem){
                var showItem = checked;
                // Reverse showItem value if configured to hide when controller element is checked
                // Can be configured on parent controller element or target element
                if(controlElement.data('hide-when-checked') || $(targetItem).data('hide-when-checked')) {
                    showItem = !checked;
                }
                // Show or hide the item
                showItem ? $(targetItem).removeClass('hidden') : $(targetItem).addClass('hidden');
            });
        } else {
            // Radio button
            // Timeout with no time to process code in next tick due to race condition, should be fixed in AEM 6.4
            setTimeout(function(){
                // Get the value of the selected radio button
                var targetVal = controlElement.children('coral-radio[checked]').children('input').val();

                // Hide all target elements, and show the element that matches the selected value
                $(target).not('.hidden').addClass('hidden');
                $(target).filter('[data-show-hide-value="' + targetVal + '"]').removeClass('hidden');
            })
            
        }

        // Radio button
        
        // Get the value of the selected radio button
        var targetVal = el.children('coral-radio[checked]').children('input').val();

        // Hide all target elements, and show the element that matches the selected value
        $(target).not('.hidden').addClass('hidden');
        $(target).filter('[data-show-hide-value="' + targetVal + '"]').removeClass('hidden');
        
   }

})(document,Granite.$);
