import React from "react";

import { ImFacebook2 } from "react-icons/im";
import { FaGithubSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";

import "./styles.css";

const Footer = () => {
  const socials = [
    { name: "instagram", address: "https://www.instagram.com/monsur.azeez/" },
    { name: "twitter", address: "https://twitter.com/KennyOniyi" },
    { name: "facebook", address: "https://web.facebook.com/don.kennie1" },
    {
      name: "linkedin",
      address: "https://www.linkedin.com/in/monsur-azeez-0b29588b/",
    },
    { name: "github", address: "https://github.com/azmonsur" },
  ];

  const getSocialIcon = (icon) => {
    switch (icon.toLowerCase()) {
      case "facebook":
        return <ImFacebook2 />;
      case "linkedin":
        return <ImLinkedin />;
      case "instagram":
        return <FaInstagramSquare />;
      case "github":
        return <FaGithubSquare />;
      case "twitter":
        return <FaTwitterSquare />;
      default:
        return null;
    }
  };

  // const fetchSocials = async () => {
  //   const socials = await getSocials()(dispatch);

  //   setSocials(socials);
  // };

  // useEffect(() => {
  //   fetchSocials();
  // }, []);

  return (
    <div className="footer">
      <a
        href="https://azeezmonsur.netlify.app"
        target="_blank"
        className="nick"
      >
        Azeez Monsur<sup> &trade;</sup>
      </a>
      <div className="socials">
        {socials.length > 0 && (
          <div className="social-wrapper">
            {socials.map((social, key) => (
              <a
                className="each-social"
                href={social.address}
                key={key}
                target="_blank"
              >
                {getSocialIcon(social.name)}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="copyright">
        {new Date().getFullYear()} <sup>&copy;</sup>{" "}
      </div>
    </div>
  );
};

export default Footer;
