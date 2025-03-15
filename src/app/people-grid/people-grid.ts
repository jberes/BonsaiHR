import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import 'igniteui-webcomponents-grids/grids/combined.js';
import { PeopleType } from '../models/BambooSales/people-type';
import { bambooSalesService } from '../services/bamboo-sales-service';

@customElement('app-people-grid')
export default class PeopleGrid extends LitElement {
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
    .group_6 {
      justify-content: flex-start;
      align-items: center;
      align-content: flex-start;
      gap: 0;
      position: relative;
      height: 100%;
      min-width: 50px;
      min-height: 50px;
      max-height: 100%;
    }
    .h3 {
      color: var(--ig-primary-500);
      height: max-content;
      min-width: min-content;
    }
    .image {
      object-fit: cover;
      border-radius: 30px;
      width: 56px;
      height: 57px;
      min-width: 0;
      min-height: 0;
      max-width: 56px;
      max-height: 57px;
    }
    .grid {
      --ig-size: var(--ig-size-medium);
      min-width: 100%;
      max-width: 100%;
      flex-grow: 1;
      flex-basis: 0;
    }
  `;

  constructor() {
    super();
    bambooSalesService.getPeopleList().then(data => this.bambooSalesPeople = data);
  }

  @state()
  private bambooSalesPeople: PeopleType[] = [];
  
  // Default placeholder image URL
  private placeholderImageUrl: string = 'https://image-placeholder.com/images/actual-size/57x57.png';

  public columnBodyTemplate = (ctx: any) => {
    // Check if the cell value is null, undefined, or empty string
    const imageUrl = ctx.cell.value ? ctx.cell.value : this.placeholderImageUrl;
    
    return html`
      <img src="${imageUrl}" class="image" alt="Person" />
    `;
  }

  render() {
    return html`
      <link rel='stylesheet' href='../../ig-theme.css'>
      <link rel='stylesheet' href='node_modules/igniteui-webcomponents-grids/grids/themes/light/material.css'>
      <div class="row-layout group">
        <div class="column-layout group_1">
          <div class="row-layout group_2">
            <h3 class="h3">
              People List
            </h3>
            <div class="row-layout group_3"></div>
          </div>
          <div class="row-layout group_4">
            <div class="column-layout group_5">
              <div class="column-layout group_6">
                <igc-grid .data="${this.bambooSalesPeople}" primary-key="PersonID" row-selection="single" ?allow-filtering="${true}" filter-mode="excelStyleFilter" width="100%" class="ig-typography ig-scrollbar grid">
                  <igc-grid-toolbar>
                    <igc-grid-toolbar-actions>
                      <igc-grid-toolbar-exporter></igc-grid-toolbar-exporter>
                    </igc-grid-toolbar-actions>
                    <igc-grid-toolbar-title>Grid Toolbar</igc-grid-toolbar-title>
                  </igc-grid-toolbar>
                  <igc-column field="PersonID" data-type="number" header="PersonID" width="153px" ?hidden="${true}" ?groupable="${true}" ?sortable="${true}" ?resizable="${true}" selectable="false"></igc-column>
                  <igc-column field="Photo" data-type="string" header="Photo" width="147px" ?groupable="${true}" ?sortable="${true}" ?resizable="${true}" .bodyTemplate="${this.columnBodyTemplate}" selectable="false"></igc-column>
                  <igc-column field="Name" data-type="string" header="Name" ?groupable="${true}" ?sortable="${true}" ?resizable="${true}" selectable="false"></igc-column>
                  <igc-column field="ReportsTo" data-type="number" header="ReportsTo" ?hidden="${true}" ?groupable="${true}" ?sortable="${true}" ?resizable="${true}" selectable="false"></igc-column>
                </igc-grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}