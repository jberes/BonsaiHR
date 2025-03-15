import { expect } from '@open-wc/testing';
import PeopleGrid from './people-grid.js';

describe('PeopleGrid', () => {
  it('<app-people-grid> is an instance of PeopleGrid', async () => {
    const element = document.createElement('app-people-grid');
    expect(element).to.be.instanceOf(PeopleGrid);
  });
});
