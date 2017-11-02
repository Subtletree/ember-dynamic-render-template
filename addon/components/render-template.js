import Component from '@ember/component';
import { schedule } from '@ember/runloop';
import layout from '../templates/components/render-template';
import { inject as service } from '@ember/service';

export default Component.extend({
  dynamicRenderTemplate: inject.service(),
  tagName: '',
  layout,

  didReceiveAttrs() {
    this._super(...arguments);

    schedule('sync', () => {
      let result = this.get('dynamicRenderTemplate').compile(this.get('templateString'), this.get('props'));
      if (result instanceof Error) {
        this.sendAction('onError', result)
      } else {
        this.set('result', result)
        this.sendAction('onSuccess', result);
      }
    });
  }
});
