# Surface

API documentation for the React Native Surface component. Learn about the available props.

## Import
 
```js
import { Surface } from "@react-native-material/core";
// or
import Surface from "@react-native-material/core/Surface";
```

## Props

```ts
interface SurfaceProps extends Omit<ViewProps, "style"> {
  category?: ShapeCategory;

  elevation?: Elevation;

  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
}

```
