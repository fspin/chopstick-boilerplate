/**
 * chopstickTabs
 * A basic javascript tabs module with extra options
 *
 * Dependency:
 * - jQuery
 *
 * HTML Structure:
 * - links (a.js-tabs-link) with attr(href) referencing the #tabs
 *
 * Functionalities:
 * -
**/

(function() {

    // Define the constructor
    this.ChopstickTabs = function() {

        // Create default values (super basic tabs)
        var defaults = {
            tabLinks: $('.js-tabs-link'),
            eventName: 'click', // which event to select the tabs
            className: 'is-selected',
            preventDefault: true //the default action of the event will not be triggered.
        }

        // Create options by extending defaults with the passed in arugments
        this.options = $.extend(defaults, arguments[0]); //https://api.jquery.com/jquery.extend/

        bindUIEvents.call(this);
    }

    // Public methods
    ChopstickTabs.prototype.activate = function(navigationItem) {
        var targetPane = $(navigationItem.attr('href'));

        navigationItem.parent().siblings().each(function() {
            if ($(this).hasClass('is-selected')) {
                $(this).removeClass('is-selected');
            }
        });

        // Set the correct nav item active
        navigationItem.parent().addClass(this.options.className);

        // Reset all panes
        targetPane.siblings().each(function() {
            $(this).hide();
        });

        // Go to target pane
        targetPane.show();
    }

    // Private methods
    function bindUIEvents() {
        var _ = this;

        _.options.tabLinks.on(_.options.eventName, function(e) {

            // Toggle the default classname on the default target
            if (_.options.preventDefault) {
                e.preventDefault();
            }

            _.activate($(this));
        });
    }
}());
