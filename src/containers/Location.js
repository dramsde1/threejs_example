import * as THREE from "three";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import map from './textures/earth.jpg';

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.scene = new THREE.Scene();

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xeeeeee, 1);
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );

    this.camera.position.set(0, 0, 5);
    this.time = 0;

    this.isPlaying = true;

    //rotate scene
    this.mouseDown = false;
    this.mouseX = 0;
    this.mouseY = 0;
    // end rotate the scene

    this.addObjects();
    this.resize();
    this.addMouseHandler();
    this.renderScene();
    this.setupResize();
  }

  //rotate the scene 


  onMouseMove(e) {
    if (!this.mouseDown) {
      return;
    }

    e.preventDefault();

    this.deltaX = e.clientX - this.mouseX;
    this.deltaY = e.clientY - this.mouseY;
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.rotateScene(this.deltaX, this.deltaY);
  }

  onMouseDown(e) {
    e.preventDefault();

    this.mouseDown = true;
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  onMouseUp(e) {
    e.preventDefault();

    this.mouseDown = false;
  }

  addMouseHandler() {
    window.addEventListener('mousemove', (e) => {
      this.onMouseMove(e);
    }, false);
    window.addEventListener('mousedown', (e) => {
      this.onMouseDown(e);
    }, false);
    window.addEventListener('mouseup', (e) => {
      this.onMouseUp(e);
    }, false);
  }


  rotateScene(deltaX, deltaY) {
    this.mesh.rotation.y += deltaX / 100;
    this.mesh.rotation.x += deltaY / 100;
  }



  //end rotate the scene

  settings() {
    let that = this;
    this.settings = {
      progress: 0,
    };
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    let that = this;
    this.material = new THREE.MeshPhongMaterial();
    //this.material.color = new THREE.Color("rgb(200, 0,0)");
    this.material.map = new THREE.TextureLoader().load(map);
    this.geometry = new THREE.SphereGeometry(2, 45, 45);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.light = new THREE.AmbientLight(0xffffed);
    this.scene.add(this.mesh);
    this.scene.add(this.light);
  }

  stop() {
    this.isPlaying = false;
  }

  play() {
    if (!this.isPlaying) {
      this.renderScene()
      this.isPlaying = true;
    }
  }

  renderScene() {
    if (!this.isPlaying) return;
    requestAnimationFrame(this.renderScene.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  render() {

    return (
      <div>
        <script src="Location.js"></script>
      </div>
    );

  }

}





