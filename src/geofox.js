'use strict';

class Geofox {
  nextConnection(start, dest, desiredDeparture) {
    if(start !== 'Bullenkoppel') {
      return {
        error: "Ich kenne nur Abfahrten ab Bullenkoppel"
      };
    }
    if(dest !== 'Hauptbahnhof') {
      return {
        error: "Ich kenne nur Fahrten zum Hauptbahnhof"
      };
    }
    var departures = this.calcDepartureWeek(desiredDeparture);
    return {
      departures: departures.filter((m) => desiredDeparture.isBefore(m)).slice(0, 2)
    };
  }

  calcDepartureWeek(start) {
    var current = start.clone(),
        end = start.clone().add(7, 'days'),
        departures = [];
    while(current.isBefore(end)) {
      var hours = WEEKDAYS[current.weekday()];
      if(typeof hours === 'undefined') {
        current.add(1, 'hour');
        continue;
      }
      var minutes = hours[current.hour()];
      if(typeof minutes === 'undefined') {
        current.add(1, 'hour');
        continue;
      }
      for(var minute of minutes) {
        departures.push(current.clone().minute(minute));
      }
      current.add(1, 'hour');
    }
    return departures;
  }
}

var WEEKDAY = {
  0: [10],
  4: [50],
  5: [10, 31, 51],
  6: [1, 11, 21, 31, 41, 49, 54, 59],
  7: [4, 9, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59],
  8: [9, 19, 29, 41, 49],
  9: [1, 11, 21, 31, 41, 51],
  10: [1, 11, 21, 31, 41, 51],
  11: [1, 11, 21, 31, 41, 51],
  12: [1, 11, 21, 31, 41, 51],
  13: [1, 11, 21, 31, 41, 51],
  14: [1, 11, 21, 31, 41, 51],
  15: [1, 11, 20, 30, 40, 50],
  16: [0, 10, 20, 30, 40, 50],
  17: [0, 10, 20, 30, 40, 50],
  18: [0, 10, 20, 30, 40, 50],
  19: [0, 10, 30, 50],
  20: [10, 31, 51],
  21: [11, 31, 51],
  22: [11, 30, 50],
  23: [10, 30]
};

var SATURDAY = {
  0: [10],
  4: [50],
  5: [30],
  6: [10, 51],
  7: [11, 31, 51],
  8: [11, 31, 51],
  9: [11, 21, 31, 41, 51],
  10: [1, 11, 21, 31, 41, 51],
  11: [1, 11, 21, 31, 41, 51],
  12: [1, 11, 21, 31, 41, 51],
  13: [1, 11, 21, 31, 41, 51],
  14: [1, 11, 21, 31, 41, 51],
  15: [1, 11, 21, 31, 41, 51],
  16: [1, 11, 21, 31, 41, 51],
  17: [1, 11, 21, 31, 41, 51],
  18: [1, 11, 21, 31, 41, 51],
  19: [1, 11, 31, 51],
  20: [11, 31, 51],
  21: [11, 31, 51],
  22: [11, 30, 50],
  23: [10, 30]
};

var SUNDAY = {
  0: [10],
  6: [10, 51],
  7: [31],
  8: [11, 51],
  9: [31],
  10: [11, 31, 51],
  11: [11, 31, 51],
  12: [11, 31, 51],
  13: [11, 31, 51],
  14: [11, 31, 51],
  15: [11, 31, 51],
  16: [11, 31, 51],
  17: [11, 31, 51],
  18: [11, 31, 51],
  19: [11, 31, 51],
  20: [11, 31, 51],
  21: [11, 31, 51],
  22: [11, 30, 50],
  23: [10, 30]
};

var WEEKDAYS = {
  0: SUNDAY,
  1: WEEKDAY,
  2: WEEKDAY,
  3: WEEKDAY,
  4: WEEKDAY,
  5: WEEKDAY,
  6: SATURDAY
};

module.exports = Geofox;
