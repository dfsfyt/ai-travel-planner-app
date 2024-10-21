import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import FormField from "@/components/ui/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/ui/CustomButton";
import { router } from "expo-router";
import { CreateVideoFormProps } from "@/types/interface";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<CreateVideoFormProps>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
    userId: user?.$id
  });
  const openPicker = async (selectType: string) => {
    // const result = await DocumentPicker.getDocumentAsync({
    //   type: selectType === 'image' ? ['image/png', 'image/jpeg', 'image/jpg'] : ['video/mp4', 'video/gif']
    // })
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ?  ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1
    })
    if(!result.canceled) {
      if(selectType === 'image') {
        setForm({
          ...form,
          thumbnail: result.assets[0]
        })
      }
      if(selectType === 'video') {
        setForm({
          ...form,
          video: result.assets[0]
        })
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2))
      }, 100)
    }
  }
  const submit = async () => {
    if(!form.prompt || !form.thumbnail || !form.title || !form.video) {
      return Alert.alert('Please fill in all the fields')
    }
    setUploading(true);
    try {
      await createVideo({
        ...form
      })
      Alert.alert('Success', 'Post uploaded successfully')
      router.push('/home')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
        userId: user?.$id
      })
      setUploading(false);
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-xl text-white font-agdbold">Upload Video</Text>
        <FormField
          label="Video Title"
          value={form.title}
          placeholder="Give your video a catch file"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyle="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-agdregular">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form?.video ? (
              <Video
                source={{ uri: form.video?.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-agdregular">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form?.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail?.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                    source={icons.upload}
                    className="w-5 h-5"
                    resizeMode="contain"
                  />
                  <Text className="text-sm text-gray-100 font-agdregular">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          label="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyle="mt-7"
        />
        <CustomButton title="Submit & Publish" handlePress={submit} containerStyles="mt-7" isLoading={uploading} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
