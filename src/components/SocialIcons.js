const getIcons = async () => {
  let { FontAwesomeIcon } = await import("@fortawesome/react-fontawesome");
  let { faFacebook, faInstagram } = await import(
    "@fortawesome/free-brands-svg-icons"
  );
  let { faEnvelope } = await import("@fortawesome/free-solid-svg-icons");
  return new Promise((resolve, reject) => {
    resolve({
      FontAwesomeIcon,
      faFacebook,
      faInstagram,
      faEnvelope,
    });
  });
};

export default getIcons;
