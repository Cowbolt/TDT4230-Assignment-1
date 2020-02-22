#version 430 core

in layout(location = 0) vec3 normal;
in layout(location = 1) vec2 textureCoordinates;
in layout(location = 2) vec4 position;

uniform layout(location = 6) vec3 camera_pos;
uniform layout(location = 7) vec4 light0_pos;
uniform layout(location = 8) vec4 light1_pos;
uniform layout(location = 9) vec4 light2_pos;

out vec4 color;

float rand(vec2 co) { return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }
float dither(vec2 uv) { return (rand(uv)*2.0-1.0) / 256.0; }

vec3 light0_dir = normalize(vec3(light0_pos - position));
vec3 light1_dir = normalize(vec3(light1_pos - position));
vec3 light2_dir = normalize(vec3(light2_pos - position));

float light0 = 0.1 * max(dot(light0_dir, normalize(normal)), 0);
float light1 = 0.1 * max(dot(light1_dir, normalize(normal)), 0);
float light2 = 0.6 * max(dot(light2_dir, normalize(normal)), 0);

float ambient = 0.1;

vec3 light0_ref = reflect(-light0_dir, normalize(normal));
vec3 light1_ref = reflect(-light1_dir, normalize(normal));
vec3 light2_ref = reflect(-light2_dir, normalize(normal));
vec3 surf_eye = (camera_pos) - normalize(position.xyz);

int spec = 32;
vec3 light0_spec = vec3(1.0,0,0) * 0.5 * pow(max(dot(light0_ref, surf_eye), 0), spec);
vec3 light1_spec = vec3(0.0,1,0) * 0.5 * pow(max(dot(light1_ref, surf_eye), 0), spec);
vec3 light2_spec = vec3(0.0,0,1) * 0.5 * pow(max(dot(light2_ref, surf_eye), 0), spec);

void main()
{
    // color = vec4(vec3(ambient + light0 + light1 + light2), 1);
    color = vec4(vec3(ambient + light0 + light1 + light2 + light0_spec + light1_spec + light2_spec), 1);
}
