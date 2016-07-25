var chopstick =
{
    // init, something like a constructor
    init: function()
    {
        // chopstick.loadObject(chopstick.mobileNav, 'chopstick.mobileNav');
        chopstick.loadObject(chopstick.hide, 'chopstick.hide');
        chopstick.loadObject(chopstick.toggle, 'chopstick.toggle');

        // console.log("javascript is locked and loaded!") // for testing purposes. Check your console. Delete after you finished reading this. :-)
    },

    /**
     * This function will load an object by a given name
     *
     * If the object doesn't exist no error will be thrown
     * But if object exists but doesn't have an init method it will throw an error
     *
     * If everything is ok we'll initiate the given object
     */
    loadObject: function(obj, name)
    {
        // create object based on a name
        // var objName = window[objName];

        // check if object exists
        if(typeof obj != 'undefined') {

            // check if object has a method init
            if (typeof obj.init == 'undefined') {
                // we will throw an error so the designer / developer know there's a problem
                throw new Error('ERROR: "' + name + '" does not have an init function');

            } else {
                // everything is fine so initiate
                obj.init();
            }
        }
    }
};

// var hideSettings
// chopstick.hide =
// {
//     settings:
//     {
//         hide: $('.js-hide')
//     },
//
//     init: function()
//     {
//         hideSettings = chopstick.hide.settings;
//         chopstick.hide.hideContent();
//     },
//
//     hideContent: function ()
//     {
//         hideSettings.hide.on('click', function(e)
//         {
//             e.preventDefault();
//             $(this).closest(hideSettings.hide).parent().addClass('is-hidden');
//         });
//     }
// };

// var mobileNavSettings
// chopstick.mobileNav =
// {
//     settings:
//     {
//         navigation: $('.js-nav'),
//         trigger: $('.js-nav-trigger')
//     },
//
//     init: function()
//     {
//         // Initialize mobile nav settings
//         mobileNavSettings = chopstick.mobileNav.settings;
//         // Bind toggle events
//         chopstick.mobileNav.bindUIEvents();
//     },
//
//     bindUIEvents: function()
//     {
//         mobileNavSettings.trigger.on('click', function() {
//             chopstick.mobileNav.toggleNavigation();
//         });
//     },
//
//     // build mobile nav
//     toggleNavigation: function()
//     {
//         mobileNavSettings.navigation.toggleClass('is-visible');
//         mobileNavSettings.trigger.toggleClass('is-active');
//     }
// };

/**
 * chopstickModal
 * A basic javascript modal module with extra options
 *
 * Dependency:
 * - jQuery
 *
 * HTML Structure:
 * - .js-modal-overlay > .js-modal > .js-modal-close ~ .js-modal-content
 * - A wrapper (height & width: 100%) as an overlay. Inside, the modal itself.
 *   And inside of it, two childrens: a close button and the content
 *   with an auto overflow.
 * - Default event: 'click'
 *
 * Freely based on:
 * - [Building Your Own JavaScript Modal Plugin](https://scotch.io/tutorials/building-your-own-javascript-modal-plugin)
 * - [Considerations for Styling a Modal](https://css-tricks.com/considerations-styling-modal/)
 *
 * @TODO accessibility issues are not approached: focus, tab_index, etc.
 * - More info: [Building better accessibility primitives](http://robdodson.me/building-better-accessibility-primitives/)
**/

(function() {

    // Define the constructor
    this.ChopstickModal = function() {

        // Create default values (basic modal)
        var defaults = {
            classTrigger: '.js-modal',
            classContent: '.js-modal-content',
            classOverlay: '.js-modal-overlay',
            classCloseButton: '.js-modal-close',
            eventName: 'click', // which event to select the tabs
            preventDefault: true //the default action of the event will not be triggered.
        }

        // Create options by extending defaults with the passed in arugments
        this.options = $.extend(defaults, arguments[0]); //https://api.jquery.com/jquery.extend/

        bindUIEvents.call(this);
    }

    // Public methods
    ChopstickModal.prototype.openModal = function() {
        // Show the modal
        $(this.options.classOverlay).addClass('is-active');
        $(this.options.classContent).delay(200).addClass('is-active');

        // Disable scrolling
        $('body').addClass('is-open-modal');
    }

    ChopstickModal.prototype.closeModal = function() {
        // Hide the modal
        $(this.options.classContent).removeClass('is-active');
        $(this.options.classOverlay).delay(200).removeClass('is-active');

        // Enable scrolling
        $('body').removeClass('is-open-modal');
    }

    function bindUIEvents() {
        var _ = this;

        // @TODO: control if is it bind() a way to preventDefault? or if is it better the former method?
        /*
        // _.options.tabLinks.on(_.options.eventName, function(e) {
        //
        //     // Toggle the default classname on the default target
        //     if (_.options.preventDefault) {
        //         e.preventDefault();
        //     }
        //
        //     _.activate($(this));
        // });
        */

        // Binding the close function to CloseButton & Overlay
        var closeTrigger = [this.options.classCloseButton, this.options.classOverlay];
        for (var i = 0; i < closeTrigger.length; i++) {
            $(closeTrigger[i]).on(this.options.eventName, this.closeModal.bind(this));
        }

        // Binding the open function to the trigger element
        $(this.options.classTrigger).on(this.options.eventName, this.openModal.bind(this));
    }
}());

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

$(chopstick.init);

var toggler = new ChopstickToggle();

var mobileNavToggle = new ChopstickToggle({
    trigger: '.js-nav-trigger',
    targetClassName: 'is-visible'
});

var exampleTabs = new ChopstickTabs();

var exampleModal = new ChopstickModal();










































// if ($('js-nav').hasClass('is-visible')) {
//     console.log(mobileNavToggle.trigger);
// }


/* ISSUES */
/*
    1. If 2 different instances of ChopstickToggle have the same target, and another event: both events are linked.










*/
