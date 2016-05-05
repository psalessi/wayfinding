/*global jasmine, beforeEach, afterEach, describe, it, $, expect*/

// https://github.com/velesin/jasmine-jquery
// https://github.com/velesin/jasmine-jquery/tree/support-jasmine-v2 -- we are using this version

'use strict';

var fixtures = jasmine.getFixtures();

// given relative path test/fixtures/ to karma
fixtures.fixturesPath = 'base/test/fixtures/';

describe('Wayfinding', function () {

	var $example;

	beforeEach(function (done) {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
		fixtures.load('example.html');
		$example = $('#myMaps');
		$example.wayfinding({
			'maps': [
				{'path': 'base/test/fixtures/demo_map_1.svg', 'id': 'floor1'},
				{'path': 'base/test/fixtures/demo_map_2.svg', 'id': 'floor2'}
			],
			'path': {
				width: 3,
				color: 'cyan',
				radius: 8,
				speed: 8
			},
			'startpoint': function () {
				return 'lcd.1';
			},
			'defaultMap': 'floor1',
			'dataStoreCache': 'test/fixtures/datastores/'
		}, wayfindingCallback);

		function wayfindingCallback() {
			done();
		}
		// setTimeout(function() {
		// 	done();
		// }, 1000);
		// waits(5000); // could implement a callback to speed this up rather than just waiting...
	});

	afterEach(function () {
		$example.wayfinding('destroy');
	});

	it('loads two maps', function () {
		expect($example.find('div').length).toEqual(2);
		expect($example.find('#floor1:visible').length).toBe(1);
		expect($example).toBeVisible();
	});

	it('changes startpoint', function () {
		expect($example.wayfinding('startpoint')).toEqual('lcd.1');
		$example.wayfinding('startpoint', 'lobby');
		expect($example.wayfinding('startpoint')).toEqual('lobby');
	});

	it('changes shows pin at startpoint', function () {
		expect($example.wayfinding('startpoint')).toEqual('lcd.1');
		$example.wayfinding('startpoint', 'lobby');
		$example.wayfinding({'showLocation': true});
		expect($example.wayfinding('startpoint')).toEqual('lobby');
		expect($example).toContainElement('.startPin');
	});

	it('routes to room 101', function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
		expect($example).not.toContainElement('.directionPath');
		$example.wayfinding('routeTo', 'R101');
		expect($example).toContainElement('path[class ^= directionPath]');
		expect($example.find('path[class ^= directionPath]')).toHaveAttr('d', 'M297,354L297,373Q297,381 289,381L107,381Q99,381 99,373L99,344Q99,336 106.15541752799933,339.5777087639997L117,345');
	});

	it('is destructible', function () {
		expect($example).toBeInDOM();
		$example.wayfinding('destroy');
		expect($example).not.toBeInDOM();
	});



    // it("builds the right number of doors per floor", function() {
    //     // First, let's try building everything
    //     datastore_object.build();
        
    //     // Do we have doors for each floor?
    //     expect(datastore_object.dataStore.doors.length).toEqual(2);

    //     // Do we have the proper number of doors for each floor?
    //     // These magic numbers are from the maps SVG door counts
    //     expect(datastore_object.dataStore.doors[0].length).toEqual(18);
    //     expect(datastore_object.dataStore.doors[1].length).toEqual(2);
    // });

    // it("builds the right number of paths per floor", function() {
    //     // First, let's try building everything
    //     datastore_object.build();
        
    //     // Do we have paths for each floor?
    //     expect(datastore_object.dataStore.paths.length).toEqual(2);
 
    //     // Do we have the proper number of paths for each floor?
    //     // These magic numbers are from the maps SVG path counts
    //     expect(datastore_object.dataStore.paths[0].length).toEqual(64);
    //     expect(datastore_object.dataStore.paths[1].length).toEqual(28);
    // });
    
    // it("builds the right number of portals per floor", function() {
    //     // First, let's try building everything
    //     datastore_object.build();
        
    //     // Do we have portals for each floor?
    //     expect(datastore_object.dataStore.portals.length).toEqual(2);
        
    //     // Do we have the proper number of portals for each floor?
    //     // These magic numbers are from the maps SVG portal counts
    //     expect(datastore_object.dataStore.portals[0].length).toEqual(2);
    //     expect(datastore_object.dataStore.portals[1].length).toEqual(2);
    // });

    // it("correctly matches portals on different floors", function() {
    //     // First, let's try building everything
    //     datastore_object.build();

    //     // Is each portal linking to the correct floor?
    //     expect(datastore_object.dataStore.portals[0][0].to_floor).toEqual(1);
    //     expect(datastore_object.dataStore.portals[0][1].to_floor).toEqual(1);
    //     expect(datastore_object.dataStore.portals[1][0].to_floor).toEqual(0);
    //     expect(datastore_object.dataStore.portals[1][1].to_floor).toEqual(0);
   
    //     // Is each portal correctly paired?
    //     expect(datastore_object.dataStore.portals[0][0].match).toEqual(0);
    //     expect(datastore_object.dataStore.portals[0][1].match).toEqual(1);
    //     expect(datastore_object.dataStore.portals[1][0].match).toEqual(0);
    //     expect(datastore_object.dataStore.portals[1][1].match).toEqual(1);
    // });

    // it("has the right number of connections for doors per floor", function() {
    //     // First, let's try building everything
    //     datastore_object.build();

    //     var connection_count_floor1 = 0;
    //     var connection_count_floor2 = 0;

    //     // Loop through each door element and count its connections
    //     datastore_object.dataStore.doors[0].forEach(function(el, i) {
    //         connection_count_floor1 += el.doors.length;
    //         connection_count_floor1 += el.paths.length;
    //         connection_count_floor1 += el.portals.length;
    //     });

    //     datastore_object.dataStore.doors[1].forEach(function(el, i) {
    //         connection_count_floor2 += el.doors.length;
    //         connection_count_floor2 += el.paths.length;
    //         connection_count_floor2 += el.portals.length;
    //     });

    //     // Are the number of connections correct for doors on each floor?
    //     // The magic numbers are from hand counting the connections on the maps
    //     expect(connection_count_floor1).toEqual(20);
    //     expect(connection_count_floor2).toEqual(2);
    // });
    
    // it("has the right number of connections for paths per floor", function() {
    //     // First, let's try building everything
    //     datastore_object.build();

    //     var connection_count_floor1 = 0;
    //     var connection_count_floor2 = 0;

    //     // Loop through each path element and count its connections
    //     datastore_object.dataStore.paths[0].forEach(function(el, i) {
    //         connection_count_floor1 += el.doors.length;
    //         connection_count_floor1 += el.paths.length;
    //         connection_count_floor1 += el.portals.length;
    //     });

    //     datastore_object.dataStore.paths[1].forEach(function(el, i) {
    //         connection_count_floor2 += el.doors.length;
    //         connection_count_floor2 += el.paths.length;
    //         connection_count_floor2 += el.portals.length;
    //     });

    //     // Are the number of connections correct for paths on each floor?
    //     // The magic numbers are from hand counting the connections on the maps
    //     expect(connection_count_floor1).toEqual(296);
    //     expect(connection_count_floor2).toEqual(70);
    // });

    // it("has the right number of connections for portals per floor", function() {
    //     // First, let's try building everything
    //     datastore_object.build();

    //     var connection_count_floor1 = 0;
    //     var connection_count_floor2 = 0;

    //     // Loop through each portal element and count its connections
    //     datastore_object.dataStore.portals[0].forEach(function(el, i) {
    //         connection_count_floor1 += el.doors.length;
    //         connection_count_floor1 += el.paths.length;
    //         connection_count_floor1 += el.portals.length;
    //     });

    //     datastore_object.dataStore.portals[1].forEach(function(el, i) {
    //         connection_count_floor2 += el.doors.length;
    //         connection_count_floor2 += el.paths.length;
    //         connection_count_floor2 += el.portals.length;
    //     });

    //     // Are the number of connections correct for portals on each floor?
    //     // The magic numbers are from hand counting the connections on the maps
    //     expect(connection_count_floor1).toEqual(2);
    //     expect(connection_count_floor2).toEqual(2);
    // });

});
