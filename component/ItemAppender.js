import Component from "./core/Component.js";

class ItemAppender extends Component {
  template() {
    return `
      <input class="content-input" type="text" placeholder="작업 이름을 입력하세요">
      <button class="btn add-btn"}>추가</button>
      
    `;
  }

  click({ target }) {
    const { addItem } = this.props;
    target.classList.contains("add-btn") && addItem();
  }

  setEvent() {
    const { keyup } = this.props;
    this.target.addEventListener("click", this.click.bind(this));
    this.target.addEventListener("keyup", keyup);
  }
}

export default ItemAppender;
