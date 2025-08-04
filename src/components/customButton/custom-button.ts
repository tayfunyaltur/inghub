import { LitElement, html, css, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("custom-button")
export class CustomButton extends LitElement {
  @property()
  declare variant: "primary" | "secondary";
  @property()
  declare size: "small" | "medium" | "large";
  @property()
  declare disabled: boolean;
  @property()
  declare buttonStyle: "default" | "outline";
  @property()
  declare type: "button" | "submit" | "reset";

  private handleClick(event: MouseEvent) {
    if (this.disabled) return;
    const form = this.closest("form") as HTMLFormElement;
    if (form && this.type === "submit") {
      form.requestSubmit();
    }
    event.preventDefault();
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent("click"));
  }
  static styles = [
    css`
      :host {
        --background-color: var(--primary-color);
        --text-color: #fff;
        --border-color: var(--primary-color);
        --font-size: 1rem;
        --padding-size: 0.5rem 1rem;
        display: inline-block;
      }

      button {
        cursor: pointer;
        width: 100%;
        background: var(--background-color);
        border: 1px solid var(--border-color);
        color: var(--text-color);
        font-size: var(--font-size);
        padding: var(--padding-size);
        border-radius: 4px;
      }

      button:hover {
        opacity: 0.8;
      }
    `,
  ];

  update(changedProperties: PropertyValues) {
    super.update(changedProperties);
    if (this.variant === "secondary") {
      this.style.setProperty("--background-color", "var(--secondary-color)");
      this.style.setProperty("--border-color", "var(--secondary-color)");
      this.style.setProperty("--text-color", "#FFF");
    } else {
      this.style.setProperty("--background-color", "var(--primary-color)");
      this.style.setProperty("--border-color", "var(--primary-color)");
    }

    if (this.size === "small") {
      this.style.setProperty("--font-size", "0.875rem");
      this.style.setProperty("--padding-size", "0.25rem 0.5rem");
    } else if (this.size === "medium") {
      this.style.setProperty("--font-size", "1rem");
      this.style.setProperty("--padding-size", "0.5rem 1rem");
    } else if (this.size === "large") {
      this.style.setProperty("--font-size", "1.25rem");
      this.style.setProperty("--padding-size", "0.75rem 1.5rem");
    }

    if (this.disabled) {
      this.style.setProperty("--background-color", "#ccc");
      this.style.setProperty("--border-color", "#ccc");
      this.style.setProperty("--text-color", "#666");
      this.style.setProperty("cursor", "not-allowed");
    }

    if (this.buttonStyle === "outline") {
      this.style.setProperty("--background-color", "transparent");
      if (this.variant === "secondary") {
        this.style.setProperty("--border-color", "var(--secondary-color)");
        this.style.setProperty("--text-color", "var(--secondary-color)");
      } else {
        this.style.setProperty("--border-color", "var(--primary-color)");
        this.style.setProperty("--text-color", "var(--primary-color)");
      }
    }
  }

  render() {
    return html`<button type=${this.type} @click="${this.handleClick}">
      <slot></slot>
    </button>`;
  }
}
