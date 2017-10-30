/**
 * @filter         Noise Animated
 * @description    Adds black and white noise to the image.
 * @param amount   0 to 1 (0 for no effect, 1 for maximum noise)
 * @param time     for animation
 */
function noiseAnimated(amount,randNum) {
    
    /*
    vec2 uv = texCoord;\
    float strength = 16. * amount;\
    float x = (uv.x + 4.0 ) * (uv.y + 4.0 ) + time * 0.1;\
    vec4 grain = vec4(mod((mod(x, 13.0) + 1.0) * (mod(x, 123.0) + 1.0), 0.01)-0.005) * strength;\
    
    color.r += diff;\
    color.g += diff;\
    color.b += diff;\
    */

    gl.noiseAnimated = gl.noiseAnimated || new Shader(null, '\
        uniform sampler2D texture;\
        uniform float amount;\
        uniform float time;\
        varying vec2 texCoord;\
        uniform vec2 texSize;\
        float rand(vec2 co) {\
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\
        }\
        void main() {\
            vec4 color = texture2D(texture, texCoord);\
            float seed = (rand(texCoord) - 0.5 + time);\
            float strength = 50.0 * amount;\
            vec4 grain = vec4(mod((mod(seed, 13.0) + 1.0) * (mod(seed, 123.0) + 1.0), 0.01)-0.005) * strength;\
            \
            gl_FragColor = color - grain;\
        }\
    ');

    simpleShader.call(this, gl.noiseAnimated, {
        amount: clamp(0, amount, 1),
        time: typeof randNum !== 'undefined' ? parseFloat(randNum) || 0 :  1000 * Math.random(),
        texSize: [this.width, this.height]
    });

    return this;
}