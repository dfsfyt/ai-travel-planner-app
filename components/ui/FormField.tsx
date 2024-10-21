import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { styled } from "nativewind";
import { icons, images } from "@/constants";
interface FormFieldProp {
  label: string;
  value: string;
  placeholder?: string;
  handleChangeText: (e: string) => void;
  otherStyle?: string;
  keyboardType?: string;
  [x: string]: unknown;
}
const FormField = ({
  label,
  value,
  placeholder,
  handleChangeText,
  otherStyle,
  ...props
}: FormFieldProp) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className="text-base text-gray-100 font-agdregular">{label}</Text>
      <View className="border-2 border-primary w-full h-16 px-4 bg-black-100 rounded-xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-semibold text-base items-center"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={label === "Password" && !showPassword}
        />

        {
            label === 'Password' ? 
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain" />
            </TouchableOpacity> : null
        }
      </View>
    </View>
  );
};

export default FormField;
