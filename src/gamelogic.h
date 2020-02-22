#pragma once

#include <utilities/window.hpp>
#include "sceneGraph.hpp"

void updateNodeTransformations(SceneNode* node, glm::mat4 transformationThusFar, glm::mat4 modelMatrix = glm::mat4(1.0));
void initGame(GLFWwindow* window, CommandLineOptions options);
void updateFrame(GLFWwindow* window);
void renderFrame(GLFWwindow* window);
