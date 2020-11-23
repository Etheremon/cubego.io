import ReactFiberReconciler from 'react-reconciler';
import hostConfig from './hostConfig';

const renderer = ReactFiberReconciler(hostConfig);

export { renderer };
