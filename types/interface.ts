import { ImagePickerAsset } from "expo-image-picker";
type CreateVideoFormProps = {
  userId: string | undefined;
  title: string;
  video: ImagePickerAsset | null;
  thumbnail: ImagePickerAsset | null;
  prompt: string;
};

export { CreateVideoFormProps };
