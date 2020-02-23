#version 430 core

struct Light {
  vec3 position;
  vec3 color;
};

uniform Light lightArray[3];

in layout(location = 0) vec3 normal;
in layout(location = 1) vec2 textureCoordinates;
in layout(location = 2) vec4 position;

uniform layout(location = 6) vec3 camera_pos;
uniform layout(location = 7) vec3 ball_pos;
uniform layout(location = 8) vec4 light0_pos;
uniform layout(location = 9) vec4 light1_pos;
uniform layout(location = 10) vec4 light2_pos;

out vec4 color;

vec3 surf_eye = normalize(camera_pos - position.xyz);
vec3 ball_vec = ball_pos - position.xyz;
int spec = 32;
float ambient = 0.1;


float rand(vec2 co) { return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }
float dither(vec2 uv) { return (rand(uv)*2.0-1.0) / 256.0; }
vec3 reject (vec3 from, vec3 onto) { return from - onto*dot(from, onto)/dot(onto, onto); }

vec3 light = vec3(0,0,0);
void main()
{

  for (int i = 0; i < 3; i++)
  {
    vec3 vec = lightArray[i].position - position.xyz;
      float dist = distance(lightArray[i].position, position.xyz);
      float L = 1/(0.002+dist*0.001+pow(dist,2)*0.004);
      vec3 dir = normalize(vec);
      vec3 ref = reflect(-dir, normalize(normal));

    if ((length(reject(ball_vec, vec)) > 3.0) || (length(vec) < length(ball_vec)) || dot(ball_vec, vec) < 0)
    {
      // Diffuse
      light += lightArray[i].color * L * max(dot(dir, normalize(normal)), 0);
      // Specular
      light += lightArray[i].color * L * pow(max(dot(ref, surf_eye), 0), spec);
    }
    else {
      // Diffuse
      light += length(reject(ball_vec,vec))/3 * lightArray[i].color * L * max(dot(dir, normalize(normal)), 0);
      // Specular
      light += length(reject(ball_vec,vec))/3 * lightArray[i].color * L * pow(max(dot(ref, surf_eye), 0), spec);
    }
  }

  color = vec4(vec3(dither(textureCoordinates) + ambient + light), 1);
}
