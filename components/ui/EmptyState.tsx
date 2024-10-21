import { View, Image, Text } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle, btnName, handlePress }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl font-agdbold text-white text-center mt-2">{title}</Text>
      <Text className="font-agdregular text-sm text-gray-100">{subtitle}</Text>
      <CustomButton
        title={btnName}
        handlePress={handlePress}
        containerStyles="w-full my-5"
    />
    </View>
  );
};

export default EmptyState;
