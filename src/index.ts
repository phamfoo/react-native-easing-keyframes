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
    for (
      let keyframeIndex = 0;
      keyframeIndex < keyframes.length - 1;
      keyframeIndex++
    ) {
      const currentStepEndTime =
        (keyframes[keyframeIndex + 1] - keyframes[0]) /
        (keyframes[keyframes.length - 1] - keyframes[0])

      if (t < currentStepEndTime) {
        const currentStepStartTime =
          (keyframes[keyframeIndex] - keyframes[0]) /
          (keyframes[keyframes.length - 1] - keyframes[0])

        const currentStepDuration = currentStepEndTime - currentStepStartTime
        const currentRelativeRatio =
          (t - currentStepStartTime) / currentStepDuration

        const currentEasing =
          easingsByKeyframe[keyframes[keyframeIndex]] ?? easing

        return (
          currentStepStartTime +
          currentEasing(currentRelativeRatio) * currentStepDuration
        )
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
