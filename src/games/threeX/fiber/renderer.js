import hostConfig from "./hostConfig/index";
import ReactFiberReconciler from 'react-reconciler';

const renderer = ReactFiberReconciler(hostConfig);

export {renderer};
