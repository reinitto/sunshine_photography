import React, { createRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ThreeJournalImagesWithText } from "./ThreeJournalImagesWithText";
import { TwoJournalImagesWithText } from "./TwoJournalImagesWithText";
import { OneJournalImageWithText } from "./OneJournalImageWithText";
import { TextBlock } from "./TextBlock";
// "http://localhost:5001/momblog-15d1c/us-central1/uploadToCloudinary-uploadToCloudinary";
//  "https://us-central1-momblog-15d1c.cloudfunctions.net/uploadToCloudinary-uploadToCloudinary"
export let JournalImageView = ({
  journalImages,
  setImageText,
  loadFile,
  deleteImageSet,
  setTextBlockText,
}) => {
  let journalImageArray = [];
  if (journalImages) {
    for (let i = 0; i < journalImages.length; i++) {
      let journalImage = journalImages[i];
      if (journalImage.variation === 1) {
        let image = journalImage.image0;
        let imageRef = createRef();
        journalImageArray.push(
          <Draggable
            key={journalImage.draggableId}
            draggableId={journalImage.draggableId}
            index={i}
          >
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <div>
                  <OneJournalImageWithText
                    setImageText={setImageText}
                    id={image.id}
                    imageRef={imageRef}
                    loadFile={loadFile}
                    srcLink={image.src}
                    imageText={image.text}
                  />
                  <button
                    className="btn btn-danger delete-set"
                    onClick={() => deleteImageSet(journalImage.draggableId)}
                  >
                    Delete Set Above
                  </button>
                </div>
              </div>
            )}
          </Draggable>
        );
      }
      if (journalImage.variation === 2) {
        let image1 = journalImage.image0;
        let image2 = journalImage.image1;
        let image1Ref = createRef();
        let image2Ref = createRef();
        journalImageArray.push(
          <Draggable
            key={journalImage.draggableId}
            draggableId={journalImage.draggableId}
            index={i}
          >
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <div>
                  <TwoJournalImagesWithText
                    imageRefs={[image1Ref, image2Ref]}
                    loadFile={loadFile}
                    ids={[image1.id, image2.id]}
                    srcLinks={[image1.src, image2.src]}
                  />
                  <button
                    className="btn btn-danger delete-set"
                    onClick={() => deleteImageSet(journalImage.draggableId)}
                  >
                    Delete Set Above
                  </button>
                </div>
              </div>
            )}
          </Draggable>
        );
      }
      if (journalImage.variation === 3) {
        let image1 = journalImage.image0;
        let image2 = journalImage.image1;
        let image3 = journalImage.image2;
        let image1Ref = createRef();
        let image2Ref = createRef();
        let image3Ref = createRef();
        journalImageArray.push(
          <Draggable
            key={journalImage.draggableId}
            draggableId={journalImage.draggableId}
            index={i}
          >
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <div>
                  <ThreeJournalImagesWithText
                    imageRefs={[image1Ref, image2Ref, image3Ref]}
                    loadFile={loadFile}
                    ids={[image1.id, image2.id, image3.id]}
                    srcLinks={[image1.src, image2.src, image3.src]}
                  />
                  <button
                    className="btn btn-danger delete-set"
                    onClick={() => deleteImageSet(journalImage.draggableId)}
                  >
                    Delete Set Above
                  </button>
                </div>
              </div>
            )}
          </Draggable>
        );
      }
      if (journalImage.variation === "text") {
        journalImageArray.push(
          <Draggable
            key={journalImage.id}
            draggableId={journalImage.id}
            index={i}
          >
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <div>
                  <TextBlock
                    id={journalImage.id}
                    setTextBlockText={setTextBlockText}
                    text={journalImage.text}
                    title={journalImage.title}
                  />
                  <button
                    className="btn btn-danger delete-set"
                    onClick={() => deleteImageSet(journalImage.id)}
                  >
                    Delete Set Above
                  </button>
                </div>
              </div>
            )}
          </Draggable>
        );
      }
    }
  }
  return <div>{journalImageArray}</div>;
};
