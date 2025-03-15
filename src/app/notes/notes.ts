import { html, css, LitElement } from 'lit';
import { state, query } from 'lit/decorators.js';
import { defineComponents, IgcButtonComponent, IgcIconComponent } from 'igniteui-webcomponents';

// Define the components we'll use
defineComponents(IgcButtonComponent, IgcIconComponent);

// Create our Notes class - Read-Only version
class Notes extends LitElement {
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
      padding: 16px;
    }
    .group_6 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      gap: 16px;
      position: relative;
      height: 100%;
      min-width: 50px;
      min-height: 50px;
      max-height: 100%;
      width: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    .h3 {
      color: var(--ig-primary-500);
      height: max-content;
      min-width: min-content;
    }
    .markdown-content {
      width: 100%;
      min-height: 300px;
      padding: 16px;
      border: 1px solid #eaeaea;
      border-radius: 4px;
      background-color: white;
      overflow-y: auto;
      box-sizing: border-box;
      flex-grow: 1;
      height: 100%;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 14px;
      line-height: 1.6;
      color: #333;
    }
    /* Markdown styling */
    .markdown-content h1, .markdown-content h2, .markdown-content h3, 
    .markdown-content h4, .markdown-content h5, .markdown-content h6 {
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: 600;
      color: var(--ig-primary-500);
    }
    .markdown-content h1 { font-size: 2em; }
    .markdown-content h2 { font-size: 1.5em; }
    .markdown-content h3 { font-size: 1.25em; }
    .markdown-content p {
      margin: 1em 0;
      line-height: 1.6;
    }
    .markdown-content ul, .markdown-content ol {
      margin: 1em 0;
      padding-left: 2em;
    }
    .markdown-content ul li, .markdown-content ol li {
      margin: 0.5em 0;
    }
    .markdown-content code {
      font-family: monospace;
      padding: 0.2em 0.4em;
      background-color: rgba(0,0,0,0.05);
      border-radius: 3px;
    }
    .markdown-content pre {
      background-color: #f6f8fa;
      padding: 16px;
      overflow: auto;
      border-radius: 6px;
    }
    .markdown-content pre code {
      background-color: transparent;
      padding: 0;
    }
    .markdown-content blockquote {
      margin: 1em 0;
      padding-left: 1em;
      border-left: 4px solid #ddd;
      color: #555;
    }
    .markdown-content a {
      color: var(--ig-primary-500);
      text-decoration: none;
    }
    .markdown-content a:hover {
      text-decoration: underline;
    }
    .markdown-content img {
      max-width: 100%;
    }
    .markdown-content table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    .markdown-content table th, .markdown-content table td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    .markdown-content table th {
      background-color: #f2f2f2;
      text-align: left;
    }
    .loading-state {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      color: #666;
    }
    .error-state {
      padding: 16px;
      color: #d32f2f;
      background-color: #ffeaea;
      border-radius: 4px;
      margin-bottom: 16px;
    }
  `;

  // Default content as fallback
  private defaultContent: string = `We organize around the funnels project, which is currently 4 funnels:
- UI/UX
- App Builder
- Reveal
- Slingshot

Vince is promoted to manage the regions / MD's and is responsible for the largest, primary revenue drivers which is the UI/UX and the App Builder funnels. 

We hire sales leadership for Reveal and Slingshot. In lieu of that leadership today, Jason is responsible for Reveal, and Casey is responsible for Slingshot.

