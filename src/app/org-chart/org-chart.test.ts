import { expect } from '@open-wc/testing';
import OrgChart from './org-chart.js';

describe('OrgChart', () => {
  it('<app-org-chart> is an instance of OrgChart', async () => {
    const element = document.createElement('app-org-chart');
    expect(element).to.be.instanceOf(OrgChart);
  });
});
