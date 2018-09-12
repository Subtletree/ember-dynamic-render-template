import Service from '@ember/service';
import { setOwner, getOwner } from '@ember/application';
import { compileTemplate } from '@ember/template-compilation';

export default Service.extend({
  compile(templateString = '', props = {}) {
    let owner = getOwner(this);

    try {
      props.layout = compileTemplate(templateString || '');
    } catch(e) {
      return e;
    }

    if (props.layout) {
      let ComponentFactory = owner.factoryFor('component:render-template-result');
      let componentInstance = ComponentFactory.create(props);
      let container = document.createElement('div');
      setOwner(componentInstance, owner);

      try {
        componentInstance.appendTo(container);
      } catch(e) {
        componentInstance.destroy();
        return e;
      }
      return container;
    }
  }
});
