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
      this.get('dynamicRenderTemplate').compile(this.get('templateString'), this.get('props'))
        .then((result) => {
          this.set('result', result)
          this.sendAction('onSuccess', result);
        })
        .catch((error) => this.sendAction('onError', error));
    });
  }
});
