import {Injectable} from '@angular/core';
import * as THREE from 'three';
import {
  Color, DoubleSide, FrontSide, LineDashedMaterial, LuminanceFormat,
  MeshBasicMaterial,
  MeshPhongMaterial, MeshStandardMaterial,
  NearestFilter,
  NearestMipmapLinearFilter,
  Plane, RawShaderMaterial, ShaderMaterial,
  Side,
  Texture
} from 'three';
import {MeshLineMaterial} from 'three.meshline';
import {
  ContourMaterial,
} from 'threejs-shader-materials';
import {tokenReference} from '@angular/compiler';

export interface MaterialData {
  color: Color;
  emmisive: Color;
  side: Side;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private settings = {
    metalness: 0.8,
    roughness: 0.4,
    ambientIntensity: 0.2,
    aoMapIntensity: 1.0,
    envMapIntensity: 1.0,
    displacementScale: 2.436143, // from original model
    normalScale: 1.0
  };
  mat;
  boneMaterial: MeshPhongMaterial;

  constructor() {
  }

  createStandardMaterial() {
    return new THREE.MeshLambertMaterial({
      color: 0x00ffd5,
      emissive: 0x000000,
      clipIntersection: true,
      transparent: true,
      side: DoubleSide,
      clippingPlanes: [],
      precision: 'highp'
    });
  }
  createStem() {
    return new THREE.MeshLambertMaterial({
      color: 0x00ffd5,
      emissive: 0x000000,
      clipIntersection: true,
      transparent: true,
      side: FrontSide,
    });
  }

