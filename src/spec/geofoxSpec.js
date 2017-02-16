'use strict';
var Geofox = require('../geofox'),
    moment = require('moment');

describe('The GeoFox service', () => {
  var geofox;
  beforeEach(() => {
    geofox = new Geofox();
  });

  it('should fail for departures other than Bullenkoppel', () => {
    var res = geofox.nextConnection("Barmbek", "Hauptbahnhof", moment("2017-02-16T08:10:00"));
    expect(res.error).toBe("Ich kenne nur Abfahrten ab Bullenkoppel");
  });

  it('should fail for destinations other than Hauptbahnhof', () => {
    var res = geofox.nextConnection("Bullenkoppel", "Barmbek", moment("2017-02-16T08:10:00"));
    expect(res.error).toBe("Ich kenne nur Fahrten zum Hauptbahnhof");
  });

  it('should report a bus on weekdays at 8:19', () => {
    var times = [
      { time: moment("2017-02-16T08:10:00"), departure: moment("2017-02-16T08:19:00") },
      { time: moment("2017-02-18T08:11:00"), departure: moment("2017-02-18T08:31:00") },
      { time: moment("2017-02-19T08:10:00"), departure: moment("2017-02-19T08:11:00") }
    ];
    for(var spec of times) {
      var res = geofox.nextConnection("Bullenkoppel", "Hauptbahnhof", spec.time);
      expect(res.departures[0].format()).toBe(spec.departure.format());
    }
  });
});
