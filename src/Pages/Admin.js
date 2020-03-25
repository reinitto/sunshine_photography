import React, { Fragment, Component, Suspense, createRef } from "react";
import { uuid } from "uuidv4";
import IntroImage from "../components/IntroImage";
import firebase from "firebase/app";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FileDrop from "react-file-drop";

const inputStyles = {
  border: "1px solid black",
  color: "black",
  margin: "auto",
  width: "100%"
};

let JournalImageView = ({ journalImages, setImageText, loadFile }) => {
  let journalImageArray = [];
  for (let i = 0; i < journalImages.length; i++) {
    let journalImage = journalImages[i];
    if (journalImage.variation === 1) {
      let image = journalImage.image0;
      journalImageArray.push(
        <Draggable
          key={journalImage.draggableId}
          draggableId={journalImage.draggableId}
          index={i}
        >
          {provided => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <OneJournalImageWithText
                setImageText={setImageText}
                id={image.id}
                imageRef={image.imageRef}
                loadFile={loadFile}
              />
            </div>
          )}
        </Draggable>
      );
    }
    if (journalImage.variation === 2) {
      let image1 = journalImage.image0;
      let image2 = journalImage.image1;

      journalImageArray.push(
        <Draggable
          key={journalImage.draggableId}
          draggableId={journalImage.draggableId}
          index={i}
        >
          {provided => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <TwoJournalImagesWithText
                setImageText={setImageText}
                imageRefs={[image1.imageRef, image2.imageRef]}
                loadFile={loadFile}
                ids={[image1.id, image2.id]}
              />
            </div>
          )}
        </Draggable>
      );
    }
    if (journalImage.variation === 3) {
      let image1 = journalImage.image0;
      let image2 = journalImage.image1;
      let image3 = journalImage.image2;

      journalImageArray.push(
        <Draggable
          key={journalImage.draggableId}
          draggableId={journalImage.draggableId}
          index={i}
        >
          {provided => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <ThreeJournalImagesWithText
                setImageText={setImageText}
                imageRefs={[image1.imageRef, image2.imageRef, image3.imageRef]}
                loadFile={loadFile}
                ids={[image1.id, image2.id, image3.id]}
              />
            </div>
          )}
        </Draggable>
      );
    }
  }
  return <div>{journalImageArray}</div>;
};

let TitleAndTitleImage = ({ title, setTitle, loadTitle }) => {
  let titleImageRef = createRef(null);
  let handleDrop = (files, event) => {
    loadTitle(files[0], titleImageRef);
  };
  return (
    <>
      <div style={inputStyles} className="fitted-image" ref={titleImageRef}>
        <FileDrop onDrop={handleDrop}>
          Drop title image here!
          <textarea
            className="title-input"
            name="journalTitle"
            placeholder="Enter title"
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
        </FileDrop>
      </div>
    </>
  );
};

let OneJournalImageWithText = ({ setImageText, imageRef, loadFile, id }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
      <textarea
        className="journal-image-text"
        rows="3"
        name="journalImageText"
        placeholder="Enter text"
        onChange={e => {
          setImageText(id, e.target.value);
        }}
      />
      <ImageWithThumbnail id={id} imageRef={imageRef} loadFile={loadFile} />
    </div>
  );
};
let TwoJournalImagesWithText = ({ setImageText, imageRefs, loadFile, ids }) => {
  return (
    <div style={{ display: "flex" }}>
      <OneJournalImageWithText
        id={ids[0]}
        imageRef={imageRefs[0]}
        loadFile={loadFile}
        setImageText={setImageText}
      />
      <OneJournalImageWithText
        id={ids[1]}
        imageRef={imageRefs[1]}
        loadFile={loadFile}
        setImageText={setImageText}
      />
    </div>
  );
};
let ThreeJournalImagesWithText = ({
  setImageText,
  imageRefs,
  loadFile,
  ids
}) => {
  return (
    <div style={{ display: "flex" }}>
      <OneJournalImageWithText
        id={ids[0]}
        imageRef={imageRefs[0]}
        loadFile={loadFile}
        setImageText={setImageText}
      />
      <OneJournalImageWithText
        id={ids[1]}
        imageRef={imageRefs[1]}
        loadFile={loadFile}
        setImageText={setImageText}
      />
      <OneJournalImageWithText
        id={ids[2]}
        imageRef={imageRefs[2]}
        loadFile={loadFile}
        setImageText={setImageText}
      />
    </div>
  );
};

