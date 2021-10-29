import Component from "./core/Component.js";
import { FILTER } from "./Todo.js";

class ItemFilter extends Component {
  template() {
    const { filterNum } = this.props;

    return `
      <button class="btn show-all-btn ${
        filterNum === FILTER.ALL ? "active" : ""
      }">전체 작업 보기</button>
      <button class="btn show-active-btn ${
        filterNum === FILTER.ACTIVE ? "active" : ""
      }">실행중 작업 보기</button>
      <button class="btn show-inactive-btn ${
        filterNum === FILTER.INACTIVE ? "active" : ""
      }">준비중 작업 보기</button>
    `;
  }

  click({ target }) {
    const { filter } = this.props;
    target.classList.contains("show-all-btn") && filter(FILTER.ALL);
    target.classList.contains("show-active-btn") && filter(FILTER.ACTIVE);
    target.classList.contains("show-inactive-btn") && filter(FILTER.INACTIVE);
  }

  setEvent() {
    this.target.addEventListener("click", this.click.bind(this));
  }
}

export default ItemFilter;
