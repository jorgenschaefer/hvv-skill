var index = require('../index');

var eventNextConnectionIntent = {
  "session": {
    "sessionId": "SessionId.357a7238-dfdf-4904-8170-07bb45f16f14",
    "application": {
      "applicationId": "amzn1.ask.skill.66daded9-a9b9-4b93-aa28-e42948f5704b"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.someuser"
    },
    "new": true
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.8313a592-744a-4abf-9a04-9b50b0deb68f",
    "locale": "de-DE",
    "timestamp": "2017-02-15T19:30:35Z",
    "intent": {
      "name": "NextConnectionIntent",
      "slots": {
        "location": {
          "name": "location"
        }
      }
    }
  },
  "version": "1.0"
};

describe('The Alexa skill', () => {
  beforeEach(() => {
    this.context = {
      fail: (reason) => {
        this.failureReason = reason;
      },
      succeed: (reason) => {
        this.succeedReason = reason;
      }
    };
    this.callback = (err, result) => {
      this.callbackError = err;
      this.callbackResult = result;
    };
  });
  describe('receiving a NextConnectionIntent', () => {
    it('should respond with the Geofox Service response', () => {
      index.handler(eventNextConnectionIntent, this.context, this.callback);
      expect(this.succeedReason).not.toBe(undefined);
    });
  });
});

