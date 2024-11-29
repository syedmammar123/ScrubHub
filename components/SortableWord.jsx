import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  useDerivedValue,
} from "react-native-reanimated";

import Placeholder, { MARGIN_TOP, MARGIN_LEFT } from "@/components/Placeholder";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { between, useVector } from "react-native-redash";
import { calculateLayout, lastOrder, remove, reorder } from "./Layout";

const SortableWord = ({ offsets, index, children, containerWidth }) => {
  const offset = offsets[index];
  const isGestureActive = useSharedValue(false);
  const translation = useVector();
  const isInBank = useDerivedValue(() => offset.order.value === -1);
  const temptranslateX = useSharedValue(0);
  const temptranslateY = useSharedValue(0);

  const gestureEvent = Gesture.Pan()
    .onStart(() => {
      if (isInBank.value) {
        translation.x.value = offset.originalX.value - MARGIN_LEFT;
        translation.y.value = offset.originalY.value + MARGIN_TOP;
      } else {
        translation.x.value = offset.x.value;
        translation.y.value = offset.y.value;
      }
      temptranslateX.value = translation.x.value;
      temptranslateY.value = translation.y.value;
      isGestureActive.value = true;
    })
    .onUpdate(({ translationX, translationY }) => {
      translation.x.value = temptranslateX.value + translationX;
      translation.y.value = temptranslateY.value + translationY;

      if (
        isInBank.value &&
        translation.y.value < 100 &&
        translation.y.value >= 0
      ) {
        console.log("YES");
        offset.order.value = -1;
        console.log("IN BETWEENTraslation x", translation.x.value);
        console.log("Traslation y", translation.y.value);
        // console.log("==================================");

        // offset.order.value = lastOrder(offsets);
        // calculateLayout(offsets, containerWidth);
      } else if (
        isInBank.value &&
        translation.y.value < 100 &&
        translation.y.value < 0
      ) {
        console.log("OUT OF BOUNDTraslation x", translation.x.value);
        console.log("Traslation y", translation.y.value);
        console.log("==================================");

        offset.order.value = lastOrder(offsets);
        calculateLayout(offsets, containerWidth);
      } else if (!isInBank.value && translation.y.value > 100) {
        offset.order.value = -1;
        remove(offsets, index);
        calculateLayout(offsets, containerWidth);
      }

      for (let i = 0; i < offsets.length; i++) {
        const o = offsets[i];
        if (i === index && o.order.value !== -1) {
          continue;
        }
        if (
          between(translation.x.value, o.x.value, o.x.value + o.width.value) &&
          between(translation.y.value, o.y.value, o.y.value + o.height.value)
        ) {
          reorder(offsets, offset.order.value, o.order.value);
          calculateLayout(offsets, containerWidth);
          break;
        }
      }
    })
    .onEnd(() => {
      isGestureActive.value = false;
      console.log("ON END====Traslation x", translation.x.value);
      console.log("Traslation y", translation.y.value);
      console.log("==================================");
    });

  const translateX = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.x.value;
    }
    return withSpring(
      isInBank.value ? offset.originalX.value - MARGIN_LEFT : offset.x.value,
    );
  });

  const translateY = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.y.value;
    }
    return withSpring(
      isInBank.value ? offset.originalY.value + MARGIN_TOP : offset.y.value,
    );
  });
  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: isGestureActive.value ? 100 : 0,
      width: offset.width.value,
      height: offset.height.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <>
      <Placeholder offset={offset} />
      <GestureDetector gesture={gestureEvent}>
        <Animated.View style={style}>
          <Animated.View style={StyleSheet.absoluteFill}>
            {children}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </>
  );
};

export default SortableWord;

// import React, { ReactElement } from "react";
// import { StyleSheet } from "react-native";
// import Animated, {
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   useDerivedValue,
// } from "react-native-reanimated";

// import Placeholder, { MARGIN_TOP, MARGIN_LEFT } from "@/components/Placeholder";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import { useVector } from "react-native-redash";

// const SortableWord = ({ offsets, index, children, containerWidth }) => {
//   const offset = offsets[index];
//   const isGestureActive = useSharedValue(false);
//   const translation = useVector();
//   const isInBank = useDerivedValue(() => offset.order.value === -1);

//   const gestureEvent = Gesture.Pan()
//     .onBegin((_, ctx) => {
//       isGestureActive.value = true;
//       if (isInBank.value) {
//         ctx.x = offset.originalX.value;
//         ctx.y = offset.originalY.value;
//       } else {
//         ctx.x = offset.x.value;
//         ctx.y = offset.y.value;
//       }
//     })
//     .onUpdate(({ translationX, translationY }, ctx) => {
//       translation.x.value = ctx.x + translationX;
//       translation.y.value = ctx.y + translationY;
//     })
//     .onEnd(() => {
//       isGestureActive.value = false;
//     });

//   const translateX = useDerivedValue(() => {
//     if (isGestureActive.value) {
//       return translation.x.value;
//     }
//     if (isInBank.value) {
//       return offset.originalX.value - MARGIN_LEFT;
//     }

//     return offset.x.value;
//   });

//   const translateY = useDerivedValue(() => {
//     if (isGestureActive.value) {
//       return translation.y.value;
//     }
//     if (isInBank.value) {
//       return offset.originalY.value + MARGIN_TOP;
//     }
//     return offset.y.value;
//   });
//   const style = useAnimatedStyle(() => {
//     return {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: offset.width.value,
//       height: offset.height.value,
//       transform: [
//         { translateX: translateX.value },
//         { translateY: translateY.value },
//       ],
//     };
//   });

//   return (
//     <>
//       <Placeholder offset={offset} />
//       <Animated.View style={style}>
//         <GestureDetector gesture={gestureEvent}>
//           <Animated.View style={StyleSheet.absoluteFill}>
//             {children}
//           </Animated.View>
//         </GestureDetector>
//       </Animated.View>
//     </>
//   );
// };

// export default SortableWord;
