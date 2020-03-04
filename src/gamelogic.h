#pragma once

#include <utilities/window.hpp>
#include "sceneGraph.hpp"
#include "utilities/imageLoader.hpp"
#include <utilities/mesh.h>

void updateNodeTransformations(SceneNode* node, glm::mat4 transformationThusFar, glm::mat4 modelMatrix = glm::mat4(1.0));
void initGame(GLFWwindow* window, CommandLineOptions options);
void updateFrame(GLFWwindow* window);
void renderFrame(GLFWwindow* window);
unsigned int genTexture(PNGImage img);
Mesh setupTextbuffer(std::string text);
void renderText(SceneNode* textNode);
void updateScoreText();
