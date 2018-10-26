import {BaseMove} from "../BaseMove";
import * as BABYLON from "babylonjs";

export default class MilkDrink extends BaseMove {
  static getId() {
    return "milk_drink"
  }

  constructor(player, {damage}) {
    super(player);
    this.damage = damage;
  }

  playMove() {
    this.player.playSkeletonAnimation('roar', false, 1);
    this._createMilkAnimation();
    setTimeout(() => {
      this.player.heal(this.damage);
    }, 4000);
  }

  _createMilkAnimation() {
    let spriteManagerPlayer = new BABYLON.SpriteManager("milkSprite", require("../../../../shared/spritesheet/bottle.png"), 2, {
      width: 128,
      height: 128
    }, this.player.scene);
    let milk = new BABYLON.Sprite("player", spriteManagerPlayer);
    let startMatrix = this.player.playerMesh.getWorldMatrix();
    let startPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), startMatrix);
    milk.playAnimation(0, 40, false, 100, () => {
    });
    milk.position = startPosition;
    let time = 0;
    this.player.scene.registerBeforeRender(() => {
      if (milk.size < 4) {
        milk.size += time;
      }
      if (milk.position.y < 5) {
        milk.position.y += time * 2;
      }
      time += 0.1;
    });
  }

  static play(player, effects) {
    let move = new MilkDrink(player, effects);
    move.playMove();
  }
}
