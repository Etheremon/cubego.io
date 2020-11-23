import { ThreeComponent } from './threeComponent';

export class ThreeObject3DComponent extends ThreeComponent {
  destroy() {
    this._renderer.geometry.dispose();

    if (this._renderer.material.map) this._renderer.material.map.dispose();
    if (this._renderer.material.lightMap) this._renderer.material.lightMap.dispose();
    if (this._renderer.material.bumpMap) this._renderer.material.bumpMap.dispose();
    if (this._renderer.material.normalMap) this._renderer.material.normalMap.dispose();
    if (this._renderer.material.specularMap) this._renderer.material.specularMap.dispose();
    if (this._renderer.material.envMap) this._renderer.material.envMap.dispose();

    this._renderer.material.dispose();
  }
}
