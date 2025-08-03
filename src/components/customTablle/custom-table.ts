import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

type TableColumn = {
  label: string;
  field: string;
  order: number;
  render?: (value: any) => string | HTMLElement;
};

@customElement("custom-table")
export class CustomTable extends LitElement {
  @property({ type: Array })
  declare data: any[];
  @property({ type: Array })
  declare columns: TableColumn[];

  render() {
    return html` <table>
      <thead>
        <tr>
          ${this.columns.map((column) => html` <th>${column.label}</th> `)}
        </tr>
      </thead>
      <tbody>
        ${this.data.map(
          (row) => html`
            <tr>
              ${this.columns.map((column) => {
                const value = row[column.field] || row;
                return html`
                  <td>${column.render ? column.render(value) : value}</td>
                `;
              })}
            </tr>
          `
        )}
      </tbody>
    </table>`;
  }
}
