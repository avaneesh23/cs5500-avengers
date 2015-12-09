/**
 * Created by Caris on 12/2/2015.
 */

describe('Testing getLocation controller (search functionality) in scripts.js', function () {
    describe('Testing functionality of search bar for location and event types', function () {

// load the controller's module
        beforeEach(module('scotchApp'));

        var $scope, $rootScope, controller;

        beforeEach(inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            var $controller = $injector.get('$controller');

            CreateTarget = function () {
                $controller('getLocation', {$scope: $scope});
            }
        }));

        it('When you open the webpage the searchKeyword should be an empty string.', function () {
            controller = CreateTarget();
            $scope.init();

            expect($scope.searchKeyword).toBe("");
            expect($scope.keyword).toBe("");
            expect($scope.sortOrder).toBe("Popularity");

        });

        it('When you open the webpage the searchQuery should be an empty string and no location should be set.', function () {
            controller = CreateTarget();
            $scope.init();

            expect($scope.searchQuery).toBe("");
            expect($scope.where).toBe("");

        });

        it('After you open the webpage and enter an event title, a new event search should start.', function () {
            controller = CreateTarget();
            $scope.init();

            $scope.searchKeyword = "concerts";

            $scope.search();
            expect($scope.keyword).toBe("title:concerts");
            expect($scope.sortOrder).toBe("Popularity");

        });

    });

