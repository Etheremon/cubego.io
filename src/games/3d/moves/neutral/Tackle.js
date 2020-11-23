import { BaseMove } from '../BaseMove';

export default class Tackle extends BaseMove {
  static getId() {
    return 'tackle';
  }

  constructor(player, { damage }) {
    super(player);
    this.damage = damage;
  }

  playMove() {
    this.player.playSkeletonAnimation('tackle_move', false, 1);

    setTimeout(() => {
      this.player.opponent.hurt(this.damage);
    }, 800);
  }

  static play(player, effects) {
    const move = new Tackle(player, effects);
    move.playMove();
  }
}
