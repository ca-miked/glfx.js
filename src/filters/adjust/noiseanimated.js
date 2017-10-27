/**
 * @filter         Noise Animated
 * @description    Adds black and white noise to the image.
 * @param amount   0 to 1 (0 for no effect, 1 for maximum noise)
 * @param time     for animation
 */
function noiseAnimated(amount,time) {
    gl.noiseAnimated = gl.noiseAnimated || new Shader(null, '\
        uniform sampler2D texture;\
        uniform float amount;\
        uniform float time;\ 
        uniform vec3 resolution;\ 
        varying vec2 texCoord;\
        float rand(vec2 co) {\
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\
        }\
        void main() {\
            vec4 color = texture2D(texture, texCoord);\
            vec2 uv = texCoord.xy / resolution.xy;\
            uv.y = 1.0 - uv.y;\
            float strength = 16.0 * amount;\
            float x = (uv.x + 4.0 ) * (uv.y + 4.0 ) * (time * 10.0);\
            vec4 grain = vec4(mod((mod(x, 13.0) + 1.0) * (mod(x, 123.0) + 1.0), 0.01)-0.005) * strength;\
            grain = 1.0 - grain;\
            gl_FragColor = color * grain;\
        }\
    ');

    simpleShader.call(this, gl.noiseAnimated, {
        amount: clamp(0, amount, 1),
        time: time
    });

    return this;
}