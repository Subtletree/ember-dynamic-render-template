import Component from '@ember/component';
import { schedule } from '@ember/runloop';
import layout from '../templates/components/render-template';
import { inject as service } from '@ember/service';

export default Component.extend({
  dynamicRenderTemplate: service(),
  tagName: '',
  layout,

  didReceiveAttrs() {
    this._super(...arguments);

    schedule('sync', () => {
      let result = this.get('dynamicRenderTemplate').compile(this.get('templateString'), this.get('props'));
      if (result instanceof Error) {
        if (this.onError) {
          this.get('onError')(result);
        }
      } else {
        this.set('result', result)
        if (this.onSuccess) {
          this.get('onSuccess')(result);
        }
      }
    });
  }
});