function ImageWithThumbnail({ imageRef, loadFile, id }) {
  let handleDrop = (files, event) => {
    loadFile(files[0], imageRef, id);
  };
  return (
    <div style={inputStyles} className="fitted-image" ref={imageRef}>
      <FileDrop onDrop={handleDrop}>Drop an image here!</FileDrop>
    </div>
  );
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export default class Admin extends Component {
  state = {
    journalsMenu: false,
    journals: [],
    newJournal: {
      title: null,
      titleImage: null,
      journalImages: []
    }
  };

  setImageText = (id, text) => {
    // get correct image
    let newImage = {
      ...this.state.newJournal.journalImages.filter(
        journalImage => journalImage.id === id
      )[0],
      text
    };
    let newJournalImages = this.state.newJournal.journalImages.map(image => {
      return image.id === id ? newImage : image;
    });
    this.setState({
      newJournal: {
        ...this.state.newJournal,
        journalImages: newJournalImages
      }
    });
  };
  setTitle = title => {
    this.setState({
      newJournal: {
        ...this.state.newJournal,
        title
      }
    });
  };

  loadTitle = (file, imageRef) => {
    let reader = new FileReader();
    reader.onload = () => {
      var output = imageRef.current;
      output.style.backgroundImage = `url(${reader.result})`;
      // set src in state
      this.setState({
        newJournal: {
          ...this.state.newJournal,
          titleImage: reader.result
        }
      });
    };
    reader.readAsDataURL(file);
  };
  loadFile = (file, imageRef, id) => {
    let reader = new FileReader();
    reader.onload = () => {
      var output = imageRef.current;
      // output.src = reader.result;
      output.style.backgroundImage = `url(${reader.result})`;
      let journalImages = [...this.state.newJournal.journalImages];
      let image = journalImages.filter(im => {
        if (im.variation === 1 && im.image0.id === id) {
          return im;
        }
        if (im.variation === 2) {
          if (im.image0.id === id) {
            return im;
          }
          if (im.image1.id === id) {
            return im;
          }
        }
        if (im.variation === 3) {
          if (im.image0.id === id) {
            return im;
          }
          if (im.image1.id === id) {
            return im;
          }
          if (im.image2.id === id) {
            return im;
          }
        }
      })[0];
      console.log("image", image);
      image.src = reader.result;
      // set src in state
      // find image by id
      this.setState({
        newJournal: {
          ...this.state.newJournal,
          journalImages
        }
      });
    };
    reader.readAsDataURL(file);
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    console.log("onDragEnd", result);
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let newJournalImages = Array.from(this.state.newJournal.journalImages);
    let movedImage = newJournalImages.filter(
      image => image.draggableId === draggableId
    )[0];
    newJournalImages.splice(source.index, 1);
    newJournalImages.splice(destination.index, 0, movedImage);
    this.setState({
      newJournal: {
        ...this.state.newJournal,
        journalImages: newJournalImages
      }
    });
    return;
  };

  toggleJournalView() {
    this.setState({ journalsMenu: !this.state.journalsMenu });
    if (this.state.journalsMenu) {
      this.getAllJournals();
    }
  }

  addNewJournalImage(variation = 1) {
    let newJournalImages = {};
    newJournalImages.variation = variation;
    newJournalImages.draggableId = uuid();
    for (let i = 0; i < variation; i++) {
      let imageRef = createRef(null);
      let id = uuid();
      newJournalImages[`image${i}`] = { text: "", src: "", imageRef, id };
    }
    let newJournal = {
      ...this.state.newJournal,
      journalImages: [...this.state.newJournal.journalImages, newJournalImages]
    };
    this.setState({
      newJournal
    });
  }
  // addNewJournalImage(variation = 1) {
  //   let newJournalImages = [];
  //   for (let i = 0; i < variation; i++) {
  //     let imageRef = createRef(null);
  //     let id = uuid();
  //     newJournalImages.push({ text: "", src: "", imageRef, id, variation });
  //   }
  //   let newJournal = {
  //     ...this.state.newJournal,
  //     journalImages: [
  //       ...this.state.newJournal.journalImages,
  //       ...newJournalImages
  //     ]
  //   };
  //   this.setState({
  //     newJournal
  //   });
  // }

  getAllJournals() {
    console.log("getting journals");
    var journals = firebase.database().ref("adminContent/journals");
    journals.once("value").then(function(snapshot) {
      console.log("journal snapshot", snapshot);
    });
  }

  Submit = async e => {
    e.preventDefault();
    let functions = firebase.functions();
    var uploadToCloudinary = functions.httpsCallable("uploadToCloudinary");
    try {
      uploadToCloudinary(
        JSON.stringify(this.state.newJournal, getCircularReplacer())
      )
        .then(res => {
          return res.json();
        })
        .then(res => console.log(res))
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  };
  render() {
    console.log("state", this.state);

    return (
      <Fragment>
        <Suspense fallback={<div style={{ height: "35vh" }}></div>}>
          <IntroImage text={["Admin"]} height="35vh" />
        </Suspense>

        <div>
          <ul style={{ display: "flex" }}>
            <li
              style={{
                listStyleType: "none",
                border: "1px solid black",
                padding: "1rem"
              }}
            >
              <a
                href="#!"
                onClick={() => {
                  this.toggleJournalView();
                }}
              >
                Journals
              </a>
            </li>
          </ul>
        </div>
        {this.state.journalsMenu ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "80%",
              margin: "auto"
            }}
          >
            <div>{this.state.journals}</div>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId={Date.now().toString()}>
                {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {provided.placeholder}
                    <TitleAndTitleImage
                      title={
                        this.state.newJournal.title
                          ? this.state.newJournal.title
                          : "Enter title"
                      }
                      setTitle={this.setTitle.bind(this)}
                      loadTitle={this.loadTitle.bind(this)}
                    />
                    <JournalImageView
                      journalImages={this.state.newJournal.journalImages}
                      setImageText={this.setImageText.bind(this)}
                      loadFile={this.loadFile.bind(this)}
                    />
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <button
              onClick={() => {
                this.addNewJournalImage(1);
              }}
            >
              Add Single Image
            </button>
            <button
              onClick={() => {
                this.addNewJournalImage(2);
              }}
            >
              Add 2 Images
            </button>
            <button
              onClick={() => {
                this.addNewJournalImage(3);
              }}
            >
              Add 3 Images
            </button>
          </div>
        ) : null}
        <button onClick={e => this.Submit(e)}>Submit</button>
      </Fragment>
    );
  }
}
