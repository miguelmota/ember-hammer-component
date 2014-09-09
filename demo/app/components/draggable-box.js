import Ember from 'ember';

export default EmberHammerComponent.extend({

  init: function() {
    this._super();
  },

  gestures: {
    pan: function(event) {
      console.log(event.type);
    },

    // Hammer Manager
    tripleTap: {
      event: 'tap',
      options: {taps: 3},
      callback: function(event) {
        console.log(event.type);
      }
    }
  }
});
