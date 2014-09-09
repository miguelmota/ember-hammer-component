(function(window, Ember, Hammer, undefined) {
  window.EmberHammerComponent = Ember.Component.extend({

    _didInsertElement: Ember.on('didInsertElement', function() {
      var self = this;

      self.set('el', $(self.get('el').selector));

      var hammerOptions  = self.get('hammerOptions') || {};

      var gestures = self.get('gestures');

      if (Ember.typeOf(gestures) === 'function') {
        gestures = gestures();

        if (Ember.typeOf(gestures) !== 'object') {
          return;
        }

        self.set('_hammerManagerInstance', new Hammer(self.get('el')[0], hammerOptions));

        var manager = self.get('_hammerManagerInstance');

        Object.keys(gestures).forEach(function(type, i) {
          var g = gestures[type];
          var options = g.options || {};

          if (g.event) {
            options.event = type;
          }

          manager.add(new Hammer[Ember.String.capitalize(g.event ? g.event : type)](options));

          if (g.event) {
            manager.get(type).recognizeWith(g.event);
          }

          manager.on(type || type.toLowerCase(), function(event) {
            if (Ember.typeOf(g.callback) === 'function') {
              g.callback.apply(self, [].slice.call(arguments));
            }
          });
        });

      } else if (Ember.typeOf(gestures) === 'object') {
        self.set('_hammerInstance', new Hammer(self.get('el')[0], opts));

        var hammerInstance = self.get('_hammerInstance');

        Object.keys(gestures).forEach(function(type, i) {
          hammerInstance.on(type.toLowerCase(), function(event) {

            // Prevent click from firing tap event
            event.srcEvent.preventDefault();

            if (Ember.typeOf(gestures[type]) === 'function') {
              gestures[type].apply(self, [].slice.call(arguments));
            }
          });
        });
      }

    })

  });
})(window, Ember, Hammer);