  createBasicMaterial(): THREE.MeshBasicMaterial {
    return new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      wireframe: true,
    });
  }

  createBoneMaterial(): THREE.MeshPhongMaterial {

    this.boneMaterial = new THREE.MeshPhongMaterial({
      color: 0xebe5b3,
      reflectivity: 0.3,
      flatShading: false,
      transparent: true,
      shininess: 0,
      side: THREE.DoubleSide,
      clippingPlanes: [],
      clipShadows: true
    });
    return this.boneMaterial;
  }

  createBoneMaterialWithPlane(plane: Array<Plane>): THREE.MeshPhongMaterial {

    this.boneMaterial = new THREE.MeshPhongMaterial({
      color: 0xebe5b3,
      reflectivity: 0.3,
      flatShading: false,
      transparent: true,
      shininess: 0,
      side: THREE.DoubleSide,
      clippingPlanes: [...plane],
      clipShadows: true
    });
    return this.boneMaterial;
  }

  createCupMaterial(): MeshLineMaterial {
    return new MeshStandardMaterial({
      color: 0xB67AFF,
      side: THREE.FrontSide,
    });
  }

  createStemMaterial(): THREE.MeshPhongMaterial {
    return new THREE.MeshPhongMaterial({
      color: 0x1e4d76,
      side: THREE.FrontSide,
    });
  }

  createVirginBone(): THREE.MeshPhongMaterial {
    const material = this.createBoneMaterial().clone();
    material.wireframe = true;
    return material;
  }

  createMortaise(): THREE.MeshNormalMaterial {
    return new THREE.MeshNormalMaterial({
      wireframe: true,
      visible: true
    });
  }

  setMaterialColor(color: number | Color): MeshPhongMaterial {
    return new THREE.MeshPhongMaterial({
      color,
      transparent: true,
    });
  }

  createSphere() {
    return new THREE.MeshNormalMaterial({
      visible: false
    });
  }

  setOpaqueMaterial(): THREE.MeshPhongMaterial {
    return new THREE.MeshPhongMaterial({
      color: 0xc0ab85,
      emissive: 0x696969,
      depthFunc: THREE.NeverDepth
    });
  }

  setTransparentMaterial(): THREE.MeshPhongMaterial {
    return new THREE.MeshPhongMaterial({
      color: 0xc0ab85,
      emissive: 0x000000,
      depthFunc: THREE.AlwaysDepth
    });
  }

  setMeshLineMaterial(color: number | Color) {
    return new MeshLineMaterial({
      color,
      depthTest: false,
      transparent: true,
      opacity: 0.9,
      blending: THREE.SubtractiveBlending,
    });
  }

  setMeshLineMaterialSphere(color: number | Color) {
    return new MeshBasicMaterial({
      color,
      visible: false
    });
  }

  setMeshNormalLineMaterial(color: number | Color) {
    return new MeshBasicMaterial({
      color,
      visible: false
    });
  }

  setMeshLineMaterialTest(color: number | Color, blending = THREE.MultiplyBlending) {
    return new MeshBasicMaterial({
      blending,
      /*depthFunc: NotEqualDepth,
      depthTest : false, opacity: 0.9,*/
      color,
    });
  }

  test() {
    let mat;
    mat = new ContourMaterial({});
    mat.color = new Color(0xFF0000)
    return mat;
  }

  testCup() {
    let mat;
    mat = new ContourMaterial({});
    mat.color = new Color(0x048b9a)
    return mat;
  }

  setPlan(color = 0xFFFFFF) {
    return new MeshBasicMaterial({
      color: color,
      depthTest: false,
      transparent: true
    })
  }

  generateBasicMaterial(color: Color) {
    return new MeshBasicMaterial({color});
  }

  createShaderMaterialXray() {
    return new ShaderMaterial(
      {
        uniforms: {
          // @ts-ignore
          p: {type: 'f', value: 2},
          // @ts-ignore
          glowColor: {type: 'c', value: new THREE.Color(0xFF0000)},
        },
        vertexShader: `
              uniform float p;
              varying float intensity;
              #include <clipping_planes_pars_vertex>
              void main()
              {
                  #include <begin_vertex>
                  vec3 vNormal = normalize( normalMatrix * normal );
                  intensity = pow(1.0 - abs(dot(vNormal, vec3(0, 0, 1))), p);
                  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                  #include <project_vertex>
                  #include <clipping_planes_vertex>
              }
          `,
        fragmentShader: `
             uniform vec3 glowColor;
              varying float intensity;
               #include <clipping_planes_pars_fragment>
              void main()
              {
              #include <clipping_planes_fragment>
                  vec3 glow = glowColor * intensity;
                  gl_FragColor = vec4( glow, 1 );
              }
            `,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        clipping: true,
        wireframe: true,
        clippingPlanes: []
      });
  }

  createShader1() {
    // @ts-ignore
    return new RawShaderMaterial(
      {
        fragmentShader: ` precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform vec3 vLightPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform float scale;\nuniform float power;\nvarying vec3 vNormal;\nvarying vec3 vPosition;\nvec3 toneToHeatColorMap(in float tone) \n{\n    if (tone > 0.95) return vec3(0.0, 0.0, 1.0);\n else if (tone > 0.80) return vec3(0.0, 0.2 + tone, 0.0);\n else if (tone > 0.25) return vec3(1.0, tone, 0.0);\n else if (tone > 0.1) return vec3(1.0 - tone, 0.0, 0.0);\n     return vec3(0.4, 0.05, 0.2);\n}\nvec4 Heat_Shader1617568560968_7_main(void) \n{\n    vec4 Heat_Shader1617568560968_7_gl_FragColor = vec4(0.0);\n    vec3 fresnel = vec3(1.0, 1.0, 1.0);\n    vec3 pos2World = (modelViewMatrix * vec4(vPosition, 1.0)).xyz;\n    vec3 norm2World = normalize(modelViewMatrix * vec4(vNormal, 1.0)).xyz;\n    vec3 cameraPos2World = (modelViewMatrix * vec4(viewMatrix[0][3], viewMatrix[1][3], viewMatrix[2][3], 1.0)).xyz;\n    vec3 lightVectorW = normalize(vec3(vec4(vLightPosition, 1.0) * modelMatrix) - vPosition);\n    float ndl = max(0.0, dot(vNormal, lightVectorW));\n    vec3 I = normalize(pos2World - cameraPos2World);\n    float R = scale * pow(1.0 + dot(I, norm2World), power);\n    vec3 color = vec3(0);\n    color = clamp(mix(color, fresnel, R), 0.0, 1.0);\n    Heat_Shader1617568560968_7_gl_FragColor = vec4(toneToHeatColorMap(color.r), 1.0);\n    return Heat_Shader1617568560968_7_gl_FragColor *= 1.0;\n}\nvoid main() \n{\n    gl_FragColor = Heat_Shader1617568560968_7_main();}\n`,
        vertexShader: ' precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\nvarying vec3 vNormal;\nvarying vec3 vPosition;\nvec4 Heat_Shader1617568560968_7_main() \n{\n    vec4 Heat_Shader1617568560968_7_gl_Position = vec4(0.0);\n    vNormal = normal;\n    vPosition = position;\n    Heat_Shader1617568560968_7_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    return Heat_Shader1617568560968_7_gl_Position *= 1.0;\n}\nvoid main() \n{\n    gl_Position = Heat_Shader1617568560968_7_main();}\n',
        uniforms: {
          vLightPosition: {
            value: {
              x: 1.7735564617706887,
              y: -0.5979016812627345,
              z: -0.7049901108913725
            },
            // @ts-ignore
            type: 'v3',
            glslType: 'vec3'
          },
          scale: {
            value: '1.2',
            // @ts-ignore
            type: 'f',
            glslType: 'float'
          },
          power: {
            value: '1.0',
            // @ts-ignore
            type: 'f',
            glslType: 'float'
          }
        },
        clipping: true,
        clippingPlanes: []
      }
    )
  }

  createShader2() {

    return new RawShaderMaterial(
      {
        fragmentShader: '#extension GL_OES_standard_derivatives : enable\n\nprecision highp float;\nuniform vec3 color;\nuniform float start;\nuniform float end;\nuniform float alpha;\nvarying vec3 fPosition;\nvarying vec3 fNormal;\nvec4 Transperent_Freshnel_FrontFacing1612775911511_132_main() \n{\n    vec4 Transperent_Freshnel_FrontFacing1612775911511_132_gl_FragColor = vec4(0.0);\n    if (!gl_FrontFacing) \n    {\n        discard;\n    }\n     vec3 normal = normalize(fNormal);\n    vec3 eye = normalize(-fPosition.xyz);\n    float rim = smoothstep(start, end, 1.0 - dot(normal, eye));\n    float value = clamp(rim, 0.0, 1.0) * alpha;\n    Transperent_Freshnel_FrontFacing1612775911511_132_gl_FragColor = vec4(value * color, length(value));\n    return Transperent_Freshnel_FrontFacing1612775911511_132_gl_FragColor *= 1.0;\n}\nvoid main() \n{\n    gl_FragColor = Transperent_Freshnel_FrontFacing1612775911511_132_main();}\n',
        vertexShader: 'precision highp float;\nuniform mat3 normalMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nvarying vec3 fNormal;\nvarying vec3 fPosition;\nvec4 Transperent_Freshnel_FrontFacing1612775911511_132_main() \n{\n    vec4 Transperent_Freshnel_FrontFacing1612775911511_132_gl_Position = vec4(0.0);\n    fNormal = normalize(normalMatrix * normal);\n    vec4 pos = modelViewMatrix * vec4(position, 1.0);\n    fPosition = pos.xyz;\n    Transperent_Freshnel_FrontFacing1612775911511_132_gl_Position = projectionMatrix * pos;\n    return Transperent_Freshnel_FrontFacing1612775911511_132_gl_Position *= 1.0;\n}\nvoid main() \n{\n    gl_Position = Transperent_Freshnel_FrontFacing1612775911511_132_main();}\n',
        uniforms: {
          start: {
            value: 0,
            // @ts-ignore
            type: 'f',
            glslType: 'float'
          },
          end: {
            value: '1',
            // @ts-ignore
            type: 'f',
            glslType: 'float'
          },
          alpha: {
            value: '1',
            // @ts-ignore
            type: 'f',
            glslType: 'float'
          },
          color: {
            value: {
              r: 1,
              g: 1,
              b: 1
            },
            // @ts-ignore
            type: 'c',
            glslType: 'vec3'
          }
        }
      }
    )
  }

  createShader3() {
    return new ShaderMaterial(
      {
        uniforms: {
          uTexture: {value: null},
          uDepth: {value: 55},
          uIntensity: {value: 1.0}
        },
        vertexShader: `
              uniform vec2 size;
              out vec2 vUv;

              void main() {

              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
              vUv.xy = position.xy / size + 0.5;
              vUv.y = 1.0 - vUv.y; // original data is upside down

              }
          `,
        fragmentShader: `
             precision highp float;
            precision highp int;
            precision highp sampler2DArray;

            uniform sampler2DArray diffuse;
            in vec2 vUv;
            uniform int depth;

            void main() {

            vec4 color = texture( diffuse, vec3( vUv, depth ) );

            // lighten a bit
            gl_FragColor = vec4( color.rrr * 1.5, 1.0 );
            }
            `,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        clipping: true,
        clippingPlanes: []
      });

  }

  createShader4() {
    return new ShaderMaterial({
      uniforms: {
        // @ts-ignore
        p: {type: 'f', value: 1},
      },
      vertexShader: `
             uniform float offset;
             void main() {
             vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );
             gl_Position = projectionMatrix * pos;
             }
          `,
      fragmentShader: `
            void main(){
            gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
            }
            `,
      depthWrite: false,
      clipping: true,
      clippingPlanes: []
    });
  }

  createShaderContour() {
    return new ShaderMaterial(
      {
        uniforms: {
          // @ts-ignore
          p: {type: 'f', value: 0.4},
          // @ts-ignore
          glowColor: {type: 'c', value: new THREE.Color(0x00ffd5)},
        },
        vertexShader: `
              uniform float p;
              varying float intensity;
              #include <clipping_planes_pars_vertex>
              void main()
              {
                  #include <begin_vertex>
                  vec3 vNormal = normalize( normalMatrix * normal );
                  intensity = pow(1.0 - abs(dot(vNormal, vec3(0, 0, 1))), p);
                  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                  #include <project_vertex>
                  #include <clipping_planes_vertex>
              }
          `,
        fragmentShader: `
             uniform vec3 glowColor;
              varying float intensity;
               #include <clipping_planes_pars_fragment>
              void main()
              {
              #include <clipping_planes_fragment>
                  vec3 glow = glowColor * intensity;
                  gl_FragColor = vec4( glow, 1 );
              }
            `,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        clipping: true,
        wireframe: true,
        clippingPlanes: []
      });
  }

  createBasicMaterialClone() {
    return new THREE.MeshBasicMaterial({
      color: 0xffa200,
      transparent : true,
      side: THREE.BackSide,
    });
  }
  createShaderClone() {
    return new ShaderMaterial(
      {
        uniforms: {
          // @ts-ignore
          p: {type: 'f', value: 0.44},
          // @ts-ignore
          glowColor: {type: 'c', value: new THREE.Color(0xFFFFFF)},
        },
        vertexShader: `
              uniform float p;
              varying float intensity;
              #include <clipping_planes_pars_vertex>
              void main()
              {
                  #include <begin_vertex>
                  vec3 vNormal = normalize( normalMatrix * normal );
                  intensity = pow(1.0 - abs(dot(vNormal, vec3(0, 0, 1))), p);
                  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                  #include <project_vertex>
                  #include <clipping_planes_vertex>
              }
          `,
        fragmentShader: `
             uniform vec3 glowColor;
              varying float intensity;
               #include <clipping_planes_pars_fragment>
              void main()
              {
              #include <clipping_planes_fragment>
                  vec3 glow = glowColor * intensity;
                  gl_FragColor = vec4( glow, 1 );
              }
            `,
        side: THREE.BackSide,
        blending: THREE.SubtractiveBlending,
        transparent: true,
        depthWrite: false,
      });
  }
}
