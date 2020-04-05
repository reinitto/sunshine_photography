import React from "react";
import Overlay from "./Overlay";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { JournalImageView } from "./journalAdminImageView/JournalImageView";
import { TitleAndTitleImage } from "./journalAdminImageView/TitleAndTitleImage";
const EditJournals = ({
  journals,
  setJournalToEdit,
  addNewJournalImage,
  addNewTextBlock,
  deleteImageSet,
  deleteJournal,
  uploading,
  updating,
  uploadingTitle,
  imagesUploaded,
  imagesToUpload,
  deletingSets,
  setsToDelete,
  onDragEnd,
  shortTitle,
  setShortTitle,
  title,
  setTitle,
  loadTitle,
  titleImage,
  journalImages,
  setImageText,
  loadFile,
  updateTextBlockText,
  edit,
  submit,
  submitEdit,
  closeOverlay
}) => {
  console.log(journals);
  return (
    <div
      style={{
        display: "flex",
        width: "80%",
        margin: "auto"
      }}
    >
      <div className="d-flex flex-column w-25 mx-auto">
        <h3>Current Blogs</h3>
        {journals
          ? Object.keys(journals).map((journalId, i) => {
              let { title, titleUrl: titleSrc } = journals[journalId].title;
              return (
                <div
                  style={{
                    cursor: "pointer"
                  }}
                  key={i}
                  onClick={() => {
                    // SET EXISTING JOURNAL TO EDIT
                    setJournalToEdit(journalId);
                  }}
                >
                  <div
                    className="fitted-image"
                    style={{
                      backgroundImage: `url(${titleSrc})`,
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      color: "white",
                      margin: "1rem"
                    }}
                  >
                    <h4 className="text-center">{title}</h4>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "70%"
        }}
      >
        <Overlay
          uploading={uploading}
          updating={updating}
          closeOverlay={closeOverlay}
          info={{
            uploadingTitle,
            imagesUploaded,
            imagesToUpload,
            deletingSets,
            setsToDelete
          }}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={Date.now().toString()}>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {provided.placeholder}
                <div>
                  <input
                    type="text"
                    name="shortTitle"
                    placeholder="Enter short title for navigation"
                    value={shortTitle}
                    onChange={e => setShortTitle(e.target.value)}
                    style={{
                      width: "100%"
                    }}
                  />
                </div>
                <TitleAndTitleImage
                  titleText={title}
                  setTitle={setTitle}
                  loadTitle={loadTitle}
                  titleSrc={titleImage}
                />
                <JournalImageView
                  journalImages={journalImages}
                  setImageText={setImageText}
                  deleteImageSet={deleteImageSet}
                  loadFile={loadFile}
                  setTextBlockText={updateTextBlockText}
                  edit={edit}
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button
          onClick={() => {
            addNewJournalImage(1);
          }}
        >
          Add Single Image
        </button>
        <button
          onClick={() => {
            addNewJournalImage(2);
          }}
        >
          Add 2 Images
        </button>
        <button
          onClick={() => {
            addNewJournalImage(3);
          }}
        >
          Add 3 Images
        </button>
        <button
          onClick={() => {
            addNewTextBlock();
          }}
        >
          Add Text Block
        </button>
        <hr />
        <div className="d-flex flex-column mx-auto w-25">
          <button onClick={e => submit(e)}>Submit New</button>
          <button onClick={e => submitEdit(e)}>Confirm Edit</button>
          <button
            className="btn btn-danger"
            onClick={e => {
              deleteJournal(e);
            }}
          >
            Delete Journal
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJournals;
