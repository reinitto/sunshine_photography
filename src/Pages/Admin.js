import React, { Fragment, Component, Suspense, lazy } from "react";
import { uuid } from "uuidv4";
import IntroImage from "../components/IntroImage";
import { setTextBlockText } from "../components/admin/setTextBlockText";

// import EditJournals from "../components/admin/EditJournals";
// import ServicesView from "../components/admin/ServicesView";
import { createJournalToEdit } from "../components/admin/createJournalToEdit";
import { updateImageSrc } from "../components/admin/updateImageSrc";
import { updateImages } from "../components/admin/updateImages";
const EditJournals = lazy(() => import("../components/admin/EditJournals"));
const InstagramView = lazy(() => import("../components/admin/InstagramView"));
const ServicesView = lazy(() => import("../components/admin/ServicesView"));
const AboutView = lazy(() => import("../components/admin/AboutView"));
const HomeView = lazy(() => import("../components/admin/HomeView"));
const ContactView = lazy(() => import("../components/admin/ContactView"));
const FooterView = lazy(() => import("../components/admin/FooterView"));
const NavigationView = lazy(() => import("../components/admin/NavigationView"));
let realUrl =
  "https://us-central1-momblog-15d1c.cloudfunctions.net/uploadToCloudinary-uploadToCloudinary";
// "http://localhost:5001/momblog-15d1c/us-central1/uploadToCloudinary-uploadToCloudinary";
// "https://us-central1-momblog-15d1c.cloudfunctions.net/uploadToCloudinary-uploadToCloudinary";
export default class Admin extends Component {
  state = {
    menu: "journals",
    journals: [],
    newJournal: {
      shortTitle: { us: "", lv: "", no: "" },
      title: { us: "", lv: "", no: "" },
      titleImage: "",
      journalImages: [],
    },
  };

  setShortTitle = (text, language) => {
    let newJournal = { ...this.state.newJournal };
    newJournal.shortTitle[language] = text;
    this.setState({
      newJournal,
    });
  };

  updateTextBlockText = (id, text, language, title = false) => {
    let newJournalImages = setTextBlockText(
      this.state.newJournal.journalImages,
      id,
      text,
      title,
      language
    );
    let newJournal = {
      ...this.state.newJournal,
      journalImages: newJournalImages,
    };
    this.setState({ newJournal });
  };

