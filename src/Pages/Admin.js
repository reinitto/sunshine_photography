import React, { Fragment, Component } from "react";
import { uuid } from "uuidv4";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import IntroImage from "../components/IntroImage";
import { JournalImageView } from "../components/admin/journalAdminImageView/JournalImageView";
import { TitleAndTitleImage } from "../components/admin/journalAdminImageView/TitleAndTitleImage";
import { Overlay } from "../components/admin/Overlay";
import { setTextBlockText } from "../components/admin/setTextBlockText";
import { createJournalToEdit } from "../components/admin/createJournalToEdit";
import { updateImageSrc } from "../components/admin/updateImageSrc";
import { updateImages } from "../components/admin/updateImages";
let realUrl =
  "https://us-central1-momblog-15d1c.cloudfunctions.net/uploadToCloudinary-uploadToCloudinary";
// "http://localhost:5001/momblog-15d1c/us-central1/uploadToCloudinary-uploadToCloudinary";
// "https://us-central1-momblog-15d1c.cloudfunctions.net/uploadToCloudinary-uploadToCloudinary";
export default class Admin extends Component {
  state = {
    journalsMenu: false,
    journals: [],
    newJournal: {
      shortTitle: "",
      title: "",
      titleImage: "",
      journalImages: []
    }
  };

  setShortTitle(text) {
    let newJournal = { ...this.state.newJournal };
    newJournal.shortTitle = text;
    this.setState({
      newJournal
    });
  }

  updateTextBlockText(id, text, title = false) {
    let newJournalImages = setTextBlockText(
      this.state.newJournal.journalImages,
      id,
      text,
      title
    );
    let newJournal = {
      ...this.state.newJournal,
      journalImages: newJournalImages
    };
    this.setState({ newJournal });
  }

  setImageText = (id, text) => {
    // only variation==1 image can have text
    let newImageSet = {};
    let index = 0;
    this.state.newJournal.journalImages.forEach((imageSet, i) => {
      if (imageSet.variation === 1 && imageSet.image0.id === id) {
        newImageSet = { ...imageSet };
        index = i;
      }
    });

    newImageSet.image0.text = text;
    let newJournalImages = [...this.state.newJournal.journalImages];
    newJournalImages.splice(index, 1, newImageSet);
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

      let isUrl = output.style.backgroundImage.match(/\/(images\/.*)/);
      if (isUrl) {
        // ADD OLD TO DELETE
        let title_id_to_delete = isUrl[1].split(".")[0];
        this.setState({
          newJournal: {
            ...this.state.newJournal,
            title_id_to_delete
          }
        });
      }
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
      let isUrl = output.style.backgroundImage.match(/\/(images\/.*)"\)$/);
      let image_id_to_delete = null;
      if (isUrl) {
        // ADD OLD TO DELETE
        image_id_to_delete = isUrl[1].split(".")[0];
      }
      output.style.backgroundImage = `url(${reader.result})`;
      let newJournalImages = updateImageSrc(
        this.state.newJournal.journalImages,
        image_id_to_delete,
        id,
        reader.result
      );

      this.setState({
        newJournal: {
          ...this.state.newJournal,
          journalImages: newJournalImages
        }
      });
    };
    reader.readAsDataURL(file);
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    // console.log("onDragEnd", result);
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
    let movedImage = [
      ...newJournalImages.filter(image => image.draggableId === draggableId)
    ][0];
    newJournalImages.splice(source.index, 1);
    newJournalImages.splice(destination.index, 0, movedImage);

    this.setState({
      newJournal: {
        ...this.state.newJournal,
        journalImages: newJournalImages.map((set, i) => {
          return { ...set, order: i };
        })
      }
    });
    return;
  };

