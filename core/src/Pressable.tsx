import React, { useCallback, useState } from "react";
import {
  Animated,
  Easing,
  GestureResponderEvent,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable as RNPressable,
  PressableProps as RNPressableProps,
  StyleSheet,
  TargetedEvent,
  View,
} from "react-native";
import chroma from "chroma-js";

export interface PressableProps extends RNPressableProps {
  pressEffect?: "none" | "highlight" | "ripple" | "android-ripple";

  pressEffectColor?: string;

  onMouseEnter?: () => void;

  onMouseLeave?: () => void;

  style?: any;
}

const Pressable: React.FC<PressableProps> = ({
  pressEffect = Platform.select({ android: "android-ripple", web: "ripple", default: "highlight" }),
  pressEffectColor = "black",
  onLayout,
  onPressIn,
  onPressOut,
  onFocus,
  onBlur,
  android_ripple,
  onMouseEnter,
  onMouseLeave,
  children,
  ...rest
}) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const [ripples, setRipples] = useState<{ key: string; style: any }[]>([]);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setSize({ width, height });
      onLayout?.(event);
    },
    [onLayout],
  );

  const [pressed, setPressed] = useState(false);

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      setPressed(true);
      onPressIn?.(event);

      if (pressEffect === "ripple") {
        const { locationX, locationY } = event.nativeEvent;

        const x = (locationX ?? size.width / 2) - 0.5;
        const y = (locationY ?? size.height / 2) - 0.5;

        const scale = new Animated.Value(0);
        const opacity = new Animated.Value(1);

        const ripple = {
          key: `${Date.now() + Math.random()}`,
          style: { start: x, top: y, transform: [{ scale }], opacity },
        };

        setRipples(prevState => [...prevState, ripple]);

        Animated.timing(scale, {
          toValue: Math.max(
            size.width * 1.25 + Math.abs(size.width / 2 - x) * 2,
            size.height * 1.25 + Math.abs(size.height / 2 - y) * 2,
          ),
          easing: Easing.out(Easing.ease),
          duration: 400,
          useNativeDriver: true,
        }).start();
      }
    },
    [onPressIn, pressEffect, size],
  );

  const handlePressOut = useCallback(
    (event: GestureResponderEvent) => {
      setPressed(false);
      onPressOut?.(event);

      if (pressEffect === "ripple") {
        Animated.timing(ripples[ripples.length - 1].style.opacity, {
          toValue: 0,
          easing: Easing.out(Easing.ease),
          duration: 400,
          useNativeDriver: false,
        }).start(() => {
          setRipples(prevState => prevState.slice(1));
        });
      }
    },
    [pressEffect, ripples, onPressOut],
  );

  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (event: NativeSyntheticEvent<TargetedEvent>) => {
      setFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: NativeSyntheticEvent<TargetedEvent>) => {
      setFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    onMouseEnter?.();
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    onMouseLeave?.();
  }, [onMouseLeave]);

  return (
    <RNPressable
      android_ripple={
        pressEffect === "android-ripple"
          ? android_ripple ?? { color: chroma(pressEffectColor).alpha(0.26).hex() }
          : undefined
      }
      onLayout={handleLayout}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...({ onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave } as any)}
      {...rest}
    >
      {hovered && !rest.disabled && (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: chroma(pressEffectColor).alpha(0.04).hex() }]} />
      )}

      {focused && !rest.disabled && (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: chroma(pressEffectColor).alpha(0.12).hex() }]} />
      )}

      {pressEffect === "highlight" && pressed && (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: chroma(pressEffectColor).alpha(0.26).hex() }]} />
      )}

      {pressEffect === "ripple" && ripples.length !== 0 && (
        <View style={[StyleSheet.absoluteFill, styles.effectContainer]}>
          {ripples.map(ripple => (
            <Animated.View
              key={ripple.key}
              style={[styles.ripple, { backgroundColor: chroma(pressEffectColor).alpha(0.1).hex() }, ripple.style]}
            />
          ))}
        </View>
      )}

      {children}
    </RNPressable>
  );
};

const styles = StyleSheet.create({
  effectContainer: {
    overflow: "hidden",
  },
  ripple: {
    position: "absolute",
    width: 1,
    height: 1,
    borderRadius: 0.5,
  },
});

export default Pressable;
