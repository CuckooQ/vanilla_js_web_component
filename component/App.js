import Component from "./core/Component.js";
import Todo from "./Todo.js";

class App extends Component {
  constructor(target) {
    super(target);
    const main = document.querySelector("main");
    const inner = document.createElement("div");
    inner.classList.add("inner");
    main.appendChild(inner);
    new Todo(inner);
  }

  template() {
    return `
      <div class="app">
        <header></header>
        <main></main>
        <footer></footer>
      </div>
    `;
  }
}

export default App;
