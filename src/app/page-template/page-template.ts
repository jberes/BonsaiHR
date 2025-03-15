import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { defineComponents, IgcAvatarComponent, IgcBadgeComponent, IgcButtonComponent, IgcIconButtonComponent, IgcIconComponent, IgcListComponent, IgcListItemComponent, IgcRippleComponent } from 'igniteui-webcomponents';

defineComponents(IgcButtonComponent, IgcIconComponent, IgcRippleComponent, IgcIconButtonComponent, IgcListComponent, IgcListItemComponent, IgcAvatarComponent, IgcBadgeComponent);

@customElement('app-page-template')
export default class PageTemplate extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
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
      padding: 0 32px 32px;
      flex-grow: 1;
      flex-basis: 0;
    }
    .column-layout {
      display: flex;
      flex-direction: column;
    }
    .group_1 {
      background-color: #F6F6F4;
      border-radius: 32px;
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      gap: 32px;
      position: relative;
      padding: 32px;
      min-width: 50px;
      min-height: 50px;
      flex-grow: 1;
      flex-basis: 0;
    }
    .group_2 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
    }
    .group_3 {
      justify-content: flex-end;
      align-items: center;
      align-content: flex-start;
      gap: 16px;
      position: relative;
      min-width: 50px;
      min-height: 50px;
      flex-grow: 1;
      flex-basis: 0;
    }
    .group_4 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      gap: 32px;
      position: relative;
      min-width: 50px;
      min-height: 50px;
      flex-grow: 1;
      flex-basis: 0;
    }
    .group_5 {
      justify-content: space-between;
      align-items: center;
      align-content: flex-start;
      position: relative;
      min-width: 50px;
    }
    .group_6 {
      background-color: var(--ig-surface-500);
      border-color: #ECEBEA;
      border-width: 0px 4px 4px 0px;
      border-style: solid;
      border-radius: 20px;
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      gap: 32px;
      position: relative;
      padding: 32px;
      min-width: 50px;
      min-height: 50px;
      flex-grow: 1;
      flex-basis: 0;
    }
    .group_7 {
      justify-content: flex-start;
      align-items: center;
      align-content: flex-start;
      gap: 16px;
      position: relative;
      min-width: 50px;
    }
    .group_8 {
      justify-content: flex-start;
      align-items: center;
      align-content: flex-start;
      gap: 24px;
      position: relative;
      padding: 32px;
      min-width: 50px;
      min-height: 50px;
    }
    .content {
      color: var(--ig-primary-500);
      height: max-content;
      min-width: min-content;
    }
    .icon {
      color: var(--ig-gray-600);
    }
    .avatar {
      --ig-size: var(--ig-size-small);
    }
    .icon_1 {
      color: var(--ig-primary-500);
    }
    .text {
      height: max-content;
      min-width: min-content;
    }
    .avatar_1::part(base) {
      color: var(--ig-primary-500);
      background-color: transparent;
    }
    .image {
      object-fit: cover;
      width: 80px;
      min-width: 0;
      min-height: 0;
      max-width: 80px;
      flex-shrink: 0;
    }
    .h6 {
      text-align: center;
      color: var(--ig-gray-500);
      height: max-content;
      min-width: min-content;
    }
    .avatar_2::part(base) {
      color: var(--ig-primary-500);
      background-color: transparent;
    }
    .avatar_1_1::part(base) {
      color: var(--ig-primary-500);
      background-color: #F6F6F4;
    }
    .icon-button::part(base) {
      color: var(--ig-gray-600);
      background-color: var(--ig-surface-500);
    }
    .button {
      --ig-size: var(--ig-size-large);
      height: max-content;
      flex-shrink: 0;
    }
    .button_1 {
      --ig-size: var(--ig-size-large);
      height: max-content;
    }
    .button::part(base) {
      background-color: var(--ig-surface-500);
    }
    .button_1_1::part(base) {
      color: var(--ig-gray-700);
      background-color: var(--ig-surface-500);
      border-color: var(--ig-gray-500);
    }
    .list {
      height: max-content;
      min-width: 280px;
      flex-shrink: 0;
    }
    .badge {
      width: max-content;
      height: max-content;
    }
  `;

  render() {
    return html`
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
      <link rel='stylesheet' href='../../ig-theme.css'>
      <div class="row-layout group">
        <div class="column-layout group_1">
          <div class="row-layout group_2">
            <h3 class="content">
              Org Chart
            </h3>
            <div class="row-layout group_3">
              <igc-button variant="outlined" type="button" class="button">
                <span class="material-icons">
                  add_circle_outline
                </span>
                <span>New Report</span>
                <igc-ripple></igc-ripple>
              </igc-button>
              <igc-icon-button variant="flat" class="icon-button">
                <span class="material-icons icon">
                  create_new_folder
                </span>
                <igc-ripple></igc-ripple>
              </igc-icon-button>
            </div>
          </div>
          <div class="row-layout group_4">
            <igc-list class="list">
              <igc-list-item>
                <igc-avatar slot="start" shape="circle" class="avatar avatar_1">
                  <span class="material-icons icon_1">
                    watch_later
                  </span>
                </igc-avatar>
                <div>
                  <div class="row-layout group_5">
                    <p class="typography__body-1 text">
                      Recent
                    </p>
                  </div>
                </div>
              </igc-list-item>
              <igc-list-item>
                <igc-avatar slot="start" shape="circle" class="avatar avatar_2">
                  <span class="material-icons icon_1">
                    list_alt
                  </span>
                </igc-avatar>
                <div>
                  <div class="row-layout group_5">
                    <p class="typography__body-1 text">
                      My Reports
                    </p>
                    <igc-badge class="badge">
                      6
                    </igc-badge>
                  </div>
                </div>
              </igc-list-item>
            </igc-list>
            <div class="column-layout group_6">
              <div class="row-layout group_7">
                <igc-avatar shape="rounded" class="avatar_1_1">
                  <span class="material-icons icon_1">
                    history
                  </span>
                </igc-avatar>
                <h5 class="content">
                  Recent
                </h5>
              </div>
              <div class="column-layout group_8">
                <img src="/src/assets/BonsaiHR_empty_state_icon.png" class="image" />
                <h6 class="h6">
                  Recently viewed reports will appear here
                </h6>
                <igc-button variant="outlined" type="button" class="button_1 button_1_1">
                  Go to My Reports
                  <igc-ripple></igc-ripple>
                </igc-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
