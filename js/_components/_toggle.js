/**
 * chopstickToggle
 * A basic javascript toggle module with extra options
 *
 * Dependency: jQuery
 *
 * Functionalities:
 * - Hide an element
 * - Toggle a class
 */


//* to create a closure (scoping)
(function() {

    // Define the constructor
    this.ChopstickToggle = function() {
        // Global element references

        // Create default values (super basic toggle)
        var defaults = {
            trigger: '.js-toggle-trigger',
            triggerClassName: 'is-active', // class toggled on trigger
            targetClassName: 'is-hidden', // class toggled on target
            eventName: 'click',
            preventDefault: true //the default action of the event will not be triggered.
        }

        // Create options by extending defaults with the passed in arugments
        this.options = $.extend(defaults, arguments[0]); //https://api.jquery.com/jquery.extend/

        bindUIEvents.call(this);
    }

    // public methods
    ChopstickToggle.prototype.applyState = function() {
        // Apply the targetClassName on the target
        // Apply the triggerClassName on the trigger
        var _ = this;
        $(_.options.thisTarget).addClass(_.options.targetClassName);
        $(_.options.thisTrigger).addClass(_.options.triggerClassName);
    }

    ChopstickToggle.prototype.removeState = function() {
        // Remove the targetClassName on the target
        // Remove the triggerClassName on the trigger
        $(_.options.thisTarget).removeClass(_.options.targetClassName);
        $(_.options.thisTrigger).removeClass(_.options.triggerClassName);
    }

    ChopstickToggle.prototype.toggleState = function() {
        // Toggle the targetClassName on the target
        // Toggle the triggerClassName on the trigger
        var _ = this;
        $(_.options.thisTarget).toggleClass(_.options.targetClassName);
        $(_.options.thisTrigger).toggleClass(_.options.triggerClassName);
    }

    // Private methods
    function bindUIEvents() {
        var _ = this;

        // rethinking the toggler... case styleguide.html
        // we still use the data-target-selector to make it
        // easier to implement.
        $(_.options.trigger).on(_.options.eventName, function(e) {
            // Toggle the default classname on the default target

            if (_.options.preventDefault) {
                e.preventDefault();
            }

            _.options.thisTrigger = $(this);
            _.options.thisTarget = $(this).data('target-selector');
            _.toggleState();
        });
    }
}());
