import React from "react";
import styled from "styled-components";

const Muted = styled.p`
  font-size: ${(props) => props.theme.minor} !important;
`;
export const MutedText = (props) => {
  return <Muted>{props.children}</Muted>;
};
