import { expect } from '@open-wc/testing';
import Notes from './notes.js';

describe('Notes', () => {
  it('<app-notes> is an instance of Notes', async () => {
    const element = document.createElement('app-notes');
    expect(element).to.be.instanceOf(Notes);
  });
});
