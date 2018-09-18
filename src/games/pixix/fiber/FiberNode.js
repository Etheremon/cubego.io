export class FiberNode {
  constructor() {
    this.$f_childrens = [];

  }

  addChild(child) {
    this.$f_childrens.push(child);
  }

  removeChild(child) {

  }
}
