// src/components/SocialSignInButtons.jsx
// eslint-disable-next-line no-unused-vars
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { userSocialSignOn } from "../../api/authApi";
/**
 * SocialSignInButtons
 *
 * A component that renders two buttons for signing in with Google and GitHub.
 *
 * @param {Function} setError - A function to set error messages.
 *
 * @returns {React.ReactElement} - A React component that renders social sign-in buttons.
 */
const SocialSignInButtons = ({ setError }) => {
  const handleSocialSignIn = useCallback(
    async (provider) => {
      await userSocialSignOn(provider, setError);
    },
    [setError]
  );

  return (
    <div className="flex justify-center space-x-4  flex-wrap md:space-x-10">
      <div>
      <button
        className="button"
        style={{
          display: "flex",
          padding: "0.5rem 1.4rem",
          fontWeight: 500,
          textAlign: "center",
          textTransform: "uppercase",
          verticalAlign: "middle",
          alignItems: "center",
          borderRadius: "0.5rem",
          border: "1px solid rgba(0, 0, 0, 0.25)",
          gap: "0.75rem",
          color: "rgb(65, 63, 63)",
          backgroundColor: "#fff",
          cursor: "pointer",
          transition: "all .6s ease",
        }}
        onClick={() => handleSocialSignIn("google")}
      >
        <FcGoogle size={25} />
        Continue with Google
      </button>
      </div>
      <div className='my-3 mx-0'>
      <button
        className="button"
        style={{
          display: "flex",
          padding: "0.5rem 1.4rem",
          fontWeight: 500,
          textAlign: "center",
          textTransform: "uppercase",
          verticalAlign: "middle",
          alignItems: "center",
          borderRadius: "0.5rem",
          border: "1px solid rgba(0, 0, 0, 0.25)",
          gap: "0.75rem",
          color: "rgb(65, 63, 63)",
          backgroundColor: "#fff",
          cursor: "pointer",
          transition: "all .6s ease",
        }}
        onClick={() => handleSocialSignIn("github")}
      >
        <FaGithub size={25} />
        Continue with Github
      </button>
      </div>
    </div>
  );
};

SocialSignInButtons.propTypes = {
  setError: PropTypes.func,
};

export default SocialSignInButtons;
