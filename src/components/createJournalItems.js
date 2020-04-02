export const createJournalItems = journals => {
  let items = Object.keys(journals).map(key => {
    let { title, titleUrl } = journals[key].title;
    return {
      journalUrl: key,
      title,
      imageUrl: titleUrl
    };
  });
  return items;
};
