import Component from "./components/index";

const toString = Function.prototype.toString;

function fnBody(fn) {
  return toString.call(fn).replace(/^[^{]*{\s*/,'').replace(/\s*}[^}]*$/,'');
}
function isBuiltInComponent(type) {
  return Component.isRegistered(type)
}

function isStateLessComponent(type) {
  return !isStateFullComponent(type) && typeof type === 'function'
}

function isStateFullComponent(type) {
  return (typeof type === 'function' &&
    (/^class(\s|\{\}$)/.test(toString.call(type)) ||
      (/^.*classCallCheck\(/.test(fnBody(type))))
  );
}

const ComponentUtils = {
  isStateFullComponent: isStateFullComponent,
  isStateLessComponent: isStateLessComponent,
  isBuiltInComponent: isBuiltInComponent
};

export default ComponentUtils;