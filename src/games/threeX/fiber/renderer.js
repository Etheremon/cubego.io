import ReactFiberReconciler from 'react-reconciler';
import hostConfig from './hostConfig/index';

const renderer = ReactFiberReconciler(hostConfig);

export { renderer };
