import * as PIXI from "pixi.js";
import PixiComponent from "./PixiComponent";

//http://pixijs.download/dev/docs/PIXI.particles.ParticleContainer.html

const PERMITTED_PROPS = [
  'alpha',
  'x',
  'y',
  'scale',
  'renderable',
  'interactiveChildren'
];
export default class PixiParticleContainer extends PixiComponent {
  removeChildren() {
    this.renderer.removeChildren();
  }

  get bounds() {
    return this._renderer.getBounds();
  }

  set renderable(isRenderable) {
    this._renderer.renderable = isRenderable;
    this._renderer.interactiveChildren = isRenderable;
  }

  static create(parent = null, props = {}) {
    let pixiParticleContainer = new PixiParticleContainer();
    pixiParticleContainer.setProps(props, PERMITTED_PROPS);
    pixiParticleContainer.renderer = new PIXI.particles.ParticleContainer();
    pixiParticleContainer.parent = parent;
    return pixiParticleContainer;
  }
}