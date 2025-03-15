import { Route } from '@vaadin/router';
import './not-found/not-found.js';
import './org-chart/org-chart';
import './people-grid/people-grid';
import './reports/reports';
import './notes/notes';
import './page-template/page-template';

export const routes: Route[] = [
  { path: 'page-template', component: 'app-page-template', name: 'PageTemplate' },
  { path: 'notes', component: 'app-notes', name: 'Notes' },
  { path: 'reports', component: 'app-reports', name: 'Reports' },
  { path: 'people-grid', component: 'app-people-grid', name: 'PeopleGrid' },
  { path: 'org-chart', component: 'app-org-chart', name: 'OrgChart' },
  { path: '', component: 'app-org-chart', name: 'OrgChart' },
  // The fallback route should always be after other alternatives.
  { path: '(.*)', component: 'app-not-found' }
];
