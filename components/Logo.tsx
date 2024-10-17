import { View, Text, Image } from "react-native";
import { images } from "@/constants";
import React from "react";

const Logo = () => {
  return (
    <View className="flex-row items-center -ml-5 -mb-5">
      <Image
        source={images.logo}
        className="w-[100px] h-[100px]"
        resizeMode="contain"
      />
      <Text className="font-agdbold text-white text-5xl -ml-6 mt-4">Fan</Text>
    </View>
  );
};

export default Logo;
