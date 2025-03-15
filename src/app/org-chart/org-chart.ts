import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { defineComponents, IgcComboComponent, IgcTextareaComponent } from 'igniteui-webcomponents';
import { PeopleType } from '../models/BambooSales/people-type';
import { bambooSalesService } from '../services/bamboo-sales-service';

defineComponents(IgcComboComponent, IgcTextareaComponent);

@customElement('app-org-chart')
export default class OrgChart extends LitElement {
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
      background-color: var(--ig-surface-500);
      border-color: #ECEBEA;
      border-width: 0px 4px 4px 0px;
      border-style: solid;
      border-radius: 20px;
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      gap: 0;
      position: relative;
      min-width: 50px;
      min-height: 50px;
      flex-grow: 1;
      flex-basis: 0;
    }
    .h3 {
      color: var(--ig-primary-500);
      height: max-content;
      min-width: min-content;
    }
    .single-select-combo {
      width: 230px;
      height: max-content;
      min-width: min-content;
      max-width: 230px;
      flex-shrink: 0;
    }
    .textarea {
      height: max-content;
      min-width: min-content;
    }
  `;

  constructor() {
    super();
    bambooSalesService.getPeopleList().then(data => this.bambooSalesPeople = data);
  }

  @state()
  private selectedReportsTo?: string;

  @state()
  private bambooSalesPeople: PeopleType[] = [];

  @state()
  private value: string = 'PlaceHolderfor ApexTree';

  render() {
    return html`
      <link rel='stylesheet' href='../../ig-theme.css'>
      <div class="row-layout group">
        <div class="column-layout group_1">
          <div class="row-layout group_2">
            <h3 class="h3">
              Org Chart
            </h3>
            <div class="row-layout group_3">
              <igc-combo ?outlined="${true}" .data="${this.bambooSalesPeople}" label="Select Manager" value-key="Name" display-key="Name" ?single-select="${true}" @igcChange="${(e: any) => this.selectedReportsTo = e.detail.newValue[0]}" class="single-select-combo"></igc-combo>
              <igc-combo ?outlined="${true}" .data="${this.bambooSalesPeople}" label="Levels Deep" value-key="Name" display-key="Name" ?single-select="${true}" @igcChange="${(e: any) => this.selectedReportsTo = e.detail.newValue[0]}" class="single-select-combo"></igc-combo>
            </div>
          </div>
          <div class="row-layout group_4">
            <div class="column-layout group_5">
              <igc-textarea label="Label/Placeholder" ?outlined="${true}" value="${this.value}" @igcChange="${(e: any) => this.value = e.detail}" class="textarea"></igc-textarea>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
