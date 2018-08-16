import Dispatcher from './Dispatcher';

export default {
  start_game() {
      Dispatcher.dispatch({
          actionType: 'game-start',
      });
  },
  next_level() {
      Dispatcher.dispatch({
          actionType: 'next-level',
      });
  },
  paused_game() {
      Dispatcher.dispatch({
          actionType: 'game-paused',
      });
  },
  init_target() {
      Dispatcher.dispatch({
          actionType: 'init-target',
      });
  },
  player_action(dx, dy, shoot) {
      Dispatcher.dispatch({
          actionType: 'player-move',
          dx: dx,
          dy: dy,
          shoot: shoot
      });
  },
  resize_game(width, height) {
      Dispatcher.dispatch({
          actionType: 'game-resize',
          width: width,
          height: height
      });
  },
  quit_game() {
      Dispatcher.dispatch({
          actionType: 'game-quit',
      });
  },
  surrender() {
      Dispatcher.dispatch({
          actionType: 'surrender',
      });
  },
  restart_game() {
      Dispatcher.dispatch({
          actionType: 'game-restart',
      });
  },
  game_on_execution() {
      Dispatcher.dispatch({
          actionType: 'game-on-execution',
      });
  },
};
