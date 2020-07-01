import React, { useState, useEffect, Fragment } from "react";
import * as firebase from "firebase/app";
import ReactCountryFlag from "react-country-flag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import { FileDrop } from "react-file-drop";
import { Overlay } from "./Overlay";
import { arrayFromObject } from "../arrayFromObject";
const shortid = require("shortid");
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
);
let createServiceUrl =
  "https://us-central1-momblog-15d1c.cloudfunctions.net/services-services";
// "http://localhost:5001/momblog-15d1c/us-central1/services-services";
let updateServiceUrl =
  "https://us-central1-momblog-15d1c.cloudfunctions.net/services-services";
// "http://localhost:5001/momblog-15d1c/us-central1/services-services";
let uploadImgUrl =
  "https://us-central1-momblog-15d1c.cloudfunctions.net/uploadImageToCloudinary-uploadImageToCloudinary";
// "http://localhost:5001/momblog-15d1c/us-central1/uploadImageToCloudinary-uploadImageToCloudinary";
let deleteImgUrl =
  "https://us-central1-momblog-15d1c.cloudfunctions.net/deleteImageFromCloudinary-deleteImageFromCloudinary";
let ImageWithThumbnail = ({
  loadFile,
  stateId,
  id,
  srcLink,
  stateUpdater,
  style = {},
}) => {
  let handleDrop = (files) => {
    loadFile(files[0], stateId, id, stateUpdater);
  };
  let isLink = srcLink ? srcLink.match(/^images/) : null;
  return (
    <div
      className="cover-image"
      id={id}
      style={{
        minHeight: "200px",
        minWidth: "200px",
        width: "100%",
        height: "100%",
        backgroundImage: isLink
          ? `url(https://res.cloudinary.com/sunshinephoto/image/upload/c_thumb,w_300/${srcLink})`
          : srcLink,
        ...style,
      }}
    >
      <FileDrop onDrop={handleDrop} frame={document.querySelector(`#${id}`)}>
        Drop an image here!
      </FileDrop>
    </div>
  );
};

