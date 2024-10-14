import { StyleSheet, View, Text } from "react-native";
import React, { useEffect } from "react";

const SignIn = () => {
  return (
    <View className="p-6 mt-16">
      <Text style={styles.title}>Let's Sign In</Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  title: {
    fontFamily: "roboto-bold",
    fontSize: 30,
  },
});
