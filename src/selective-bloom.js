//three.module.js:740 THREE.Color: Unknown color 0xFFFFFF
//Если у обьекта нет цвета а только наложенные текстуры, вариант такой.
// если mesh.material.color = '0xFFFFFF', bloom не работает на этот mesh.
//myMaterial.color.set(0xffffff);

import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { LuminosityHighPassShader } from 'three/examples/jsm/shaders/LuminosityHighPassShader.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";
import BloomVetex from '../shaders/vertex-bloom.glsl';
import BloomFragment from '../shaders/fragment-bloom.glsl';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );


let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );

window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});


const controls = new OrbitControls(camera, renderer.domElement);

let o1, o2;

const params = {
     exposure: 1,
     bloomStrength: 3,
     bloomThreshold:0.21,
     bloomRadius: 2.8
};

const darkMaterial = new THREE.MeshBasicMaterial({
     color: "black"
});
const materials = {};

const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.7, 0.8, 0.85);
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const finalPass = new ShaderPass(
     new THREE.ShaderMaterial({
          uniforms: {
               baseTexture: {
                    value: null
               },
               bloomTexture: {
                    value: bloomComposer.renderTarget2.texture
               }
          },
          fragmentShader:BloomFragment,
          vertexShader:BloomVetex,
          defines: {}
     }), "baseTexture"
);
finalPass.needsSwap = true;

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


const finalComposer = new EffectComposer(renderer);
finalComposer.setSize(window.innerWidth, window.innerHeight);
finalComposer.addPass(renderScene);
finalComposer.addPass(finalPass);
finalComposer.addPass(outlinePass);


let g1 = new THREE.BoxGeometry();
let m1 = new THREE.MeshBasicMaterial({color: "red"});
o1 = new THREE.Mesh(g1, m1);
o1.position.x = -2;

let g2 = new THREE.BoxGeometry();
let m2 = new THREE.MeshBasicMaterial({color: "red"});
o2 = new THREE.Mesh(g2, m2);
o2.position.x = 2;

const planeGeo = new THREE.PlaneBufferGeometry(40, 40);
const planeMat = new THREE.MeshBasicMaterial({
     color:'#6B317E',
     side: THREE.DoubleSide,

});

const planeGeo1 = new THREE.PlaneBufferGeometry(40, 40);
const planeMat1 = new THREE.MeshPhongMaterial( { color: 0xffff00 } );


const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = Math.PI * -.5;

const mesh2 = new THREE.Mesh(planeGeo1, planeMat1);
mesh2.rotation.x = Math.PI * -.5;
mesh.position.y =-2;
mesh.position.z = -30;
scene.add(mesh)
scene.add(mesh2)

const geometry8 = new THREE.BoxGeometry( 1, 1, 1 );
const material8 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry8, material8 );
cube.position.y = 2;
scene.add( cube );
outlinePass.selectedObjects = [cube];


camera.position.z = 30;

function animate() {
     requestAnimationFrame( animate );
     controls.update();
     renderer.setClearColor(0x000000);
     renderBloom(true);
     renderer.setClearColor( 0x160035 );
     finalComposer.render();

}
animate();

function renderBloom() {

     scene.traverse(darkenNonBloomed);
     bloomComposer.render();
     scene.traverse(restoreMaterial);

}

function darkenNonBloomed(obj) {

     cube.material.color.set(0x000000);

}

function restoreMaterial(obj) {

     cube.material.color.set( 0x00ff00);


}
