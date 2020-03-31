export const updateImageSrc = (journalImages, image_id_to_delete, id, src) => {
  let newJournalImages = [...journalImages];
  // find image by id
  newJournalImages.forEach(im => {
    if (im.variation === 1 && im.image0.id === id) {
      im.image0.src = src;
      im.image0.oldUrl = im.image0.oldUrl
        ? im.image0.oldUrl
        : image_id_to_delete;
    }
    if (im.variation === 2) {
      if (im.image0.id === id) {
        im.image0.src = src;
        im.image0.oldUrl = im.image0.oldUrl
          ? im.image0.oldUrl
          : image_id_to_delete;
      }
      if (im.image1.id === id) {
        im.image1.src = src;
        im.image1.oldUrl = im.image1.oldUrl
          ? im.image1.oldUrl
          : image_id_to_delete;
      }
    }
    if (im.variation === 3) {
      if (im.image0.id === id) {
        im.image0.src = src;
        im.image0.oldUrl = im.image0.oldUrl
          ? im.image0.oldUrl
          : image_id_to_delete;
      }
      if (im.image1.id === id) {
        im.image1.src = src;
        im.image1.oldUrl = im.image1.oldUrl
          ? im.image1.oldUrl
          : image_id_to_delete;
      }
      if (im.image2.id === id) {
        im.image2.src = src;
        im.image2.oldUrl = im.image2.oldUrl
          ? im.image2.oldUrl
          : image_id_to_delete;
      }
    }
  });

  return newJournalImages;
};

export default updateImageSrc;
