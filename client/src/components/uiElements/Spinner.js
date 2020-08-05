import React, { Fragment } from "react";
import Cliploader from "react-spinners/ClipLoader";
import styled from "styled-components";

/**
 * Spinner that takes the full page
 *
 * @prop size
 *   The size of the Spinner in pixels. Defaults to 150=w=h
 */
const SpinnerFullPage = (props) => {
  const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    opacity: 0.7;
    z-index: 1000;
  `;
  return (
    <Fragment>
      <Wrapper>
        <Cliploader color={"#9314F5"} size={150} />
      </Wrapper>
    </Fragment>
  );
};

/**
 * Spinner that has dynamic size.
 *
 * @prop size
 *   The size of the Spinner in pixels. Defaults to 150=w=h
 */
const Spinner = (props) => {
  return <Cliploader color={"#9314F5"} size={150} />;
};

export { SpinnerFullPage, Spinner };
