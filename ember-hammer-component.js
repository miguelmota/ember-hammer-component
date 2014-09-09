(function(window, Ember, Hammer, undefined) {
  'use strict';

  window.EmberHammerComponent = Ember.Component.extend({

    _didInsertElement: Ember.on('didInsertElement', function() {
      var self = this,
          gestures, hammerOptions, hammerInstance, hammerManager;

      self.set('el', $(self.get('el').selector));

      hammerOptions  = self.get('hammerOptions') || {};
      gestures = self.get('gestures');

      self.set('_hammerInstance', new Hammer(self.get('el')[0], hammerOptions));
      hammerInstance = self.get('_hammerInstance');

      self.set('_hammerManagerInstance', new Hammer.Manager(self.get('el')[0], hammerOptions));
      hammerManager = self.get('_hammerManagerInstance');

      function eventCallback(type, fn) {
        return function(event) {
          if (event.stopPropagation) {
            event.stopPropagation();
          } else {
            event.srcEvent.stopPropagation();
          }
          if (~['tap'].indexOf(type)) {
            event.preventDefault();
          }

          if (Ember.typeOf(fn) === 'function') {
            fn.apply(self, [].slice.call(arguments));
          }
        }
      }

      Object.keys(gestures).forEach(function(type, i) {
        var g = gestures[type];

        if (Ember.typeOf(g) === 'object') {
          var options = g.options || {},
              eType = g.event ? g.event : type;

          if (g.event) {
            options.event = type;
          }

          hammerManager.add(new Hammer[Ember.String.capitalize(eType)](options));

          if (g.event) {
            hammerManager.get(type).recognizeWith(g.event);
          }

          hammerManager.on((g.event ? g.event : type.toLowerCase()), eventCallback(eType, g.callback));

        } else if (Ember.typeOf(gestures[type]) === 'function') {
          hammerInstance.on(type.toLowerCase(), eventCallback(type, g));
        }

      });

    })

  });
})(window, Ember, Hammer);
