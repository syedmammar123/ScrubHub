import { Image, useWindowDimensions } from "react-native";

export function ScrubImage() {
  const { width } = useWindowDimensions();

  const imageSize = Math.min(width / 1.5, 400);
  // const imageSize = Math.min(width / 1.5, 400);

  return (
    <Image
      source={require("@/assets/getStartedImage1.png")}
      style={{ width: 250, height: 389 }}
    />
  );
}
