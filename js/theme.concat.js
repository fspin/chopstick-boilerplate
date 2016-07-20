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

var hideSettings
chopstick.hide =
{
    settings:
    {
        hide: $('.js-hide')
    },

    init: function()
    {
        hideSettings = chopstick.hide.settings;
        chopstick.hide.hideContent();
    },

    hideContent: function ()
    {
        hideSettings.hide.on('click', function(e)
        {
            e.preventDefault();
            $(this).closest(hideSettings.hide).parent().addClass('is-hidden');
        });
    }
};

var mobileNavSettings
chopstick.mobileNav =
{
    settings:
    {
        navigation: $('.js-nav'),
        trigger: $('.js-nav-trigger')
    },

    init: function()
    {
        // Initialize mobile nav settings
        mobileNavSettings = chopstick.mobileNav.settings;
        // Bind toggle events
        chopstick.mobileNav.bindUIEvents();
    },

    bindUIEvents: function()
    {
        mobileNavSettings.trigger.on('click', function() {
            chopstick.mobileNav.toggleNavigation();
        });
    },

    // build mobile nav
    toggleNavigation: function()
    {
        mobileNavSettings.navigation.toggleClass('is-visible');
        mobileNavSettings.trigger.toggleClass('is-active');
    }
};

/**
 * chopstickTabs
 * A basic javascript tabs module with extra options
 *
 * Dependency:
 * - jQuery
 *
 * HTML Structure:
 * - tabNavigation > links (a.js-tabs-link) with attr(href) referencing the #tabs
 * - tabContent > in .js-tabs-content > elements with an id to be linked.
 *
 * Functionalities:
 * -
**/

(function() {

    // Define the constructor
    this.ChopstickTabs = function() {

        // Create default values (super basic tabs)
        var defaults = {
            // tabNavigation: $('.js-tabs-nav'),
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
})();

var toggleSettings
chopstick.toggle =
{
    settings:
    {
        showHideToggle: $('.js-show-hide')
    },

    init: function()
    {
        // Initialize toggle settings
        toggleSettings = chopstick.toggle.settings;
        // Bind toggle events
        chopstick.toggle.bindUIEvents();
    },

    bindUIEvents: function()
    {
        // Bind show hide event
        toggleSettings.showHideToggle.on('touchstart click', function(e){
            var trigger = $(this);
            // Check if action needs to be prevented
            if (trigger.data("action") == "none") {
                e.preventDefault();
            }
            chopstick.toggle.showHide(trigger.data("target-selector"));
            trigger.toggleClass('is-toggled');
        });
    },

    showHide: function(targets)
    {
        //  Toggle the 'is-hidden' class
        $(targets).toggleClass('is-hidden');
    }
};

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
            target: '.js-toggle-target',
            targetClassName: 'is-hidden', // class toggled on target
            eventName: 'click',
            preventDefault: true, //the default action of the event will not be triggered.
        }

        // Create options by extending defaults with the passed in arugments
        // if (arguments[0] && typeof arguments[0] === "object") {
        this.options = $.extend(defaults, arguments[0]); //https://api.jquery.com/jquery.extend/
        // console.log(this.options);
        // }

        // console.log(this.options);
        bindUIEvents.call(this);
    }

    // public methods
    ChopstickToggle.prototype.applyState = function() {
        // Apply a certain classname on a certain target
        var _ = this;
        $(_.options.target).addClass(_.options.targetClassName);
        $(_.options.trigger).addClass(_.options.triggerClassName);
    }

    ChopstickToggle.prototype.removeState = function() {
        // Remove a certain classname on a certain target
        var _ = this;
        $(_.options.target).removeClass(_.options.targetClassName);
        $(_.options.trigger).removeClass(_.options.triggerClassName);
    }

    ChopstickToggle.prototype.toggleState = function() {
        // toggle a certain classname on a certain target
        var _ = this;
        $(_.options.target).toggleClass(_.options.targetClassName);
        $(_.options.trigger).toggleClass(_.options.triggerClassName);
    }

    // Private methods
    function bindUIEvents() {
        var _ = this;
        // console.log(_.options.eventName);

        $(_.options.trigger).on(_.options.eventName, function(e) {
            // Toggle the default classname on the default target
            if (_.options.preventDefault) {
                e.preventDefault();
            }

            _.toggleState();
        });
    }

    // var module = {};
    //
    // /*
    // *  chopstickToggle.class
    // *  Toggle a class on an HTML element.
    // *  @param element {String} Element reference (e.g. .js-toggle-class)
    // *  @param classname {String} Class that needs to be toggled (e.g. .is-hidden)
    // *  @param pd {Number} Indicator if e.preventDefault needs to be enabled.
    // *  @param evt {String} Defines on which event the toggle needs to be triggerd.
    // */
    // module.class = function(element, classname, pd, evt) {
    //     var $target = $(element);
    //
    //     if (typeof pd === 'undefined') { pd = true; }
    //     if (typeof evt === 'undefined') { evt = 'click'; }
    //
    //     $target.on(evt, function(e) {
    //         // check if preventDefault needs to be enabled
    //         if(_enableCheck(pd)) { e.preventDefault(); }
    //         // toggle the class on the clicked element
    //         $(this).toggleClass(classname);
    //     });
    // }
    //
    // /*
    // *  _enableCheck
    // *  Used to check if user wants/doesn't want to enable a functionality.
    // *  @param value {Number} Value that indicates a want/doens't want.
    // */
    // var _enableCheck = function(value) {
    //     if (value === 1) {
    //         return true;
    //     }
    //     return false;
    // }
    //
    // return module;
}());

$(chopstick.init);

var toggleButton = new ChopstickToggle();

var mobileNavToggle = new ChopstickToggle({
    trigger: '.js-nav-trigger',
    target: '.js-nav',
    targetClassName: 'is-visible'
});

var exampleTabs = new ChopstickTabs();











































// if ($('js-nav').hasClass('is-visible')) {
//     console.log(mobileNavToggle.trigger);
// }


/* ISSUES */
/*
    1. If 2 different instances of ChopstickToggle have the same target, and another event: both events are linked.










*/
