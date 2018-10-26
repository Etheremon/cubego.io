import FireMove from './fire';
import WaterMove from './water';
import GrassMove from './grass';
import AirMove from './air'
import EarthMove from './earth'
import NeutralMove from './neutral';

const listMoves = {
  ...FireMove,
  ...WaterMove,
  ...GrassMove,
  ...AirMove,
  ...EarthMove,
  ...NeutralMove
};

let MOVES = {};

for (let moveKey in listMoves) {
  if (!listMoves.hasOwnProperty(moveKey)) continue;
  MOVES[listMoves[moveKey].getId()] = listMoves[moveKey];
}

export default MOVES;
