export const vertexShader = `
varying vec2 vUv;
uniform float time;

void main() {
    vUv = uv;
    vec3 pos = position.xyz * sin(time);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
}
`;
