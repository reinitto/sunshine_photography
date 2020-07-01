import React, { useEffect, useState } from "react";

function LazyBackground({ style, src, ...rest }) {
  let [imageSrc, setImageSrc] = useState();
  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = src;
    imageLoader.onload = () => {
      setImageSrc(src);
    };
  }, [src]);
  return (
    <div
      {...rest}
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        ...style,
      }}
    />
  );
}

export default LazyBackground;
