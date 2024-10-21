import { View, Text, Image } from "react-native";
import { images } from "@/constants";
import React from "react";

const Logo = ({size = 'large'}) => {
  
};
const SmallLogo = ({size = 'large'}) => {
    switch(size) {
        case 'large':
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
        case 'small':
            return (
                <View className="flex-row items-center -mr-5">
                  <Image
                    source={images.logo}
                    className="w-[60px] h-[60px]"
                    resizeMode="contain"
                  />
                </View>
              );
    }
  
};

export default SmallLogo;
