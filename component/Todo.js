import Component from "./core/Component.js";
import ItemAppender from "./ItemAppender.js";
import ItemFilter from "./ItemFilter.js";
import Items from "./Items.js";

export const FILTER = {
  ALL: 0,
  ACTIVE: 1,
  INACTIVE: 2,
};

class Item {
  constructor(id, content, seq) {
    this.id = id;
    this.content = content;
    this.seq = seq;
    this.isActive = false;
  }
}

class Todo extends Component {
  setInitState() {
    this.state = {
      items: [],
      filter: FILTER.ALL,
    };
  }

  template() {
    return `
      <div class="item-appender" data-component="item-appender"></div>
      <div class="items" data-component="items"></div>
      <div class="item-filter" data-component="item-filter"></div> 
    `;
  }

  mounted() {
    const {
      filteredItems,
      keyup,
      addItem,
      removeItem,
      changeStateOfItem,
      filter,
    } = this;
    const itemAppender = this.target.querySelector(
      `[data-component="item-appender"]`
    );
    const items = this.target.querySelector(`[data-component="items"]`);
    const itemFilter = this.target.querySelector(
      `[data-component="item-filter"]`
    );

    new ItemAppender(itemAppender, {
      keyup: keyup.bind(this),
      addItem: addItem.bind(this),
    });
    new Items(items, {
      filteredItems,
      removeItem: removeItem.bind(this),
      changeStateOfItem: changeStateOfItem.bind(this),
    });
    new ItemFilter(itemFilter, {
      filterNum: this.state.filter,
      filter: filter.bind(this),
    });
  }

  get filteredItems() {
    const { filter, items } = this.state;
    return items.filter((item) => {
      if (filter === FILTER.ALL) {
        return true;
      } else if (filter === FILTER.ACTIVE) {
        return item.isActive;
      }
      if (filter === FILTER.INACTIVE) {
        return !item.isActive;
      }
    });
  }

  keyup({ key }) {
    if (key !== "Enter") {
      return;
    }

    this.addItem();
  }

  addItem() {
    const { items } = this.state;

    const content = this.target.querySelector(".content-input").value;
    if (content) {
      const newItem = new Item(
        `item${items.length + 1}`,
        content,
        items.length
      );
      this.setState({ items: [...items, newItem] });
    }
  }

  removeItem(id) {
    const { items } = this.state;
    const newItems = [...items];
    newItems.splice(
      newItems.findIndex((item) => item.id === id),
      1
    );
    this.setState({ items: newItems });
  }

  changeStateOfItem(target) {
    const { items } = this.state;
    const newItems = [...items];
    const targetItemIdx = newItems.findIndex((item) => item.id === target.name);
    newItems[targetItemIdx].isActive = !newItems[targetItemIdx].isActive;
    this.setState({ items: newItems });
  }

  filter(filter) {
    this.setState({ filter });
  }
}

export default Todo;
