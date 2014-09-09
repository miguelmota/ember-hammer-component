# Ember Hammer Component

# Install

```bash
bower install ember-hammer-component
```

# Example

```javascript
import Ember from 'ember';

export default EmberHammerComponent.extend({
  init: function() {
    this.set('el', $('.my-element'));
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
```

# License

Released under the MIT License.
