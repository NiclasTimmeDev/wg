import React, { useState } from "react";

import { FormGroup } from "./../uiElements/FormElements/FormGroup";
import { HeroHeader } from "./../uiElements/Header";
import settings from "./../../settings/settings";

const Login = (props) => {
  // State.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /**
   * Handle change in user input.
   *
   * @param {Object} e
   *   The event object.
   */
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const deviceWidth = window.innerWidth;
  // Mobilew view
  if (deviceWidth < settings.breakpoints.mobile) {
    // TODO: return mobile view
    return (
      <div className="container">
        <div className="row justify-content-center">
          <HeroHeader>Login</HeroHeader>
          <FormGroup
            type="input"
            name="email"
            placeholder="E-Mail"
            value={formData.email}
            error=""
            errorText=""
            onChange={handleInputChange}
          />
        </div>
      </div>
    );
  }

  return <div>Desktop View</div>;
};

export default Login;
