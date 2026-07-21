import * as THREE from 'three';

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 100 );
camera.position.set(0, 12, 26);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0c10);
scene.fog = new THREE.FogExp2(0x0a0c10, 0.014);

// Свет
scene.add(new THREE.AmbientLight(0x404860, 0.9));

const key = new THREE.DirectionalLight(0xffe6d0, 1.2);
key.position.set(12, 20, 8);
scene.add(key);

const rim = new THREE.DirectionalLight(0x4de8ff, 0.5);
rim.position.set(-14, 6, -10);
scene.add(rim);

// Плоскость и сетка
const grid = new THREE.GridHelper(120, 60, 0x2a3242, 0x171c26);
grid.position.y = 0;
scene.add(grid);

const floorMat = new THREE.MeshStandardMaterial({ color: 0x0d1017, roughness: 1, metalness: 0 });
const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), floorMat);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.02;
scene.add(floor);

// Декорации: пропы
const propMat1 = new THREE.MeshStandardMaterial({ color: 0x1b2230, roughness: 0.35, metalness: 0.6, emissive: 0xff6a3d, emissiveIntensity: 0.08 });
const propMat2 = new THREE.MeshStandardMaterial({ color: 0x1b2230, roughness: 0.2, metalness: 0.7, emissive: 0x4de8ff, emissiveIntensity: 0.12 });
const propGeo = [
     new THREE.IcosahedronGeometry(1.4, 0),
     new THREE.TorusKnotGeometry(1.1, 0.32, 120, 16),
     new THREE.OctahedronGeometry(1.6, 0),
     new THREE.DodecahedronGeometry(1.3, 0),
];
const propPositions = [
     [-16, 2.2, 2], [-4, 1.4, -10], [8, 3.4, -6], [16, 2.6, 10], [0, 1.8, 16], [-10, 4.4, 14],
];
propPositions.forEach((pos, i) => {
     const geo = propGeo[i % propGeo.length];
     const mat = i % 2 === 0 ? propMat1 : propMat2;
     const meshProp = new THREE.Mesh(geo, mat);
     meshProp.position.set(...pos);
     meshProp.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
     scene.add(meshProp);
});

// Декорации: звездное небо
const starGeo = new THREE.BufferGeometry();
const N = 600;
const pos = new Float32Array(N * 3);
for (let i = 0; i < N; i++) {
     pos[i * 3] = (Math.random() - 0.5) * 160;
     pos[i * 3 + 1] = Math.random() * 60 + 4;
     pos[i * 3 + 2] = (Math.random() - 0.5) * 160;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
const starMat = new THREE.PointsMaterial({ color: 0x8fa2c0, size: 0.06, transparent: true, opacity: 0.6 });
scene.add(new THREE.Points(starGeo, starMat));

// Исходный объект
const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// animation

function animate( time ) {

     mesh.rotation.x = time / 2000;
     mesh.rotation.y = time / 1000;

     renderer.render( scene, camera );

}
