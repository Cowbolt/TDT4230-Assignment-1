#version 430 core

in layout(location = 0) vec3 normal;
in layout(location = 1) vec2 textureCoordinates;
in layout(location = 2) vec4 position;

uniform layout(location = 6) vec3 camera_pos;
uniform layout(location = 7) vec3 ball_pos;
uniform layout(location = 8) vec4 light0_pos;
uniform layout(location = 9) vec4 light1_pos;
uniform layout(location = 10) vec4 light2_pos;

out vec4 color;

float rand(vec2 co) { return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }
float dither(vec2 uv) { return (rand(uv)*2.0-1.0) / 256.0; }
vec3 reject (vec3 from, vec3 onto) { return from - onto*dot(from, onto)/dot(onto, onto); }
float ambient = 0.2;

// Attenuation
float light2_dist = distance(light2_pos, position);
float L = 1/(0.002+light2_dist*0.003+pow(light2_dist,2)*0.003);

vec3 light0_dir = normalize(vec3(light0_pos - position));
vec3 light1_dir = normalize(vec3(light1_pos - position));
vec3 light2_dir = normalize(vec3(light2_pos - position));

// Ball shadows
vec3 light0_vec = vec3(light0_pos - position);
vec3 light1_vec = vec3(light1_pos - position);
vec3 light2_vec = vec3(light2_pos - position);
vec3 ball_vec = ball_pos - position.xyz;
int light0_viz = 1;
int light1_viz = 1;
int light2_viz = 1;


float light0 = L * max(dot(light0_dir, normalize(normal)), 0);
float light1 = L * max(dot(light1_dir, normalize(normal)), 0);
float light2 = L * max(dot(light2_dir, normalize(normal)), 0);


vec3 light0_ref = reflect(-light0_dir, normalize(normal));
vec3 light1_ref = reflect(-light1_dir, normalize(normal));
vec3 light2_ref = reflect(-light2_dir, normalize(normal));
vec3 surf_eye = normalize(camera_pos - position.xyz);

int spec = 32;
vec3 light0_spec = vec3(1,1,1) * L * pow(max(dot(light0_ref, surf_eye), 0), spec);
vec3 light1_spec = vec3(1,1,1) * L * pow(max(dot(light1_ref, surf_eye), 0), spec);
vec3 light2_spec = vec3(1,1,1) * L * pow(max(dot(light2_ref, surf_eye), 0), spec);

void main()
{
  if ((length(reject(ball_vec, light0_vec)) <= 1.0) && (length(light0_vec) >= length(ball_vec)) && dot(ball_vec, light0_vec) >= 0)
  {
    light0_viz = 0;
  }

  if ((length(reject(ball_vec, light1_vec)) <= 1.0) && (length(light1_vec) >= length(ball_vec)) && dot(ball_vec, light1_vec) >= 0)
  {
    light1_viz = 0;
  }

  if ((length(reject(ball_vec, light2_vec)) <= 1.0) && (length(light2_vec) >= length(ball_vec)) && dot(ball_vec, light2_vec) >= 0)
  {
    light2_viz = 0;
  }
    // color = vec4(vec3(ambient + light0 + light1 + light2), 1);
    // color = vec4(vec3(ambient + light0 + light1 + light2 + light0_spec + light1_spec + light2_spec), 1);
    color = vec4(vec3(dither(textureCoordinates) + ambient +
          light0_viz*(light0 + light0_spec) +
          light1_viz*(light1 + light1_spec) +
          light2_viz*(light2 + light2_spec)
          ), 1);
}
