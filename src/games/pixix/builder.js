import ComponentUtils from "./componentUtils";
import Component from "./components/index";

function createElement(element, parent, componentInstance) {
  if (element && typeof element === 'object') {
    let type = element.type;
    let props = element.props;
    let component;
    if (ComponentUtils.isBuiltInComponent(type)) {
      component = handleBuiltInComponent(type, parent, props, componentInstance);
    } else if (ComponentUtils.isStateLessComponent(type)) {
      component = handleStatelessComponent(type, parent, componentInstance);
    } else if (ComponentUtils.isStateFullComponent(type)) {
      component = handleStatefulComponent(type, parent, props, componentInstance);
    } else {
      component = null;
      console.warn(`PixiX: ${type} not valid`)
    }
    if (componentInstance && element.ref) {
      if (!componentInstance.refs) {
        componentInstance.refs = {};
      }
      componentInstance.refs[element.ref] = component;
    }
    return component;
  }
}

function createChildren(children, parent, componentInstance) {
  if (Array.isArray(children)) {
    children.forEach((child) => {
      createChildren(child, parent, componentInstance);
    })
  } else {
    createElement(children, parent, componentInstance);
  }
}

function handleBuiltInComponent(type, parent, props, componentInstance) {
  let component = Component.create(type, parent, props);
  if (props.children) {
    createChildren(props.children, component, componentInstance);
  }
  return {component: component};
}

function handleStatelessComponent(type, parent) {

}

function handleStatefulComponent(type, parent, props, parentInstance) {
  let componentInstance = new type(parentInstance.game, props);
  parentInstance.addChild(componentInstance);
  let container = Component.createContainer(parent, props);
  componentInstance.component = container;
  createElement(componentInstance.render(), container, componentInstance);
  componentInstance.componentDidMount();
  return {component: container, instance: componentInstance};
}

const Builder = {
  createElement: createElement
};
export default Builder;