  addNewTextBlock() {
    let newTextBloc = { title: "", text: "" };
    let order = this.state.newJournal.journalImages.length;
    newTextBloc.variation = "text";
    newTextBloc.order = order;
    newTextBloc.id = uuid();
    let newJournal = {
      ...this.state.newJournal,
      journalImages: [...this.state.newJournal.journalImages, newTextBloc]
    };
    this.setState({
      newJournal
    });
  }
  addNewJournalImage(variation = 1) {
    let newJournalImages = {};
    let order = this.state.newJournal.journalImages.length;
    newJournalImages.variation = variation;
    newJournalImages.order = order;

    newJournalImages.draggableId = uuid();
    for (let i = 0; i < variation; i++) {
      let id = uuid();
      newJournalImages[`image${i}`] = { text: "", src: "", id };
    }
    let newJournal = {
      ...this.state.newJournal,
      journalImages: [...this.state.newJournal.journalImages, newJournalImages]
    };
    this.setState({
      newJournal
    });
  }

  deleteImageSet = draggableId => {
    // find correct imageSet
    let deleteInfo = {};
    let setToDelete = this.state.newJournal.journalImages.filter(
      set => (set.draggableId || set.id) === draggableId
    )[0];
    // id or img urls
    if (setToDelete.isTextBlock) {
      deleteInfo.id = setToDelete.id;
    } else {
      deleteInfo.imgUrls = [];
      if (setToDelete.image0) {
        deleteInfo.imgUrls.push(setToDelete.image0.src);
      }
      if (setToDelete.image1) {
        deleteInfo.imgUrls.push(setToDelete.image1.src);
      }
      if (setToDelete.image2) {
        deleteInfo.imgUrls.push(setToDelete.image2.src);
      }
    }
    let newSetsToDelete = this.state.setsToDelete
      ? [...this.state.setsToDelete, deleteInfo]
      : [deleteInfo];
    let newjournalImages = [
      ...this.state.newJournal.journalImages.filter(
        set => (set.draggableId || set.id) !== draggableId
      )
    ].map((set, i) => {
      return { ...set, order: i };
    });
    let newJournal = {
      ...this.state.newJournal,
      journalImages: newjournalImages
    };
    this.setState({
      ...this.state,
      newJournal,
      setsToDelete: newSetsToDelete
    });
  };
  toggleJournalView() {
    this.setState({ journalsMenu: !this.state.journalsMenu });
  }

  setJournalToEdit(journalId) {
    let journalToEdit = createJournalToEdit(this.props.journals, journalId);
    this.setState({
      newJournal: journalToEdit
    });
  }

  increaseImagesUploaded = () => {
    this.setState({
      imagesUploaded: this.state.imagesUploaded + 1
    });
  };

