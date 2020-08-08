import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const AlertDiv = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${(props) =>
    props.type === "danger"
      ? "#F8D7DB"
      : props.type === "warning"
      ? "#FFF3CD"
      : "#D4EDDA"};
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.type === "danger"
      ? "#721C24"
      : props.type === "warning"
      ? "#846405"
      : "#367042"};
`;

/**
 * Banner at the top of the page to display an alert.
 *
 * @prop {String} type
 *    The type of error (danger, warning
 *
 * @prop {String} message
 *   The message
 *
 * @return null
 */
const Alert = (props) => {
  return (
    props.type !== "none" && (
      <AlertDiv type={props.type}>{props.message}</AlertDiv>
    )
  );
};

const mapStateToProps = (state) => ({
  type: state.alert.type,
  message: state.alert.message,
});

export default connect(mapStateToProps)(Alert);
