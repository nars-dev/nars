/**
 * @format
 */

import * as React from "react";
import {
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
  Header,
  LearnMoreLinks,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";
import * as Colors from "./Colors";
import ExampleScreen from "./ExampleScreen";
import Form from "./Form";
import Feed from "./Feed";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    overflow: "visible"
  },
  logo: {
    paddingLeft: 18,
    color: Colors.dark,
    fontFamily: "Fira Code",
    fontSize: 30,
    fontWeight: "600"
  },
  appName: {
    paddingLeft: 18,
    color: Colors.dark,
    fontFamily: "Fira Code",
    fontSize: 16,
    fontWeight: "normal"
  },
  carouselContentContainer: {
    alignItems: "center"
  },
  carouselCustomStyle: {
    overflow: "visible"
  },
  exampleCard: {
    height: 366,
    width: 225,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomColorsContainer: { flexDirection: "row", width: "100%", height: 22 },
  bottomColors: { width: "20%", height: "100%" },
  exampleCardText: {
    color: Colors.offWhite,
    fontSize: 20,
    fontFamily: "Fira Code",
    fontWeight: "600"
  }
});

const BottomColors = () => (
  <View style={styles.bottomColorsContainer}>
    {[
      Colors.darkGreen,
      Colors.green,
      Colors.lightGreen,
      Colors.yellow,
      Colors.orange
    ].map(color => (
      <View
        key={color}
        style={[{ backgroundColor: color }, styles.bottomColors]}
      />
    ))}
  </View>
);

const { width: screenWidth } = Dimensions.get("window");

interface Example {
  primaryColor: string;
  name: string;
  render: (animationProgress: Animated.Node<number>) => React.ReactElement;
}

const ExampleCards = ({ renderExampleCard }) => {
  const examples: Example[] = [Form, Feed];
  return (
    <Carousel
      containerCustomStyle={styles.carouselCustomStyle}
      contentContainerCustomStyle={styles.carouselContentContainer}
      activeSlideAlignment={"center"}
      sliderWidth={screenWidth}
      sliderHeight={screenWidth}
      itemWidth={225}
      data={examples}
      renderItem={renderExampleCard}
    />
  );
};

type Rect = {
  x: Animated.Value<number>;
  y: Animated.Value<number>;
  width: Animated.Value<number>;
  height: Animated.Value<number>;
};

type Animation = {
  progress: Animated.Value<number>;
  cardDimensions: Rect;
  targetDimensions: Rect;
};

const {
  cond,
  and,
  neq,
  startClock,
  timing,
  set,
  not,
  stopClock,
  Value,
  clockRunning,
  divide,
  sub,
  block,
  multiply,
  max,
  add,
  interpolate,
  eq,
  call
} = Animated;

export const createTimingState = () => ({
  finished: new Value(0),
  position: new Value(0),
  time: new Value(0),
  frameTime: new Value(0)
});

const runAnimation = (
  clock: Animated.Clock,
  toViewMeasured: Animated.Value<0 | 1>,
  fromViewMeasured: Animated.Value<0 | 1>,
  selectedExample: Animated.Value<number>,
  onCloseAnimationEnd: () => void
) => {
  const config = {
    duration: 300,
    toValue: new Animated.Value(0),
    easing: Easing.inOut(Easing.ease)
  };
  const state = createTimingState();
  const prevSelectedExample = new Animated.Value(0);
  return block([
    cond(
      and(
        and(eq(toViewMeasured, 1), eq(fromViewMeasured, 1)),
        and(not(clockRunning(clock)), neq(prevSelectedExample, selectedExample))
      ),
      [
        cond(
          eq(selectedExample, 1),
          [set(state.position, 0), set(config.toValue, 1)],
          [set(state.position, 1), set(config.toValue, 0)]
        ),
        startClock(clock)
      ]
    ),
    timing(clock, state, config),
    cond(state.finished, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(prevSelectedExample, selectedExample),
      stopClock(clock),
      cond(eq(selectedExample, 0), [
        set(toViewMeasured, 0),
        set(fromViewMeasured, 0),
        call([], onCloseAnimationEnd)
      ])
    ]),
    state.position
  ]);
};

