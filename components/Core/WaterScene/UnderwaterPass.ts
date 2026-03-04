import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { underwaterFragmentShader, underwaterVertexShader } from './shaders/underwater';

export class UnderwaterPass extends ShaderPass {
  constructor(camera: THREE.PerspectiveCamera, waterLevel: number, causticsTexture: THREE.Texture, depthTexture: THREE.DepthTexture) {
    const shader = {
      uniforms: {
        tDiffuse: { value: null },
        tDepth: { value: depthTexture },
        tCaustics: { value: causticsTexture },
        projectionMatrixInverse: { value: camera.projectionMatrixInverse },
        cameraMatrixWorld: { value: camera.matrixWorld },
        waterLevel: { value: waterLevel },
        time: { value: 0 },
        cameraPos: { value: camera.position },
      },
      vertexShader: underwaterVertexShader,
      fragmentShader: underwaterFragmentShader,
    };

    super(shader);
  }

  update(time: number, waterLevel: number) {
    this.uniforms.time.value = time;
    this.uniforms.waterLevel.value = waterLevel;
  }
}
