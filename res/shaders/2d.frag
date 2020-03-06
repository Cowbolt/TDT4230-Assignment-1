#version 430 core

in layout(location = 0) vec3 normal;
in layout(location = 1) vec2 textureCoordinates;
layout(binding = 0) uniform sampler2D textSampler;

out vec4 color;

void main()
{
  color = texture(textSampler, textureCoordinates);
}
