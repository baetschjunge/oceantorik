/*
 *   navigation-header-btn-search (Toggle) for search-input and search-event
 *   created by b.b.
 *
 */

 // TODO there is still a bug left with the event.target.id

//
(function ($) {
    $(document).ready(function () {

        var searchComp = $('#search-js');
        var searchInput = $('#search-js .search__input');
        var searchButton = $('#search-js .search__button');

        searchButton.click(function (event) {
          searchInput.toggleClass('search__input--closed');
        });


        // open Search-Input-Field by clicking Search-Icon, if its closed
        // process search, if its open
        // searchButton.click(function (event) {
        //   console.log("search yo");
        //     // just checking for "is-open" does not suffice
        //     // since this class is not evaluated for mobile screens
        //     // if (searchInput.css("visibility") == "hidden") {
        //     //     event.preventDefault(event);
        //     //     event.stopPropagation();
        //
        //   searchInput.removeClass('.search__input--closed');
        //   // wait for button to be focused
        //   setTimeout(function () {
        //       searchInput.focus();
        //   }, 300);
        //     // }

        // close Search-Input-Field by clicking anywhere else on the page
        // function removeSearchForm(event) {
        //   console.log(event.target.id);
        //     if (event.target.id != "search-js") {
        //
        //         // TODO goes here
        //
        //         //console.log(event.target.id);
        //         searchInput.addClass('search__input--closed');
        //     }
        // }
        // $('body').bind('click', removeSearchForm);

    });
})(jQuery);
