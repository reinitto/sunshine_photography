import React from "react";
import { Image, Transformation } from "cloudinary-react";
export const ProgressiveCloudinaryImage = (
  { publicId, style = {} },
  ...rest
) => {
  return (
    <Image
      dpr="auto"
      responsive
      width="auto"
      crop="scale"
      responsiveUseBreakpoints="true"
      publicId={publicId}
      secure="true"
      style={{
        width: "100%",
        ...style,
      }}
    >
      <Transformation flags="progressive:steep" fetchFormat="jpg" />
    </Image>
  );
};