const createRect = (): Rect => ({
  x: new Animated.Value(0),
  y: new Animated.Value(0),
  height: new Animated.Value(0),
  width: new Animated.Value(0)
});

const centerHorizontal = (rect: Rect) => add(rect.x, divide(rect.width, 2));
const centerVertical = (rect: Rect) => add(rect.y, divide(rect.height, 2));

const App = () => {
  const [selectedExample, setSelectedExample] = React.useState<null | Example>(
    null
  );
  const [
    [
      toViewMeasured,
      fromViewMeasured,
      selectedExampleValue,
      clock,
      screen,
      card
    ],
    _
  ] = React.useState(() => [
    new Animated.Value(0) as Animated.Value<0 | 1>,
    new Animated.Value(0) as Animated.Value<0 | 1>,
    new Animated.Value(0) as Animated.Value<number>,
    new Animated.Clock(),
    createRect(),
    createRect()
  ]);
  const [
    [fromScreenAnimationProgress, toScreenAnimationProgress]
  ] = React.useState(() => {
    const animationProgress = runAnimation(
      clock,
      toViewMeasured,
      fromViewMeasured,
      selectedExampleValue,
      () => setSelectedExample(null)
    );
    return [
      interpolate(animationProgress, {
        inputRange: [0, 0.7],
        outputRange: [0, 1]
      }),
      interpolate(animationProgress, {
        inputRange: [0.7, 1],
        outputRange: [0, 1]
      })
    ];
  });

  const [selectedCardStyle, ___] = React.useState(() => ({
    transform: [
      {
        translateX: multiply(
          sub(centerHorizontal(screen), centerHorizontal(card)),
          fromScreenAnimationProgress
        ),
        translateY: multiply(
          sub(centerVertical(screen), centerVertical(card)),
          fromScreenAnimationProgress
        ),
        scale: add(
          1,
          multiply(
            sub(
              max(
                divide(screen.width, card.width),
                divide(screen.height, card.height)
              ),
              1
            ),
            fromScreenAnimationProgress
          )
        )
      }
    ]
  }));

  React.useEffect(() => {
    selectedExampleValue.setValue(selectedExample ? 1 : 0);
  }, [selectedExample]);

  const renderExampleCard = ({ item }: { item: Example }) => {
    const fromViewRef: React.RefObject<View> = React.createRef();
    const isActiveCard = selectedExample && item.name === selectedExample.name;
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          fromViewRef.current &&
          fromViewRef.current.measureInWindow((x, y, width, height) => {
            card.x.setValue(x);
            card.y.setValue(y);
            card.width.setValue(width);
            card.height.setValue(height);
            fromViewMeasured.setValue(1);
            setSelectedExample(item);
          })
        }
      >
        <View key={item.name} ref={fromViewRef}>
          <Animated.View
            style={[
              {
                backgroundColor: item.primaryColor
              },
              isActiveCard ? selectedCardStyle : {},
              selectedExample && !isActiveCard
                ? { opacity: sub(1, fromScreenAnimationProgress) }
                : {},
              styles.exampleCard
            ]}
          >
            <Animated.Text
              style={[
                isActiveCard
                  ? { opacity: sub(1, fromScreenAnimationProgress) }
                  : {},
                styles.exampleCardText
              ]}
            >
              {item.name}
            </Animated.Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.background}>
        <Text style={styles.logo}>{"nars"}</Text>
        <Text style={styles.appName}>{"examples.app"}</Text>
        <ExampleCards renderExampleCard={renderExampleCard} />
      </SafeAreaView>
      {selectedExample ? (
        <ExampleScreen
          onLayout={(x, y, width, height) => {
            screen.x.setValue(x);
            screen.y.setValue(y);
            screen.width.setValue(width);
            screen.height.setValue(height);
            toViewMeasured.setValue(1);
          }}
          onClose={() => {
            selectedExampleValue.setValue(0);
          }}
          name={selectedExample.name}
          animationProgress={toScreenAnimationProgress}
        >
          {selectedExample.render(toScreenAnimationProgress)}
        </ExampleScreen>
      ) : null}
      <BottomColors />
    </React.Fragment>
  );
};

export default App;
