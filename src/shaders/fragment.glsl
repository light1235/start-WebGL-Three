varying vec2 vUv;
void main() {
    vec3 color = vec3(1.0);
    gl_FragColor = vec4(vec3(vUv.x ),1.0);

}
