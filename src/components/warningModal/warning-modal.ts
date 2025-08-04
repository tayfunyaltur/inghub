import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../customButton/custom-button";

@customElement("warning-modal")
export class WarningModal extends LitElement {
  @property()
  declare header: string;

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

    .modal-header {
      color: var(--primary-color);
      font-weight: 600;
      font-size: 1.25rem;
    }

    .actions-row {
      display: flex;
      width: 100%;
      gap: 1rem;
      justify-content: center;
      padding-top: 2rem;
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
          <div class="modal-header">${this.header}</div>
          <div class="modal-content"><slot></slot></div>
          <div class="actions-row">
            <custom-button @click=${this.handleProceed}>Proceed</custom-button>
            <custom-button
              variant="secondary"
              buttonStyle="outline"
              @click=${this.handleClose}
              >Cancel</custom-button
            >
          </div>
        </div>
      </div>
    `;
  }
}
