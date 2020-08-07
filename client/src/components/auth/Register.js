import React, { useState } from "react";

import { FormGroup } from "./../uiElements/FormElements/FormGroup";
import { HeroHeader } from "./../uiElements/Header";
import { PrimaryButton } from "./../uiElements/Button";
import Anchor from "../uiElements/Texts/Link";
import { MutedText } from "../uiElements/Texts/TextElement";
import settings from "./../../settings/settings";
import styled from "styled-components";

const Register = (props) => {
  // Styling.
  const Container = styled.div.attrs((props) => ({
    className: props.class,
  }))`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

  const TextWrapper = styled.div`
    margin-bottom: ${(props) => (props.bottom ? props.theme.marginText : "0")};
    margin-top: ${(props) => (!props.bottom ? props.theme.marginText : "0")};
  `;

  // State.
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmed: "",
    usernameErr: "",
    emailErr: "",
    passwordErr: "",
    passwordConfirmedErr: "",
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
    return (
      <Container class="container">
        <div className="row justify-content-center">
          <HeroHeader>Register</HeroHeader>
          {/* Username */}
          <div className="col-12">
            <FormGroup
              type="input"
              name="Username"
              placeholder="username"
              value={formData.username}
              error={formData.usernameErr}
              errorText={formData.usernameErr}
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div className="col-12">
            <FormGroup
              type="input"
              name="email"
              placeholder="E-Mail"
              value={formData.email}
              error={formData.emailErr}
              errorText={formData.emailErr}
              onChange={handleInputChange}
            />
          </div>

          {/* Password */}
          <div className="col-12">
            <FormGroup
              type="password"
              name="paswword"
              placeholder="Password"
              value={formData.password}
              error={formData.passwordErr}
              errorText={formData.passwordErr}
              onChange={handleInputChange}
            />
          </div>

          {/* Password confirmed */}
          <div className="col-12">
            <FormGroup
              type="password"
              name="passwordConfirmed"
              placeholder="Confirm your password"
              value={formData.password}
              error={formData.passwordConfirmedErr}
              errorText={formData.passwordConfirmedErr}
              onChange={handleInputChange}
            />

            {/* AGB Text */}
            <TextWrapper bottom={true}>
              <MutedText>
                Mit einer Anmeldung akzeptierst du unsere{" "}
                <Anchor to="/agbs" underline={true}>
                  AGB's
                </Anchor>
              </MutedText>
            </TextWrapper>
          </div>

          {/* Submit Button */}
          <div className="col-12">
            <PrimaryButton type="submit" fullWidth={true}>
              Register
            </PrimaryButton>

            {/* Go to login text */}
            <TextWrapper bottom={false}>
              <MutedText>
                Du hast bereits einen Account?{" "}
                <Anchor to="/login" underline={true}>
                  Anmelden
                </Anchor>
              </MutedText>
            </TextWrapper>
          </div>
        </div>
      </Container>
    );
  }

  return <div>Desktop View</div>;
};

export default Register;
