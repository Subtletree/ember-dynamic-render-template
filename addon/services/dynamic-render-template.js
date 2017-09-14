import Service from '@ember/service';
import { setOwner, getOwner } from '@ember/application';
import { once } from '@ember/runloop';
import { compileTemplate } from '@ember/template-compilation';
import { assign } from '@ember/polyfills';
import layout from '../templates/components/render-template';
import { Promise } from 'rsvp';

export default Service.extend({

  compile(templateString, props = {}) {
    return new Promise((resolve, reject) => {

      let owner = getOwner(this);
      let layout;

      try {
        props.layout = compileTemplate(templateString || '');
      } catch(e) {
        reject(e);
      }

      if (layout) {
        let component = Component.extend({
          layout,
          renderer: owner.lookup('renderer:-dom')
        });

        let ComponentFactory = owner.factoryFor('component:render-template-result');
        let componentInstance = ComponentFactory.create(props);
        let container = document.createElement('div');

        setOwner(componentInstance, owner);
        componentInstance.appendTo(container);

        resolve(container);
      } else {
        reject();
      }

    });
  }

});
