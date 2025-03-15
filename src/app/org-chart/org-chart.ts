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
      display: flex;
      flex-direction: column;
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
      display: flex;
      flex-direction: column;
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
      height: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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

  // Observer for window resize
  private resizeObserver: ResizeObserver | null = null;

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

    // Set up resize observer to update chart dimensions when container resizes
    if (this.treeContainer && 'ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(entries => {
        if (this.currentTree) {
          this.initOrgChart();
        }
      });
      this.resizeObserver.observe(this.treeContainer);
    }
  }

  // Cleanup when component is removed
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  // Load the ApexTree script dynamically
  private async loadApexTreeScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any)['ApexTree']) {
        resolve();
        return;
      }
      
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
          nodeBGColor: '#FFFFFF',
          nodeBGColorHover: '#F8F8F8',
          nodeTextColor: '#2b7cb3',
          nodeBorderColor: 'transparent'
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
          nodeBGColor: '#F0F8FF',
          nodeBGColorHover: '#E0F0FF',
          nodeTextColor: '#2b7cb3',
          nodeBorderColor: 'transparent'
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
      // Set default node styling to white background
      if (node.id !== 'root') {
        node.options = {
          ...node.options,
          nodeBGColor: '#FFFFFF',
          nodeBGColorHover: '#F8F8F8',
          nodeTextColor: '#2b7cb3', // Blue text color similar to the image
          nodeBorderColor: 'transparent',
          nodeLineColor: '#DDDDDD' // Light gray lines connecting nodes
        };
      } else {
        // Root node can have a slightly different style if needed
        node.options = {
          ...node.options,
          nodeBGColor: '#F0F8FF', // Light blue background for root
          nodeBGColorHover: '#E0F0FF',
          nodeTextColor: '#2b7cb3',
          nodeBorderColor: 'transparent',
          nodeLineColor: '#DDDDDD'
        };
      }
      
      // Process children recursively
      if (node.children && node.children.length > 0) {
        node.children.forEach((child: any) => {
          assignColorsToSubtree(child);
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

  // Build complete hierarchy for a specific manager
  private buildManagerSpecificHierarchy(managerId: string, maxDepth: number): any {
    if (managerId === 'all' || !this.originalHierarchy) {
      return this.originalHierarchy;
    }
    
    // Find the complete path from root to the selected manager
    const managerPath: any[] = [];
    let currentManagerId = managerId;
    
    // Find the manager's ancestor path up to the root
    while (currentManagerId) {
      const manager = this.allEmployees.find(emp => emp.PersonID == currentManagerId);
      if (!manager) break;
      
      managerPath.unshift(manager);
      currentManagerId = manager.ReportsTo;
    }
    
    // If we couldn't find a path, return the original hierarchy
    if (managerPath.length === 0) {
      return this.originalHierarchy;
    }
    
    // Now build a hierarchy with just the path to the manager and the manager's subtree
    const employeeMap: Record<string, any> = {};
    
    // Create nodes for all employees
    this.allEmployees.forEach(emp => {
      employeeMap[emp.PersonID] = {
        id: emp.PersonID.toString(),
        data: {
          imageURL: emp.Photo,
          name: emp.Name,
          originalData: emp
        },
        options: {
          nodeBGColor: '#FFFFFF',
          nodeBGColorHover: '#F8F8F8',
          nodeTextColor: '#2b7cb3',
          nodeBorderColor: 'transparent'
        },
        children: []
      };
    });
    
    // Build hierarchy for manager's subtree
    const buildSubtree = (managerId: string, depth: number = 0): any => {
      const manager = employeeMap[managerId];
      if (!manager) return null;
      
      const node = { 
        ...manager,
        children: []
      };
      
      // Add children if we haven't reached max depth
      if (maxDepth === 0 || depth < maxDepth) {
        // Find all direct reports
        const directReports = this.allEmployees
          .filter(emp => emp.ReportsTo == managerId)
          .map(emp => emp.PersonID);
        
        // Add each direct report to the manager's children
        node.children = directReports
          .map(reportId => buildSubtree(reportId, depth + 1))
          .filter(child => child !== null);
      }
      
      return node;
    };
    
    // Build the manager's subtree
    const managerSubtree = buildSubtree(managerId);
    if (!managerSubtree) {
      return this.originalHierarchy;
    }
    
    // Create path to the manager
    let currentNode = null;
    let rootNode = null;
    
    for (let i = 0; i < managerPath.length; i++) {
      const emp = managerPath[i];
      
      // Skip the selected manager as we've already built their subtree
      if (emp.PersonID == managerId) continue;
      
      const node = { 
        ...employeeMap[emp.PersonID],
        children: [] 
      };
      
      // Set root if this is the first node
      if (i === 0) {
        rootNode = node;
      }
      
      // Set this node as the child of the previous node
      if (currentNode) {
        currentNode.children = [node];
      }
      
      // Update current node
      currentNode = node;
    }
    
    // If we found a path, attach the manager's subtree to it
    if (currentNode) {
      currentNode.children = [managerSubtree];
      return rootNode;
    }
    
    // If no path was found, just return the manager's subtree
    return managerSubtree;
  }

  // Initialize and render the organization chart
  private initOrgChart() {
    if (!this.treeContainer || !(window as any)['ApexTree']) {
      return;
    }
    
    // Calculate container dimensions
    const containerRect = this.treeContainer.getBoundingClientRect();
    
    // Set options for ApexTree
    const options = {
      contentKey: 'data', // Specify where node content is stored
      width: containerRect.width > 0 ? containerRect.width : window.innerWidth - 15,
      height: containerRect.height > 0 ? containerRect.height : window.innerHeight - 15,
      nodeWidth: 150,
      nodeHeight: 120, // Increased height for better spacing
      childrenSpacing: 60,
      siblingSpacing: 40,
      direction: this.direction,
      fontColor: '#333', // Darker font color
      borderColor: 'transparent', // Remove borders
      nodeBorderRadius: '12px', // Rounded corners for nodes
      canvasStyle: 'background: transparent;', // No border, transparent bg
      enableExpandCollapse: false,
      enableToolbar: true,
      // Updated node styling to match the image
      nodeTemplate: (content: any) => `
        <div style='display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; width: 100%; padding: 8px; background-color: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);'>
          <img style='width: 70px; height: 70px; border-radius: 50%; object-fit: cover; margin-bottom: 10px;' 
               src='${content.imageURL || this.DEFAULT_PLACEHOLDER}' 
               alt='${content.name}' 
               onerror="this.src='${this.DEFAULT_PLACEHOLDER}';" />
          <div style="font-weight: 500; font-family: Arial, sans-serif; font-size: 16px; color: #2b7cb3; text-align: center; max-width: 140px; white-space: normal; overflow-wrap: break-word;">
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
      // Get the manager-specific hierarchy with depth limitation applied directly
      let hierarchyToUse;
      
      if (this.selectedManager === 'all') {
        // If viewing entire org, apply depth limitation to the original hierarchy
        hierarchyToUse = this.maxDepth > 0 
          ? this.limitHierarchyDepth(this.originalHierarchy, this.maxDepth)
          : this.originalHierarchy;
      } else {
        // For specific manager, build hierarchy with depth limitation built in
        hierarchyToUse = this.buildManagerSpecificHierarchy(this.selectedManager, this.maxDepth);
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