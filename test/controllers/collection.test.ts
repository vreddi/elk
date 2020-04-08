import CollectionController from '../../src/controllers/collection';
import App from '../../src/app';

describe('Collection controller', () => {
  it('can be initialized', () => {
    const controller: CollectionController = new CollectionController(App);

    expect(controller.app.routes).toBe(undefined);
    expect(controller).toHaveProperty('routes');
    expect(controller).toHaveProperty('app');
    expect(controller).toHaveProperty('_service');
  });

  it('can initialize routes', () => {
    const controller: CollectionController = new CollectionController(App);

    controller.routes();

    expect(controller.app.route).toBeDefined();
    expect(controller.app.route('/collections')).toBeDefined();
    expect(controller.app.route('/collections/:id')).toBeDefined();
  })
});
