"use client";

import Image from "next/image";
import React from "react";

type ErrorImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export const ErrorImage = ({
  src,
  alt,
  width,
  height,
  className,
}: ErrorImageProps) => {
 const [error, setError] = React.useState(false);
  return (
    <Image
      src={error ? "/images/error-image.avif" : src}
      alt={alt}
      onError={() => setError(true)}
      width={width}
      height={height}
      className={className}
    />
  );
};