Other changes include movement of dedicated sales under the VP Reveal Sales, and Morgan as the admin reports to Vince instead of Derek.`;

  // The markdown content
  @state()
  private markdown: string = '';

  @state()
  private isLoading: boolean = true;

  @state()
  private loadError: string = '';

  // File path 
  private readonly filePath: string = '../assets/notes.md';

  // Reference to elements
  @query('.markdown-content')
  private contentElement!: HTMLDivElement;

  // Constructor to load scripts early
  constructor() {
    super();
    this.loadScripts();
  }

  // Called after first render
  async firstUpdated() {
    // Try to load the markdown file
    await this.loadMarkdownFile();
    
    // Render markdown
    this.renderMarkdown();
  }

  private async loadScripts(): Promise<void> {
    try {
      // Load marked.js for Markdown parsing
      if (!(window as any).marked) {
        await new Promise<void>((resolve, reject) => {
          const markedScript = document.createElement('script');
          markedScript.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
          markedScript.onload = () => resolve();
          markedScript.onerror = (e) => reject(new Error('Failed to load marked.js'));
          document.head.appendChild(markedScript);
        });
      }

      // Load DOMPurify for sanitizing HTML
      if (!(window as any).DOMPurify) {
        await new Promise<void>((resolve, reject) => {
          const purifyScript = document.createElement('script');
          purifyScript.src = 'https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js';
          purifyScript.onload = () => resolve();
          purifyScript.onerror = (e) => reject(new Error('Failed to load DOMPurify'));
          document.head.appendChild(purifyScript);
        });
      }

      console.log('Markdown libraries loaded successfully');
    } catch (error) {
      console.error('Error loading markdown libraries:', error);
      this.loadError = 'Failed to load required libraries for rendering markdown.';
    }
  }

  // Render markdown to HTML
  private renderMarkdown() {
    if (!this.contentElement) {
      console.warn('Content element not found');
      return;
    }
    
    const marked = (window as any).marked;
    const DOMPurify = (window as any).DOMPurify;
    
    if (marked && DOMPurify) {
      try {
        // Configure marked for proper rendering
        marked.setOptions({
          gfm: true,
          breaks: true,
          sanitize: false
        });
        
        // Convert markdown to HTML and sanitize
        const rawHtml = marked.parse(this.markdown);
        const cleanHtml = DOMPurify.sanitize(rawHtml);
        
        // Set the HTML content
        this.contentElement.innerHTML = cleanHtml;
        console.log('Markdown rendered successfully');
      } catch (error) {
        console.error('Error rendering markdown:', error);
        const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
        this.contentElement.innerHTML = `
          <p style="color: red;">Error rendering markdown: ${errorMessage}</p>
          <pre style="white-space: pre-wrap;">${this.markdown}</pre>
        `;
      }
    } else {
      console.warn('Markdown libraries not loaded yet');
      
      // Fallback if libraries aren't loaded yet - use a styled version
      this.contentElement.innerHTML = `
        <div style="font-size: 14px; line-height: 1.6; color: #333; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
          ${this.markdown.replace(/\n/g, '<br>').replace(/- /g, '• ')}
        </div>
      `;
    }
  }

  // Load the markdown file
  private async loadMarkdownFile() {
    this.isLoading = true;
    this.loadError = '';
    
    try {
      // Try loading the file from assets
      const response = await fetch(this.filePath);
      
      if (response.ok) {
        const content = await response.text();
        this.markdown = content;
        console.log('Loaded content from file on server');
      } else {
        // If file doesn't exist or can't be read, use default content
        console.warn(`File not found at ${this.filePath}, using default content`);
        this.markdown = this.defaultContent;
        this.loadError = `Could not load notes.md (${response.status}: ${response.statusText}). Using default content.`;
      }
    } catch (error) {
      console.error('Error loading markdown file:', error);
      this.markdown = this.defaultContent;
      this.loadError = 'Failed to load notes.md. Using default content.';
    } finally {
      this.isLoading = false;
    }
  }

  // Handle refresh action
  private refresh() {
    this.loadMarkdownFile().then(() => {
      this.renderMarkdown();
    });
  }

  render() {
    return html`
      <link rel='stylesheet' href='../../ig-theme.css'>
      <div class="row-layout group">
        <div class="column-layout group_1">
          <div class="row-layout group_2">
            <h3 class="h3">
              Notes
            </h3>
            <div class="row-layout group_3">
              <igc-button @click="${this.refresh}" variant="outlined">
                Refresh
              </igc-button>
            </div>
          </div>
          
          <div class="row-layout group_4">
            <div class="column-layout group_5">
              <div class="column-layout group_6">
                ${this.isLoading ? html`
                  <div class="loading-state">Loading notes...</div>
                ` : html`
                  ${this.loadError ? html`
                    <div class="error-state">${this.loadError}</div>
                  ` : ''}
                  <div class="markdown-content"></div>
                `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Only register the custom element if it hasn't been defined yet
const elementName = 'app-notes';
if (!customElements.get(elementName)) {
  customElements.define(elementName, Notes);
}

// Export the class
export default Notes;