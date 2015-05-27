/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL is defined', function() {
            //loop through elements to check URL
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });
        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('check allFeeds object names', function() {
            // loop through elements to check name
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });
    /* Write a new test suite named "The menu" */
    describe('Menu', function() {
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('the menu element is hidden by default', function() {
            // if menu is hidden by default it will have the .menu-hidden class
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu changes visibility when clicked', function() {
            var checkClick = $('.menu-icon-link');
            // when clicked menu-hidden class will disappear because menu will be displayed
            checkClick.click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            // when clicked again menu-hidden class will be present because menu will be hidden
            checkClick.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });
    /* Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
                loadFeed(0, done);
        });
        // there will be at least one entry
        it('feed container has at least a single entry', function(done) {
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var previousContent;
        beforeEach(function(done) {
            loadFeed(0, function() {
                previousContent = $('.feed').html();
                loadFeed(1, done);
            });
        });
        it('loads and updates page with new entries', function(done) {
            expect($('.feed').html()).not.toBe(previousContent);
            done();
      });
    });
}());
