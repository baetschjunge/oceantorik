/*
 *   navigation-header-btn-search (Toggle) for search-input and search-event
 *   created by b.b.
 *
 */

 // TODO there is still a bug left with the event.target.id

//
// (function ($) {
//     $(document).ready(function () {
//
//         // Search-Input-Field of Search-Bar
//         var searchInput = $('.header-nav__mid__search .search__form__input');
//         var searchButton = $('.header-nav__mid__search .search__form__submit');
//
//
//         // close Search-Input-Field by clicking anywhere else on the page
//         function removeSearchForm(event) {
//             if (event.target.id != "search-form-js") {
//
//                 // TODO goes here
//
//                 //console.log(event.target.id);
//                 searchInput.removeClass('is-open');
//             }
//         }
//         $('body').bind('click', removeSearchForm);
//
//         // open Search-Input-Field by clicking Search-Icon, if its closed
//         // process search, if its open
//         searchButton.click(function (event) {
//             // just checking for "is-open" does not suffice
//             // since this class is not evaluated for mobile screens
//             if (searchInput.css("visibility") == "hidden") {
//                 event.preventDefault(event);
//                 event.stopPropagation();
//
//                 searchInput.addClass('is-open');
//                 // wait for button to be focused
//                 setTimeout(function () {
//                     searchInput.focus();
//                 }, 300);
//             }
//         });
//     });
// })(jQuery);
