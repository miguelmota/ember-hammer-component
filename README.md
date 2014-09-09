# Ember Hammer Component

```javascript
import Ember from 'ember';

export default EmberHammerComponent.extend({
  init: function() {
    this.set('el', $('.my-element'));
  },

  gestures: {
    tap: function(event) {
      console.log(event.type); // tap
    },
    panleft: function(event) {
      console.log(event.type); // panleft
    }
  }

});
```

#### Hammer manager

```javascript
import Ember from 'ember';

export default EmberHammerComponent.extend({

  init: function() {
    this.set('el', $('.my-element'));
  },

  gestures: function() {
    return {
      tripleTap: {
        event: 'tap',
        options: {taps: 3},
        callback: function(event) {
          console.log(event.type); // tripleTap
        }
      },
      pan: {
        callback: function(event) {
          console.log(event.type); // pan
        }
      }
    }
  }

});
```

# License

Released under the MIT License.
