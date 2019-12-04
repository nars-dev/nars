import React from "react";
import { View, Animated } from "nars";

const {
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  debug,
  stopClock,
  block,
  concat,
  add,
} = Animated;

function runTiming(
  clock: Animated.Clock,
  value: Animated.Value<number>,
  dest: Animated.Value<number>
) {
  const state = {
    finished: new Value(0),
    position: value,
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 200,
    toValue: dest,
    /* Easing should return Animated.Node, that's why we have the noop add */
    easing: (x: Animated.Adaptable<number>) => add(x, 0),
  };

  return block([
    cond(clockRunning(clock), 0, [
      // If the clock isn't running we reset all the animation params and start the clock
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug("stop clock", stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ]);
}

type Props = {
  height: number;
};

const ProgressBar = (props: Props) => {
  const progressValue = 1;
  const [animation] = React.useState(() => new Value<number>(0));
  const [transX] = React.useState(() => {
    const clock = new Animated.Clock();
    const progress = new Value(0);
    const transX = runTiming(clock, progress, animation);
    return transX;
  });
  React.useEffect(() => {
    animation.setValue(100);
  }, [progressValue]);

  const progressStyle = {
    width: concat(transX, "%"),
    backgroundColor: "white",
    height: props.height,
    borderRadius: 2,
  };
  return (
    <View
      style={[
        {
          backgroundColor: "red",
          width: 100,
          height: 30,
        },
      ]}
    >
      <Animated.View style={progressStyle} />
    </View>
  );
};

export default ProgressBar;
