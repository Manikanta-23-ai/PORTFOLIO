import React from 'react';
import {
  AnimatedNeuralSculpture,
  AnimatedNeuralSculptureProps,
  NeuralMode,
} from './AnimatedNeuralSculpture';

export type { NeuralMode };

export const ThreeDHero: React.FC<AnimatedNeuralSculptureProps> = (props) => {
  return <AnimatedNeuralSculpture {...props} />;
};
