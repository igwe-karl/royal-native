// screens/HomeIntro.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { useAuth } from "../auth/authContext";

const { height } = Dimensions.get("window");

const SLIDES = [
  {
    image: require("../../assets/images/move1.png"),
    title: "Yout Go-To parcel Solution",
    subTitle: "+2,500 Successful delivery"

  },
  {
    image: require("../../assets/images/move2.png"),
    title: "Deliver Smarter, and Faster",
    subTitle: "Trusted by +2,500 Happy Customer"

  },
  {
    image: require("../../assets/images/move3.png"),
    title: "Fast and Reliable",
    subTitle: "Send and receive parcels anytime, anywhere"
  },
  {
    image: require("../../assets/images/move4.png"),
    title: "Welcome to Moveit!",
    subTitle: "Welcome to Moveit!",
  },
];

export default function HomeIntro() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { userToken } = useAuth(); // 👈 get token from context

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // 👇 Decide where to go
      if (userToken) {
        router.replace("/(tabs)/profile"); // user logged in
      } else {
        console.log(process.env.NEXT_PUBLIC_API_URL, "url env")

        router.replace("/screens/register"); // user not logged in
      }
    }
  };


  const handleLogin = () => {
    router.replace("/screens/login");
  };

  const handleSkip = () => {
    router.replace("/(tabs)/profile");
  };

  const progress = ((currentIndex + 1) / SLIDES.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <View style={styles.progressSkip}>
        <Pressable style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>

        {/* Progress Bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Background Image Section */}
      <ImageBackground
        source={SLIDES[currentIndex].image}
        style={styles.imageSection}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
      </ImageBackground>

      {/* Bottom Content */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>
          {SLIDES[currentIndex].title}
        </Text>

        <Text style={styles.subTitle}>
          {SLIDES[currentIndex].subTitle}
        </Text>

        <Button onPress={handleNext}>
          {currentIndex === SLIDES.length - 1
            ? "Get Started"
            : "Next"}
        </Button>
        <Button variant="ghost" onPress={handleLogin}>
          {currentIndex === SLIDES.length - 1
            ? "Already have an account? Sign in"
            : ""}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  progressSkip: {
    flex: 1,
    justifyContent: "space-between",

  },
  /* Skip */
  skipBtn: {
    position: "absolute",
    right: 24,
    top: 20,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748B",
  },

  /* Progress Bar */
  progressTrack: {
    height: 6,
    width: "90%",
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 60,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#7C3AED",
    borderRadius: 10,
  },

  /* Image Section */
  imageSection: {
    height: height * 0.6,
    width: "100%",
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)", // subtle dark overlay
  },

  /* Bottom */
  bottomSection: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    // paddingVertical: 30,
    marginBottom: 14,
    gap: 14,

  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    color: "#0F172A",
  },
});