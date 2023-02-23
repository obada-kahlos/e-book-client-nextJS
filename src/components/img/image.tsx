import Image from "next/image";
import React from "react";

interface imageProps {
  src: string;
  alt: string;
}

const ImageComponent: React.FC<imageProps> = (props) => {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      width={300}
      height={300}
      quality={100}
      placeholder={"blur"}
      className="w-[100%] h-[400px]"
      loading="lazy"
      blurDataURL={"https://picsum.photos/id/870/200/300?grayscale&blur=2"}
    />
  );
};

export default ImageComponent;
