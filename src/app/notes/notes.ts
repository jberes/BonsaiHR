import { html, css, LitElement } from 'lit';
import { state, query } from 'lit/decorators.js';
import { defineComponents, IgcButtonComponent, IgcIconComponent, IgcIconButtonComponent } from 'igniteui-webcomponents';

// Define the components we'll use
defineComponents(IgcButtonComponent, IgcIconComponent, IgcIconButtonComponent);

// Create our Notes class
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
    .markdown-editor {
      width: 100%;
      flex-grow: 1;
      min-width: min-content;
      resize: none;
      padding: 12px;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 14px;
      line-height: 1.5;
      border: 1px solid #eaeaea;
      border-radius: 4px;
      background-color: white;
      box-sizing: border-box;
      min-height: 300px;
      height: 100%;
    }
    .markdown-preview {
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
    .markdown-toolbar {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
    }
    /* Markdown styling */
    .markdown-preview h1, .markdown-preview h2, .markdown-preview h3, 
    .markdown-preview h4, .markdown-preview h5, .markdown-preview h6 {
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: 600;
      color: var(--ig-primary-500);
    }
    .markdown-preview h1 { font-size: 2em; }
    .markdown-preview h2 { font-size: 1.5em; }
    .markdown-preview h3 { font-size: 1.25em; }
    .markdown-preview p {
      margin: 1em 0;
      line-height: 1.6;
    }
    .markdown-preview ul, .markdown-preview ol {
      margin: 1em 0;
      padding-left: 2em;
    }
    .markdown-preview ul li, .markdown-preview ol li {
      margin: 0.5em 0;
    }
    .markdown-preview code {
      font-family: monospace;
      padding: 0.2em 0.4em;
      background-color: rgba(0,0,0,0.05);
      border-radius: 3px;
    }
    .markdown-preview pre {
      background-color: #f6f8fa;
      padding: 16px;
      overflow: auto;
      border-radius: 6px;
    }
    .markdown-preview pre code {
      background-color: transparent;
      padding: 0;
    }
    .markdown-preview blockquote {
      margin: 1em 0;
      padding-left: 1em;
      border-left: 4px solid #ddd;
      color: #555;
    }
    .markdown-preview a {
      color: var(--ig-primary-500);
      text-decoration: none;
    }
    .markdown-preview a:hover {
      text-decoration: underline;
    }
    .markdown-preview img {
      max-width: 100%;
    }
    .markdown-preview table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    .markdown-preview table th, .markdown-preview table td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    .markdown-preview table th {
      background-color: #f2f2f2;
      text-align: left;
    }
    .button-group {
      display: flex;
      gap: 10px;
    }
  `;

  // The markdown content
  @state()
  private markdown: string = `
  We organize around the funnels project, which is currently 4 funnels:

- UI/UX
- App Builder
- Reveal
- Slingshot

Vince is promoted to manage the regions / MD's and is responsible for the largest, primary revenue drivers which is the UI/UX and the App Builder funnels. 

We hire sales leadership for Reveal and Slingshot. In lieu of that leadership today, Jason is responsible for Reveal, and Casey is responsible for Slingshot.

I don't believe we should split anyone in UI/UX or App Builder sales to Slingshot.  Product / GTM is different, and we need to focus on the largest revenue drivers.

Other changes include movement of dedicated sales under the VP Reveal Sales, and Morgan as the admin reports to Vince instead of Derek.`;

  // Toggle between edit and preview modes
  @state()
  private isEditing: boolean = false;

  // Reference to elements
  @query('.markdown-preview')
  private previewElement!: HTMLDivElement;

  @query('.markdown-editor')
  private editorElement!: HTMLTextAreaElement;

  // Constructor to load scripts early
  constructor() {
    super();
    this.loadScripts();
  }

  // Called after first render
  firstUpdated() {
    // Render markdown on initial load
    this.renderMarkdown();
  }

  // Called after each update
  updated(changedProperties: Map<string, any>) {
    // If we're switching to preview mode, render the markdown
    if (changedProperties.has('isEditing') && !this.isEditing) {
      this.renderMarkdown();
    }
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
    }
  }

  // Render markdown to HTML
  private renderMarkdown() {
    if (!this.previewElement) {
      console.warn('Preview element not found');
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
        this.previewElement.innerHTML = cleanHtml;
        console.log('Markdown rendered successfully');
      } catch (error) {
        console.error('Error rendering markdown:', error);
        const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
        this.previewElement.innerHTML = `
          <p style="color: red;">Error rendering markdown: ${errorMessage}</p>
          <pre style="white-space: pre-wrap;">${this.markdown}</pre>
        `;
      }
    } else {
      console.warn('Markdown libraries not loaded yet');
      
      // Fallback if libraries aren't loaded yet - use a styled version
      this.previewElement.innerHTML = `
        <div style="font-size: 14px; line-height: 1.6; color: #333; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
          ${this.markdown.replace(/\n/g, '<br>').replace(/- /g, '• ')}
        </div>
      `;
    }
  }

  // Handle markdown content changes
  private handleMarkdownChange(e: Event) {
    const textarea = e.target as HTMLTextAreaElement;
    this.markdown = textarea.value;
  }

  // Toggle between edit and preview modes
  private toggleEditMode() {
    this.isEditing = !this.isEditing;
    
    // If switching to edit mode, focus the editor
    if (this.isEditing) {
      setTimeout(() => {
        if (this.editorElement) {
          this.editorElement.focus();
        }
      }, 0);
    }
  }

  // Insert markdown syntax at cursor position
  private insertMarkdown(syntax: string, placeholder: string = '') {
    if (!this.editorElement) return;
    
    const textarea = this.editorElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    // If text is selected, wrap it with syntax
    const textToInsert = selectedText || placeholder;
    const newText = syntax.replace('$1', textToInsert);
    
    // Insert at cursor position
    const beforeCursor = textarea.value.substring(0, start);
    const afterCursor = textarea.value.substring(end);
    
    this.markdown = beforeCursor + newText + afterCursor;
    
    // Set focus back to textarea and position cursor
    setTimeout(() => {
      textarea.focus();
      
      // If no text was selected, place cursor inside the syntax
      if (!selectedText) {
        const newCursorPos = start + newText.indexOf(placeholder) + (placeholder.length / 2);
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      } else {
        // If text was selected, place cursor after the inserted syntax
        const newCursorPos = start + newText.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  }

  // Helper methods for toolbar buttons
  private insertHeading() {
    this.insertMarkdown('## $1', 'Heading');
  }

  private insertBold() {
    this.insertMarkdown('**$1**', 'bold text');
  }

  private insertItalic() {
    this.insertMarkdown('*$1*', 'italic text');
  }

  private insertList() {
    this.insertMarkdown('- $1\n- \n- ', 'List item');
  }

  private insertLink() {
    this.insertMarkdown('[$1](https://example.com)', 'link text');
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
              <div class="button-group">
                <igc-button @click="${this.toggleEditMode}" variant="outlined">
                  ${this.isEditing ? 'Preview' : 'Edit'}
                </igc-button>
              </div>
            </div>
          </div>
          <div class="row-layout group_4">
            <div class="column-layout group_5">
              <div class="column-layout group_6">
                ${this.isEditing ? html`
                  <div class="markdown-toolbar">
                    <igc-button @click="${this.insertHeading}" variant="flat" title="Heading">
                      H
                    </igc-button>
                    <igc-button @click="${this.insertBold}" variant="flat" title="Bold">
                      <strong>B</strong>
                    </igc-button>
                    <igc-button @click="${this.insertItalic}" variant="flat" title="Italic">
                      <em>I</em>
                    </igc-button>
                    <igc-button @click="${this.insertList}" variant="flat" title="List">
                      • List
                    </igc-button>
                    <igc-button @click="${this.insertLink}" variant="flat" title="Link">
                      🔗
                    </igc-button>
                  </div>
                  <textarea 
                    class="markdown-editor"
                    .value="${this.markdown}"
                    @input="${this.handleMarkdownChange}"
                    placeholder="Write your markdown here..."
                  ></textarea>
                ` : html`
                  <div class="markdown-preview" style="flex: 1; height: 100%; background-color: white;"></div>
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