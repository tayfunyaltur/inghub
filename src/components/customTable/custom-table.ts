import { LitElement, html, css, CSSResultGroup } from "lit";
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
  @state()
  declare activePage: number;

  constructor() {
    super();
    this.activePage = 0;
  }

  static styles = [
    css`
      .table-container {
        max-widht: 100%;
        overflow-x: auto;
      }
      table {
        width: 100%;
        background: white;
        border-spacing: 0px;
      }
      thead {
        color: var(--primary-color);
        background: white;
      }
      thead {
        border: 1px solid black;
      }
      th {
        font-weight: 300;
        padding: 1rem 0.75rem;
      }
      td {
        padding: 1rem 1rem;
        color: dimgray;
        text-align: center;
      }

      th,
      td {
        border-bottom: 1px solid lightgray;
      }
    `,
  ];

  render() {
    return html`
      <div class="table-container">
        <table>
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
        </table>
      </div>
    `;
  }
}
