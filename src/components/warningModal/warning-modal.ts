import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("warning-modal")
export class WarningModal extends LitElement {
  private handleClose() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  private handleProceed() {
    this.dispatchEvent(new CustomEvent("proceed"));
  }
  static styles = css`
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .modal-content-container {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      min-width: 300px;
    }
  `;

  onBackgroundClick() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  stopClickPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  render() {
    return html`
      <div class="modal" @click=${this.onBackgroundClick}>
        <div
          class="modal-content-container"
          @click=${this.stopClickPropagation}
        >
          <div class="modal-header">Header</div>
          <div class="modal-content"><slot></slot></div>
          <div class="actions-row">
            <button @click=${this.handleProceed}>Proceed</button>
            <button @click=${this.handleClose}>Cancel</button>
          </div>
        </div>
      </div>
    `;
  }
}
