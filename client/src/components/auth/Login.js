import React, { useState } from "react";

import { FormGroup } from "./../uiElements/FormElements/FormGroup";
import { HeroHeader } from "./../uiElements/Header";
import { PrimaryButton } from "./../uiElements/Button";
import Anchor from "../uiElements/Texts/Link";
import { MutedText } from "../uiElements/Texts/TextElement";
import settings from "./../../settings/settings";
import styled from "styled-components";
import { SpinnerFullPage } from "./../uiElements/Spinner";

//redux
import { connect } from "react-redux";
import { login } from "./../../redux/actions/auth";

// Routing
import { Redirect } from "react-router-dom";

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

const Login = (props) => {
  // State.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    emailErr: "",
    passwordErr: "",
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

  const submit = (e) => {
    e.preventDefault();
    props.login(formData.email, formData.password);
  };

  // Redirect if user is autheticated.
  if (props.authenticated) {
    return <Redirect to="/todolist" />;
  }

  const deviceWidth = window.innerWidth;
  // Mobilew view
  if (deviceWidth < settings.breakpoints.mobile) {
    if (props.fetchInProgress) {
      return <SpinnerFullPage />;
    }

    return (
      <Container class="container">
        <div className="row justify-content-center">
          <HeroHeader>Login</HeroHeader>
          <form
            onSubmit={(e) => {
              submit(e);
            }}
          >
            {/* Email */}
            <div className="col-12">
              <FormGroup
                type="input"
                name="email"
                placeholder="E-Mail"
                value={formData.email}
                error={props.errors.email}
                errorText={props.errors.email}
                onChange={handleInputChange}
              />
            </div>

            {/* Password */}
            <div className="col-12">
              <FormGroup
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                error={props.errors.password}
                errorText={props.errors.password}
                onChange={handleInputChange}
              />
            </div>
            {/* Submit Button */}
            <div className="col-12">
              <PrimaryButton type="submit" fullWidth={true}>
                Login
              </PrimaryButton>

              {/* Go to login text */}
              <TextWrapper bottom={false}>
                <MutedText>
                  Du hast noch keinen Account?{" "}
                  <Anchor to="/register" underline={true}>
                    Anmelden
                  </Anchor>
                </MutedText>
              </TextWrapper>
            </div>
          </form>
        </div>
      </Container>
    );
  }

  return <div>Desktop View</div>;
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  authenticated: state.auth.authenticated,
  user: state.auth.user,
  errors: state.auth.errors,
  fetchInProgress: state.auth.fetchInProgress,
});

export default connect(mapStateToProps, { login })(Login);
