import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
  hammerInstance: null,
  hammerManager: null,
  hammerOptions: null,
  gestures: null,
  
  didInsertElement: Ember.on('didInsertElement', function() {
    var component = this,
        element = $('#' + component.get('elementId') ),
        gestures = component.get('gestures'),
        hammerOptions = component.get('hammerOptions') || {},
        hammerInstance = new Hammer(element[0], hammerOptions),
        hammerManagerInstance = new Hammer.Manager(element[0], hammerOptions);
        
    
    component.set('hammerInstance', hammerInstance);
    component.set('hammerManager', hammerManager);
    
    component.eventCallback();
    
  },
  
  eventCallback: function(type, fn){
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
        fn.apply(component, [].slice.call(arguments));
      }
    }
  },
  
  registerEvents: function(){
    var gestures = this.get('gestures');
     
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
        
        hammerManager.on((g.event ? type : type.toLowerCase()), eventCallback(eType, g.callback));
        
      } else if (Ember.typeOf(gestures[type]) === 'function') {
        hammerInstance.on(type.toLowerCase(), eventCallback(type, g));
      }
    });
  }.property('gestures.@each')
  
  eventManager: Ember.Object.create({})
});
