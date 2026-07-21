export const fragmentShader = `
uniform float time;
varying vec2 vUv;

void main() {
    vec3 color = vec3(
        sin(vUv.x * 10.0 + time) * 0.5 + 0.5,
        cos(vUv.y * 10.0 + time) * 0.5 + 0.5,
        sin(time) * 0.5 + 0.5
    );

    gl_FragColor = vec4(color, 1.0);
}
`;
