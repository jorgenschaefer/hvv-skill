'use strict';
var Alexa = require("alexa-sdk");
var Geofox = require("./geofox");
var moment = require("moment");

var START_LOCATION = "Bullenkoppel";
var DEFAULT_DESTINATION_LOCATION = "Hauptbahnhof";
var APP_ID = "amzn1.ask.skill.66daded9-a9b9-4b93-aa28-e42948f5704b";

exports.handler = function(event, context, callback) {
  moment.locale('de');
  var alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function () {
    this.emit(':tell', 'Versuche es mit "wann ist die nächste Verbindung nach Barmbek"');
  },
  'NextConnectionIntent': function () {
    let dest = this.event.request.intent.slots.location.value || DEFAULT_DESTINATION_LOCATION,
        time = moment(),
        geofox = new Geofox(),
        result = geofox.nextConnection(START_LOCATION, dest, time);
    if(typeof result.error !== 'undefined') {
      this.emit(':tell', 'Ein Fehler bei der Abfrage ist aufgetreten. ' + result.error);
      return;
    }
    var response = 'Die nächste Verbindung ab ' + START_LOCATION + ' Richtung ' + dest + ' fährt ' + result.departures[0].fromNow();
    if(result.departures.length > 1) {
      response += ' und dann wieder ' + result.departures[1].fromNow();
    }
    this.emit(':tell', response);
  },
  'LastConnectionIntent': function () {
    this.emit(':tell', 'Suche die letzte Verbindung');
  },
  'RouteIntent': function () {
    this.emit(':tell', 'Tut mir leid, die Routenfunktion ist noch nicht implementiert');
  },
  'AuthorIntent': function () {
    this.emit(':tell', 'Ich wurde von Iorgen Schäfer programmiert');
  }
};
