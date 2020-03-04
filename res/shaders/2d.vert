#version 430 core

in layout(location = 0) vec3 position;
in layout(location = 1) vec3 normal_in;
in layout(location = 2) vec2 textureCoordinates_in;
uniform layout(location = 3) mat4 orthographic_matrix;
uniform layout(location = 4) vec3 node_position;

out layout(location = 0) vec3 normal_out;
out layout(location = 1) vec2 textureCoordinates_out;

void main()
{
    normal_out = normalize(normal_in);
    textureCoordinates_out = textureCoordinates_in;
    gl_Position = orthographic_matrix * vec4(node_position + position, 1.0f) ;
    // gl_Position = vec4(position, 1.0f) ;
}
