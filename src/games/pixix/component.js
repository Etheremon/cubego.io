export default function Component(game, props) {
  this.game = game;
  this.props = props;
  this.refs = {};
  this.children = [];
  this.component = null;
}

Component.prototype.addChild = function (component) {
  this.children.push(component);
};

Component.prototype.invokeChildrenExit = function () {
  this.children.forEach((child) => {
    child.exit();
    child.invokeChildrenExit();
  });
};

Component.prototype.invokeChildrenUpdate = function () {
  this.children.forEach((child) => {
    child.update();
    child.invokeChildrenUpdate();
  });
};

Component.prototype.invokeChildrenStart = function () {
  this.children.forEach((child) => {
    child.start();
    child.invokeChildrenStart();
  });
};

Component.prototype.componentDidMount = function () {

};

Component.prototype.start = function () {

};

Component.prototype.update = function () {

};

Component.prototype.exit = function () {

};

Component.prototype.componentWillReceiveProps = function (nextProps) {

};

Component.prototype.onReceiverNewProps = function () {

};