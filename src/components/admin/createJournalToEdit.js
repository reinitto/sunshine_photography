import { uuid } from "uuidv4";
export const createJournalToEdit = (journals, journalId) => {
  // find by journalId

  let journalToEdit = { ...journals[journalId] };
  let { shortTitle, title, titleUrl: titleImage } = journalToEdit.title;
  let journalImages = [];
  let orderedImages = [];
  if (journalToEdit.images && Object.keys(journalToEdit.images).length > 0) {
    Object.keys(journalToEdit.images).forEach(key =>
      journalImages.push(journalToEdit.images[key])
    );
    orderedImages = journalImages.sort((a, b) => (a.order > b.order ? 1 : -1));
  }
  let result = [];
  for (let i = 0; i < orderedImages.length; ) {
    let image = orderedImages[i];
    if (image.variation === 1) {
      let imageSet = {
        variation: image.variation,
        order: image.order,
        draggableId: uuid(),
        image0: {
          text: image.text,
          src: image.imageUrl,
          id: uuid()
        }
      };
      result.push(imageSet);
      i++;
      continue;
    }
    if (image.variation === 2) {
      let image1 = orderedImages[i + 1];
      let imageSet = {
        variation: image.variation,
        order: image.order,
        draggableId: uuid(),
        image0: {
          src: image.imageUrl,
          id: uuid()
        },
        image1: {
          src: image1.imageUrl,
          id: uuid()
        }
      };
      result.push(imageSet);
      i += 2;
      continue;
    }
    if (image.variation === 3) {
      let image1 = orderedImages[i + 1];
      let image2 = orderedImages[i + 2];

      let imageSet = {
        variation: image.variation,
        order: image.order,
        draggableId: uuid(),
        image0: {
          src: image.imageUrl,
          id: uuid()
        },
        image1: {
          src: image1.imageUrl,
          id: uuid()
        },
        image2: {
          src: image2.imageUrl,
          id: uuid()
        }
      };
      result.push(imageSet);
      i += 3;
      continue;
    }
    if (image.isTextBlock) {
      let imageSet = {
        ...image,
        variation: "text"
      };
      result.push(imageSet);
      i++;
    }
  }
  return {
    shortTitle,
    title,
    titleImage,
    journalImages: result,
    edit: true,
    editKey: journalId
  };
};

export default createJournalToEdit;
