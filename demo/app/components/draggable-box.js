import Ember from 'ember';

export default EmberHammerComponent.extend({

  init: function() {
    this.set('el', $('.box'));
  },

  gestures: function() {
    return {
      tripleTap: {
        event: 'tap',
        options: {taps: 3},
        callback: function(event) {
          console.log(event.type);
        }
      },
      pan: {
        callback: function(event) {
          console.log(event.type);
        }
      }
    }
  }

  // Another way

/*
  gestures: {
    tap: function(event) {
      console.log(event.type);
    },
    doubletap: function(event) {
      console.log(event.type);
    },
    swipeleft: function(event) {
      console.log(event.type);
    },
    swiperight: function(event) {
      console.log(event.type);
    },
    swipeup: function(event) {
      console.log(event.type);
    },
    swipedown: function(event) {
      console.log(event.type);
    },
    panleft: function(event) {
      console.log(event.type);
    },
    panright: function(event) {
      console.log(event.type);
    }
  }
*/

});