  SubmitEdit = async e => {
    e.preventDefault();
    let idToken = await this.props.user.getIdToken();
    let imagesToUpload = 0;
    this.state.newJournal.journalImages.forEach(set => {
      if ([1, 2, 3].indexOf(set.variation) > -1) {
        imagesToUpload += set.variation;
      }
    });

    this.setState({
      updating: true,
      uploadingTitle: true,
      imagesToUpload,
      imagesUploaded: 0
    });

    const {
      title_id_to_delete,
      shortTitle,
      title,
      editKey,
      edit,
      titleImage,
      journalImages
    } = this.state.newJournal;
    const titleRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      },
      body: JSON.stringify({
        isTitle: true,
        title,
        titleImage,
        shortTitle,
        editKey,
        edit,
        title_id_to_delete
      })
    };
    try {
      await fetch(realUrl, titleRequestOptions);
      this.setState({
        uploadingTitle: false
      });
      let journalId = editKey;
      await updateImages(
        journalImages,
        journalId,
        idToken,
        realUrl,
        shortTitle,
        edit,
        this.increaseImagesUploaded.bind(this)
      );

      // DELETE SETS MARKED FOR DELETION
      if (this.state.setsToDelete && this.state.setsToDelete.length > 0) {
        this.setState({
          deletingSets: true
        });
        let imageDeletionRequestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
          }
        };
        imageDeletionRequestOptions.body = JSON.stringify({
          setsToDelete: this.state.setsToDelete,
          editKey,
          edit
        });
        fetch(realUrl, imageDeletionRequestOptions).then(() => {
          this.setState({
            deletingSets: false
          });
        });
      }
    } catch (error) {
      console.log("error submitEdit", error);
    }
  };

  closeOverlay = () => {
    this.setState({
      uploading: false,
      updating: false
    });
  };

  DeleteJournal = async e => {
    e.preventDefault();
    let idToken = await this.props.user.getIdToken();
    const deleteRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      },
      body: JSON.stringify({
        delete: { id: this.state.newJournal.editKey }
      })
    };
    await fetch(realUrl, deleteRequestOptions);
  };

  Submit = async e => {
    e.preventDefault();
    let imagesToUpload = 0;
    this.state.newJournal.journalImages.forEach(set => {
      if ([1, 2, 3].indexOf(set.variation) > -1) {
        imagesToUpload += set.variation;
      }
    });
    const {
      shortTitle,
      title,
      titleImage,
      journalImages
    } = this.state.newJournal;
    // Include the ID token in an Authorization: Bearer ID_TOKEN header in the request to the function.
    this.setState({
      uploading: true,
      uploadingTitle: true,
      imagesToUpload,
      imagesUploaded: 0
    });
    let idToken = await this.props.user.getIdToken();
    const titleRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      },
      body: JSON.stringify({
        isTitle: true,
        title,
        titleImage,
        shortTitle
      })
    };
    try {
      // UPLOAD TITLE
      let titleResponse = await fetch(realUrl, titleRequestOptions);
      let titleData = await titleResponse.json();
      let journalId = titleData.journalId;
      this.setState({
        uploadingTitle: false
      });
      let edit = false;
      await updateImages(
        journalImages,
        journalId,
        idToken,
        realUrl,
        shortTitle,
        edit,
        this.increaseImagesUploaded.bind(this)
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  render() {
    // console.log("state", this.state);
    let {
      uploadingTitle,
      imagesUploaded,
      imagesToUpload,
      deletingSets,
      setsToDelete,
      uploading,
      updating
    } = this.state;
    let {
      title,
      shortTitle,
      titleImage,
      journalImages,
      edit
    } = this.state.newJournal;
    return (
      <Fragment>
        <IntroImage text={["Admin"]} height="35vh" />
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
              width: "80%",
              margin: "auto"
            }}
          >
            <div className="d-flex flex-column w-25 mx-auto">
              <h3>Current Blogs</h3>
              {this.props.journals
                ? Object.keys(this.props.journals).map((journalId, i) => {
                    let { title, titleUrl: titleSrc } = this.props.journals[
                      journalId
                    ].title;
                    return (
                      <div
                        style={{
                          cursor: "pointer"
                        }}
                        key={i}
                        onClick={() => {
                          // SET EXISTING JOURNAL TO EDIT
                          this.setJournalToEdit(journalId);
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
                closeOverlay={this.closeOverlay}
                info={{
                  uploadingTitle,
                  imagesUploaded,
                  imagesToUpload,
                  deletingSets,
                  setsToDelete
                }}
              />
              <div>{this.state.journals}</div>
              <DragDropContext onDragEnd={this.onDragEnd}>
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
                          onChange={e => this.setShortTitle(e.target.value)}
                          style={{
                            width: "100%"
                          }}
                        />
                      </div>
                      <TitleAndTitleImage
                        titleText={title}
                        setTitle={this.setTitle.bind(this)}
                        loadTitle={this.loadTitle.bind(this)}
                        titleSrc={titleImage}
                      />
                      <JournalImageView
                        journalImages={journalImages}
                        setImageText={this.setImageText.bind(this)}
                        deleteImageSet={this.deleteImageSet.bind(this)}
                        loadFile={this.loadFile.bind(this)}
                        setTextBlockText={this.updateTextBlockText.bind(this)}
                        edit={edit}
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
              <button
                onClick={() => {
                  this.addNewTextBlock();
                }}
              >
                Add Text Block
              </button>
              <hr />
              <div className="d-flex flex-column mx-auto w-25">
                <button onClick={e => this.Submit(e)}>Submit New</button>
                <button onClick={e => this.SubmitEdit(e)}>Confirm Edit</button>
                <button
                  className="btn btn-danger"
                  onClick={e => {
                    this.DeleteJournal(e);
                  }}
                >
                  Delete Journal
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
}
