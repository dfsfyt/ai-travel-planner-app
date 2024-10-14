import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  return (
    <View>
      <Image source={require("../assets/images/bg.webp")} style={styles.img} />
      <View style={styles.container}>
        <Text style={styles.title}>AI Travel Planner</Text>
        <Text style={styles.desc}>
          Discover your next adventure effortlessly.Personalizeditineraries at
          your fingertips. Travel smarter with Al-driveninsights."
        </Text>
        <TouchableOpacity
          style={styles.btnWrap}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.btn} className="font-r">Get Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "100%",
    padding: 25,
  },
  img: {
    width: "100%",
    height: 500,
  },
  title: {
    fontSize: 28,
    fontFamily: "roboto-bold",
    textAlign: "center",
    marginTop: 10,
  },
  desc: {
    fontFamily: "roboto",
    fontSize: 18,
    textAlign: "center",
    color: Colors.GRAY,
    marginTop: 20,
  },
  btnWrap: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: "25%",
  },
  btn: {
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "roboto",
  },
});
