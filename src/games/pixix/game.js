//TODO: move to another folder
import * as TWEEN from 'es6-tween';
import Builder from "./builder";
import * as PIXI from "pixi.js";

export default class Game {
  constructor() {
    this.scenes = {};
    this.stage = null;
    this.currentScene = null;
    this.renderer = null;
    this.startSceneClass = null;
    this.ticker = null;
    this.props = {};
    this.options = {};
  }

  start() {
    this.buildScene(this.startSceneClass);
    this.ticker.add((time) => {
      this.renderer.render(this.stage.renderer);
      TWEEN.update();
      this.update();
    });
    // this.resize();
    this.autoResize();
    this.ticker.start();
  }

  startTicker(){
    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add((time) => {
      this.renderer.render(this.stage.renderer);
      TWEEN.update();
      // this.update();
    });
    this.ticker.start();
  }

  resize() {
    let w = this.options.view.parentNode.offsetWidth;
    let h = this.options.view.parentNode.offsetHeight;
    let rotation = 0;
    if (this.options.view.parentNode.offsetWidth < 1120) {
      if (h < w) {
        let ratio = this.options.width / this.options.height;
        let scale = w / this.options.width;
        this.stage.renderer.scale.set(scale);
        this.renderer.resize(w, w / ratio);
      } else {
        let rotation = Math.PI / 2;
        let originalWidth = this.options.height;
        let originalHeight = this.options.width;
        let ratio = Math.min(w / originalWidth, h / originalHeight);
        let width = Math.ceil(originalWidth * ratio);
        let height = Math.ceil(originalHeight * ratio);

        this.stage.renderer.scale.set(ratio);
        this.stage.renderer.rotation = rotation;
        this.stage.renderer.position.set(width, 0);
        this.renderer.resize(width, height);
      }
    }

  }

  autoResize() {
    let w = this.options.view.parentNode.offsetWidth;
    let h = this.options.view.parentNode.offsetHeight;

    console.log(w, h);
  }

  startScene() {
    this.currentScene.start();
    this.currentScene.invokeChildrenStart();
  }

  update() {
    this.currentScene.update();
    this.currentScene.invokeChildrenUpdate();
  }

  changeScene(sceneId) {
    if (this.stage) {
      this.stage.removeChildren();
    }
    this.buildScene(this.scenes[sceneId]);
  }

  buildScene(sceneClass) {
    let scene = new sceneClass(this);
    Builder.createElement(scene.render(), this.stage, scene);
    this.currentScene = scene;
    this.startScene();
    return scene;
  }

  fetchScenes(children) {
    let scenes = {};
    children.forEach((child) => {
      scenes[child.props.name] = child.props.component;
      if (child.props.default) {
        this.startSceneClass = child.props.component;
      }
    });
    this.scenes = scenes;
  }

  changeProps(props) {
    let newProps = Object.assign({}, this.props);
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        newProps[key] = props[key];
      }
    }
    this.props = newProps;
    let oldScene = this.currentScene.render();
    console.log(oldScene);
//    this.currentScene.componentWillReceiveProps(newProps);
//     this.currentScene.onReceiverNewProps();
  }

  set currentScene(scene) {
    this._currentScene = scene;
  }

  get currentScene() {
    return this._currentScene;
  }

  exit() {
    this.ticker.stop();
    this.currentScene.exit();
    this.currentScene.invokeChildrenExit();
  }
}