  setImageText = (id, text, language) => {
    // only variation==1 image can have text
    let newImageSet = {};
    let index = 0;
    this.state.newJournal.journalImages.forEach((imageSet, i) => {
      if (imageSet.variation === 1 && imageSet.image0.id === id) {
        newImageSet = { ...imageSet };
        index = i;
      }
    });

    newImageSet.image0.text[language] = text;
    let newJournalImages = [...this.state.newJournal.journalImages];
    newJournalImages.splice(index, 1, newImageSet);
    this.setState({
      newJournal: {
        ...this.state.newJournal,
        journalImages: newJournalImages,
      },
    });
  };
  setTitle = (title, language) => {
    let newTitle = { ...title };
    newTitle[language] = title;
    this.setState({
      newJournal: {
        ...this.state.newJournal,
        title: newTitle,
      },
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
            title_id_to_delete,
          },
        });
      }
      output.style.backgroundImage = `url(${reader.result})`;
      // set src in state
      this.setState({
        newJournal: {
          ...this.state.newJournal,
          titleImage: reader.result,
        },
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
          journalImages: newJournalImages,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  onDragEnd = (result) => {
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
      ...newJournalImages.filter((image) => image.draggableId === draggableId),
    ][0];
    newJournalImages.splice(source.index, 1);
    newJournalImages.splice(destination.index, 0, movedImage);

    this.setState({
      newJournal: {
        ...this.state.newJournal,
        journalImages: newJournalImages.map((set, i) => {
          return { ...set, order: i };
        }),
      },
    });
    return;
  };

  addNewTextBlock = () => {
    let newTextBloc = {
      title: { us: "", lv: "", nor: "" },
      text: { us: "", lv: "", nor: "" },
    };
    let order = this.state.newJournal.journalImages.length;
    newTextBloc.variation = "text";
    newTextBloc.order = order;
    newTextBloc.id = uuid();
    let newJournal = {
      ...this.state.newJournal,
      journalImages: [...this.state.newJournal.journalImages, newTextBloc],
    };
    this.setState({
      newJournal,
    });
  };
  addNewJournalImage = (variation = 1) => {
    let newJournalImages = {};
    let order = this.state.newJournal.journalImages.length;
    newJournalImages.variation = variation;
    newJournalImages.order = order;

    newJournalImages.draggableId = uuid();
    for (let i = 0; i < variation; i++) {
      let id = uuid();
      newJournalImages[`image${i}`] = {
        text: { us: "", lv: "", nor: "" },
        src: "",
        id,
      };
    }
    let newJournal = {
      ...this.state.newJournal,
      journalImages: [...this.state.newJournal.journalImages, newJournalImages],
    };
    this.setState({
      newJournal,
    });
  };

  deleteImageSet = (draggableId) => {
    // find correct imageSet
    let deleteInfo = {};
    let setToDelete = this.state.newJournal.journalImages.filter(
      (set) => (set.draggableId || set.id) === draggableId
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
        (set) => (set.draggableId || set.id) !== draggableId
      ),
    ].map((set, i) => {
      return { ...set, order: i };
    });
    let newJournal = {
      ...this.state.newJournal,
      journalImages: newjournalImages,
    };
    this.setState({
      ...this.state,
      newJournal,
      setsToDelete: newSetsToDelete,
    });
  };
  setJournalView = () => {
    this.setState({ menu: "journals" });
  };
  setServicesView = () => {
    this.setState({ menu: "services" });
  };
  setInstagramView = () => {
    this.setState({ menu: "instagram" });
  };
  setAboutView = () => {
    this.setState({ menu: "about" });
  };
  setHomePageView = () => {
    this.setState({ menu: "home" });
  };
  setContactView = () => {
    this.setState({ menu: "contact" });
  };
  setFooterView = () => {
    this.setState({ menu: "footer" });
  };
  setNavigationView = () => {
    this.setState({ menu: "navigation" });
  };

  setJournalToEdit = (journalId) => {
    let journalToEdit = createJournalToEdit(this.props.journals, journalId);
    this.setState({
      newJournal: journalToEdit,
    });
  };

  increaseImagesUploaded = () => {
    this.setState({
      imagesUploaded: this.state.imagesUploaded + 1,
    });
  };

  submitEdit = async (e) => {
    e.preventDefault();
    let idToken = await this.props.user.getIdToken();
    let imagesToUpload = 0;
    this.state.newJournal.journalImages.forEach((set) => {
      if ([1, 2, 3].indexOf(set.variation) > -1) {
        imagesToUpload += set.variation;
      }
    });

    this.setState({
      updating: true,
      uploadingTitle: true,
      imagesToUpload,
      imagesUploaded: 0,
    });

    const {
      title_id_to_delete,
      shortTitle,
      title,
      editKey,
      edit,
      titleImage,
      journalImages,
    } = this.state.newJournal;
    const titleRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        isTitle: true,
        title,
        titleImage,
        shortTitle,
        editKey,
        edit,
        title_id_to_delete,
      }),
    };
    try {
      await fetch(realUrl, titleRequestOptions);
      this.setState({
        uploadingTitle: false,
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
          deletingSets: true,
        });
        let imageDeletionRequestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        };
        imageDeletionRequestOptions.body = JSON.stringify({
          setsToDelete: this.state.setsToDelete,
          editKey,
          edit,
        });
        fetch(realUrl, imageDeletionRequestOptions).then(() => {
          this.setState({
            deletingSets: false,
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
      updating: false,
    });
  };

  resetCurrentJournal = (e) => {
    this.setState({
      newJournal: {
        shortTitle: { us: "", lv: "", nor: "" },
        title: { us: "", lv: "", nor: "" },
        titleImage: "",
        journalImages: [],
      },
    });
  };

  deleteJournal = async (e) => {
    e.preventDefault();
    let idToken = await this.props.user.getIdToken();
    const deleteRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        delete: { id: this.state.newJournal.editKey },
      }),
    };
    await fetch(realUrl, deleteRequestOptions);
  };

  submit = async (e) => {
    e.preventDefault();
    let imagesToUpload = 0;
    this.state.newJournal.journalImages.forEach((set) => {
      if ([1, 2, 3].indexOf(set.variation) > -1) {
        imagesToUpload += set.variation;
      }
    });
    const {
      shortTitle,
      title,
      titleImage,
      journalImages,
    } = this.state.newJournal;
    // Include the ID token in an Authorization: Bearer ID_TOKEN header in the request to the function.
    this.setState({
      uploading: true,
      uploadingTitle: true,
      imagesToUpload,
      imagesUploaded: 0,
    });
    let idToken = await this.props.user.getIdToken();
    const titleRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        isTitle: true,
        title,
        titleImage,
        shortTitle,
      }),
    };
    try {
      // UPLOAD TITLE
      let titleResponse = await fetch(realUrl, titleRequestOptions);
      let titleData = await titleResponse.json();
      let journalId = titleData.journalId;
      this.setState({
        uploadingTitle: false,
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
    let {
      uploadingTitle,
      imagesUploaded,
      imagesToUpload,
      deletingSets,
      setsToDelete,
      uploading,
      updating,
    } = this.state;
    let {
      title,
      shortTitle,
      titleImage,
      journalImages,
      edit,
      editKey,
    } = this.state.newJournal;
    let { journals, language } = this.props;
    return (
      <Suspense
        fallback={<div style={{ height: "100vh", width: "100%" }}>Loading</div>}
      >
        <Fragment>
          <IntroImage />
          <div>
            <ul style={{ display: "flex", marginTop: "1rem" }}>
              <li
                style={{
                  listStyleType: "none",
                  border: "1px solid black",
                  padding: "1rem",
                }}
              >
                <a
                  href="#!"
                  onClick={() => {
                    this.setJournalView();
                  }}
                >
                  Journals
                </a>
              </li>
              <li
                style={{
                  listStyleType: "none",
                  border: "1px solid black",
                  padding: "1rem",
                }}
              >
                <a
                  href="#!"
                  onClick={() => {
                    this.setServicesView();
                  }}
                >
                  Services
                </a>
              </li>
              <li
                style={{
                  listStyleType: "none",
                  border: "1px solid black",
                  padding: "1rem",
                }}
              >
                <a
                  href="#!"
                  onClick={() => {
                    this.setInstagramView();
                  }}
                >
                  Instagram
                </a>
              </li>
              <li
                style={{
                  listStyleType: "none",
                  border: "1px solid black",
                  padding: "1rem",
                }}
              >
                <a
                  href="#!"
                  onClick={() => {
                    this.setAboutView();
                  }}
                >
                  About Me
                </a>
              </li>
              <li
                style={{
                  listStyleType: "none",
                  border: "1px solid black",
                  padding: "1rem",
                }}
              >
                <a
                  href="#!"
                  onClick={() => {
                    this.setHomePageView();
                  }}
                >
                  Home Page
                </a>
              </li>
              <li
                style={{
                  listStyleType: "none",
                  border: "1px solid black",
                  padding: "1rem",
                }}
              >
                <a
                  href="#!"
                  onClick={() => {
                    this.setContactView();
                  }}
                >
                  Contact Form
                </a>
              </li>
              <li
                style={{
                  listStyleType: "none",
                  border: "1px solid black",
                  padding: "1rem",
                }}
              >
                <a
                  href="#!"
                  onClick={() => {
                    this.setFooterView();
                  }}
                >
                  Footer
                </a>
              </li>
              {/* <li
                style={{
                  listStyleType: "none",
                  border: "1px solid black",
                  padding: "1rem",
                }}
              >
                <a
                  href="#!"
                  onClick={() => {
                    this.setNavigationView();
                  }}
                >
                  Navigation
                </a>
              </li> */}
            </ul>
          </div>
          {this.state.menu === "journals" ? (
            <Suspense
              fallback={
                <div
                  style={{
                    height: "100vh",
                    width: "100%",
                  }}
                ></div>
              }
            >
              <EditJournals
                {...{
                  language,
                  journals,
                  uploading,
                  updating,
                  uploadingTitle,
                  imagesUploaded,
                  imagesToUpload,
                  deletingSets,
                  setsToDelete,
                  title,
                  shortTitle,
                  titleImage,
                  journalImages,
                  edit,
                  editKey,
                  setJournalToEdit: this.setJournalToEdit,
                  addNewJournalImage: this.addNewJournalImage,
                  addNewTextBlock: this.addNewTextBlock,
                  deleteImageSet: this.deleteImageSet,
                  deleteJournal: this.deleteJournal,
                  onDragEnd: this.onDragEnd,
                  setShortTitle: this.setShortTitle,
                  setTitle: this.setTitle,
                  loadTitle: this.loadTitle,
                  setImageText: this.setImageText,
                  loadFile: this.loadFile,
                  updateTextBlockText: this.updateTextBlockText,
                  submit: this.submit,
                  submitEdit: this.submitEdit,
                  closeOverlay: this.closeOverlay,
                  resetCurrentJournal: this.resetCurrentJournal,
                }}
              />
            </Suspense>
          ) : null}
          {this.state.menu === "services" ? (
            <Suspense
              fallback={
                <div
                  style={{
                    height: "100vh",
                    width: "100%",
                  }}
                ></div>
              }
            >
              <ServicesView user={this.props.user} language={language} />
            </Suspense>
          ) : null}
          {this.state.menu === "instagram" ? (
            <Suspense
              fallback={
                <div
                  style={{
                    height: "100vh",
                    width: "100%",
                  }}
                ></div>
              }
            >
              <InstagramView
                instagram={this.props.instagram}
                user={this.props.user}
              />
            </Suspense>
          ) : null}
          {this.state.menu === "about" ? (
            <Suspense
              fallback={
                <div
                  style={{
                    height: "100vh",
                    width: "100%",
                  }}
                ></div>
              }
            >
              <AboutView user={this.props.user} />
            </Suspense>
          ) : null}
          {this.state.menu === "home" ? (
            <Suspense
              fallback={
                <div
                  style={{
                    height: "100vh",
                    width: "100%",
                  }}
                ></div>
              }
            >
              <HomeView user={this.props.user} />
            </Suspense>
          ) : null}
          {this.state.menu === "contact" ? (
            <Suspense
              fallback={
                <div
                  style={{
                    height: "100vh",
                    width: "100%",
                  }}
                ></div>
              }
            >
              <ContactView user={this.props.user} />
            </Suspense>
          ) : null}
          {this.state.menu === "footer" ? (
            <Suspense
              fallback={
                <div
                  style={{
                    height: "100vh",
                    width: "100%",
                  }}
                ></div>
              }
            >
              <FooterView user={this.props.user} />
            </Suspense>
          ) : null}
          {this.state.menu === "navigation" ? (
            <Suspense
              fallback={
                <div
                  style={{
                    height: "100vh",
                    width: "100%",
                  }}
                ></div>
              }
            >
              <NavigationView user={this.props.user} />
            </Suspense>
          ) : null}
        </Fragment>
      </Suspense>
    );
  }
}
