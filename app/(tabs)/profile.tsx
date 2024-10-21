import { FlatList, Image, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { common, icons } from "@/constants";
import EmptyState from "@/components/ui/EmptyState";
import { getUserPosts, signOut } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/ui/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import InfoBox from "@/components/ui/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() =>
    getUserPosts(user?.$id as string)
  );
  const logout = async () => {
    await signOut()
    setUser && setUser(null)
    setIsLoggedIn && setIsLoggedIn(false)

    router.replace('/sign-in')
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }: any) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.users}
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="mt-5 flex-row ">
              <InfoBox
                title={posts?.length || 0}
                subtitle="Posts"
                containerStyles="mr-5"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found for this profile"
            btnName="Back to Explore"
            handlePress={() => router.push('/home')}
          />
        )}
      />
      <StatusBar backgroundColor={common.PRIMARY} style="light" />
    </SafeAreaView>
  );
};

export default Profile;
