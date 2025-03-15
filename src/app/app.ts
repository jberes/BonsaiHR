import { html, css, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { routes } from './app-routing.js';
import { defineComponents, IgcBadgeComponent, IgcIconButtonComponent, IgcIconComponent, IgcInputComponent, IgcNavbarComponent, IgcNavDrawerComponent, IgcRippleComponent } from 'igniteui-webcomponents';

declare global {
  const $: any;
}

defineComponents(IgcNavDrawerComponent, IgcIconComponent, IgcRippleComponent, IgcNavbarComponent, IgcIconButtonComponent, IgcInputComponent, IgcBadgeComponent);

@customElement('app-root')
export default class App extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
    }
    .row-layout {
      display: flex;
    }
    .group {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      min-width: 50px;
      min-height: 50px;
      flex-grow: 1;
    }
    .column-layout {
      display: flex;
      flex-direction: column;
    }
    .group_1 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      gap: 16px;
      position: relative;
      padding: 24px 0 0;
    }
    .group_2 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      flex-grow: 1;
      flex-basis: 0;
    }
    .group_3 {
      justify-content: flex-start;
      align-items: center;
      align-content: flex-start;
      gap: 1rem;
      overflow: hidden;
    }
    .group_4 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      gap: 0;
      position: relative;
      padding: 25px 16px;
    }
    .group_5 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
    }
    .group_6 {
      justify-content: center;
      align-items: center;
      align-content: flex-start;
      position: relative;
      width: 48px;
      height: 40px;
      min-width: 48px;
      min-height: 40px;
      max-width: 48px;
      max-height: 40px;
    }
    .group_7 {
      justify-content: center;
      align-items: center;
      align-content: flex-start;
      position: relative;
      width: 40px;
      height: 40px;
      min-width: 40px;
      min-height: 40px;
      max-width: 40px;
      max-height: 40px;
    }
    .nav-drawer {
      min-width: min-content;
      min-height: 0;
      max-width: 260px;
      flex-shrink: 0;
    }
    .navbar {
      background-color: transparent;
      height: max-content;
      min-width: min-content;
    }
    .view-container {
      overflow: auto;
      display: block;
      position: relative;
      flex-grow: 1;
    }
    .nav-drawer::part(main) {
      width: 260px;
    }
    .icon {
      --size: 24px;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }
    .image {
      object-fit: cover;
      height: 40px;
      min-width: 0;
      min-height: 0;
      max-height: 40px;
      flex-shrink: 0;
    }
    .icon_1 {
      --size: 18px;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
    .icon_2 {
      --size: 24px;
      font-size: 24px;
      width: 24px;
      height: 24px;
      color: var(--ig-gray-700);
    }
    .input {
      height: max-content;
      min-width: min-content;
    }
    .badge {
      margin: -20px 0 0 -12px;
      width: max-content;
      height: max-content;
    }
  `;

  @query('#nav-drawer')
  private navDrawer?: IgcNavDrawerComponent;

  render() {
    return html`
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
      <link rel='stylesheet' href='../../ig-theme.css'>
      <div class="row-layout group">
        <igc-nav-drawer ?open="${true}" position="relative" id="nav-drawer" class="nav-drawer">
          <igc-nav-drawer-item @click="${() => Router.go(`/org-chart`)}">
            <span slot="icon">
              <span class="material-icons icon">
                account_circle
              </span>
              <igc-ripple></igc-ripple>
            </span>
            <div slot="content">Org Chart</div>
          </igc-nav-drawer-item>


          <igc-nav-drawer-item @click="${() => Router.go(`/notes`)}">
            <span slot="icon">
              <span class="material-icons icon">
                description
              </span>
              <igc-ripple></igc-ripple>
            </span>
            <div slot="content">Notes</div>
          </igc-nav-drawer-item>
          <div class="column-layout group_1"></div>
        </igc-nav-drawer>
        <div class="column-layout group_2">
          <igc-navbar class="navbar">
            <igc-icon-button slot="start" variant="flat" @click="${() => this.navDrawer?.toggle()}">
              <span class="material-icons">
                menu
              </span>
              <igc-ripple></igc-ripple>
            </igc-icon-button>
            <div class="row-layout group_3">
              <div class="row-layout group_4">
                <img src="/src/assets/IG-Logo-Horiz.svg" class="image" />
              </div>
            </div>
            <igc-input placeholder="Search" ?outlined="${true}" slot="end" class="input">
              <span slot="prefix">
                <span class="material-icons icon_1">
                  search
                </span>
              </span>
            </igc-input>
            <div slot="end" class="row-layout group_5">
              <div class="row-layout group_6">
                <span class="material-icons icon_2">
                  inbox
                </span>
                <igc-badge class="badge">
                  11
                </igc-badge>
              </div>
              <div class="row-layout group_7">
                <span class="material-icons icon_2">
                  help_outline
                </span>
              </div>
            </div>
          </igc-navbar>
          <router-outlet class="view-container"></router-outlet>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    const outlet = this.shadowRoot?.querySelector('router-outlet');
    const router = new Router(outlet);
    router.setRoutes(routes);
  }
}
