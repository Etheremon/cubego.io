import * as BABYLON from 'babylonjs';
import { BabylonComponent } from './babylonComponent';

export class BabylonParticle extends BabylonComponent {
  constructor() {
    super();
  }

  static create({ scene }, props) {
    const particle = new BabylonParticle();
    particle.renderer = BABYLON.ParticleSystemSet.Parse(props.data, scene);
    return particle;
  }
}
