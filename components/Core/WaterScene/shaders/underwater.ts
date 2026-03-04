export const underwaterVertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const underwaterFragmentShader = `
uniform sampler2D tDiffuse;
uniform vec3 uColor;
uniform float uIntensity;
varying vec2 vUv;

void main() {
    vec4 texel = texture2D(tDiffuse, vUv);
    vec3 tinted = mix(texel.rgb, uColor, uIntensity);
    gl_FragColor = vec4(tinted, texel.a);
}
`;
