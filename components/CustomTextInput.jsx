import { TextInput } from "react-native";
import React from "react";

const CustomTextInput = ({ style, className, ...props }) => {
  return (
    <TextInput
      {...props}
      style={[{ fontFamily: "Poppins-Regular" }, style]}
      className={`${className}`}
    />
  );
};

export default CustomTextInput;
