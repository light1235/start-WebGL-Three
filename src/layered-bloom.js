import * as THREE from 'three/build/three.module.js';
import * as  Stats  from "stats.js/build/stats.min";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { LuminosityHighPassShader } from 'three/examples/jsm/shaders/LuminosityHighPassShader.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.layers.enable(1);



let renderer = new THREE.WebGLRenderer({antialias: false});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x160035 );
renderer.autoClear = false;
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );




window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});


let controls = new  OrbitControls(camera,renderer.domElement);



const geometry = new THREE.BoxGeometry( 5, 5, 5 );
const material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
cube.position.x = -7;
cube.layers.set(1);
scene.add( cube );

const cube1 = new THREE.Mesh( geometry, material );
cube.position.x = -17;
cube1.layers.set(1);
scene.add( cube1 );


// group.add(cube,cube1);
// scene.add(group);


const PlaneGeometry = new THREE.PlaneGeometry( 80, 80 );
const PlaneMaterial = new THREE.MeshPhongMaterial( {color: 0x25004D, side: THREE.DoubleSide, opacity:1,transparent:true} );
const plane = new THREE.Mesh( PlaneGeometry, PlaneMaterial );
plane.rotation.x = Math.PI * -.5;
plane.position.y = -5;
plane.position.z = -30;
plane.layers.set(1);
plane.castShadow = false;
plane.receiveShadow = false;
scene.add( plane );

const hlight = new THREE.AmbientLight( 0xffffff, 1.5 );
hlight.layers.set(1);
scene.add( hlight );

const PlaneMaterial1 = new THREE.MeshPhongMaterial( {color: 0xF39C12,  opacity:1,transparent:true} );
const cube2 = new THREE.Mesh( geometry, PlaneMaterial1 );
cube2.position.x = -27;
cube2.layers.set(1);
scene.add( cube2 );


// Effect Composer
const  renderScene = new RenderPass(scene, camera);

// Bloom pass
const  bloomPass = new UnrealBloomPass(
     new THREE.Vector2(window.innerWidth, window.innerHeight),
     1.5,
     0.4,
     0.85
);
bloomPass.threshold = 0.21;
bloomPass.strength = 1.5;
bloomPass.radius = 0.65;
bloomPass.renderToScreen = true;
// bloomPass.selectedObjects = [plane];

// Outline pass
var outlinePass = new OutlinePass(
     new THREE.Vector2(window.innerWidth, window.innerHeight),
     scene,
     camera,
);
outlinePass.edgeStrength = 3.0
outlinePass.edgeGlow  = 0.5
outlinePass.edgeThickness = 1.0;
outlinePass.visibleEdgeColor.set('#AE25B4');
outlinePass.hiddenEdgeColor.set('#ffffff');
// outlinePass.selectedObjects = [cone];
// Important! This pass only works on selected objects

const  composer = new EffectComposer(renderer);
composer.setSize(window.innerWidth, window.innerHeight);

composer.addPass(renderScene);
composer.addPass(bloomPass);
composer.addPass(outlinePass);

var delta = 0;

camera.position.z = 40;


let stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
const animate = function () {
     requestAnimationFrame( animate );
     stats.begin();
     controls.update();
     renderer.clear();
     camera.layers.set(1);
     composer.render();
     renderer.clearDepth();
     camera.layers.set(0);
     renderer.render(scene, camera);
     // renderer.render(PlaneScene, camera);
     stats.end();
};

animate();
