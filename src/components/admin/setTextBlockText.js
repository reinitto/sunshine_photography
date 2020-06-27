export const setTextBlockText = (
  journalImages,
  id,
  text,
  title = false,
  language
) => {
  let index = 0;
  let newjournalImages = [...journalImages];
  let block = newjournalImages.filter((imageSet, i) => {
    if (imageSet.variation === "text" && imageSet.id === id) {
      index = i;
    }
    return imageSet.variation === "text" && imageSet.id === id;
  });
  if (title) {
    // SET TITLE TEXT
    block[0].title[language] = text;
    newjournalImages.splice(index, 1, block[0]);

    return newjournalImages;
  } else {
    block[0].text[language] = text;
    newjournalImages.splice(index, 1, block[0]);

    return newjournalImages;
  }
};

export default setTextBlockText;
