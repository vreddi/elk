import { Collection } from '../../src/models/collection';

describe('Collection model', () => {

  it('has valid schema', () => {
    const c = new Collection();

    expect(c.schema.paths).toHaveProperty("_id");
    expect(c.schema.paths).toHaveProperty("name");
    expect(c.schema.paths).toHaveProperty("videos");
    expect(c.schema.paths).toHaveProperty("lastUpdated");
    expect(c.schema.paths).toHaveProperty("createDate");
    expect(c.schema.paths).toHaveProperty("version");
  })
})