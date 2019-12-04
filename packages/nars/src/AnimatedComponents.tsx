import * as React from "react";
import { ViewStyle, TextStyle, AnimateProps } from "./StyleSheet";
import { Props as ViewProps } from "./View";
import { Props as ImageProps } from "./Image";
import { Props as TextProps } from "./Text";
import * as AnimatedViewGen from "./AnimatedView.gen";
import * as AnimatedTextGen from "./AnimatedText.gen";
import * as AnimatedImageGen from "./AnimatedImage.gen";

const AnimatedView = (AnimatedViewGen.name as unknown) as React.ComponentType<
  AnimatedViewGen.props
>;

const AnimatedText = (AnimatedTextGen.name as unknown) as React.ComponentType<
  AnimatedTextGen.props
>;

const AnimatedImage = (AnimatedImageGen.name as unknown) as React.ComponentType<
  AnimatedImageGen.props
>;

class InstanceCounter {
  private freed: Array<number> = [];
  private current: number = 1;
  next(): number {
    const value = this.freed.pop();
    if (value) {
      return value;
    } else {
      const id = this.current;
      this.current += 1;
      return id;
    }
  }
  free(id: number) {
    this.freed.push(id);
  }
}

const useIdGenerator = () => {
  const [idGenerator] = React.useState(() => new InstanceCounter());
  return () => idGenerator.next();
};

export const View = (props: AnimateProps<ViewStyle, ViewProps>) => {
  const idGenerator = useIdGenerator();
  return (
    <AnimatedView style={props.style} idGenerator={idGenerator}>
      {props.children}
    </AnimatedView>
  );
};

export const Text = (props: AnimateProps<TextStyle, TextProps>) => {
  const idGenerator = useIdGenerator();
  return (
    <AnimatedText style={props.style} idGenerator={idGenerator}>
      {props.children}
    </AnimatedText>
  );
};

export const Image = (
  props: AnimateProps<ViewStyle, ImageProps> & { source: string }
) => {
  const idGenerator = useIdGenerator();
  return (
    <AnimatedImage
      style={props.style}
      source={props.source}
      idGenerator={idGenerator}
    />
  );
};
