export const updateImages = (
  journalImages,
  journalId,
  idToken,
  realUrl,
  shortTitle,
  edit,
  increaseImagesUploaded
) => {
  let imageRequestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: {}
  };
  for (let imageSet of journalImages) {
    if (imageSet.variation === 1) {
      imageRequestOptions.body = JSON.stringify({
        image: {
          journalId,
          imageSrc: imageSet.image0.src,
          imageText: imageSet.image0.text,
          order: imageSet.order,
          variation: imageSet.variation,
          shortTitle,
          deleteUrl: imageSet.image0.oldUrl,
          editKey: journalId
        },
        edit
      });
      fetch(realUrl, imageRequestOptions).then(() => {
        increaseImagesUploaded();
      });
    }
    if (imageSet.variation === 2) {
      imageRequestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({
          image: {
            journalId,
            imageSrc: imageSet.image0.src,
            imageText: imageSet.image0.text,
            order: imageSet.order,
            variation: imageSet.variation,
            shortTitle,
            deleteUrl: imageSet.image0.oldUrl,
            editKey: journalId
          },
          edit
        })
      };
      fetch(realUrl, imageRequestOptions).then(() => {
        increaseImagesUploaded();
      });
      imageRequestOptions.body = JSON.stringify({
        image: {
          journalId,
          imageSrc: imageSet.image1.src,
          imageText: imageSet.image1.text,
          order: imageSet.order,
          variation: imageSet.variation,
          shortTitle,
          deleteUrl: imageSet.image1.oldUrl,
          editKey: journalId
        },
        edit
      });

      fetch(realUrl, imageRequestOptions).then(() => {
        increaseImagesUploaded();
      });
    }
    if (imageSet.variation === 3) {
      imageRequestOptions.body = JSON.stringify({
        image: {
          journalId,
          imageSrc: imageSet.image0.src,
          imageText: imageSet.image0.text,
          order: imageSet.order,
          variation: imageSet.variation,
          shortTitle,
          deleteUrl: imageSet.image0.oldUrl,
          editKey: journalId
        },
        edit
      });

      fetch(realUrl, imageRequestOptions).then(() => {
        increaseImagesUploaded();
      });

      imageRequestOptions.body = JSON.stringify({
        image: {
          journalId,
          imageSrc: imageSet.image1.src,
          imageText: imageSet.image1.text,
          order: imageSet.order,
          variation: imageSet.variation,
          shortTitle,
          deleteUrl: imageSet.image1.oldUrl,
          editKey: journalId
        },
        edit
      });

      fetch(realUrl, imageRequestOptions).then(() => {
        increaseImagesUploaded();
      });

      imageRequestOptions.body = JSON.stringify({
        image: {
          journalId,
          imageSrc: imageSet.image2.src,
          imageText: imageSet.image2.text,
          order: imageSet.order,
          variation: imageSet.variation,
          shortTitle,
          deleteUrl: imageSet.image2.oldUrl,
          editKey: journalId
        },
        edit
      });

      fetch(realUrl, imageRequestOptions).then(() => {
        increaseImagesUploaded();
      });
    }
    // UPLOAD TEXT BLOCK
    if (imageSet.variation === "text") {
      imageRequestOptions.body = JSON.stringify({
        text: { ...imageSet, editKey: journalId },
        edit
      });
      fetch(realUrl, imageRequestOptions).then(() => {});
    }
  }
};

export default updateImages;
