import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { images } from "@/constants";
import CustomButton from "./ui/CustomButton";
import Logo from "./ui/Logo";

export default function Onboarding() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={{ height: "100%" }}>
      <View className="w-full justify-center h-full px-4">
        <Logo />
        <Image
          source={images.cards}
          className="max-w-[300px] w-full h-[300px]"
          resizeMode="contain"
        />
        <View className="relative mt-5">
          <Text className="text-3xl text-white font-bold text-center">
            Discover Endless Posibilities with{" "}
            <Text className="text-secondary-200">Fan</Text>
          </Text>
          <Image
            source={images.path}
            className="w-[70px] h-[15px] absolute -bottom-2 right-10"
            resizeMode="contain"
          />
        </View>

        <Text className="text-sm font-agdregular text-gray-100 mt-7 text-center">
          Where creativity meets innovtion: embark on a journey of limitless
          exploration with Fan
        </Text>
        <CustomButton
          title="Continue With Email"
          handlePress={() => {
            router.push("/sign-in")
          }}
          containerStyles="w-full mt-7"
        />
      </View>
      {/* <Image source={require("../assets/images/bg.webp")} className="w-full h-[500]" />
      <View className="bg-[#161622] -mt-5 rounded-t-3xl p-5 h-full">
        <Text className="text-3xl text-center mt-3 font-semibold text-white">AI Travel Planner</Text>
        <Text className="text-lg text-center text-slate-300 mt-5">
          Discover your next adventure effortlessly.Personalized itineraries at
          your fingertips. Travel smarter with Al-driveninsights."
        </Text>
        <TouchableOpacity
          className="p-4 rounded-lg mt-[20%] bg-gradient-to-r from-[#FF8C00] to-[#FFA300]"
          onPress={() => router.push('/sign-in')}
        >
          <Text className="text-lg text-center text-white font-semibold">Get Start</Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
}
