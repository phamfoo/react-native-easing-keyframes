# React Native Easing Keyframes

Create CSS keyframe-based animations in React Native

## Installation

```sh
yarn add react-native-easing-keyframes
```

or

```sh
npm install react-native-easing-keyframes
```

## Why do I need this?

Usually in [timing](https://facebook.github.io/react-native/docs/animated#timing) animations, the easing function is applied to the entire duration of the animation. With the `keyframes` helper from this library, you can control what easing function to use in each keyframe during the animation.

```js
import keyframes from 'react-native-easing-keyframes'

const easeInOut = Easing.bezier(0.42, 0.0, 0.58, 1.0)

const value = new Animated.Value(0)
Animated.timing(value, {
  duration: 1200,
  toValue: 100,
  easing: keyframes({ easing: easeInOut, keyframes: [0, 50, 100] }),
  useNativeDriver: true,
})
```

In the example above, `keyframes` will apply the easing function you want to use (`easeInOut`) to each keyframe, so `easeInOut` will be applied twice, from 0 to 50 and from 50 to 100.

You can also target a specific keyframe and apply a different easing function to it.

```js
Animated.timing(value, {
  duration: 1200,
  toValue: 100,
  easing: keyframes({
    easing: easeInOut,
    keyframes: [0, 50, 100],
    easingsByKeyframe: { 50: Easing.linear },
  }),
  useNativeDriver: true,
})
```

## API

### keyframes

> `(config: Config) => EasingFunction`

This function applies an easing function to each keyframe based on a config.

### Config

An object that contains:

#### keyframes

> `number[]`

And array of keyframes used in the animation.

This array must have at least 3 items. If you're animating from `0` to `100` then the first one should be `0` and the last one should be `100`.

#### easing

> `(value: number) => number` | default to Easing.inOut(Easing.ease)

The default easing function that will be used in all keyframes.

#### easingsByKeyframe

> `{ [key: number]: EasingFunction }` | defaults to {}

You can specify the easing function you want to use for an individual keyframe. If no `easing function` is specified, the value from `easing` will be used.

## Example

To run the example project, follow these steps:

- Clone the repo
- Run these commands

```sh
yarn
cd example
yarn && yarn start
```
