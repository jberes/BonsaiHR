import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { defineRevealSdkWrappers } from 'reveal-sdk-wrappers';

// Define the wrappers
defineRevealSdkWrappers();

// Import the Reveal global namespace
declare global {
  interface Window {
    $: any;
    RevealApi: any;
  }
}

@customElement('app-reports')
export default class Reports extends LitElement {
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
    .reveal-dash-board {
      min-width: 100%;
      min-height: 200px;
      flex-grow: 1;
      flex-basis: 0;
    }
  `;

  @state()
  private dashboardOptions = {
    // Your dashboard options here
  };

  @state()
  private revealSdkInitialized = false;

  constructor() {
    super();
    this.initializeRevealSdk();
  }

  private async initializeRevealSdk() {
    try {
      // Check if the RevealSDK script is already loaded
      if (!document.querySelector('script[src*="reveal"]')) {
        // If not loaded, you might need to dynamically load it
        await this.loadRevealScript();
      }

      // Once loaded, initialize the SDK
      if (window.$ && window.$.ig && window.$.ig.RevealSdkSettings) {
        window.$.ig.RevealSdkSettings.setBaseUrl('https://samples.revealbi.io/upmedia-backend/reveal-api/');
        this.revealSdkInitialized = true;
      } else {
        console.error('RevealSdkSettings is not available. Make sure the Reveal SDK is properly loaded.');
      }
    } catch (error) {
      console.error('Failed to initialize Reveal SDK:', error);
    }
  }

  private loadRevealScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // This is just an example. You need to replace with the actual URL of the Reveal SDK script
      const script = document.createElement('script');
      script.src = 'https://path-to-your-reveal-sdk/infragistics.reveal.js';
      script.onload = () => resolve();
      script.onerror = (e) => reject(new Error('Failed to load Reveal SDK script'));
      document.head.appendChild(script);
    });
  }

  render() {
    return html`
      <link rel='stylesheet' href='../../ig-theme.css'>
      <div class="row-layout group">
        <div class="column-layout group_1">
          <div class="row-layout group_2">
            <h3 class="h3">
              Analytics
            </h3>
            <div class="row-layout group_3"></div>
          </div>
          <div class="row-layout group_4">
            <div class="column-layout group_5">
              <div class="column-layout group_6">
                <rv-reveal-view 
                  dashboard="Sales" 
                  .options=${this.dashboardOptions}
                  class="reveal-dash-board">
                </rv-reveal-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}