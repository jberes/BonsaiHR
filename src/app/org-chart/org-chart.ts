import { html, css, LitElement } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { defineComponents, IgcComboComponent } from 'igniteui-webcomponents';
import { PeopleType } from '../models/BambooSales/people-type';
import { bambooSalesService } from '../services/bamboo-sales-service';

// Define the components we'll use
defineComponents(IgcComboComponent);

// Interface for manager data
interface ManagerData {
  id: string;
  name: string;
}

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
      gap: 4px;
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
      padding: 16px;
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
    #svg-tree {
      width: 100%;
      height: 400px;
      margin-top: 20px;
    }
    .loading {
      font-size: 24px;
      margin-top: 100px;
      text-align: center;
    }
    .error {
      color: red;
      font-size: 18px;
      margin-top: 20px;
      text-align: center;
    }
  `;

  // Query selector for the tree container
  @query('#svg-tree')
  treeContainer!: HTMLDivElement;

  // Element reference for ApexTree instance
  private currentTree: any = null;

  // Default placeholder image 
  private DEFAULT_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIj48Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSIyNSIgZmlsbD0iI2NjY2NjYyIvPjxjaXJjbGUgY3g9IjI1IiBjeT0iMTgiIHI9IjgiIGZpbGw9IiM5OTk5OTkiLz48cGF0aCBkPSJNMTAgMzhjMC04IDE1LTEwIDE1LTEwczE1IDIgMTUgMTB6IiBmaWxsPSIjOTk5OTk5Ii8+PC9zdmc+';

  // State properties
  @state()
  private selectedManager: string = 'all';

  @state()
  private maxDepth: number = 2;

  @state()
  private direction: string = 'top';

  @state()
  private bambooSalesPeople: PeopleType[] = [];
  
  @state()
  private allEmployees: any[] = [];
  
  @state()
  private originalHierarchy: any = null;
  
  @state()
  private managersMap: Record<string, ManagerData> = {};
  
  @state()
  private managers: ManagerData[] = [];
  
  @state()
  private depthOptions = [
    { value: '0', name: 'All Levels' },
    { value: '1', name: '1 Level' },
    { value: '2', name: '2 Levels' },
    { value: '3', name: '3 Levels' },
    { value: '4', name: '4 Levels' },
    { value: '5', name: '5 Levels' }
  ];
  
  @state()
  private directionOptions = [
    { value: 'top', name: 'Top to Bottom' },
    { value: 'bottom', name: 'Bottom to Top' },
    { value: 'left', name: 'Left to Right' },
    { value: 'right', name: 'Right to Left' }
  ];

  constructor() {
    super();
    bambooSalesService.getPeopleList().then(data => this.bambooSalesPeople = data);
    
    // Fetch employee data when component is created
    this.fetchEmployeeData();
  }

  // API endpoint for the organization data
  private API_ENDPOINT = 'https://excel2json.io/api/share/f089be16-2144-4467-00d5-08dd632d8d2c';

  // Lifecycle method when component is added to DOM
  firstUpdated() {
    // Load the ApexTree script
    this.loadApexTreeScript().then(() => {
      // Once loaded, check if we have data and initialize
      if (this.allEmployees.length > 0) {
        this.initOrgChart();
      }
    });
  }

  // Load the ApexTree script dynamically
  private async loadApexTreeScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/apextree';
      script.onload = () => resolve();
      script.onerror = (e) => reject(new Error('Failed to load ApexTree script'));
      document.head.appendChild(script);
    });
  }

  // Fetch employee data from the API
  private async fetchEmployeeData() {
    try {
      const response = await fetch(this.API_ENDPOINT);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      this.allEmployees = await response.json();
      console.log(`Fetched ${this.allEmployees.length} employees`);
      
      // Build hierarchy once data is loaded
      this.buildHierarchy();
      
      // Initialize the org chart if component is already in DOM and script is loaded
      if (this.treeContainer && (window as any)['ApexTree']) {
        this.initOrgChart();
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
      if (this.treeContainer) {
        this.treeContainer.innerHTML = `
          <div class="error">Error loading employee data: ${(error as Error).message}</div>
        `;
      }
    }
  }

  // Get color palette for the org chart
  private getColorPalette() {
    return [
      '#cdb4db', '#ffafcc', '#bde0fe', '#a2d2ff', '#f8ad9d',
      '#c9cba3', '#00afb9', '#84a59d', '#0081a7', '#fb6f92'
    ];
  }

  // Build hierarchy from flat employee data
  private buildHierarchy() {
    if (!this.allEmployees || this.allEmployees.length === 0) {
      return;
    }
    
    // Create a map of all employees with their IDs
    const employeeMap: Record<string, any> = {};
    this.allEmployees.forEach(emp => {
      employeeMap[emp.PersonID] = {
        id: emp.PersonID.toString(),
        data: {
          imageURL: emp.Photo,
          name: emp.Name,
          originalData: emp
        },
        options: {
          nodeBGColor: '#cccccc',
          nodeBGColorHover: '#cccccc',
        },
        children: []
      };
    });
    
    // Build parent-child relationships
    const childrenIds = new Set();
    this.managersMap = {};
    
    // Add each employee to their manager's children array
    this.allEmployees.forEach(emp => {
      if (emp.ReportsTo && employeeMap[emp.ReportsTo]) {
        employeeMap[emp.ReportsTo].children.push(employeeMap[emp.PersonID]);
        childrenIds.add(emp.PersonID);
        
        // Add manager to managersMap if they have direct reports
        if (employeeMap[emp.ReportsTo]) {
          const managerNode = employeeMap[emp.ReportsTo];
          this.managersMap[emp.ReportsTo] = {
            id: emp.ReportsTo,
            name: managerNode.data.name
          };
        }
      }
    });
    
    // Find root nodes (employees with no manager)
    const rootNodes = this.allEmployees
      .filter(emp => !childrenIds.has(emp.PersonID))
      .map(emp => employeeMap[emp.PersonID]);
    
    // Create the root node
    let rootNode;
    if (rootNodes.length > 1) {
      rootNode = {
        id: 'root',
        data: {
          name: 'Sales Org',
          imageURL: this.DEFAULT_PLACEHOLDER
        },
        options: {
          nodeBGColor: '#4f6d7a',
          nodeBGColorHover: '#4f6d7a',
        },
        children: rootNodes
      };
    } else if (rootNodes.length === 1) {
      rootNode = rootNodes[0];
    } else {
      console.warn('No root nodes found, organization might have circular references');
      rootNode = employeeMap[this.allEmployees[0].PersonID];
    }
    
    // Assign colors by hierarchy level
    const colors = this.getColorPalette();
    let colorIndex = 0;
    
    // Helper function to assign colors to a subtree
    const assignColorsToSubtree = (node: any, parentColorIndex: number | null = null) => {
      // Get a color for this node if it's not the root
      if (node.id !== 'root') {
        const nodeColor = colors[colorIndex % colors.length];
        node.options.nodeBGColor = nodeColor;
        node.options.nodeBGColorHover = nodeColor;
      }
      
      // All children share the same color, but different from parent
      if (node.children && node.children.length > 0) {
        // Move to next color for the children
        const childColorIndex = (colorIndex + 1) % colors.length;
        const childColor = colors[childColorIndex];
        
        // Assign the same color to all children
        node.children.forEach((child: any) => {
          child.options.nodeBGColor = childColor;
          child.options.nodeBGColorHover = childColor;
        });
        
        // Recursively assign colors to grandchildren, incrementing color
        colorIndex = (childColorIndex + 1) % colors.length;
        node.children.forEach((child: any) => {
          if (child.children && child.children.length > 0) {
            assignColorsToSubtree(child, childColorIndex);
          }
        });
      }
    };
    
    // Start color assignment from the root
    assignColorsToSubtree(rootNode);
    
    // Save the constructed hierarchy
    this.originalHierarchy = rootNode;
    
    // Update the managers array for the combo box
    this.managers = [
      { id: 'all', name: 'All Organization' },
      ...Object.values(this.managersMap).sort((a, b) => a.name.localeCompare(b.name))
    ];
  }

  // Limit hierarchy depth for display
  private limitHierarchyDepth(originalNode: any, maxDepth: number, currentDepth = 0): any {
    // Make a deep copy of the node
    const node = JSON.parse(JSON.stringify(originalNode));
    
    // If max depth reached, remove children
    if (maxDepth > 0 && currentDepth >= maxDepth) {
      node.children = [];
      return node;
    }
    
    // Process children recursively
    if (node.children && node.children.length > 0) {
      node.children = node.children.map((child: any) => 
        this.limitHierarchyDepth(child, maxDepth, currentDepth + 1)
      );
    }
    
    return node;
  }

  // Create hierarchy for a specific manager
  private createManagerHierarchy(managerId: string): any {
    if (managerId === 'all' || !this.originalHierarchy) {
      return this.originalHierarchy;
    }
    
    // Find the manager in the employee list
    const manager = this.allEmployees.find(emp => emp.PersonID == managerId);
    if (!manager) {
      console.error('Manager not found:', managerId);
      return this.originalHierarchy;
    }
    
    // Build a new hierarchy starting with this manager
    const subEmployees = this.allEmployees.filter(emp => 
      emp.PersonID == managerId || emp.ReportsTo == managerId
    );
    
    // Create a mini-org with just this manager and direct reports
    const employeeMap: Record<string, any> = {};
    subEmployees.forEach(emp => {
      employeeMap[emp.PersonID] = {
        id: emp.PersonID.toString(),
        data: {
          imageURL: emp.Photo,
          name: emp.Name,
          originalData: emp
        },
        options: {
          nodeBGColor: '#cccccc',
          nodeBGColorHover: '#cccccc',
        },
        children: []
      };
    });
    
    // Create the parent-child relationships
    const childrenIds = new Set();
    subEmployees.forEach(emp => {
      if (emp.ReportsTo && employeeMap[emp.ReportsTo]) {
        employeeMap[emp.ReportsTo].children.push(employeeMap[emp.PersonID]);
        childrenIds.add(emp.PersonID);
      }
    });
    
    // Return the manager node
    return employeeMap[managerId];
  }

  // Initialize and render the organization chart
  private initOrgChart() {
    if (!this.treeContainer || !(window as any)['ApexTree']) {
      return;
    }
    
    // Set options for ApexTree
    const options = {
      contentKey: 'data', // Specify where node content is stored
      width: this.treeContainer.clientWidth || window.innerWidth - 15,
      height: this.treeContainer.clientHeight || window.innerHeight - 15,
      nodeWidth: 150,
      nodeHeight: 100,
      childrenSpacing: 60,
      siblingSpacing: 40,
      direction: this.direction,
      fontColor: '#fff',
      borderColor: '#333',
      canvasStyle: 'border: 1px solid #ddd; background: #f8f8f8;',
      enableExpandCollapse: false,
      enableToolbar: true,
      nodeTemplate: (content: any) => `
        <div style='display: flex; flex-direction: column; gap: 10px; justify-content: center; align-items: center; height: 100%;'>
          <img style='width: 50px; height: 50px; border-radius: 50%; object-fit: cover;' 
               src='${content.imageURL || this.DEFAULT_PLACEHOLDER}' 
               alt='${content.name}' 
               onerror="this.src='${this.DEFAULT_PLACEHOLDER}';" />
          <div style="font-weight: bold; font-family: Arial; font-size: 14px; text-align: center; max-width: 130px; white-space: normal; overflow-wrap: break-word;">
            ${content.name}
          </div>
        </div>
      `
    };
    
    // Render the chart with current settings
    this.renderChartWithSettings(options);
  }

  // Render the chart with current settings
  private renderChartWithSettings(options: any) {
    // Clean up the container
    this.treeContainer.innerHTML = '';
    
    try {
      // Get the appropriate hierarchy based on selected manager
      let hierarchyToUse = this.createManagerHierarchy(this.selectedManager);
      
      // Apply depth limitation if needed
      if (this.maxDepth > 0) {
        hierarchyToUse = this.limitHierarchyDepth(hierarchyToUse, this.maxDepth);
      }
      
      // Set the current direction
      options.direction = this.direction;
      
      // Create and render the tree
      if ((window as any)['ApexTree']) {
        this.currentTree = new (window as any)['ApexTree'](this.treeContainer, options);
        this.currentTree.render(hierarchyToUse);
      }
    } catch (e) {
      console.error('Error rendering chart:', e);
      this.treeContainer.innerHTML = `
        <div class="error">Error rendering chart: ${(e as Error).message}</div>
      `;
    }
  }

  // Handle direction change from combo box
  private handleDirectionChange(e: CustomEvent) {
    this.direction = e.detail.newValue[0];
    if (this.currentTree) {
      this.initOrgChart();
    }
  }

  // Handle max depth change from combo box
  private handleMaxDepthChange(e: CustomEvent) {
    this.maxDepth = parseInt(e.detail.newValue[0]);
    if (this.currentTree) {
      this.initOrgChart();
    }
  }

  // Handle manager selection change from combo box
  private handleManagerChange(e: CustomEvent) {
    this.selectedManager = e.detail.newValue[0];
    if (this.currentTree) {
      this.initOrgChart();
    }
  }

  // Define the component's template
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
              <igc-combo 
                ?outlined=${true} 
                .data=${this.managers} 
                label="Select Manager" 
                value-key="id" 
                display-key="name" 
                ?single-select=${true} 
                @igcChange=${this.handleManagerChange}
                class="single-select-combo">
              </igc-combo>
              
              <igc-combo 
                ?outlined=${true} 
                .data=${this.depthOptions} 
                label="Levels Deep" 
                value-key="value" 
                display-key="name" 
                ?single-select=${true} 
                @igcChange=${this.handleMaxDepthChange}
                class="single-select-combo">
              </igc-combo>
              
              <igc-combo 
                ?outlined=${true} 
                .data=${this.directionOptions} 
                label="Direction" 
                value-key="value" 
                display-key="name" 
                ?single-select=${true} 
                @igcChange=${this.handleDirectionChange}
                class="single-select-combo">
              </igc-combo>
            </div>
          </div>
          <div class="row-layout group_4">
            <div class="column-layout group_5">
              <div id="svg-tree">
                <div class="loading">Loading organization data...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}