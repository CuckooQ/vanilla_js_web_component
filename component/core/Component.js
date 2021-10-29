class Component {
  target;
  state;
  props;

  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.setInitState();
    this.setEvent();
    this.render();
  }

  setInitState() {}

  mounted() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  setEvent() {}

  template() {
    return ``;
  }

  render() {
    this.target.innerHTML = this.template();
    this.mounted();
  }
}

export default Component;