describe('Testing new search location functionality', function() {
    beforeEach(module('scotchApp'));

    var $scope;
    var controller;
    var httpLocalBackend;

    beforeEach(inject(function ($rootScope, $controller, $injector) {
        $scope = $rootScope.$new();
        controller = $controller('getLocation', {
            $scope: $scope
        });
    }));

    beforeEach(inject(function ($httpBackend) {
        httpLocalBackend = $httpBackend;
    }));

    it('should get map data', function () {
        $scope.searchQuery = 'Washington';
        $scope.apiKey = "rcnxbzfT3dLNF3ff";
        $scope.category.id = "Concerts";
        $scope.where = "38.9071923,-77.0368707";
        $scope.range = "10";
        //$scope.pageNo = "2";
        $scope.sortOrder = "Popularity";
        var url2 = "http://api.eventful.com/json/events/search?app_key=" + $scope.apiKey + "&keywords=" + $scope.keyword + "&category=" + $scope.category.id + "&where=" + $scope.where + "&within="+ $scope.range + "&units=mi&date=Future&page_size=10&page_number=" + $scope.pageNo + "&include=categories,price,links&sort_order=" + $scope.sortOrder+"&dataType=json&callback=JSON_CALLBACK";
        var httpResponse2 =
        {"last_item":null,"total_items":"6759","first_item":null,"page_number":"2","page_size":"10","page_items":null,"search_time":"0.053","page_count":"676","events":{"event":[{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"DC","postal_code":"20004","going_count":null,"all_day":"0","latitude":"38.8981531","groups":null,"url":"http://washingtondc.eventful.com/events/justin-bieber-/E0-001-089256078-8?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-089256078-8","privacy":"1","city_name":"Washington","link_count":null,"longitude":"-77.0205887","country_name":"United States","country_abbr":"USA","region_name":"District of Columbia","start_time":"2016-04-29 19:30:00","tz_id":null,"description":"Verizon Center - DC\nWashington, DC \tFri, Apr 29 2016\n7:30 PM","modified":"2015-11-28 23:01:59","venue_display":"1","tz_country":null,"performers":{"performer":{"creator":"TinaMarie13","linker":"evdb","name":"Justin Bieber","url":"http://concerts.eventful.com/Justin-Bieber?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-000165263-2","short_bio":"Pop"}},"price":null,"title":"Justin Bieber","venue_address":"601 F Street NW","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"charliejami","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"}]},"image":{"small":{"width":"48","url":"http://s1.evcdn.com/images/small/I0-001/024/476/512-2.jpeg_/justin-bieber-12.jpeg","height":"48"},"width":"48","caption":null,"medium":{"width":"128","url":"http://s1.evcdn.com/images/medium/I0-001/024/476/512-2.jpeg_/justin-bieber-12.jpeg","height":"128"},"url":"http://s1.evcdn.com/images/small/I0-001/024/476/512-2.jpeg_/justin-bieber-12.jpeg","thumb":{"width":"48","url":"http://s1.evcdn.com/images/thumb/I0-001/024/476/512-2.jpeg_/justin-bieber-12.jpeg","height":"48"},"height":"48"},"created":"2015-11-28 19:50:27","venue_id":"V0-001-000270424-2","tz_city":null,"stop_time":null,"venue_name":"Verizon Center","venue_url":"http://washingtondc.eventful.com/venues/verizon-center-/V0-001-000270424-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"DC","postal_code":"20004","going_count":null,"all_day":"0","latitude":"38.8981531","groups":null,"url":"http://washingtondc.eventful.com/events/rihanna-/E0-001-089143361-8?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-089143361-8","privacy":"1","city_name":"Washington","link_count":null,"longitude":"-77.0205887","country_name":"United States","country_abbr":"USA","region_name":"District of Columbia","start_time":"2016-03-22 19:30:00","tz_id":null,"description":null,"modified":"2015-11-24 09:54:39","venue_display":"1","tz_country":null,"performers":{"performer":{"creator":"BISHOP1996","linker":"evdb","name":"Rihanna","url":"http://concerts.eventful.com/Rihanna?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-000050576-2","short_bio":"Pop"}},"price":"30.50 - 151.00 ","title":"Rihanna","venue_address":"601 F Street NW","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"}]},"image":{"small":{"width":"48","url":"http://s1.evcdn.com/images/small/I0-001/001/867/008-9.jpeg_/rihanna-08.jpeg","height":"48"},"width":"48","caption":null,"medium":{"width":"128","url":"http://s1.evcdn.com/images/medium/I0-001/001/867/008-9.jpeg_/rihanna-08.jpeg","height":"128"},"url":"http://s1.evcdn.com/images/small/I0-001/001/867/008-9.jpeg_/rihanna-08.jpeg","thumb":{"width":"48","url":"http://s1.evcdn.com/images/thumb/I0-001/001/867/008-9.jpeg_/rihanna-08.jpeg","height":"48"},"height":"48"},"created":"2015-11-23 16:30:09","venue_id":"V0-001-000270424-2","tz_city":null,"stop_time":null,"venue_name":"Verizon Center","venue_url":"http://washingtondc.eventful.com/venues/verizon-center-/V0-001-000270424-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"DC","postal_code":"20004","going_count":null,"all_day":"0","latitude":"38.8981531","groups":null,"url":"http://washingtondc.eventful.com/events/disney-ice-celebrates-100-/E0-001-065500864-1@2015123119?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-065500864-1@2015123119","privacy":"1","city_name":"Washington","link_count":null,"longitude":"-77.0205887","country_name":"United States","country_abbr":"USA","region_name":"District of Columbia","start_time":"2015-12-31 19:30:00","tz_id":null,"description":"Get ready to join the festivities when Disney On Ice celebrates 100 Years of Magic arrives at Verizon Center in Washington, D.C. from February 12-17. This captivating production has entertained more than 135 million guests worldwide to date.","modified":"2014-06-17 11:03:18","venue_display":"1","tz_country":null,"performers":{"performer":{"creator":"karina25","linker":"evdb","name":"Disney on Ice","url":"http://eventful.com/performers/disney-on-ice-/P0-001-000098607-3?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-000098607-3","short_bio":"The Ice Skating Spectacular"}},"price":"Tickets for Disney On Ice Celebrates 100 Years of Magic are $80 (Front Row), $55 (VIP), $30 and $20 (plus applicable service charges). Tickets go on sale on December 30 at 10 a.m. through all Ticketmaster outlets including the Verizon Center box office, online at www.ticketmaster.com and via Phonecharge at 1-800-745-3000.","title":"Disney on Ice Celebrates 100 Years of Magic","venue_address":"601 F Street NW","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":"on various days","calendars":null,"owner":"verizoncenterpr","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Kids &amp; Family","id":"family_fun_kids"},{"name":"Performing Arts","id":"performing_arts"}]},"image":{"small":{"width":"48","url":"http://s4.evcdn.com/images/small/I0-001/003/535/919-2.jpeg_/disney-on-ice-19.jpeg","height":"48"},"width":"48","caption":null,"medium":{"width":"128","url":"http://s4.evcdn.com/images/medium/I0-001/003/535/919-2.jpeg_/disney-on-ice-19.jpeg","height":"128"},"url":"http://s4.evcdn.com/images/small/I0-001/003/535/919-2.jpeg_/disney-on-ice-19.jpeg","thumb":{"width":"48","url":"http://s4.evcdn.com/images/thumb/I0-001/003/535/919-2.jpeg_/disney-on-ice-19.jpeg","height":"48"},"height":"48"},"created":"2014-01-06 08:49:54","venue_id":"V0-001-000270424-2","tz_city":null,"stop_time":"2015-12-31 21:00:00","venue_name":"Verizon Center","venue_url":"http://washingtondc.eventful.com/venues/verizon-center-/V0-001-000270424-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"VA","postal_code":"22305","going_count":null,"all_day":"0","latitude":"38.839858","groups":null,"url":"http://washingtondc.eventful.com/events/rosanne-cash-john-leventhal-/E0-001-086332052-4?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-086332052-4","privacy":"1","city_name":"Alexandria","link_count":null,"longitude":"-77.06129","country_name":"United States","country_abbr":"USA","region_name":"Virginia","start_time":"2015-12-09 19:30:00","tz_id":null,"description":null,"modified":"2015-08-19 12:08:19","venue_display":"1","tz_country":null,"performers":{"performer":{"creator":"rosannecash","linker":"sara_sd","name":"Rosanne Cash","url":"http://concerts.eventful.com/Rosanne-Cash?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-000005653-0","short_bio":"Country Legend"}},"price":"55.00 - 55.00","title":"Rosanne Cash with John Leventhal","venue_address":"3701 Mount Vernon Avenue","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"sara_sd","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"}]},"image":{"small":{"width":"48","url":"http://s2.evcdn.com/images/small/I0-001/001/123/829-1.jpeg_/rosanne-cash-29.jpeg","height":"48"},"width":"48","caption":null,"medium":{"width":"128","url":"http://s2.evcdn.com/images/medium/I0-001/001/123/829-1.jpeg_/rosanne-cash-29.jpeg","height":"128"},"url":"http://s2.evcdn.com/images/small/I0-001/001/123/829-1.jpeg_/rosanne-cash-29.jpeg","thumb":{"width":"48","url":"http://s2.evcdn.com/images/thumb/I0-001/001/123/829-1.jpeg_/rosanne-cash-29.jpeg","height":"48"},"height":"48"},"created":"2015-08-12 03:19:13","venue_id":"V0-001-001524885-2","tz_city":null,"stop_time":null,"venue_name":"The Birchmere","venue_url":"http://washingtondc.eventful.com/venues/the-birchmere-/V0-001-001524885-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"VA","postal_code":"22305","going_count":null,"all_day":"0","latitude":"38.839858","groups":null,"url":"http://washingtondc.eventful.com/events/dan-band-holiday-show-/E0-001-085831666-0?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-085831666-0","privacy":"1","city_name":"Alexandria","link_count":null,"longitude":"-77.06129","country_name":"United States","country_abbr":"USA","region_name":"Virginia","start_time":"2015-12-10 19:30:00","tz_id":null,"description":null,"modified":"2015-07-22 10:18:14","venue_display":"1","tz_country":null,"performers":{"performer":{"creator":"GershComedy","linker":"evdb","name":"The Dan Band","url":"http://concerts.eventful.com/The-Dan-Band?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-000001923-8","short_bio":"Pop / Comedy / Grindcore"}},"price":"29.50 - 29.50 ","title":"The Dan Band Holiday Show!","venue_address":"3701 Mount Vernon Avenue","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"},{"name":"Comedy","id":"comedy"},{"name":"Holiday","id":"holiday"},{"name":"Nightlife &amp; Singles","id":"singles_social"}]},"image":{"small":{"width":"48","url":"http://s3.evcdn.com/images/small/I0-001/000/125/730-3.jpg_/the-dan-band-30.jpg","height":"48"},"width":"48","caption":null,"medium":{"width":"128","url":"http://s3.evcdn.com/images/medium/I0-001/000/125/730-3.jpg_/the-dan-band-30.jpg","height":"128"},"url":"http://s3.evcdn.com/images/small/I0-001/000/125/730-3.jpg_/the-dan-band-30.jpg","thumb":{"width":"48","url":"http://s3.evcdn.com/images/thumb/I0-001/000/125/730-3.jpg_/the-dan-band-30.jpg","height":"48"},"height":"48"},"created":"2015-07-22 10:18:14","venue_id":"V0-001-001524885-2","tz_city":null,"stop_time":null,"venue_name":"The Birchmere","venue_url":"http://washingtondc.eventful.com/venues/the-birchmere-/V0-001-001524885-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"DC","postal_code":"20004","going_count":null,"all_day":"0","latitude":"38.8981531","groups":null,"url":"http://washingtondc.eventful.com/events/jingle-ball-feat-5-seconds-summer-demi-lovato-sh-/E0-001-087743602-6?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-087743602-6","privacy":"1","city_name":"Washington","link_count":null,"longitude":"-77.0205887","country_name":"United States","country_abbr":"USA","region_name":"District of Columbia","start_time":"2015-12-14 19:00:00","tz_id":null,"description":null,"modified":"2015-10-14 09:38:04","venue_display":"1","tz_country":null,"performers":{"performer":[{"creator":"evdb","linker":"evdb","name":"5 Seconds of Summer","url":"http://concerts.eventful.com/5-Seconds-of-Summer?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-014189903-2","short_bio":"Australian pop punk"},{"creator":"Jolene_DQ","linker":"evdb","name":"Demi Lovato","url":"http://concerts.eventful.com/Demi-Lovato?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-000098295-2","short_bio":"Pop"},{"creator":"ShawnMendes","linker":"evdb","name":"Shawn Mendes","url":"http://concerts.eventful.com/performers/shawn-mendes-/P0-001-014195389-9?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-014195389-9","short_bio":"Singer"},{"creator":"evdb","linker":"evdb","name":"Zedd","url":"http://concerts.eventful.com/Zedd?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-000250088-6","short_bio":"Dance / Electronic"},{"creator":"medinaabd76","linker":"evdb","name":"Tove Lo","url":"http://concerts.eventful.com/performers/tove-lo-/P0-001-014196029-7?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-014196029-7","short_bio":"Pop, Alternative"}]},"price":"45.00 - 200.00 ","title":"Jingle Ball feat. 5 Seconds of Summer, Demi Lovato, Shawn Mendes, Zedd and Tove Lo","venue_address":"601 F Street NW","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"},{"name":"Festivals","id":"festivals_parades"}]},"image":{"small":{"width":"48","url":"http://s2.evcdn.com/images/small/I0-001/016/496/113-4.jpeg_/5-seconds-of-summer-13.jpeg","height":"48"},"width":"48","caption":null,"medium":{"width":"128","url":"http://s2.evcdn.com/images/medium/I0-001/016/496/113-4.jpeg_/5-seconds-of-summer-13.jpeg","height":"128"},"url":"http://s2.evcdn.com/images/small/I0-001/016/496/113-4.jpeg_/5-seconds-of-summer-13.jpeg","thumb":{"width":"48","url":"http://s2.evcdn.com/images/thumb/I0-001/016/496/113-4.jpeg_/5-seconds-of-summer-13.jpeg","height":"48"},"height":"48"},"created":"2015-09-28 19:46:23","venue_id":"V0-001-000270424-2","tz_city":null,"stop_time":null,"venue_name":"Verizon Center","venue_url":"http://washingtondc.eventful.com/venues/verizon-center-/V0-001-000270424-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"MD","postal_code":null,"going_count":null,"all_day":"0","latitude":"38.9974820","groups":null,"url":"http://washingtondc.eventful.com/events/mac-miller-/E0-001-086619304-6?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-086619304-6","privacy":"1","city_name":"Silver Spring","link_count":null,"longitude":"-77.0279280","country_name":"United States","country_abbr":"USA","region_name":"Maryland","start_time":"2015-12-13 19:30:00","tz_id":null,"description":null,"modified":"2015-08-25 00:53:09","venue_display":"1","tz_country":null,"performers":{"performer":{"creator":"philly1234","linker":"evdb","name":"Mac Miller","url":"http://concerts.eventful.com/mac-miller?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-000239456-8","short_bio":"rap"}},"price":"32.50 - 32.50 ","title":"Mac Miller","venue_address":"8656 Colesville Rd","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"}]},"image":{"small":{"width":"48","url":"http://s2.evcdn.com/images/small/I0-001/021/218/113-4.jpeg_/mac-miller-13.jpeg","height":"48"},"width":"48","caption":null,"medium":{"width":"128","url":"http://s2.evcdn.com/images/medium/I0-001/021/218/113-4.jpeg_/mac-miller-13.jpeg","height":"128"},"url":"http://s2.evcdn.com/images/small/I0-001/021/218/113-4.jpeg_/mac-miller-13.jpeg","thumb":{"width":"48","url":"http://s2.evcdn.com/images/thumb/I0-001/021/218/113-4.jpeg_/mac-miller-13.jpeg","height":"48"},"height":"48"},"created":"2015-08-24 19:38:31","venue_id":"V0-001-005107249-7","tz_city":null,"stop_time":null,"venue_name":"The Fillmore Silver Spring","venue_url":"http://washingtondc.eventful.com/venues/the-fillmore-silver-spring-/V0-001-005107249-7?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"VA","postal_code":"22305","going_count":null,"all_day":"0","latitude":"38.839858","groups":null,"url":"http://washingtondc.eventful.com/events/aimee-mann-ted-leo-christmas-show-jonathan-coul-/E0-001-087593927-3?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-087593927-3","privacy":"1","city_name":"Alexandria","link_count":null,"longitude":"-77.06129","country_name":"United States","country_abbr":"USA","region_name":"Virginia","start_time":"2015-12-15 19:30:00","tz_id":null,"description":null,"modified":"2015-09-22 23:40:09","venue_display":"1","tz_country":null,"performers":{"performer":[{"creator":"toolshed","linker":"evdb","name":"Aimee Mann","url":"http://concerts.eventful.com/Aimee-Mann?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-000005752-0","short_bio":"Rock/Acoustic/Pop"},{"creator":"jcoulton","linker":"evdb","name":"Jonathan Coulton","url":"http://concerts.eventful.com/Jonathan-Coulton?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-000000067-4","short_bio":"Singer songwriter"}]},"price":"49.50 - 49.50 ","title":"AIMEE MANN & TED LEO CHRISTMAS SHOW with JONATHAN COULTON & SP GUESTS","venue_address":"3701 Mount Vernon Avenue","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"},{"name":"Holiday","id":"holiday"}]},"image":{"small":{"width":"48","url":"http://s1.evcdn.com/images/small/I0-001/014/626/112-8.jpeg_/aimee-mann-12.jpeg","height":"48"},"width":"48","caption":null,"medium":{"width":"128","url":"http://s1.evcdn.com/images/medium/I0-001/014/626/112-8.jpeg_/aimee-mann-12.jpeg","height":"128"},"url":"http://s1.evcdn.com/images/small/I0-001/014/626/112-8.jpeg_/aimee-mann-12.jpeg","thumb":{"width":"48","url":"http://s1.evcdn.com/images/thumb/I0-001/014/626/112-8.jpeg_/aimee-mann-12.jpeg","height":"48"},"height":"48"},"created":"2015-09-22 23:40:09","venue_id":"V0-001-001524885-2","tz_city":null,"stop_time":null,"venue_name":"The Birchmere","venue_url":"http://washingtondc.eventful.com/venues/the-birchmere-/V0-001-001524885-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"VA","postal_code":"22305","going_count":null,"all_day":"0","latitude":"38.839858","groups":null,"url":"http://washingtondc.eventful.com/events/asleep-wheel-merrytexaschristmasyall-/E0-001-085546055-3?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-085546055-3","privacy":"1","city_name":"Alexandria","link_count":null,"longitude":"-77.06129","country_name":"United States","country_abbr":"USA","region_name":"Virginia","start_time":"2015-12-16 19:30:00","tz_id":null,"description":null,"modified":"2015-07-09 17:30:29","venue_display":"1","tz_country":null,"performers":{"performer":{"creator":"tyler0e17c","linker":"evdb","name":"Asleep At The Wheel","url":"http://concerts.eventful.com/Asleep-At-The-Wheel?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-000072508-3","short_bio":"Country / Western Swing"}},"price":"35.00 - 35.00 ","title":"ASLEEP AT THE WHEEL \"MERRY TEXAS CHRISTMAS Y'ALL!\"","venue_address":"3701 Mount Vernon Avenue","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"},{"name":"Holiday","id":"holiday"}]},"image":{"small":{"width":"48","url":"http://s2.evcdn.com/images/small/I0-001/000/573/089-5.jpeg_/asleep-at-the-wheel-89.jpeg","height":"48"},"width":"48","caption":null,"medium":{"width":"128","url":"http://s2.evcdn.com/images/medium/I0-001/000/573/089-5.jpeg_/asleep-at-the-wheel-89.jpeg","height":"128"},"url":"http://s2.evcdn.com/images/small/I0-001/000/573/089-5.jpeg_/asleep-at-the-wheel-89.jpeg","thumb":{"width":"48","url":"http://s2.evcdn.com/images/thumb/I0-001/000/573/089-5.jpeg_/asleep-at-the-wheel-89.jpeg","height":"48"},"height":"48"},"created":"2015-07-09 17:30:29","venue_id":"V0-001-001524885-2","tz_city":null,"stop_time":null,"venue_name":"The Birchmere","venue_url":"http://washingtondc.eventful.com/venues/the-birchmere-/V0-001-001524885-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"DC","postal_code":"20001","going_count":null,"all_day":"0","latitude":"38.9178658","groups":null,"url":"http://washingtondc.eventful.com/events/thievery-corporation-/E0-001-088145955-6?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-088145955-6","privacy":"1","city_name":"Washington","link_count":null,"longitude":"-77.0237219","country_name":"United States","country_abbr":"USA","region_name":"District of Columbia","start_time":"2015-12-17 19:00:00","tz_id":null,"description":"I.M.P. Presents New Shows\n\nCOMING TO THE 9:30 CLUB, Washington, D.C. \n\nThursday, December 17\nThievery Corporation\n7:00pm Doors\n$45\n#Thievery930","modified":"2015-10-15 14:06:39","venue_display":"1","tz_country":null,"performers":{"performer":{"creator":"eslmusic","linker":"evdb","name":"Thievery Corporation","url":"http://concerts.eventful.com/Thievery-Corporation?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-000020809-0","short_bio":"Dub / Electronic / International"}},"price":"$45","title":"Thievery Corporation","venue_address":"815 V Street NW","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":"0","recur_string":null,"calendars":null,"owner":"Nightclub930","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"}]},"image":{"small":{"width":"48","url":"http://s4.evcdn.com/images/small/I0-001/023/635/559-5.png_/thievery-corporation-59.png","height":"48"},"width":"48","caption":null,"medium":{"width":"128","url":"http://s4.evcdn.com/images/medium/I0-001/023/635/559-5.png_/thievery-corporation-59.png","height":"128"},"url":"http://s4.evcdn.com/images/small/I0-001/023/635/559-5.png_/thievery-corporation-59.png","thumb":{"width":"48","url":"http://s4.evcdn.com/images/thumb/I0-001/023/635/559-5.png_/thievery-corporation-59.png","height":"48"},"height":"48"},"created":"2015-10-15 09:15:12","venue_id":"V0-001-000164338-8","tz_city":null,"stop_time":null,"venue_name":"9:30 Club","venue_url":"http://washingtondc.eventful.com/venues/930-club-/V0-001-000164338-8?utm_source=apis&utm_medium=apim&utm_campaign=apic"}]}};

        var url1 = 'http://maps.google.com/maps/api/geocode/json?address=' +$scope.searchQuery;
        var httpResponse1 = {
            "results" : [
                {
                    "address_components" : [
                        {
                            "long_name" : "Washington",
                            "short_name" : "D.C.",
                            "types" : [ "locality", "political" ]
                        },
                        {
                            "long_name" : "District of Columbia",
                            "short_name" : "District of Columbia",
                            "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                            "long_name" : "District of Columbia",
                            "short_name" : "DC",
                            "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                            "long_name" : "United States",
                            "short_name" : "US",
                            "types" : [ "country", "political" ]
                        }
                    ],
                    "formatted_address" : "Washington, DC, USA",
                    "geometry" : {
                        "bounds" : {
                            "northeast" : {
                                "lat" : 38.995548,
                                "lng" : -76.90939299999999
                            },
                            "southwest" : {
                                "lat" : 38.8031495,
                                "lng" : -77.11973999999999
                            }
                        },
                        "location" : {
                            "lat" : 38.9071923,
                            "lng" : -77.03687069999999
                        },
                        "location_type" : "APPROXIMATE",
                        "viewport" : {
                            "northeast" : {
                                "lat" : 38.995548,
                                "lng" : -76.90939299999999
                            },
                            "southwest" : {
                                "lat" : 38.8031495,
                                "lng" : -77.11973999999999
                            }
                        }
                    },
                    "place_id" : "ChIJW-T2Wt7Gt4kRKl2I1CJFUsI",
                    "types" : [ "locality", "political" ]
                },
                {
                    "address_components" : [
                        {
                            "long_name" : "Washington",
                            "short_name" : "Washington",
                            "types" : [ "locality", "political" ]
                        },
                        {
                            "long_name" : "Hampton",
                            "short_name" : "Hampton",
                            "types" : [ "administrative_area_level_3", "political" ]
                        },
                        {
                            "long_name" : "Rappahannock County",
                            "short_name" : "Rappahannock County",
                            "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                            "long_name" : "Virginia",
                            "short_name" : "VA",
                            "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                            "long_name" : "United States",
                            "short_name" : "US",
                            "types" : [ "country", "political" ]
                        },
                        {
                            "long_name" : "22747",
                            "short_name" : "22747",
                            "types" : [ "postal_code" ]
                        }
                    ],
                    "formatted_address" : "Washington, VA 22747, USA",
                    "geometry" : {
                        "bounds" : {
                            "northeast" : {
                                "lat" : 38.717447,
                                "lng" : -78.1546579
                            },
                            "southwest" : {
                                "lat" : 38.7077278,
                                "lng" : -78.16559889999999
                            }
                        },
                        "location" : {
                            "lat" : 38.7134519,
                            "lng" : -78.1594439
                        },
                        "location_type" : "APPROXIMATE",
                        "viewport" : {
                            "northeast" : {
                                "lat" : 38.717447,
                                "lng" : -78.1546579
                            },
                            "southwest" : {
                                "lat" : 38.7077278,
                                "lng" : -78.16559889999999
                            }
                        }
                    },
                    "place_id" : "ChIJgcQcZykztIkRdZRJgYO-NM4",
                    "types" : [ "locality", "political" ]
                },
                {
                    "address_components" : [
                        {
                            "long_name" : "Washington",
                            "short_name" : "Washington",
                            "types" : [ "locality", "political" ]
                        },
                        {
                            "long_name" : "Washington County",
                            "short_name" : "Washington County",
                            "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                            "long_name" : "Utah",
                            "short_name" : "UT",
                            "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                            "long_name" : "United States",
                            "short_name" : "US",
                            "types" : [ "country", "political" ]
                        }
                    ],
                    "formatted_address" : "Washington, UT, USA",
                    "geometry" : {
                        "bounds" : {
                            "northeast" : {
                                "lat" : 37.1912612,
                                "lng" : -113.4216337
                            },
                            "southwest" : {
                                "lat" : 37.0449575,
                                "lng" : -113.5366738
                            }
                        },
                        "location" : {
                            "lat" : 37.1305373,
                            "lng" : -113.5082867
                        },
                        "location_type" : "APPROXIMATE",
                        "viewport" : {
                            "northeast" : {
                                "lat" : 37.1912612,
                                "lng" : -113.4216337
                            },
                            "southwest" : {
                                "lat" : 37.0449575,
                                "lng" : -113.5366738
                            }
                        }
                    },
                    "place_id" : "ChIJM8ibgoBZyoARipTj-GvKL3M",
                    "types" : [ "locality", "political" ]
                },
                {
                    "address_components" : [
                        {
                            "long_name" : "Washington",
                            "short_name" : "Washington",
                            "types" : [ "locality", "political" ]
                        },
                        {
                            "long_name" : "Washington",
                            "short_name" : "Washington",
                            "types" : [ "administrative_area_level_3", "political" ]
                        },
                        {
                            "long_name" : "Washington County",
                            "short_name" : "Washington County",
                            "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                            "long_name" : "Iowa",
                            "short_name" : "IA",
                            "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                            "long_name" : "United States",
                            "short_name" : "US",
                            "types" : [ "country", "political" ]
                        },
                        {
                            "long_name" : "52353",
                            "short_name" : "52353",
                            "types" : [ "postal_code" ]
                        }
                    ],
                    "formatted_address" : "Washington, IA 52353, USA",
                    "geometry" : {
                        "bounds" : {
                            "northeast" : {
                                "lat" : 41.3163429,
                                "lng" : -91.66413799999999
                            },
                            "southwest" : {
                                "lat" : 41.279653,
                                "lng" : -91.7225869
                            }
                        },
                        "location" : {
                            "lat" : 41.30140770000001,
                            "lng" : -91.69164169999999
                        },
                        "location_type" : "APPROXIMATE",
                        "viewport" : {
                            "northeast" : {
                                "lat" : 41.3163429,
                                "lng" : -91.66413799999999
                            },
                            "southwest" : {
                                "lat" : 41.279653,
                                "lng" : -91.7225869
                            }
                        }
                    },
                    "place_id" : "ChIJGeFayWco5IcR6l_c2SoPa_0",
                    "types" : [ "locality", "political" ]
                },
                {
                    "address_components" : [
                        {
                            "long_name" : "Washington",
                            "short_name" : "Washington",
                            "types" : [ "locality", "political" ]
                        },
                        {
                            "long_name" : "Wilkes County",
                            "short_name" : "Wilkes County",
                            "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                            "long_name" : "Georgia",
                            "short_name" : "GA",
                            "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                            "long_name" : "United States",
                            "short_name" : "US",
                            "types" : [ "country", "political" ]
                        },
                        {
                            "long_name" : "30673",
                            "short_name" : "30673",
                            "types" : [ "postal_code" ]
                        }
                    ],
                    "formatted_address" : "Washington, GA 30673, USA",
                    "geometry" : {
                        "bounds" : {
                            "northeast" : {
                                "lat" : 33.7568209,
                                "lng" : -82.7132029
                            },
                            "southwest" : {
                                "lat" : 33.705673,
                                "lng" : -82.783627
                            }
                        },
                        "location" : {
                            "lat" : 33.7367948,
                            "lng" : -82.7393089
                        },
                        "location_type" : "APPROXIMATE",
                        "viewport" : {
                            "northeast" : {
                                "lat" : 33.7568209,
                                "lng" : -82.7132029
                            },
                            "southwest" : {
                                "lat" : 33.705673,
                                "lng" : -82.783627
                            }
                        }
                    },
                    "place_id" : "ChIJ81BBKaql94gR3lSoBi3ngMM",
                    "types" : [ "locality", "political" ]
                },
                {
                    "address_components" : [
                        {
                            "long_name" : "Washington",
                            "short_name" : "Washington",
                            "types" : [ "locality", "political" ]
                        },
                        {
                            "long_name" : "Lubeck",
                            "short_name" : "Lubeck",
                            "types" : [ "administrative_area_level_3", "political" ]
                        },
                        {
                            "long_name" : "Wood County",
                            "short_name" : "Wood County",
                            "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                            "long_name" : "West Virginia",
                            "short_name" : "WV",
                            "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                            "long_name" : "United States",
                            "short_name" : "US",
                            "types" : [ "country", "political" ]
                        }
                    ],
                    "formatted_address" : "Washington, WV, USA",
                    "geometry" : {
                        "bounds" : {
                            "northeast" : {
                                "lat" : 39.2625859,
                                "lng" : -81.644955
                            },
                            "southwest" : {
                                "lat" : 39.22258009999999,
                                "lng" : -81.69162799999999
                            }
                        },
                        "location" : {
                            "lat" : 39.244853,
                            "lng" : -81.6637765
                        },
                        "location_type" : "APPROXIMATE",
                        "viewport" : {
                            "northeast" : {
                                "lat" : 39.2625859,
                                "lng" : -81.644955
                            },
                            "southwest" : {
                                "lat" : 39.22258009999999,
                                "lng" : -81.69162799999999
                            }
                        }
                    },
                    "place_id" : "ChIJmVYtjW1PSIgR0MWRd5Rd9wM",
                    "types" : [ "locality", "political" ]
                }
            ],
            "status" : "OK"
        };
        httpLocalBackend.expectGET(url1).respond(200, httpResponse1);
       // httpLocalBackend.expectGET(url2).respond(200, httpResponse2);

      //  httpLocalBackend.expectJSONP(url1).respond(200, httpResponse1);
        httpLocalBackend.expectJSONP(url2).respond(200, httpResponse2);

        $scope.search();
        httpLocalBackend.flush();
        expect($scope.where).toBe("38.9071923,-77.0368707");
        expect($scope.error).toBe("");
        // NEED TO UNCOMMENT $scope.show AND FINISH TEST
    });
});

describe('Testing scope.show functionality', function() {
    beforeEach(module('scotchApp'));

    var $scope;
    var controller;
    var httpLocalBackend;

    beforeEach(inject(function ($rootScope, $controller, $injector) {
        $scope = $rootScope.$new();
        controller = $controller('getLocation', {
            $scope: $scope
        });
    }));

    beforeEach(inject(function ($httpBackend) {
        httpLocalBackend = $httpBackend;
    }));

    it('should get event data', function () {
        $scope.apiKey = "rcnxbzfT3dLNF3ff";
        $scope.keyword = 'concerts';
        $scope.category.id = 'Concerts';
        $scope.where = "38.9071923,-77.0368707";
        $scope.range = "10";
        $scope.pageNo = "2";
        $scope.sortOrder = "Relevance";
        var url = "http://api.eventful.com/json/events/search?app_key=" + $scope.apiKey + "&keywords=" + $scope.keyword + "&category=" + $scope.category.id + "&where=" + $scope.where + "&within="+ $scope.range + "&units=mi&date=Future&page_size=10&page_number=" + $scope.pageNo + "&include=categories,price,links&sort_order=" + $scope.sortOrder+"&dataType=json&callback=JSON_CALLBACK";
        var httpResponse =
        {"last_item":null,"total_items":"566","first_item":null,"page_number":"2","page_size":"10","page_items":null,"search_time":"0.065","page_count":"57","events":{"event":[{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"VA","postal_code":"22314","going_count":null,"all_day":"0","latitude":"38.8075630","groups":null,"url":"http://washingtondc.eventful.com/events/dueling-mallets-orff-vs-bronze-concert-/E0-001-086659667-8?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-086659667-8","privacy":"1","city_name":"Alexandria","link_count":null,"longitude":"-77.0659821","country_name":"United States","country_abbr":"USA","region_name":"Virginia","start_time":"2016-06-05 16:00:00","tz_id":null,"description":" Tickets will also be available at the door the day of the concert. ","modified":"2015-12-02 16:28:11","venue_display":"1","tz_country":null,"performers":null,"price":null,"title":"Dueling Mallets: Orff vs. Bronze Concert","venue_address":"101 Callahan Drive","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Performing Arts","id":"performing_arts"}]},"image":{"small":{"width":"48","url":"http://s2.evcdn.com/images/small/I0-001/024/505/733-0.jpeg_/dueling-mallets-orff-vs-bronze-concert-33.jpeg","height":"48"},"width":"48","caption":null,"medium":{"width":"128","url":"http://s2.evcdn.com/images/medium/I0-001/024/505/733-0.jpeg_/dueling-mallets-orff-vs-bronze-concert-33.jpeg","height":"128"},"url":"http://s2.evcdn.com/images/small/I0-001/024/505/733-0.jpeg_/dueling-mallets-orff-vs-bronze-concert-33.jpeg","thumb":{"width":"48","url":"http://s2.evcdn.com/images/thumb/I0-001/024/505/733-0.jpeg_/dueling-mallets-orff-vs-bronze-concert-33.jpeg","height":"48"},"height":"48"},"created":"2015-08-26 14:54:57","venue_id":"V0-001-001165603-5","tz_city":null,"stop_time":null,"venue_name":"Grounds of the George Washington Masonic Memorial","venue_url":"http://washingtondc.eventful.com/venues/grounds-of-the-george-washington-masonic-memor-/V0-001-001165603-5?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"DC","postal_code":"20011","going_count":null,"all_day":"0","latitude":"38.952","groups":null,"url":"http://washingtondc.eventful.com/events/dori-freeman-kristin-andreassen-presented-trade-/E0-001-089310368-7?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-089310368-7","privacy":"1","city_name":"Washington","link_count":null,"longitude":"-77.0199","country_name":"United States","country_abbr":"USA","region_name":"District of Columbia","start_time":"2016-01-15 19:30:00","tz_id":null,"description":" Dori Freeman & Kristin Andreassen are making a very special stopover in Washington DC at the Trade Root Music Group house concert series! The house is a 15 minute walk from Ft Totten Metro station, and is a block from the E2/E3/E4 bus line. Plenty of free parking in the neighborhood too! Tickets are a $15 in advance or at the door, the house opens up at 7:30 PM, BYOB! See you there! ABOUT DORI FREEMAN Dori Freeman is a twenty-four-year-old singer and songwriter from the southwestern hills of Virginia whose self-titled label debut is coming February 5, 2016 on Free Dirt Records. Dori comes from a family rooted in art and tradition. Her grandfather is an artist and guitar player, and her father, a multi-instrumentalist and music instructor. While her style subscribes to no one genre, the influence of her Appalachian upbringing lies at the core of her music - heard especially in the lulling mountain drawl of her voice. She sings without affect and with striking clarity, delivering each song carefully and earnestly. Dori&#39;s style was shaped by American Roots music: Bluegrass, Rhythm and Blues, and Old Country. Her early introduction to musicians like Doc Watson, The Louvin Brothers, and Peggy Lee have heavily influenced her modern yet timeless sound. Dori learned how to play the guitar at fifteen and began writing her own material a few years later, citing Rufus Wainwright and his haunting melodies and achingly honest lyrics as the spark that inspired her to pen her first song. Her songs often center on heartache and pining; unrequited and sometimes unconventional love common muses for her melodies and lyrics. Dori currently lives in Galax, VA. ABOUT KRISTIN ANDREASSEN With her 2015 debut studio album Gondolier, Kristin Andreassen takes her place as one of the most visceral and creative lyricists to emerge from today&#39;s roots music scene. Featuring intricate guitar duets, expert harmonies, lush woodwind and string arrangements, and Kristin&#39;s trademark body percussion as vocal accompaniment, it&#39;s still the songwriting itself that hits most directly as Kristin confronts big themes with deceptive simplicity. In the stately &quot;How the Water Walks&quot;, she sings in character as a soldier awaiting battle: &quot;Dawn has barely broken when they call us up above / I&#39;m thinking only of my life, sorry my love.&quot; Kristin spent her formative years steeped in traditional American music, touring with the Rounder Records stringband Uncle Earl and as a clogger with Maryland&#39;s Appalachian dance troupe Footworks. Early writing often combined her two worlds of song and dance as in the pattycake-inspired &quot;Crayola Doesn&#39;t Make a Color for Your Eyes,&quot; which went to #1 on kids&#39; radio and has been covered by choirs, marching bands, and by Tyne Daly in her off-Broadway cabaret. But Gondolier doesn&#39;t sound like old time music. Recorded during a time living in NYC, these songs tilt toward the futuristic-yet-acoustic side of timeless, reflecting worldly influences and collaborations with Lucius, Jeffrey Lewis, Son Lux, members of Punch Brothers, Cuddle Magic and So Percussion, and her long-time friends and bandmates Aoife O&#39;Donovan and Abigail Washburn. Kristin is now writing and scheming a follow-up album in her new home of Nashville.<br> <br> \n","modified":"2015-12-01 04:01:10","venue_display":"1","tz_country":null,"performers":null,"price":"15  - 15 USD ","title":"Dori Freeman & Kristin Andreassen Presented by Trade Root Music Group","venue_address":"5523 2nd St NW","geocode_type":"Zip Code Based GeoCodes","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"}]},"image":null,"created":"2015-12-01 04:01:10","venue_id":"V0-001-008671170-1","tz_city":null,"stop_time":"2016-01-15 23:00:00","venue_name":"Trade Root Music Group House Concerts","venue_url":"http://washingtondc.eventful.com/venues/trade-root-music-group-house-concerts-/V0-001-008671170-1?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"MD","postal_code":"20742-1625","going_count":null,"all_day":"0","latitude":"38.9869367","groups":null,"url":"http://washingtondc.eventful.com/events/umoves-undergraduate-dan-/E0-001-084378304-4@2016050619?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-084378304-4@2016050619","privacy":"1","city_name":"College Park","link_count":null,"longitude":"-76.9428679","country_name":"United States","country_abbr":"USA","region_name":"Maryland","start_time":"2016-05-06 19:30:00","tz_id":null,"description":" <strong>Presented By</strong><br>Presented By: <br> <a href=\"/term/presenters/umd-school-of-theatre-dance-and-performance-studies\" rel=\"nofollow\">UMD School of Theatre, Dance, and Performance Studies</a><br> <br> <br> <br> <br> Venue: <br> <a href=\"/venues/dance-theatre\" rel=\"nofollow\">Dance Theatre</a><br> <br> <br> <br> Seating: <br> <a href=\"/seating/general-admission\" rel=\"nofollow\">General Admission</a><br> <br> <br>  The School of Theatre, Dance, and Performance Studies presents a concert featuring the emerging talent of the next generation of dance artists.<p>The program includes original works created and/or performed by undergraduate students majoring in dance as they are finding their choreographic voice and vision, plus new works developed throughout the year by guest choreographers.</p>","modified":"2015-08-15 13:42:52","venue_display":"1","tz_country":null,"performers":null,"price":null,"title":"UMoves Undergraduate Dance Concert","venue_address":"University of Maryland College Park","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":"on various days","calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"}]},"image":null,"created":"2015-05-23 20:12:21","venue_id":"V0-001-000307861-2","tz_city":null,"stop_time":null,"venue_name":"The Clarice Smith Performing Arts Center","venue_url":"http://washingtondc.eventful.com/venues/the-clarice-smith-performing-arts-center-/V0-001-000307861-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"MD","postal_code":"20742-1625","going_count":null,"all_day":"0","latitude":"38.9869367","groups":null,"url":"http://washingtondc.eventful.com/events/national-festival-orchestra-pops-concert-/E0-001-084730642-7?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-084730642-7","privacy":"1","city_name":"College Park","link_count":null,"longitude":"-76.9428679","country_name":"United States","country_abbr":"USA","region_name":"Maryland","start_time":"2016-05-28 20:00:00","tz_id":null,"description":" <strong>Presented By</strong><br>Presented By: <br> <a href=\"/term/presenters/artist-partner-program\" rel=\"nofollow\">Artist Partner Program</a><br> <br> <br> <br> <br> Venue: <br> <a href=\"/venues/dekelboum-concert-hall\" rel=\"nofollow\">Dekelboum Concert Hall</a><br> <br> <br> <br> Seating: <br> <a href=\"/seating/reserved-seating\" rel=\"nofollow\">Reserved Seating</a><br> <br> <br>  More information about this performance will be posted soon. Stay tuned!","modified":"2015-08-29 21:49:57","venue_display":"1","tz_country":null,"performers":null,"price":null,"title":"National Festival Orchestra - Pops Concert","venue_address":"University of Maryland College Park","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"},{"name":"Festivals","id":"festivals_parades"}]},"image":null,"created":"2015-06-06 12:01:39","venue_id":"V0-001-000307861-2","tz_city":null,"stop_time":null,"venue_name":"The Clarice Smith Performing Arts Center","venue_url":"http://washingtondc.eventful.com/venues/the-clarice-smith-performing-arts-center-/V0-001-000307861-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"DC","postal_code":"20566","going_count":null,"all_day":"0","latitude":"38.895858","groups":null,"url":"http://washingtondc.eventful.com/events/zvjezdice-girls-choir-concert-/E0-001-089316155-7?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-089316155-7","privacy":"1","city_name":"Washington","link_count":null,"longitude":"-77.054471","country_name":"United States","country_abbr":"USA","region_name":"District of Columbia","start_time":"2015-12-11 18:00:00","tz_id":null,"description":" In their Kennedy Centre performance, the renowned Croatian Girls’ Choir &quot;Zvjezdice&quot; (Little Stars) will be accompanied by Croatia’s treasured harpist Dijana Grubišić Ćiković and young, outstanding soprano Antonia Dunjko, under the baton of Maestro Zdravko Šljivac. “Zvjezdice” Girls Choir is one of the most representative music ensembles in Zagreb and Croatia. It was founded in 1985 and forms part of the Youth Music Centre in Zagreb. The members of the choir are all outstanding students of primary and secondary schools in Zagreb. In three decades of its existence, the choir has developed a strong cooperation with the most prominent Croatian ensembles and performers, as well as with many conductors from both Croatia and abroad. Their previous performances in the United States include highly successful tour in 2003 (New York, Pittsburgh, Dayton, Northern Kentucky), the 2004 tour (Cincinnati, Pittsburgh, Cleveland, Los Angeles, Chicago and New York), and the concert at New York’s Lincoln center in 2010. Join us for their upcoming performance at the Millennium Stage and let “Zvjezdice” show you the way to the holiday season in a magical night of Croatian and Central European seasonal choral music. ","modified":"2015-12-01 08:27:32","venue_display":"1","tz_country":null,"performers":null,"price":null,"title":"\"Zvjezdice\" Girls Choir Concert","venue_address":"2700 F Street NW","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"}]},"image":{"small":{"width":"48","url":"http://s3.evcdn.com/images/small/I0-001/024/497/946-0.jpeg_/zvjezdice-girls-choir-concert-46.jpeg","height":"48"},"width":"48","caption":null,"medium":{"width":"128","url":"http://s3.evcdn.com/images/medium/I0-001/024/497/946-0.jpeg_/zvjezdice-girls-choir-concert-46.jpeg","height":"128"},"url":"http://s3.evcdn.com/images/small/I0-001/024/497/946-0.jpeg_/zvjezdice-girls-choir-concert-46.jpeg","thumb":{"width":"48","url":"http://s3.evcdn.com/images/thumb/I0-001/024/497/946-0.jpeg_/zvjezdice-girls-choir-concert-46.jpeg","height":"48"},"height":"48"},"created":"2015-12-01 08:27:32","venue_id":"V0-001-000468613-5","tz_city":null,"stop_time":null,"venue_name":"Kennedy Center - Millennium Stage","venue_url":"http://washingtondc.eventful.com/venues/kennedy-center-millennium-stage-/V0-001-000468613-5?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"DC","postal_code":"20001","going_count":null,"all_day":"0","latitude":"38.9083","groups":null,"url":"http://washingtondc.eventful.com/events/black-composers-concert-/E0-001-089153080-5?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-089153080-5","privacy":"1","city_name":"Washington","link_count":null,"longitude":"-77.0181","country_name":"United States","country_abbr":"USA","region_name":"District of Columbia","start_time":"2016-02-20 15:00:00","tz_id":null,"description":" Enjoy a delightful afternoon of classical, jazz, Gospel, and sacred music performed by some of our region&#39;s top musicians, celebrating the diverse and noteworthy contributions of composers of African descent to the fine art of music.  Hosted by the Dunbar Alumni Federation. This concert is free and open to the public.  However, ticket donations are encouraged in order to continue to provide high quality and affordable arts programs to the community.  Donations can be made by check payable to JWJCSA, PO Box 5446, Capitol Heights, MD 20791-5446. Street parking may be available on P St, O St, and 1st St NW.  Nearest metro stations: Mt Vernon Sq 7th St-Convention Center  & NoMa-Gallaudet U Donations to The James Weldon Johnson Community School of the Arts are tax-deductible to the extent allowed by law.  The James Weldon Johnson Community School of the Arts, Incorporated is an exempt organization as described in Section 501(c)(3) of the Internal Revenue Code; EIN 52-2160738. ","modified":"2015-12-03 00:20:46","venue_display":"1","tz_country":null,"performers":null,"price":null,"title":"Black Composers Concert®","venue_address":"101 N Street Northwest","geocode_type":"Zip Code Based GeoCodes","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"}]},"image":{"small":{"width":"48","url":"http://s4.evcdn.com/images/small/I0-001/024/391/703-8.jpeg_/black-composers-concert-03.jpeg","height":"48"},"width":"48","caption":null,"medium":{"width":"128","url":"http://s4.evcdn.com/images/medium/I0-001/024/391/703-8.jpeg_/black-composers-concert-03.jpeg","height":"128"},"url":"http://s4.evcdn.com/images/small/I0-001/024/391/703-8.jpeg_/black-composers-concert-03.jpeg","thumb":{"width":"48","url":"http://s4.evcdn.com/images/thumb/I0-001/024/391/703-8.jpeg_/black-composers-concert-03.jpeg","height":"48"},"height":"48"},"created":"2015-11-24 05:35:21","venue_id":"V0-001-007291320-5","tz_city":null,"stop_time":null,"venue_name":"The Paul Laurence Dunbar Senior High School","venue_url":"http://washingtondc.eventful.com/venues/the-paul-laurence-dunbar-senior-high-school-/V0-001-007291320-5?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"VA","postal_code":null,"going_count":null,"all_day":"0","latitude":"38.8047","groups":null,"url":"http://washingtondc.eventful.com/events/thedramatic-/E0-001-089227823-0?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-089227823-0","privacy":"1","city_name":"Alexandria","link_count":null,"longitude":"-77.0472","country_name":"United States","country_abbr":"USA","region_name":"Virginia","start_time":"2016-02-13 20:00:00","tz_id":null,"description":" Alexandria Symphony Orchestra Performs Music From <em>The Godfather</em>, Puccini & More <br><br>Drama is not the sole property of stage and screen. It is also right at home on the concert stage, especially during <em>The Dramatic</em>, the thrilling special program from the Alexandria Symphony Orchestra. Music director Kim Allen Kluge (&quot;Maestro Kluge is a brilliant composer, conductor and visionary of our time.&quot; -- <em>The Washington Post</em>) conducts a program that spans Puccini arias, Respighi&#39;s <em>Pines of Rome</em> and selections from Nino Rota&#39;s epic score to <em>The Godfather</em> -- recently named one of the top five film scores of all time by the American Film Institute. Get caught up in the kind of gripping storytelling told with notes, not words, during <em>The Dramatic</em> at Rachel M. Schlesinger Concert Hall & Arts Center.","modified":"2015-12-06 05:38:01","venue_display":"1","tz_country":null,"performers":null,"price":"$16.00 - $28.00","title":"\"The Dramatic\"","venue_address":"4915 East Campus Lane","geocode_type":"City Based GeoCodes","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"}]},"image":{"small":{"width":"48","url":"http://s3.evcdn.com/images/small/I0-001/024/441/562-5.jpeg_/thedramatic-62.jpeg","height":"48"},"width":"48","caption":null,"medium":{"width":"128","url":"http://s3.evcdn.com/images/medium/I0-001/024/441/562-5.jpeg_/thedramatic-62.jpeg","height":"128"},"url":"http://s3.evcdn.com/images/small/I0-001/024/441/562-5.jpeg_/thedramatic-62.jpeg","thumb":{"width":"48","url":"http://s3.evcdn.com/images/thumb/I0-001/024/441/562-5.jpeg_/thedramatic-62.jpeg","height":"48"},"height":"48"},"created":"2015-11-27 03:47:24","venue_id":"V0-001-008346725-2","tz_city":null,"stop_time":null,"venue_name":"Rachel M. Schlesinger Concert Hall, NVCC Alexandria Campus","venue_url":"http://washingtondc.eventful.com/venues/rachel-m-schlesinger-concert-hall-nvcc-alexand-/V0-001-008346725-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"MD","postal_code":"20742-1625","going_count":null,"all_day":"0","latitude":"38.9869367","groups":null,"url":"http://washingtondc.eventful.com/events/edward-m-felegy-honors-concert-/E0-001-089236594-3?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-089236594-3","privacy":"1","city_name":"College Park","link_count":null,"longitude":"-76.9428679","country_name":"United States","country_abbr":"USA","region_name":"Maryland","start_time":"2015-12-10 19:30:00","tz_id":null,"description":" <strong>Presented By</strong><br>Presented By: <br> <br> <br> <br> <a href=\"http://www1.pgcps.org\" rel=\"nofollow\">Prince George&#39;s County Public Schools</a><br> <br> <br> <br> <br> Venue: <br> <a href=\"/venues/dekelboum-concert-hall\" rel=\"nofollow\">Dekelboum Concert Hall</a><br> <br> <br> <br> Seating: <br> <a href=\"/seating/general-admission\" rel=\"nofollow\">General Admission</a><br> <br> <br> Estimated Length: <br> 2 hours including intermission<br> <br> <br>  Prince George’s County Public Schools, through the Division of Teaching and Learning provides extended opportunities for qualified music students to participate in music enrichment programs. At present, the Music Enrichment Program for instrumental music includes elementary, junior and senior youth orchestras/bands. The Music Enrichment Program for vocal music includes the northern area and southern area elementary school honors choruses, the middle school honors chorus and the high school honors chorus. This year, the High School Honors Band, Senior Youth Orchestra and the High School Honors Chorus will perform. <p>The Music Enrichment Program has continually served to broaden the scope of musical performance skills acquired in the regular school program. Students participating in these enrichment performance organizations transmit to their fellow performers within each local school program an enthusiasm for increasing musical skills as well as a better understanding of the personal commitment required to be successful. <p>Under the leadership of Judith A. Hawkins, Supervisor of Vocal General Music and Lionel Harrell, Supervisor of Instrumental Music, the Music Enrichment Program has maintained its place in the instructional program. It provides a consistent level of excellence that is in keeping with the highest performance standards possible for young musicians. <p>This year’s Edward M. Felegy Honors Concert represents the culminating event for the Music Enrichment Program. It has received the full support of Kevin M. Maxwell, Ph.D., Chief Executive Officer, Shawn Joseph, Ed.D, Deputy Superintendent for Teaching and Learning, John Ceschini, Arts Integration Officer, and Anita Lambert, Coordinating Supervisor of Creative Arts Programs. Dedicated music teachers, students and parents have worked cooperatively to offer this evening’s concert as a model for school districts throughout the country.</p></p></p>","modified":"2015-12-05 14:07:10","venue_display":"1","tz_country":null,"performers":null,"price":null,"title":"Edward M. Felegy Honors Concert","venue_address":"University of Maryland College Park","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"}]},"image":null,"created":"2015-11-27 21:53:54","venue_id":"V0-001-000307861-2","tz_city":null,"stop_time":null,"venue_name":"The Clarice Smith Performing Arts Center","venue_url":"http://washingtondc.eventful.com/venues/the-clarice-smith-performing-arts-center-/V0-001-000307861-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"MD","postal_code":"20742-1625","going_count":null,"all_day":"0","latitude":"38.9869367","groups":null,"url":"http://washingtondc.eventful.com/events/gamer-symphony-orchestra-fall-concert-/E0-001-089079702-3?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-089079702-3","privacy":"1","city_name":"College Park","link_count":null,"longitude":"-76.9428679","country_name":"United States","country_abbr":"USA","region_name":"Maryland","start_time":"2015-12-12 20:00:00","tz_id":null,"description":" <strong>Presented By</strong><br>Presented By: <br> <br> <br> <br> <a href=\"http://umd.gamersymphony.org\" rel=\"nofollow\">The Gamer Symphony Orchestra at the University of Maryland</a><br> <br> <br> <br> <br> Venue: <br> <a href=\"/venues/dekelboum-concert-hall\" rel=\"nofollow\">Dekelboum Concert Hall</a><br> <br> <br> <br> Seating: <br> <a href=\"/seating/general-admission\" rel=\"nofollow\">General Admission</a><br> <br> <br>  Celebrating its 10th year, the student-run GSO works to establish video game music as a serious art form and to use that music as a way to bring new and younger audiences to orchestral performances.<p>The GSO is the first collegiate ensemble exclusively devoted to performing orchestral arrangements of video game music and using that music as an educational tool. The orchestra began humbly in late 2005 with six members and now boasts a roster of more than 110 musicians, including 30 singers.<p>Last spring, the GSO performed at the Smithsonian American Art Museum, in conjunction with The Art of Video Games exhibition.</p></p>","modified":"2015-11-21 01:21:05","venue_display":"1","tz_country":null,"performers":null,"price":null,"title":"Gamer Symphony Orchestra Fall Concert","venue_address":"University of Maryland College Park","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"}]},"image":null,"created":"2015-11-21 01:21:05","venue_id":"V0-001-000307861-2","tz_city":null,"stop_time":null,"venue_name":"The Clarice Smith Performing Arts Center","venue_url":"http://washingtondc.eventful.com/venues/the-clarice-smith-performing-arts-center-/V0-001-000307861-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"},{"watching_count":null,"olson_path":"America/New_York","calendar_count":null,"comment_count":null,"region_abbr":"DC","postal_code":"20006","going_count":null,"all_day":"0","latitude":"38.8936076","groups":null,"url":"http://washingtondc.eventful.com/events/deech-united-states-navy-band-/E0-001-088463295-6?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-088463295-6","privacy":"1","city_name":"Washington","link_count":null,"longitude":"-77.0397162","country_name":"United States","country_abbr":"USA","region_name":"District of Columbia","start_time":"2015-12-19 19:30:00","tz_id":null,"description":" Each December the Navy Band hosts a concert to help ring in the holiday season, an annual tradition that has become one of our most highly-anticipated events of the year. This concert combines the musical forces of multiple ensembles from the U. S. Navy Band for an entertaining family-friendly show that promises to delight all ages. We&#39;ve heard that there will be a flyover and visit by a familiar guest as well! Tickets will be available on this website beginning Monday, Nov. 9 at 9 a.m.","modified":"2015-10-27 05:41:46","venue_display":"1","tz_country":null,"performers":null,"price":null,"title":"Deech- United States Navy Band","venue_address":"1776 D Street NW","geocode_type":"EVDB Geocoder","tz_olson_path":null,"free":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","categories":{"category":[{"name":"Concerts &amp; Tour Dates","id":"music"}]},"image":null,"created":"2015-10-27 05:41:46","venue_id":"V0-001-000111875-8","tz_city":null,"stop_time":null,"venue_name":"DAR Constitution Hall","venue_url":"http://washingtondc.eventful.com/venues/dar-constitution-hall-/V0-001-000111875-8?utm_source=apis&utm_medium=apim&utm_campaign=apic"}]}};

        httpLocalBackend.expectJSONP(url).respond(200, httpResponse);
        $scope.show();
        httpLocalBackend.flush();


        expect($scope.eventData).toBe(httpResponse);
        expect($scope.pageCount).toBe("57");

    });
});

describe('Testing dislike functionality', function () {

// load the controller's module
    beforeEach(module('scotchApp'));

    var $scope, $rootScope, controller;

    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        var $controller = $injector.get('$controller');

        CreateTarget = function () {
            $controller('getLocation', {$scope: $scope});
        }
    }));

    it('If youre logged in and dislike an event it should be added to your list of disliked events.', function () {
        controller = CreateTarget();
        $scope.init();
        $rootScope.isLoggedIn = true;

        var userObj = new Object();
        userObj.dislikedEvents = [];
        $rootScope.currentUser = userObj;

        var eventObj = new Object();
        eventObj.id = 'test_id';

        $scope.dislikeEvent(eventObj);

        expect($rootScope.currentUser.dislikedEvents).toContain('test_id');
        expect($rootScope.currentUser.dislikedEvents.length).toBe(1);
    });

    it('If youre NOT logged in and dislike an event it should prompt you to log in.', function () {
        spyOn(window, 'alert');
        controller = CreateTarget();
        $scope.init();
        $rootScope.isLoggedIn = false;

        var userObj = new Object();
        userObj.dislikedEvents = [];
        $rootScope.currentUser = userObj;

        var eventObj = new Object();
        eventObj.id = 'test_id';

        $scope.dislikeEvent(eventObj);
        expect(window.alert).toHaveBeenCalledWith("Please log in")
    });
});

 describe('Testing dislike functionality', function () {

     // load the controller's module
     beforeEach(module('scotchApp'));

     var $scope, $rootScope, controller;

     beforeEach(inject(function ($injector) {
         $rootScope = $injector.get('$rootScope');
         $scope = $rootScope.$new();
         var $controller = $injector.get('$controller');

         CreateTarget = function () {
             $controller('getLocation', {$scope: $scope});
         }
     }));

     beforeEach(inject(function ($httpBackend) {
         httpLocalBackend = $httpBackend;
     }));

beforeEach( function() {
     controller = CreateTarget();
     $scope.init();
     $scope.apiKey = "rcnxbzfT3dLNF3ff";
     $scope.keyword = 'concerts';
     $scope.category.id = 'Concerts';
     $scope.where = "38.9071923,-77.0368707";
     $scope.range = "10";
     $scope.pageNo = "2";
     $scope.sortOrder = "Relevance";
     var url = "http://api.eventful.com/json/events/search?app_key=" + $scope.apiKey + "&keywords=" + $scope.keyword + "&category=" + $scope.category.id + "&where=" + $scope.where + "&within=" + $scope.range + "&units=mi&date=Future&page_size=10&page_number=" + $scope.pageNo + "&include=categories,price,links&sort_order=" + $scope.sortOrder+"&dataType=json&callback=JSON_CALLBACK";
     var httpResponse =
     {
         "last_item": null,
         "total_items": "566",
         "first_item": null,
         "page_number": "2",
         "page_size": "10",
         "page_items": null,
         "search_time": "0.065",
         "page_count": "57",
         "events": {
             "event": [{
                 "watching_count": null,
                 "olson_path": "America/New_York",
                 "calendar_count": null,
                 "comment_count": null,
                 "region_abbr": "VA",
                 "postal_code": "22314",
                 "going_count": null,
                 "all_day": "0",
                 "latitude": "38.8075630",
                 "groups": null,
                 "url": "http://washingtondc.eventful.com/events/dueling-mallets-orff-vs-bronze-concert-/E0-001-086659667-8?utm_source=apis&utm_medium=apim&utm_campaign=apic",
                 "id": "E0-001-086659667-8",
                 "privacy": "1",
                 "city_name": "Alexandria",
                 "link_count": null,
                 "longitude": "-77.0659821",
                 "country_name": "United States",
                 "country_abbr": "USA",
                 "region_name": "Virginia",
                 "start_time": "2016-06-05 16:00:00",
                 "tz_id": null,
                 "description": " Tickets will also be available at the door the day of the concert. ",
                 "modified": "2015-12-02 16:28:11",
                 "venue_display": "1",
                 "tz_country": null,
                 "performers": null,
                 "price": null,
                 "title": "Dueling Mallets: Orff vs. Bronze Concert",
                 "venue_address": "101 Callahan Drive",
                 "geocode_type": "EVDB Geocoder",
                 "tz_olson_path": null,
                 "free": null,
                 "recur_string": null,
                 "calendars": null,
                 "owner": "evdb",
                 "going": null,
                 "country_abbr2": "US",
                 "categories": {"category": [{"name": "Performing Arts", "id": "performing_arts"}]},
                 "image": {
                     "small": {
                         "width": "48",
                         "url": "http://s2.evcdn.com/images/small/I0-001/024/505/733-0.jpeg_/dueling-mallets-orff-vs-bronze-concert-33.jpeg",
                         "height": "48"
                     },
                     "width": "48",
                     "caption": null,
                     "medium": {
                         "width": "128",
                         "url": "http://s2.evcdn.com/images/medium/I0-001/024/505/733-0.jpeg_/dueling-mallets-orff-vs-bronze-concert-33.jpeg",
                         "height": "128"
                     },
                     "url": "http://s2.evcdn.com/images/small/I0-001/024/505/733-0.jpeg_/dueling-mallets-orff-vs-bronze-concert-33.jpeg",
                     "thumb": {
                         "width": "48",
                         "url": "http://s2.evcdn.com/images/thumb/I0-001/024/505/733-0.jpeg_/dueling-mallets-orff-vs-bronze-concert-33.jpeg",
                         "height": "48"
                     },
                     "height": "48"
                 },
                 "created": "2015-08-26 14:54:57",
                 "venue_id": "V0-001-001165603-5",
                 "tz_city": null,
                 "stop_time": null,
                 "venue_name": "Grounds of the George Washington Masonic Memorial",
                 "venue_url": "http://washingtondc.eventful.com/venues/grounds-of-the-george-washington-masonic-memor-/V0-001-001165603-5?utm_source=apis&utm_medium=apim&utm_campaign=apic"
             }, {
                 "watching_count": null,
                 "olson_path": "America/New_York",
                 "calendar_count": null,
                 "comment_count": null,
                 "region_abbr": "DC",
                 "postal_code": "20011",
                 "going_count": null,
                 "all_day": "0",
                 "latitude": "38.952",
                 "groups": null,
                 "url": "http://washingtondc.eventful.com/events/dori-freeman-kristin-andreassen-presented-trade-/E0-001-089310368-7?utm_source=apis&utm_medium=apim&utm_campaign=apic",
                 "id": "E0-001-089310368-7",
                 "privacy": "1",
                 "city_name": "Washington",
                 "link_count": null,
                 "longitude": "-77.0199",
                 "country_name": "United States",
                 "country_abbr": "USA",
                 "region_name": "District of Columbia",
                 "start_time": "2016-01-15 19:30:00",
                 "tz_id": null,
                 "description": " Dori Freeman & Kristin Andreassen are making a very special stopover in Washington DC at the Trade Root Music Group house concert series! The house is a 15 minute walk from Ft Totten Metro station, and is a block from the E2/E3/E4 bus line. Plenty of free parking in the neighborhood too! Tickets are a $15 in advance or at the door, the house opens up at 7:30 PM, BYOB! See you there! ABOUT DORI FREEMAN Dori Freeman is a twenty-four-year-old singer and songwriter from the southwestern hills of Virginia whose self-titled label debut is coming February 5, 2016 on Free Dirt Records. Dori comes from a family rooted in art and tradition. Her grandfather is an artist and guitar player, and her father, a multi-instrumentalist and music instructor. While her style subscribes to no one genre, the influence of her Appalachian upbringing lies at the core of her music - heard especially in the lulling mountain drawl of her voice. She sings without affect and with striking clarity, delivering each song carefully and earnestly. Dori&#39;s style was shaped by American Roots music: Bluegrass, Rhythm and Blues, and Old Country. Her early introduction to musicians like Doc Watson, The Louvin Brothers, and Peggy Lee have heavily influenced her modern yet timeless sound. Dori learned how to play the guitar at fifteen and began writing her own material a few years later, citing Rufus Wainwright and his haunting melodies and achingly honest lyrics as the spark that inspired her to pen her first song. Her songs often center on heartache and pining; unrequited and sometimes unconventional love common muses for her melodies and lyrics. Dori currently lives in Galax, VA. ABOUT KRISTIN ANDREASSEN With her 2015 debut studio album Gondolier, Kristin Andreassen takes her place as one of the most visceral and creative lyricists to emerge from today&#39;s roots music scene. Featuring intricate guitar duets, expert harmonies, lush woodwind and string arrangements, and Kristin&#39;s trademark body percussion as vocal accompaniment, it&#39;s still the songwriting itself that hits most directly as Kristin confronts big themes with deceptive simplicity. In the stately &quot;How the Water Walks&quot;, she sings in character as a soldier awaiting battle: &quot;Dawn has barely broken when they call us up above / I&#39;m thinking only of my life, sorry my love.&quot; Kristin spent her formative years steeped in traditional American music, touring with the Rounder Records stringband Uncle Earl and as a clogger with Maryland&#39;s Appalachian dance troupe Footworks. Early writing often combined her two worlds of song and dance as in the pattycake-inspired &quot;Crayola Doesn&#39;t Make a Color for Your Eyes,&quot; which went to #1 on kids&#39; radio and has been covered by choirs, marching bands, and by Tyne Daly in her off-Broadway cabaret. But Gondolier doesn&#39;t sound like old time music. Recorded during a time living in NYC, these songs tilt toward the futuristic-yet-acoustic side of timeless, reflecting worldly influences and collaborations with Lucius, Jeffrey Lewis, Son Lux, members of Punch Brothers, Cuddle Magic and So Percussion, and her long-time friends and bandmates Aoife O&#39;Donovan and Abigail Washburn. Kristin is now writing and scheming a follow-up album in her new home of Nashville.<br> <br> \n",
                 "modified": "2015-12-01 04:01:10",
                 "venue_display": "1",
                 "tz_country": null,
                 "performers": null,
                 "price": "15  - 15 USD ",
                 "title": "Dori Freeman & Kristin Andreassen Presented by Trade Root Music Group",
                 "venue_address": "5523 2nd St NW",
                 "geocode_type": "Zip Code Based GeoCodes",
                 "tz_olson_path": null,
                 "free": null,
                 "recur_string": null,
                 "calendars": null,
                 "owner": "evdb",
                 "going": null,
                 "country_abbr2": "US",
                 "categories": {"category": [{"name": "Concerts &amp; Tour Dates", "id": "music"}]},
                 "image": null,
                 "created": "2015-12-01 04:01:10",
                 "venue_id": "V0-001-008671170-1",
                 "tz_city": null,
                 "stop_time": "2016-01-15 23:00:00",
                 "venue_name": "Trade Root Music Group House Concerts",
                 "venue_url": "http://washingtondc.eventful.com/venues/trade-root-music-group-house-concerts-/V0-001-008671170-1?utm_source=apis&utm_medium=apim&utm_campaign=apic"
             }, {
                 "watching_count": null,
                 "olson_path": "America/New_York",
                 "calendar_count": null,
                 "comment_count": null,
                 "region_abbr": "MD",
                 "postal_code": "20742-1625",
                 "going_count": null,
                 "all_day": "0",
                 "latitude": "38.9869367",
                 "groups": null,
                 "url": "http://washingtondc.eventful.com/events/umoves-undergraduate-dan-/E0-001-084378304-4@2016050619?utm_source=apis&utm_medium=apim&utm_campaign=apic",
                 "id": "E0-001-084378304-4@2016050619",
                 "privacy": "1",
                 "city_name": "College Park",
                 "link_count": null,
                 "longitude": "-76.9428679",
                 "country_name": "United States",
                 "country_abbr": "USA",
                 "region_name": "Maryland",
                 "start_time": "2016-05-06 19:30:00",
                 "tz_id": null,
                 "description": " <strong>Presented By</strong><br>Presented By: <br> <a href=\"/term/presenters/umd-school-of-theatre-dance-and-performance-studies\" rel=\"nofollow\">UMD School of Theatre, Dance, and Performance Studies</a><br> <br> <br> <br> <br> Venue: <br> <a href=\"/venues/dance-theatre\" rel=\"nofollow\">Dance Theatre</a><br> <br> <br> <br> Seating: <br> <a href=\"/seating/general-admission\" rel=\"nofollow\">General Admission</a><br> <br> <br>  The School of Theatre, Dance, and Performance Studies presents a concert featuring the emerging talent of the next generation of dance artists.<p>The program includes original works created and/or performed by undergraduate students majoring in dance as they are finding their choreographic voice and vision, plus new works developed throughout the year by guest choreographers.</p>",
                 "modified": "2015-08-15 13:42:52",
                 "venue_display": "1",
                 "tz_country": null,
                 "performers": null,
                 "price": null,
                 "title": "UMoves Undergraduate Dance Concert",
                 "venue_address": "University of Maryland College Park",
                 "geocode_type": "EVDB Geocoder",
                 "tz_olson_path": null,
                 "free": null,
                 "recur_string": "on various days",
                 "calendars": null,
                 "owner": "evdb",
                 "going": null,
                 "country_abbr2": "US",
                 "categories": {"category": [{"name": "Concerts &amp; Tour Dates", "id": "music"}]},
                 "image": null,
                 "created": "2015-05-23 20:12:21",
                 "venue_id": "V0-001-000307861-2",
                 "tz_city": null,
                 "stop_time": null,
                 "venue_name": "The Clarice Smith Performing Arts Center",
                 "venue_url": "http://washingtondc.eventful.com/venues/the-clarice-smith-performing-arts-center-/V0-001-000307861-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"
             }, {
                 "watching_count": null,
                 "olson_path": "America/New_York",
                 "calendar_count": null,
                 "comment_count": null,
                 "region_abbr": "MD",
                 "postal_code": "20742-1625",
                 "going_count": null,
                 "all_day": "0",
                 "latitude": "38.9869367",
                 "groups": null,
                 "url": "http://washingtondc.eventful.com/events/national-festival-orchestra-pops-concert-/E0-001-084730642-7?utm_source=apis&utm_medium=apim&utm_campaign=apic",
                 "id": "E0-001-084730642-7",
                 "privacy": "1",
                 "city_name": "College Park",
                 "link_count": null,
                 "longitude": "-76.9428679",
                 "country_name": "United States",
                 "country_abbr": "USA",
                 "region_name": "Maryland",
                 "start_time": "2016-05-28 20:00:00",
                 "tz_id": null,
                 "description": " <strong>Presented By</strong><br>Presented By: <br> <a href=\"/term/presenters/artist-partner-program\" rel=\"nofollow\">Artist Partner Program</a><br> <br> <br> <br> <br> Venue: <br> <a href=\"/venues/dekelboum-concert-hall\" rel=\"nofollow\">Dekelboum Concert Hall</a><br> <br> <br> <br> Seating: <br> <a href=\"/seating/reserved-seating\" rel=\"nofollow\">Reserved Seating</a><br> <br> <br>  More information about this performance will be posted soon. Stay tuned!",
                 "modified": "2015-08-29 21:49:57",
                 "venue_display": "1",
                 "tz_country": null,
                 "performers": null,
                 "price": null,
                 "title": "National Festival Orchestra - Pops Concert",
                 "venue_address": "University of Maryland College Park",
                 "geocode_type": "EVDB Geocoder",
                 "tz_olson_path": null,
                 "free": null,
                 "recur_string": null,
                 "calendars": null,
                 "owner": "evdb",
                 "going": null,
                 "country_abbr2": "US",
                 "categories": {
                     "category": [{"name": "Concerts &amp; Tour Dates", "id": "music"}, {
                         "name": "Festivals",
                         "id": "festivals_parades"
                     }]
                 },
                 "image": null,
                 "created": "2015-06-06 12:01:39",
                 "venue_id": "V0-001-000307861-2",
                 "tz_city": null,
                 "stop_time": null,
                 "venue_name": "The Clarice Smith Performing Arts Center",
                 "venue_url": "http://washingtondc.eventful.com/venues/the-clarice-smith-performing-arts-center-/V0-001-000307861-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"
             }, {
                 "watching_count": null,
                 "olson_path": "America/New_York",
                 "calendar_count": null,
                 "comment_count": null,
                 "region_abbr": "DC",
                 "postal_code": "20566",
                 "going_count": null,
                 "all_day": "0",
                 "latitude": "38.895858",
                 "groups": null,
                 "url": "http://washingtondc.eventful.com/events/zvjezdice-girls-choir-concert-/E0-001-089316155-7?utm_source=apis&utm_medium=apim&utm_campaign=apic",
                 "id": "E0-001-089316155-7",
                 "privacy": "1",
                 "city_name": "Washington",
                 "link_count": null,
                 "longitude": "-77.054471",
                 "country_name": "United States",
                 "country_abbr": "USA",
                 "region_name": "District of Columbia",
                 "start_time": "2015-12-11 18:00:00",
                 "tz_id": null,
                 "description": " In their Kennedy Centre performance, the renowned Croatian Girls’ Choir &quot;Zvjezdice&quot; (Little Stars) will be accompanied by Croatia’s treasured harpist Dijana Grubišić Ćiković and young, outstanding soprano Antonia Dunjko, under the baton of Maestro Zdravko Šljivac. “Zvjezdice” Girls Choir is one of the most representative music ensembles in Zagreb and Croatia. It was founded in 1985 and forms part of the Youth Music Centre in Zagreb. The members of the choir are all outstanding students of primary and secondary schools in Zagreb. In three decades of its existence, the choir has developed a strong cooperation with the most prominent Croatian ensembles and performers, as well as with many conductors from both Croatia and abroad. Their previous performances in the United States include highly successful tour in 2003 (New York, Pittsburgh, Dayton, Northern Kentucky), the 2004 tour (Cincinnati, Pittsburgh, Cleveland, Los Angeles, Chicago and New York), and the concert at New York’s Lincoln center in 2010. Join us for their upcoming performance at the Millennium Stage and let “Zvjezdice” show you the way to the holiday season in a magical night of Croatian and Central European seasonal choral music. ",
                 "modified": "2015-12-01 08:27:32",
                 "venue_display": "1",
                 "tz_country": null,
                 "performers": null,
                 "price": null,
                 "title": "\"Zvjezdice\" Girls Choir Concert",
                 "venue_address": "2700 F Street NW",
                 "geocode_type": "EVDB Geocoder",
                 "tz_olson_path": null,
                 "free": null,
                 "recur_string": null,
                 "calendars": null,
                 "owner": "evdb",
                 "going": null,
                 "country_abbr2": "US",
                 "categories": {"category": [{"name": "Concerts &amp; Tour Dates", "id": "music"}]},
                 "image": {
                     "small": {
                         "width": "48",
                         "url": "http://s3.evcdn.com/images/small/I0-001/024/497/946-0.jpeg_/zvjezdice-girls-choir-concert-46.jpeg",
                         "height": "48"
                     },
                     "width": "48",
                     "caption": null,
                     "medium": {
                         "width": "128",
                         "url": "http://s3.evcdn.com/images/medium/I0-001/024/497/946-0.jpeg_/zvjezdice-girls-choir-concert-46.jpeg",
                         "height": "128"
                     },
                     "url": "http://s3.evcdn.com/images/small/I0-001/024/497/946-0.jpeg_/zvjezdice-girls-choir-concert-46.jpeg",
                     "thumb": {
                         "width": "48",
                         "url": "http://s3.evcdn.com/images/thumb/I0-001/024/497/946-0.jpeg_/zvjezdice-girls-choir-concert-46.jpeg",
                         "height": "48"
                     },
                     "height": "48"
                 },
                 "created": "2015-12-01 08:27:32",
                 "venue_id": "V0-001-000468613-5",
                 "tz_city": null,
                 "stop_time": null,
                 "venue_name": "Kennedy Center - Millennium Stage",
                 "venue_url": "http://washingtondc.eventful.com/venues/kennedy-center-millennium-stage-/V0-001-000468613-5?utm_source=apis&utm_medium=apim&utm_campaign=apic"
             }, {
                 "watching_count": null,
                 "olson_path": "America/New_York",
                 "calendar_count": null,
                 "comment_count": null,
                 "region_abbr": "DC",
                 "postal_code": "20001",
                 "going_count": null,
                 "all_day": "0",
                 "latitude": "38.9083",
                 "groups": null,
                 "url": "http://washingtondc.eventful.com/events/black-composers-concert-/E0-001-089153080-5?utm_source=apis&utm_medium=apim&utm_campaign=apic",
                 "id": "E0-001-089153080-5",
                 "privacy": "1",
                 "city_name": "Washington",
                 "link_count": null,
                 "longitude": "-77.0181",
                 "country_name": "United States",
                 "country_abbr": "USA",
                 "region_name": "District of Columbia",
                 "start_time": "2016-02-20 15:00:00",
                 "tz_id": null,
                 "description": " Enjoy a delightful afternoon of classical, jazz, Gospel, and sacred music performed by some of our region&#39;s top musicians, celebrating the diverse and noteworthy contributions of composers of African descent to the fine art of music.  Hosted by the Dunbar Alumni Federation. This concert is free and open to the public.  However, ticket donations are encouraged in order to continue to provide high quality and affordable arts programs to the community.  Donations can be made by check payable to JWJCSA, PO Box 5446, Capitol Heights, MD 20791-5446. Street parking may be available on P St, O St, and 1st St NW.  Nearest metro stations: Mt Vernon Sq 7th St-Convention Center  & NoMa-Gallaudet U Donations to The James Weldon Johnson Community School of the Arts are tax-deductible to the extent allowed by law.  The James Weldon Johnson Community School of the Arts, Incorporated is an exempt organization as described in Section 501(c)(3) of the Internal Revenue Code; EIN 52-2160738. ",
                 "modified": "2015-12-03 00:20:46",
                 "venue_display": "1",
                 "tz_country": null,
                 "performers": null,
                 "price": null,
                 "title": "Black Composers Concert®",
                 "venue_address": "101 N Street Northwest",
                 "geocode_type": "Zip Code Based GeoCodes",
                 "tz_olson_path": null,
                 "free": null,
                 "recur_string": null,
                 "calendars": null,
                 "owner": "evdb",
                 "going": null,
                 "country_abbr2": "US",
                 "categories": {"category": [{"name": "Concerts &amp; Tour Dates", "id": "music"}]},
                 "image": {
                     "small": {
                         "width": "48",
                         "url": "http://s4.evcdn.com/images/small/I0-001/024/391/703-8.jpeg_/black-composers-concert-03.jpeg",
                         "height": "48"
                     },
                     "width": "48",
                     "caption": null,
                     "medium": {
                         "width": "128",
                         "url": "http://s4.evcdn.com/images/medium/I0-001/024/391/703-8.jpeg_/black-composers-concert-03.jpeg",
                         "height": "128"
                     },
                     "url": "http://s4.evcdn.com/images/small/I0-001/024/391/703-8.jpeg_/black-composers-concert-03.jpeg",
                     "thumb": {
                         "width": "48",
                         "url": "http://s4.evcdn.com/images/thumb/I0-001/024/391/703-8.jpeg_/black-composers-concert-03.jpeg",
                         "height": "48"
                     },
                     "height": "48"
                 },
                 "created": "2015-11-24 05:35:21",
                 "venue_id": "V0-001-007291320-5",
                 "tz_city": null,
                 "stop_time": null,
                 "venue_name": "The Paul Laurence Dunbar Senior High School",
                 "venue_url": "http://washingtondc.eventful.com/venues/the-paul-laurence-dunbar-senior-high-school-/V0-001-007291320-5?utm_source=apis&utm_medium=apim&utm_campaign=apic"
             }, {
                 "watching_count": null,
                 "olson_path": "America/New_York",
                 "calendar_count": null,
                 "comment_count": null,
                 "region_abbr": "VA",
                 "postal_code": null,
                 "going_count": null,
                 "all_day": "0",
                 "latitude": "38.8047",
                 "groups": null,
                 "url": "http://washingtondc.eventful.com/events/thedramatic-/E0-001-089227823-0?utm_source=apis&utm_medium=apim&utm_campaign=apic",
                 "id": "E0-001-089227823-0",
                 "privacy": "1",
                 "city_name": "Alexandria",
                 "link_count": null,
                 "longitude": "-77.0472",
                 "country_name": "United States",
                 "country_abbr": "USA",
                 "region_name": "Virginia",
                 "start_time": "2016-02-13 20:00:00",
                 "tz_id": null,
                 "description": " Alexandria Symphony Orchestra Performs Music From <em>The Godfather</em>, Puccini & More <br><br>Drama is not the sole property of stage and screen. It is also right at home on the concert stage, especially during <em>The Dramatic</em>, the thrilling special program from the Alexandria Symphony Orchestra. Music director Kim Allen Kluge (&quot;Maestro Kluge is a brilliant composer, conductor and visionary of our time.&quot; -- <em>The Washington Post</em>) conducts a program that spans Puccini arias, Respighi&#39;s <em>Pines of Rome</em> and selections from Nino Rota&#39;s epic score to <em>The Godfather</em> -- recently named one of the top five film scores of all time by the American Film Institute. Get caught up in the kind of gripping storytelling told with notes, not words, during <em>The Dramatic</em> at Rachel M. Schlesinger Concert Hall & Arts Center.",
                 "modified": "2015-12-06 05:38:01",
                 "venue_display": "1",
                 "tz_country": null,
                 "performers": null,
                 "price": "$16.00 - $28.00",
                 "title": "\"The Dramatic\"",
                 "venue_address": "4915 East Campus Lane",
                 "geocode_type": "City Based GeoCodes",
                 "tz_olson_path": null,
                 "free": null,
                 "recur_string": null,
                 "calendars": null,
                 "owner": "evdb",
                 "going": null,
                 "country_abbr2": "US",
                 "categories": {"category": [{"name": "Concerts &amp; Tour Dates", "id": "music"}]},
                 "image": {
                     "small": {
                         "width": "48",
                         "url": "http://s3.evcdn.com/images/small/I0-001/024/441/562-5.jpeg_/thedramatic-62.jpeg",
                         "height": "48"
                     },
                     "width": "48",
                     "caption": null,
                     "medium": {
                         "width": "128",
                         "url": "http://s3.evcdn.com/images/medium/I0-001/024/441/562-5.jpeg_/thedramatic-62.jpeg",
                         "height": "128"
                     },
                     "url": "http://s3.evcdn.com/images/small/I0-001/024/441/562-5.jpeg_/thedramatic-62.jpeg",
                     "thumb": {
                         "width": "48",
                         "url": "http://s3.evcdn.com/images/thumb/I0-001/024/441/562-5.jpeg_/thedramatic-62.jpeg",
                         "height": "48"
                     },
                     "height": "48"
                 },
                 "created": "2015-11-27 03:47:24",
                 "venue_id": "V0-001-008346725-2",
                 "tz_city": null,
                 "stop_time": null,
                 "venue_name": "Rachel M. Schlesinger Concert Hall, NVCC Alexandria Campus",
                 "venue_url": "http://washingtondc.eventful.com/venues/rachel-m-schlesinger-concert-hall-nvcc-alexand-/V0-001-008346725-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"
             }, {
                 "watching_count": null,
                 "olson_path": "America/New_York",
                 "calendar_count": null,
                 "comment_count": null,
                 "region_abbr": "MD",
                 "postal_code": "20742-1625",
                 "going_count": null,
                 "all_day": "0",
                 "latitude": "38.9869367",
                 "groups": null,
                 "url": "http://washingtondc.eventful.com/events/edward-m-felegy-honors-concert-/E0-001-089236594-3?utm_source=apis&utm_medium=apim&utm_campaign=apic",
                 "id": "E0-001-089236594-3",
                 "privacy": "1",
                 "city_name": "College Park",
                 "link_count": null,
                 "longitude": "-76.9428679",
                 "country_name": "United States",
                 "country_abbr": "USA",
                 "region_name": "Maryland",
                 "start_time": "2015-12-10 19:30:00",
                 "tz_id": null,
                 "description": " <strong>Presented By</strong><br>Presented By: <br> <br> <br> <br> <a href=\"http://www1.pgcps.org\" rel=\"nofollow\">Prince George&#39;s County Public Schools</a><br> <br> <br> <br> <br> Venue: <br> <a href=\"/venues/dekelboum-concert-hall\" rel=\"nofollow\">Dekelboum Concert Hall</a><br> <br> <br> <br> Seating: <br> <a href=\"/seating/general-admission\" rel=\"nofollow\">General Admission</a><br> <br> <br> Estimated Length: <br> 2 hours including intermission<br> <br> <br>  Prince George’s County Public Schools, through the Division of Teaching and Learning provides extended opportunities for qualified music students to participate in music enrichment programs. At present, the Music Enrichment Program for instrumental music includes elementary, junior and senior youth orchestras/bands. The Music Enrichment Program for vocal music includes the northern area and southern area elementary school honors choruses, the middle school honors chorus and the high school honors chorus. This year, the High School Honors Band, Senior Youth Orchestra and the High School Honors Chorus will perform. <p>The Music Enrichment Program has continually served to broaden the scope of musical performance skills acquired in the regular school program. Students participating in these enrichment performance organizations transmit to their fellow performers within each local school program an enthusiasm for increasing musical skills as well as a better understanding of the personal commitment required to be successful. <p>Under the leadership of Judith A. Hawkins, Supervisor of Vocal General Music and Lionel Harrell, Supervisor of Instrumental Music, the Music Enrichment Program has maintained its place in the instructional program. It provides a consistent level of excellence that is in keeping with the highest performance standards possible for young musicians. <p>This year’s Edward M. Felegy Honors Concert represents the culminating event for the Music Enrichment Program. It has received the full support of Kevin M. Maxwell, Ph.D., Chief Executive Officer, Shawn Joseph, Ed.D, Deputy Superintendent for Teaching and Learning, John Ceschini, Arts Integration Officer, and Anita Lambert, Coordinating Supervisor of Creative Arts Programs. Dedicated music teachers, students and parents have worked cooperatively to offer this evening’s concert as a model for school districts throughout the country.</p></p></p>",
                 "modified": "2015-12-05 14:07:10",
                 "venue_display": "1",
                 "tz_country": null,
                 "performers": null,
                 "price": null,
                 "title": "Edward M. Felegy Honors Concert",
                 "venue_address": "University of Maryland College Park",
                 "geocode_type": "EVDB Geocoder",
                 "tz_olson_path": null,
                 "free": null,
                 "recur_string": null,
                 "calendars": null,
                 "owner": "evdb",
                 "going": null,
                 "country_abbr2": "US",
                 "categories": {"category": [{"name": "Concerts &amp; Tour Dates", "id": "music"}]},
                 "image": null,
                 "created": "2015-11-27 21:53:54",
                 "venue_id": "V0-001-000307861-2",
                 "tz_city": null,
                 "stop_time": null,
                 "venue_name": "The Clarice Smith Performing Arts Center",
                 "venue_url": "http://washingtondc.eventful.com/venues/the-clarice-smith-performing-arts-center-/V0-001-000307861-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"
             }, {
                 "watching_count": null,
                 "olson_path": "America/New_York",
                 "calendar_count": null,
                 "comment_count": null,
                 "region_abbr": "MD",
                 "postal_code": "20742-1625",
                 "going_count": null,
                 "all_day": "0",
                 "latitude": "38.9869367",
                 "groups": null,
                 "url": "http://washingtondc.eventful.com/events/gamer-symphony-orchestra-fall-concert-/E0-001-089079702-3?utm_source=apis&utm_medium=apim&utm_campaign=apic",
                 "id": "E0-001-089079702-3",
                 "privacy": "1",
                 "city_name": "College Park",
                 "link_count": null,
                 "longitude": "-76.9428679",
                 "country_name": "United States",
                 "country_abbr": "USA",
                 "region_name": "Maryland",
                 "start_time": "2015-12-12 20:00:00",
                 "tz_id": null,
                 "description": " <strong>Presented By</strong><br>Presented By: <br> <br> <br> <br> <a href=\"http://umd.gamersymphony.org\" rel=\"nofollow\">The Gamer Symphony Orchestra at the University of Maryland</a><br> <br> <br> <br> <br> Venue: <br> <a href=\"/venues/dekelboum-concert-hall\" rel=\"nofollow\">Dekelboum Concert Hall</a><br> <br> <br> <br> Seating: <br> <a href=\"/seating/general-admission\" rel=\"nofollow\">General Admission</a><br> <br> <br>  Celebrating its 10th year, the student-run GSO works to establish video game music as a serious art form and to use that music as a way to bring new and younger audiences to orchestral performances.<p>The GSO is the first collegiate ensemble exclusively devoted to performing orchestral arrangements of video game music and using that music as an educational tool. The orchestra began humbly in late 2005 with six members and now boasts a roster of more than 110 musicians, including 30 singers.<p>Last spring, the GSO performed at the Smithsonian American Art Museum, in conjunction with The Art of Video Games exhibition.</p></p>",
                 "modified": "2015-11-21 01:21:05",
                 "venue_display": "1",
                 "tz_country": null,
                 "performers": null,
                 "price": null,
                 "title": "Gamer Symphony Orchestra Fall Concert",
                 "venue_address": "University of Maryland College Park",
                 "geocode_type": "EVDB Geocoder",
                 "tz_olson_path": null,
                 "free": null,
                 "recur_string": null,
                 "calendars": null,
                 "owner": "evdb",
                 "going": null,
                 "country_abbr2": "US",
                 "categories": {"category": [{"name": "Concerts &amp; Tour Dates", "id": "music"}]},
                 "image": null,
                 "created": "2015-11-21 01:21:05",
                 "venue_id": "V0-001-000307861-2",
                 "tz_city": null,
                 "stop_time": null,
                 "venue_name": "The Clarice Smith Performing Arts Center",
                 "venue_url": "http://washingtondc.eventful.com/venues/the-clarice-smith-performing-arts-center-/V0-001-000307861-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"
             }, {
                 "watching_count": null,
                 "olson_path": "America/New_York",
                 "calendar_count": null,
                 "comment_count": null,
                 "region_abbr": "DC",
                 "postal_code": "20006",
                 "going_count": null,
                 "all_day": "0",
                 "latitude": "38.8936076",
                 "groups": null,
                 "url": "http://washingtondc.eventful.com/events/deech-united-states-navy-band-/E0-001-088463295-6?utm_source=apis&utm_medium=apim&utm_campaign=apic",
                 "id": "E0-001-088463295-6",
                 "privacy": "1",
                 "city_name": "Washington",
                 "link_count": null,
                 "longitude": "-77.0397162",
                 "country_name": "United States",
                 "country_abbr": "USA",
                 "region_name": "District of Columbia",
                 "start_time": "2015-12-19 19:30:00",
                 "tz_id": null,
                 "description": " Each December the Navy Band hosts a concert to help ring in the holiday season, an annual tradition that has become one of our most highly-anticipated events of the year. This concert combines the musical forces of multiple ensembles from the U. S. Navy Band for an entertaining family-friendly show that promises to delight all ages. We&#39;ve heard that there will be a flyover and visit by a familiar guest as well! Tickets will be available on this website beginning Monday, Nov. 9 at 9 a.m.",
                 "modified": "2015-10-27 05:41:46",
                 "venue_display": "1",
                 "tz_country": null,
                 "performers": null,
                 "price": null,
                 "title": "Deech- United States Navy Band",
                 "venue_address": "1776 D Street NW",
                 "geocode_type": "EVDB Geocoder",
                 "tz_olson_path": null,
                 "free": null,
                 "recur_string": null,
                 "calendars": null,
                 "owner": "evdb",
                 "going": null,
                 "country_abbr2": "US",
                 "categories": {"category": [{"name": "Concerts &amp; Tour Dates", "id": "music"}]},
                 "image": null,
                 "created": "2015-10-27 05:41:46",
                 "venue_id": "V0-001-000111875-8",
                 "tz_city": null,
                 "stop_time": null,
                 "venue_name": "DAR Constitution Hall",
                 "venue_url": "http://washingtondc.eventful.com/venues/dar-constitution-hall-/V0-001-000111875-8?utm_source=apis&utm_medium=apim&utm_campaign=apic"
             }]
         }
     };

     httpLocalBackend.expectJSONP(url).respond(200, httpResponse);

     // initialize disliked event
     $rootScope.isLoggedIn = true;

     var userObj = new Object();
     userObj.dislikedEvents = [];
     $rootScope.currentUser = userObj;

     var eventObj = new Object();
     eventObj.id = 'E0-001-086659667-8';

     $scope.dislikeEvent(eventObj);

     // filter our disliked event
    $scope.show();
    httpLocalBackend.flush();
 });

     it('should remove events which you have disliked', function () {

 // check that it is not in the event details anymore
 expect($scope.eventDetails.length).toBe(9)
 expect($rootScope.currentUser.dislikedEvents.length).toBe(1)
 for (var i = 0; i < $scope.eventDetails.length; i++) {
 expect($scope.eventDetails[i].id).not.toBe('E0-001-086659667-8');
 }
 });
 });
});