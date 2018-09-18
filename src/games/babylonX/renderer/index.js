import hostConfig from "./hostConfig";
import ReactFiberReconciler from 'react-reconciler';

const renderer = ReactFiberReconciler(hostConfig);

export {renderer};