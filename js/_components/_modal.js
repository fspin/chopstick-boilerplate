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