let loadFile = (file, stateId, id, stateUpdater) => {
  let reader = new FileReader();
  reader.onload = () => {
    var output = document.querySelector(`#${id}`);
    output.style.backgroundImage = `url(${reader.result})`;
    stateUpdater({ stateId, data: reader.result });
  };
  reader.readAsDataURL(file);
};
export const ServicesView = ({ user, language }) => {
  let [key, setKey] = useState("");
  let [serviceName, setServiceName] = useState({ us: "", lv: "", no: "" });
  let [serviceParagraph, setServiceParagraph] = useState({
    us: "",
    lv: "",
    no: "",
  });
  let [details, setDetails] = useState([{ us: "", lv: "", no: "" }]);
  let [overlay, setOverlay] = useState(false);
  let [thumbnailImage, setThumbnailImage] = useState({
    id: shortid.generate(),
    image: "",
  });
  let [sessions, setSessions] = useState([
    {
      id: shortid.generate(),
      name: { us: "", lv: "", no: "" },
      price: 0,
      detailText: { us: "", lv: "", no: "" },
      image: "",
    },
  ]);
  let [galleryImages, setGalleryImages] = useState([
    {
      id: shortid.generate(),
      image: "",
      text: { us: "", lv: "", no: "" },
    },
  ]);
  let [allServices, setAllServices] = useState([]);
  let [folder_name, setFolder_name] = useState("");
  useEffect(() => {
    if (allServices.length === 0) {
      getAllServices();
    }
  });

  let setNewService = async () => {
    setKey("");
    setServiceName({ us: "", lv: "", no: "" });
    setThumbnailImage({
      id: shortid.generate(),
      image: "",
    });
    setServiceParagraph({ us: "", lv: "", no: "" });
    setDetails([{ us: "", lv: "", no: "" }]);
    setGalleryImages([
      {
        id: shortid.generate(),
        image: "",
        text: { us: "", lv: "", no: "" },
      },
    ]);
    setSessions([
      {
        id: shortid.generate(),
        name: { us: "", lv: "", no: "" },
        price: 0,
        detailText: { us: "", lv: "", no: "" },
        image: "",
      },
    ]);
    setFolder_name("");
  };

  let setServiceToEdit = async (service) => {
    let {
      name,
      paragraphText,
      key,
      details,
      imageGallery,
      sessions,
      folder_name,
      thumbnailImage,
    } = service;
    let serviceDetails = details
      ? arrayFromObject(details).map((detail) => detail.text)
      : [];
    let serviceimageGallery = imageGallery ? arrayFromObject(imageGallery) : [];
    sessions = sessions ? arrayFromObject(sessions) : [];
    let sessionObjects = [];
    if (sessions) {
      for await (let key of sessions) {
        let session = await getSession(key);
        sessionObjects.push({ ...session, key });
      }
    }
    setNewService();
    setKey(key);
    setServiceName(name);
    editThumbnail(thumbnailImage);
    setServiceParagraph(paragraphText);
    setDetails(serviceDetails);
    setGalleryImages(serviceimageGallery);
    setSessions(sessionObjects);
    setFolder_name(folder_name);
  };

  let editThumbnail = (thumbnailImage) => {
    if (thumbnailImage) {
      setThumbnailImage({
        id: shortid.generate(),
        image: thumbnailImage,
      });
    } else {
      setThumbnailImage({
        id: shortid.generate(),
        image: "",
      });
    }
  };

  let getAllServices = () => {
    firebase
      .database()
      .ref("/services/")
      .once("value")
      .then((snapshot) => {
        let journalSnap = snapshot.val();
        if (journalSnap) {
          let services = [];
          Object.keys(journalSnap).map((key) =>
            services.push({ ...journalSnap[key], key })
          );
          if (allServices) {
            setAllServices(services);
          }
        }
      });
  };

  let getSession = async (sessionKey) => {
    let snap = await firebase
      .database()
      .ref(`/sessions/${sessionKey}`)
      .once("value");
    return snap.val();
  };

  let updateServiceName = (e, language) => {
    let newServiceName = { ...serviceName };
    newServiceName[language] = e.target.value;
    setServiceName(newServiceName);
  };
  let updateServiceParagraph = (e, language) => {
    let newServiceParagraph = { ...serviceParagraph };
    newServiceParagraph[language] = e.target.value;
    setServiceParagraph(newServiceParagraph);
  };
  let addDetail = () => {
    setDetails([...details, { us: "", lv: "", no: "" }]);
  };
  let updateServiceDetail = (e, i, language) => {
    let prevDetails = [...details];
    // let id = e.target.id.match(/(\d+)/g)[0];
    prevDetails[i][language] = e.target.value;
    setDetails(prevDetails);
  };

  let removeDetail = (i) => {
    let newDetails = [...details];
    newDetails.splice(i, 1);
    setDetails(newDetails);
  };

  let addSession = () => {
    if (sessions.lusth > 0) {
      setSessions([
        ...sessions,
        {
          id: shortid.generate(),
          name: { us: "", lv: "", no: "" },
          price: 0,
          detailText: { us: "", lv: "", no: "" },
          image: "",
        },
      ]);
    } else {
      setSessions([
        {
          id: shortid.generate(),
          name: { us: "", lv: "", no: "" },
          price: "",
          detailText: { us: "", lv: "", no: "" },
          image: "",
        },
      ]);
    }
  };

  let editSessionImage = ({ stateId, data }) => {
    let newSession = [...sessions.filter((s) => s.id === stateId)][0];
    // IF CURRENT IMAGE IS A LINK,MARK IT FOR DELETION
    let isUrl = newSession.image.match(/(images\/\.*)/);
    if (isUrl) {
      // ADD OLD TO DELETE
      newSession.oldImage = newSession.image;
    }
    newSession.image = data;
    let newSessions = sessions.map((session) => {
      if (session.id === stateId) {
        return newSession;
      } else {
        return session;
      }
    });
    setSessions(newSessions);
  };

  let editSession = (e, sessionId, sessionName, language = "") => {
    let newSession = [...sessions.filter((s) => s.id === sessionId)][0];
    if (["name", "detailText"].includes(sessionName)) {
      newSession[sessionName][language] = e.target.value;
    } else {
      newSession[sessionName] = e.target.value;
    }
    let newSessions = sessions.map((session) => {
      if (session.id === sessionId) {
        return newSession;
      } else {
        return session;
      }
    });
    setSessions(newSessions);
  };

  let addGalleryImage = () => {
    if (sessions.lusth > 0) {
      setGalleryImages([
        ...galleryImages,
        {
          id: shortid.generate(),
          image: "",
          text: { us: "", lv: "", no: "" },
        },
      ]);
    } else {
      setGalleryImages([
        {
          id: shortid.generate(),
          image: "",
          text: { us: "", lv: "", no: "" },
        },
      ]);
    }
  };
  let updateGaleryImageText = (e, id, language) => {
    let newGalleryImage = [...galleryImages.filter((s) => s.id === id)][0];
    newGalleryImage[e.target.name][language] = e.target.value;
    let newGalleryImages = galleryImages.map((galleryImage) => {
      if (galleryImage.id === id) {
        return newGalleryImage;
      } else {
        return galleryImage;
      }
    });
    setGalleryImages(newGalleryImages);
  };

  let updateThumbnailImage = ({ stateId, data }) => {
    let newThumbnailImage = { ...thumbnailImage };
    let isUrl = newThumbnailImage.image.match(/(images\/.*)/);
    if (isUrl) {
      // ADD OLD TO DELETE
      newThumbnailImage.oldImage = thumbnailImage.image;
    }
    newThumbnailImage.image = data;
    setThumbnailImage(newThumbnailImage);
  };

  let editGalleryImageImage = ({ stateId, data }) => {
    let newGalleryImage = [...galleryImages.filter((s) => s.id === stateId)][0];
    let isUrl = newGalleryImage.image.match(/(images\/.*)/);
    if (isUrl) {
      // ADD OLD TO DELETE
      newGalleryImage.oldImage = newGalleryImage.image;
    }
    newGalleryImage.image = data;
    let newGalleryImages = galleryImages.map((image) => {
      if (image.id === stateId) {
        return newGalleryImage;
      } else {
        return image;
      }
    });
    setGalleryImages(newGalleryImages);
  };

  let toggleDeleteSession = (sessionId) => {
    let newSession = [...sessions.filter((s) => s.id === sessionId)][0];
    newSession.delete && newSession.delete === true
      ? (newSession.delete = false)
      : (newSession.delete = true);
    let newSessions = sessions.map((session) => {
      if (session.id === sessionId) {
        return newSession;
      } else {
        return session;
      }
    });
    setSessions(newSessions);
  };
  let toggleDeleteGalleryImage = (imageId) => {
    let newGalleryImage = [...galleryImages.filter((s) => s.id === imageId)][0];
    newGalleryImage.delete && newGalleryImage.delete === true
      ? (newGalleryImage.delete = false)
      : (newGalleryImage.delete = true);
    if (newGalleryImage.image === "") {
      newGalleryImage.image = newGalleryImage.oldImage;
      newGalleryImage.oldImage = "";
    } else {
      newGalleryImage.oldImage = newGalleryImage.image;
      newGalleryImage.image = "";
    }
    let newGalleryImages = galleryImages.map((image) => {
      if (image.id === imageId) {
        return newGalleryImage;
      } else {
        return image;
      }
    });
    setGalleryImages(newGalleryImages);
  };

  let createService = async (e) => {
    e.preventDefault();
    setOverlay(true);
    let idToken = await user.getIdToken();
    // UPLOAD SESSIONS IMAGES
    let folder_name = shortid.generate();
    let imageRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: {},
    };
    let newSessions = [];
    for await (let session of sessions) {
      imageRequestOptions.body = JSON.stringify({
        imageSrc: session.image,
        path: `services/${folder_name}/sessionImages`,
      });
      let res = await fetch(uploadImgUrl, imageRequestOptions);
      let { public_id } = await res.json();
      let newSession = { ...session, image: public_id };
      newSessions.push(newSession);
    }
    // UPLOAD IMAGE GALLERY
    let newGalleryImages = [];
    for await (let galleryImage of galleryImages) {
      imageRequestOptions.body = JSON.stringify({
        imageSrc: galleryImage.image,
        path: `services/${folder_name}/galleryImages`,
      });
      let res = await fetch(uploadImgUrl, imageRequestOptions);
      let { public_id } = await res.json();
      let newGalleryImage = { ...galleryImage, image: public_id };
      newGalleryImages.push(newGalleryImage);
    }

    // UPLOAD THUMBNAIL IMAGE
    let thumbnailImagePublicId = "";
    imageRequestOptions.body = JSON.stringify({
      imageSrc: thumbnailImage.image,
      path: `services/${folder_name}/thumbnailImage`,
    });
    let res = await fetch(uploadImgUrl, imageRequestOptions);
    let { public_id: thumbnailId } = await res.json();
    thumbnailImagePublicId = thumbnailId;
    const serviceRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        folder_name,
        name: serviceName,
        paragraphText: serviceParagraph,
        details,
        sessions: newSessions,
        imageGallery: newGalleryImages,
        thumbnailImage: thumbnailImagePublicId,
      }),
    };
    await fetch(createServiceUrl, serviceRequestOptions);
    // let result = await data.json();
    setOverlay(false);
    // console.log("service", result);
  };
  let updateService = async (e) => {
    e.preventDefault();
    setOverlay(true);
    let idToken = await user.getIdToken(true);
    // UPLOAD SESSIONS IMAGES
    let imageRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: {},
    };
    let newSessions = [];
    for (let session of sessions) {
      // UPLOAD NEW IMAGE IF ITS NOT AN URL
      let isUrl = session.image.match(/sessionImages/g);
      if (!session.delete && !isUrl) {
        imageRequestOptions.body = JSON.stringify({
          imageSrc: session.image,
          path: `services/${folder_name}/sessionImages`,
        });
        let res = await fetch(uploadImgUrl, imageRequestOptions);
        let { public_id } = await res.json();
        let newSession = { ...session, image: public_id };
        newSessions.push(newSession);
      } else {
        newSessions.push(session);
      }
    }
    console.log("deleting sessions");

    // DELETE OLD SESSIONS IMAGE
    let imageDeleteRequestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: {},
    };
    for (let session of newSessions) {
      if (session.oldImage) {
        imageDeleteRequestOptions.body = JSON.stringify({
          public_id: session.oldImage,
        });
        await fetch(deleteImgUrl, imageDeleteRequestOptions);
        session.oldImage = "";
      } else if (session.delete && session.image.match(/sessionImages/g)) {
        imageDeleteRequestOptions.body = JSON.stringify({
          public_id: session.image,
        });
        await fetch(deleteImgUrl, imageDeleteRequestOptions);
        session.image = "";
      }
    }

    // UPDATE IMAGE GALLERY
    console.log("updating gallery");

    let newGalleryImages = [];
    for (let galleryImage of galleryImages) {
      // UPLOAD NEW IMAGE IF ITS NOT AN URL
      let isUrl = galleryImage.image.match(/galleryImages/g);
      if (!isUrl && galleryImage.image !== "") {
        imageRequestOptions.body = JSON.stringify({
          imageSrc: galleryImage.image,
          path: `services/${folder_name}/galleryImages`,
        });
        let res = await fetch(uploadImgUrl, imageRequestOptions);
        let { public_id } = await res.json();
        let newGalleryImage = { ...galleryImage, image: public_id };
        newGalleryImages.push(newGalleryImage);
      } else {
        newGalleryImages.push(galleryImage);
      }
    }
    console.log("deleting gallery images");

    // DELETE OLD IMAGE FROM GALLERY
    for (let galleryImage of newGalleryImages) {
      if (galleryImage.oldImage) {
        imageDeleteRequestOptions.body = JSON.stringify({
          public_id: galleryImage.oldImage,
        });
        await fetch(deleteImgUrl, imageDeleteRequestOptions);
        galleryImage.oldImage = "";
      }
    }
    // UPLOAD THUMBNAIL IMAGE
    console.log("uploading thumbnailImage");
    let thumbnailImagePublicId = thumbnailImage.image.match(/thumbnailImage/g);
    // UPLOAD NEW UPLOAD THUMBNAIL IMAGE IF ITS NOT AN URL
    if (!thumbnailImagePublicId && thumbnailImage.image !== "") {
      imageRequestOptions.body = JSON.stringify({
        imageSrc: thumbnailImage.image,
        path: `services/${folder_name}/thumbnailImage`,
      });
      let res = await fetch(uploadImgUrl, imageRequestOptions);
      let { public_id: thumbnailId } = await res.json();
      thumbnailImagePublicId = thumbnailId;
    } else {
      thumbnailImagePublicId = thumbnailImage.image;
    }
    //DELETE OLD THUMB IMAGE
    if (thumbnailImage.oldImage) {
      imageDeleteRequestOptions.body = JSON.stringify({
        public_id: thumbnailImage.oldImage,
      });
      await fetch(deleteImgUrl, imageDeleteRequestOptions);
      thumbnailImage.oldImage = "";
    }

    const serviceRequestOptions = {
      method: "PATCH",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        key,
        name: serviceName,
        paragraphText: serviceParagraph,
        details,
        sessions: newSessions,
        folder_name,
        imageGallery: newGalleryImages,
        thumbnailImage: thumbnailImagePublicId,
      }),
    };
    try {
      await fetch(updateServiceUrl, serviceRequestOptions);
      // let data = await updateRes.json();
      setOverlay(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Fragment>
      <Overlay uploading={overlay} />
      <CloudinaryContext cloudName="sunshinephoto">
        <div className="d-flex">
          <div className="d-flex flex-column w-25 mx-auto">
            {allServices.map((service) => {
              let image =
                service && service.thumbnailImage
                  ? service.thumbnailImage
                  : "images/portfolio/couples/placeholder_klk233";
              return (
                <div
                  style={{
                    cursor: "pointer",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={service.key}
                  onClick={() => {
                    // SET EXISTING JOURNAL TO EDIT
                    setServiceToEdit(service);
                  }}
                >
                  <h4 className="text-center">{service.name[language]}</h4>
                  <Image
                    publicId={image}
                    width="250"
                    height="250"
                    secure="true"
                    style={{
                      backgroundSize: "cover",
                    }}
                  >
                    <Transformation quality="auto" fetchFormat="auto" />
                  </Image>
                </div>
              );
            })}
          </div>

          <div id="services-tab" className="d-flex flex-column w-50 mx-auto">
            <div className="text-center d-flex flex-column">
              <button onClick={setNewService}>New Service</button>
              <hr
                style={{
                  border: "1px solid black",
                  width: "100%",
                }}
              />
              <div className="d-flex align-items-center">
                <ReactCountryFlag
                  countryCode="US"
                  svg
                  style={{
                    width: "2em",
                    height: "100%",
                  }}
                />
                <input
                  className="text-center w-100"
                  type="text"
                  placeholder="service name us"
                  value={serviceName["us"]}
                  onChange={(e) => updateServiceName(e, "us")}
                />
              </div>
              <div className="d-flex align-items-center">
                <ReactCountryFlag
                  countryCode="LV"
                  svg
                  style={{
                    width: "2em",
                    height: "100%",
                  }}
                />
                <input
                  className="text-center w-100"
                  type="text"
                  placeholder="service name lv"
                  value={serviceName["lv"]}
                  onChange={(e) => updateServiceName(e, "lv")}
                />
              </div>

              <div className="d-flex align-items-center">
                <ReactCountryFlag
                  countryCode="NO"
                  svg
                  style={{
                    width: "2em",
                    height: "100%",
                  }}
                />
                <input
                  className="text-center w-100"
                  type="text"
                  placeholder="service name no"
                  value={serviceName["no"]}
                  onChange={(e) => updateServiceName(e, "no")}
                />
              </div>
              <hr
                style={{
                  border: "1px solid black",
                  width: "100%",
                }}
              />
              <div className="d-flex align-items-center">
                <ReactCountryFlag
                  countryCode="US"
                  svg
                  style={{
                    width: "2em",
                    height: "100%",
                  }}
                />
                <textarea
                  className="text-center w-100"
                  type="text"
                  placeholder="service text us"
                  value={serviceParagraph["us"]}
                  onChange={(e) => updateServiceParagraph(e, "us")}
                />
              </div>

              <div className="d-flex align-items-center">
                <ReactCountryFlag
                  countryCode="LV"
                  svg
                  style={{
                    width: "2em",
                    height: "100%",
                  }}
                />
                <textarea
                  className="text-center w-100"
                  type="text"
                  placeholder="service text lv "
                  value={serviceParagraph["lv"]}
                  onChange={(e) => updateServiceParagraph(e, "lv")}
                />
              </div>

              <div className="d-flex align-items-center">
                <ReactCountryFlag
                  countryCode="NO"
                  svg
                  style={{
                    width: "2em",
                    height: "100%",
                  }}
                />
                <textarea
                  className="text-center w-100"
                  type="text"
                  placeholder="service text no"
                  value={serviceParagraph["no"]}
                  onChange={(e) => updateServiceParagraph(e, "no")}
                />
              </div>
            </div>
            <hr
              style={{
                border: "1px solid black",
                width: "100%",
              }}
            />
            <div className="text-center d-flex flex-column">
              {details.map((detail, i) => {
                return (
                  <div
                    key={`service-detail-${i}`}
                    className="text-center d-flex-column"
                  >
                    {Object.keys(detail).map((language) => {
                      return (
                        <Fragment>
                          <div className="d-flex align-items-center">
                            <ReactCountryFlag
                              countryCode={language}
                              svg
                              style={{
                                width: "2em",
                                height: "100%",
                              }}
                            />
                            <input
                              type="text"
                              placeholder={`Service detail. ${language}`}
                              id={`service-detail-${i} ${language}`}
                              value={detail[language]}
                              onChange={(e) =>
                                updateServiceDetail(e, i, language)
                              }
                              style={{
                                width: "100%",
                              }}
                            />
                          </div>
                        </Fragment>
                      );
                    })}
                    <button
                      onClick={() => removeDetail(i)}
                      className="d-flex align-items-center justify-content-center w-100"
                    >
                      <FontAwesomeIcon
                        color="red"
                        icon={faMinusCircle}
                        size="sm"
                      />
                      Delete Detail
                    </button>
                  </div>
                );
              })}
              <button
                onClick={addDetail}
                className="d-flex align-items-center justify-content-center"
              >
                <FontAwesomeIcon color="green" icon={faPlusCircle} size="sm" />
                Add detail
              </button>
            </div>
            <hr
              style={{
                border: "1px solid black",
                width: "100%",
              }}
            />
            <div className="text-center d-flex flex-column">
              {sessions.map((session) => {
                return (
                  <div id={session.id} key={session.id} className="d-flex">
                    <div
                      className="d-flex"
                      style={{
                        flexGrow: 1,
                        position: "relvive",
                      }}
                    >
                      <div
                        className="overlay justify-content-center align-items-center text-center"
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          top: 0,
                          left: 0,
                          zIndex: "100",
                          background: "rgba(220,10,35,0.8)",
                          display: `${session.delete ? "flex" : "none"}`,
                        }}
                      >
                        <p>DELETE</p>
                      </div>
                      <div
                        className="text-center d-flex flex-column"
                        style={{
                          flexGrow: 1,
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <ReactCountryFlag
                            countryCode="US"
                            svg
                            style={{
                              width: "2em",
                              height: "100%",
                            }}
                          />
                          <input
                            className="w-100"
                            type="text"
                            placeholder="session name us"
                            name="name"
                            value={session.name["us"]}
                            onChange={(e) =>
                              editSession(e, session.id, "name", "us")
                            }
                          />
                        </div>

                        <div className="d-flex align-items-center">
                          <ReactCountryFlag
                            countryCode="LV"
                            svg
                            style={{
                              width: "2em",
                              height: "100%",
                            }}
                          />
                          <input
                            className="w-100"
                            type="text"
                            placeholder="session name lv"
                            name="name"
                            value={session.name["lv"]}
                            onChange={(e) =>
                              editSession(e, session.id, "name", "lv")
                            }
                          />
                        </div>

                        <div className="d-flex align-items-center">
                          <ReactCountryFlag
                            countryCode="NO"
                            svg
                            style={{
                              width: "2em",
                              height: "100%",
                            }}
                          />
                          <input
                            className="w-100"
                            type="text"
                            placeholder="session name no"
                            name="name"
                            value={session.name["no"]}
                            onChange={(e) =>
                              editSession(e, session.id, "name", "no")
                            }
                          />
                        </div>

                        <input
                          type="text"
                          placeholder="session price"
                          name="price"
                          value={session.price}
                          onChange={editSession}
                        />
                        <div className="d-flex align-items-center">
                          <ReactCountryFlag
                            countryCode="US"
                            svg
                            style={{
                              width: "2em",
                              height: "100%",
                            }}
                          />
                          <textarea
                            className="w-100"
                            rows={6}
                            type="text"
                            placeholder="session detailText us"
                            name="detailText"
                            value={session.detailText["us"]}
                            onChange={(e) =>
                              editSession(e, session.id, "detailText", "us")
                            }
                          />
                        </div>

                        <div className="d-flex align-items-center">
                          <ReactCountryFlag
                            countryCode="LV"
                            svg
                            style={{
                              width: "2em",
                              height: "100%",
                            }}
                          />
                          <textarea
                            className="w-100"
                            rows={6}
                            type="text"
                            placeholder="session detailText lv"
                            name="detailText"
                            value={session.detailText["lv"]}
                            onChange={(e) =>
                              editSession(e, session.id, "detailText", "lv")
                            }
                          />
                        </div>

                        <div className="d-flex align-items-center">
                          <ReactCountryFlag
                            countryCode="NO"
                            svg
                            style={{
                              width: "2em",
                              height: "100%",
                            }}
                          />
                          <textarea
                            className="w-100"
                            rows={6}
                            type="text"
                            placeholder="session detailText no"
                            name="detailText"
                            value={session.detailText["no"]}
                            onChange={(e) =>
                              editSession(e, session.id, "detailText", "no")
                            }
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          border: "1px solid black",
                        }}
                      >
                        <ImageWithThumbnail
                          {...{
                            loadFile,
                            stateId: session.id,
                            id: `service-session-image-${session.id}`,
                            srcLink: session.image,
                            stateUpdater: editSessionImage,
                          }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => toggleDeleteSession(session.id)}
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <FontAwesomeIcon
                        color={session.delete ? "green" : "red"}
                        icon={session.delete ? faPlusCircle : faMinusCircle}
                        size="sm"
                      />
                      {session.delete ? "Restore Session" : "Delete Session"}
                    </button>
                  </div>
                );
              })}
              <button
                onClick={addSession}
                className="d-flex align-items-center justify-content-center"
              >
                <FontAwesomeIcon color="green" icon={faPlusCircle} size="sm" />
                Add session
              </button>
            </div>
            <hr
              style={{
                border: "1px solid black",
                width: "100%",
              }}
            />
            <div className="d-flex flex-column">
              {/* gallery images */}
              {galleryImages.map((image) => {
                return (
                  <div
                    key={image.id}
                    id={image.id}
                    className={`d-flex ${
                      image.delete ? "gallery-image-delete" : ""
                    }`}
                  >
                    <div
                      className="d-flex flex-column"
                      style={{
                        flexGrow: "1",
                        border: "1px solid black",
                        position: "relvive",
                      }}
                    >
                      <div
                        className="overlay justify-content-center align-items-center text-center"
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          top: 0,
                          left: 0,
                          zIndex: "100",
                          background: "rgba(220,10,35,0.8)",
                          display: `${image.delete ? "flex" : "none"}`,
                        }}
                      >
                        <p>DELETE</p>
                      </div>
                      <ImageWithThumbnail
                        {...{
                          loadFile,
                          stateId: image.id,
                          id: `service-galery-image-${image.id}`,
                          srcLink: image.image,
                          stateUpdater: editGalleryImageImage,
                          style: {
                            height: "450px",
                            backgroundSize: "cover",
                          },
                        }}
                      />
                      <div className="d-flex align-items-center">
                        <ReactCountryFlag
                          countryCode="US"
                          svg
                          style={{
                            width: "2em",
                            height: "100%",
                          }}
                        />
                        <input
                          type="text"
                          name="text"
                          placeholder="a short comment if you want us"
                          value={image.text["us"]}
                          onChange={(e) =>
                            updateGaleryImageText(e, image.id, "us")
                          }
                          style={{ width: "100%" }}
                        />
                      </div>

                      <div className="d-flex align-items-center">
                        <ReactCountryFlag
                          countryCode="LV"
                          svg
                          style={{
                            width: "2em",
                            height: "100%",
                          }}
                        />
                        <input
                          type="text"
                          name="text"
                          placeholder="a short comment if you want lv"
                          value={image.text["lv"]}
                          onChange={(e) =>
                            updateGaleryImageText(e, image.id, "lv")
                          }
                          style={{ width: "100%" }}
                        />
                      </div>

                      <div className="d-flex align-items-center">
                        <ReactCountryFlag
                          countryCode="NO"
                          svg
                          style={{
                            width: "2em",
                            height: "100%",
                          }}
                        />
                        <input
                          type="text"
                          name="text"
                          placeholder="a short comment if you want no"
                          value={image.text["no"]}
                          onChange={(e) => updateGaleryImageText(e, image.id)}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                    <button
                      className="d-flex flex-column align-items-center justify-content-center"
                      onClick={() => {
                        toggleDeleteGalleryImage(image.id);
                      }}
                    >
                      <FontAwesomeIcon
                        color={image.delete ? "green" : "red"}
                        icon={image.delete ? faPlusCircle : faMinusCircle}
                        size="sm"
                      />
                      {image.delete ? "Restore Image" : "Delete Image"}
                    </button>
                  </div>
                );
              })}
              <button
                onClick={addGalleryImage}
                className="d-flex align-items-center justify-content-center"
              >
                <FontAwesomeIcon color="green" icon={faPlusCircle} size="sm" />
                Add Gallery Image
              </button>
            </div>
            <hr
              style={{
                border: "1px solid black",
                width: "100%",
              }}
            />
            <div
              className="w-50 mx-auto h-100 d-flex flex-column align-items-center"
              style={{
                maxHeight: "300px",
                overflow: "hidden",
                margin: "1rem",
              }}
            >
              <h4>Thumbnail Image</h4>

              <ImageWithThumbnail
                {...{
                  loadFile,
                  stateId: thumbnailImage.id,
                  id: `service-thumbnailImage-image-${thumbnailImage.id}`,
                  srcLink: thumbnailImage.image,
                  stateUpdater: updateThumbnailImage,
                  style: {
                    height: "300px",
                    width: "300px",
                    border: "1px solid black",
                  },
                }}
              />
            </div>
            {folder_name ? (
              <button onClick={updateService}>Update Service</button>
            ) : (
              <button onClick={createService}>Create Service</button>
            )}
          </div>
        </div>
      </CloudinaryContext>
    </Fragment>
  );
};

export default ServicesView;
