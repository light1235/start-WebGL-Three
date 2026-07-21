import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import {fragmentShader} from "./shaders/fragmentShader.js";
// import {vertexShader} from "./shaders/vertexShader.js";
import fragmentShader from './shaders/fragment.glsl';
import  vertexShader from './shaders/vertex.glsl';

const width = window.innerWidth, height = window.innerHeight;

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 10;

const scene = new THREE.Scene();



const renderer = new THREE.WebGLRenderer( { antialias: true , powerPreference: 'high-performance', } );
renderer.setSize( width, height );
renderer.setClearColor(0x202020);
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));
const key = new THREE.DirectionalLight(0xffe6d0, 1.2);
key.position.set(12, 20, 8);
scene.add(key);
scene.add(new THREE.GridHelper(20, 20));

// const  fragmentShader = `
// varying vec2 vUv;
// void main() {
// vec3 color = vec3(1.0);
// gl_FragColor = vec4(vec3(vUv.x ),1.0);
//
// }
// `;
//
// const  vertexShader  = `
// varying vec2 vUv;
// uniform float time;
// void main() {
// vUv = uv;
// vec3 pos = position.xyz * sin(time);
// gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
// }
// `;



let controls = new  OrbitControls(camera,renderer.domElement);

const geometry = new THREE.BoxGeometry( 0.5,0.5,0.5 );
const material = new  THREE.MeshNormalMaterial({wireframe: true});



const palette = ['#ff0000', '#00ff00', '#0000ff'];
const pickedColor = palette[Math.floor(Math.random() * palette.length)];

// const material = new  THREE.ShaderMaterial({
//           fragmentShader,
//           vertexShader,
//           uniforms: {
//             time: { value: 0},
//                uColor: { value: new THREE.Color(pickedColor) }
//           },
//
//      });
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

camera.position.set(0, 2, 6);


function animate( time ) {
     controls.update();

     mesh.rotation.x = time / 2000;
     mesh.rotation.y = time / 1000;

     renderer.render( scene, camera );

}


