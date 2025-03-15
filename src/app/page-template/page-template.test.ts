import { expect } from '@open-wc/testing';
import PageTemplate from './page-template.js';

describe('PageTemplate', () => {
  it('<app-page-template> is an instance of PageTemplate', async () => {
    const element = document.createElement('app-page-template');
    expect(element).to.be.instanceOf(PageTemplate);
  });
});
