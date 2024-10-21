import {
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { common } from "@/constants";
import Logo from "@/components/ui/Logo";
import SearchInput from "@/components/ui/SearchInput";
import Trending from "@/components/ui/Trending";
import EmptyState from "@/components/ui/EmptyState";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/ui/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";

const Home = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
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
            creator={item.creator}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-agdregular text-sm text-gray-100">
                  Welcome back,
                </Text>
                <Text className="text-xl font-agdbold text-white">{user?.username}</Text>
              </View>
              <Logo size="small" />
            </View>
            <SearchInput
              value=""
              placeholder="Search for a video topic"
              handleChangeText={() => {}}
            />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-agdregular mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to create a video"
            btnName="Create Video"
            handlePress={() => router.push('/create')}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
      <StatusBar backgroundColor={common.PRIMARY} style="light" />
    </SafeAreaView>
  );
};

export default Home;
