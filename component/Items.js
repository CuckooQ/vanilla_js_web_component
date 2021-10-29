import Component from "./core/Component.js";

class Items extends Component {
  template() {
    const { filteredItems } = this.props;
    return `
      <ul>
        ${filteredItems
          .map(({ id, content, seq, isActive }) => {
            return `
              <li class="item" data-seq="${seq}">
                ${content}
                <button class="btn toggle-btn ${
                  isActive ? "active" : ""
                }" name=${id}>${isActive ? "실행중" : "준비중"}</button>
                <button class="btn delete-btn" name="${id}">삭제</button>
              </li>
            `;
          })
          .join("")}
      </ul>
    `;
  }

  click({ target }) {
    const { removeItem, changeStateOfItem } = this.props;

    target.classList.contains("delete-btn") && removeItem(target.name);
    target.classList.contains("toggle-btn") && changeStateOfItem(target);
  }

  setEvent() {
    this.target.addEventListener("click", this.click.bind(this));
  }
}

export default Items;
