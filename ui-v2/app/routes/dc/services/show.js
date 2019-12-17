import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  repo: service('repository/service'),
  chainRepo: service('repository/discovery-chain'),
  settings: service('settings'),
  queryParams: {
    s: {
      as: 'filter',
      replace: true,
    },
  },
  model: function(params) {
    const dc = this.modelFor('dc').dc.Name;
    return hash({
      item: this.repo.findBySlug(params.name, dc, this.modelFor('nspace').nspace.substr(1)),
      chain: this.chainRepo.findBySlug(params.name, dc),
      urls: this.settings.findBySlug('urls'),
      dc: dc,
    });
  },
  setupController: function(controller, model) {
    controller.setProperties(model);
  },
});
