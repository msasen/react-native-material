# Text

Use text to present your design and content as clearly and efficiently as possible.

```js with-preview
import React from "react";
import { ScrollView } from "react-native";
import { Text } from "@react-native-material/core";

export default function App() {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      <Text variant="h1" style={{ marginTop: 16 }}>
        h1. Heading
      </Text>
      <Text variant="h2" style={{ marginTop: 16 }}>
        h2. Heading
      </Text>
      <Text variant="h3" style={{ marginTop: 16 }}>
        h3. Heading
      </Text>
      <Text variant="h4" style={{ marginTop: 16 }}>
        h4. Heading
      </Text>
      <Text variant="h5" style={{ marginTop: 16 }}>
        h5. Heading
      </Text>
      <Text variant="h6" style={{ marginTop: 16 }}>
        h6. Heading
      </Text>
      <Text variant="subtitle1" style={{ marginTop: 16 }}>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </Text>
      <Text variant="subtitle2" style={{ marginTop: 16 }}>
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </Text>
      <Text variant="body1" style={{ marginTop: 16 }}>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam
        beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.
      </Text>
      <Text variant="body2" style={{ marginTop: 16 }}>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam
        beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.
      </Text>
      <Text variant="button" style={{ marginTop: 16 }}>
        BUTTON TEXT
      </Text>
      <Text variant="caption" style={{ marginTop: 16 }}>
        caption text
      </Text>
      <Text variant="overline" style={{ marginTop: 16 }}>
        overline text
      </Text>
    </ScrollView>
  );
}
```

Too many type sizes and styles at once can spoil any layout.
A [typographic scale](https://material.io/design/typography/the-type-system.html#type-scale) has a limited set of type
sizes that work well together along with the layout grid.

[`💬 Feedback`](https://github.com/yamankatby/react-native-material/labels/component%3A%20Text)
[`🎨 Material Design`](https://material.io/design/typography/the-type-system.html)

## Variant

```js with-preview
import React from "react";
import { Text } from "@react-native-material/core";

export default function App() {
  return <Text variant="h3">Hi, text!</Text>;
}
```