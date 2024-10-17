import {
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/ui/FormField";
import CustomButton from "@/components/ui/CustomButton";
import { Link } from "expo-router";
import Logo from "@/components/Logo";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
          <Logo />
          <Text className="text-2xl text-white font-agdbold mt-10 ">
            Sign up to Fan
          </Text>
          <FormField
            label="Username"
            value={form.username}
            handleChangeText={(e: string) => {
              setForm({ ...form, username: e });
            }}
            otherStyle="mt-7"
          />
          <FormField
            label="Email"
            value={form.email}
            handleChangeText={(e: string) => {
              setForm({ ...form, email: e });
            }}
            otherStyle="mt-7"
            keyboardType="email-address"
          />
          <FormField
            label="Password"
            value={form.password}
            handleChangeText={(e: string) => {
              setForm({ ...form, password: e });
            }}
            otherStyle="mt-7"
            keyboardType="password"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-agdregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-agdbold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
