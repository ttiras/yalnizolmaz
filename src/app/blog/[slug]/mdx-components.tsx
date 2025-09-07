import { Illustration } from "@/components/Illustration";
import { OptimizedVideo } from "@/components/OptimizedVideo";
import { YouTube } from "@/components/YouTube";
import Image, { ImageProps } from "next/image";

type MDXImgProps = Omit<ImageProps, "src"> & { src: string };

export const mdxComponents = {
  Illustration,
  OptimizedVideo,
  YouTube,
  img: (props: MDXImgProps) => (
    <Image
      {...props}
      alt={props.alt || ""}
      width={props.width || 1600}
      height={props.height || 900}
    />
  ),
};
