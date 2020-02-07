import { EasingFunction, Easing } from 'react-native'

export interface Config {
  keyframes: number[]
  easing?: EasingFunction
  easingsByKeyframe?: { [key: number]: EasingFunction }
}

export default function keyframes({
  keyframes,
  easing = Easing.inOut(Easing.ease),
  easingsByKeyframe = {},
}: Config) {
  validateKeyframes(keyframes)

  return (t: number) => {
    const lastKeyframe = keyframes[keyframes.length - 1]
    for (
      let keyframeIndex = 1;
      keyframeIndex < keyframes.length;
      keyframeIndex++
    ) {
      if (t < keyframes[keyframeIndex] / lastKeyframe) {
        const prev = keyframes[keyframeIndex - 1] / lastKeyframe
        const current =
          (keyframes[keyframeIndex] - keyframes[keyframeIndex - 1]) /
          lastKeyframe
        const currentEasing =
          easingsByKeyframe[keyframes[keyframeIndex - 1]] || easing

        return prev + currentEasing((t - prev) / current) * current
      }
    }
    return t
  }
}

function validateKeyframes(keyframes: number[]) {
  if (keyframes.length < 3) {
    throw Error('keyframes must have at least 3 items')
  }

  for (let i = 0; i < keyframes.length; i++) {
    const currentKeyframe = keyframes[i]

    if (isNaN(currentKeyframe)) {
      throw Error('A keyframe value must be a number')
    }

    if (i > 0) {
      const prevKeyframe = keyframes[i - 1]
      if (currentKeyframe <= prevKeyframe) {
        throw Error('keyframes must be monotonically increasing ' + keyframes)
      }
    }
  }
}
