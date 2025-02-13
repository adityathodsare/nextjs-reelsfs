import mongoose, { Schema, model, models } from "mongoose";
import { title } from "process";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;
export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  transformations?: {
    height: number;
    width: number;
    quality?: number;
  };
}

const videoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    transformations: {
      height: {
        type: Number,
        default: VIDEO_DIMENSIONS.height,
      },
      width: {
        type: Number,
        default: VIDEO_DIMENSIONS.width,
      },
      quality: {
        type: Number,
        default: 100,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Video = models?.Video || model<IVideo>("Video", videoSchema);
export default Video;
