import React from 'react';
import arrow from '../assets/icons/arrow.svg';
import styled, { keyframes } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const backToTop = ({ showScroll, onClick }) => {
  return (
    <BackToTop showScroll={showScroll} onClick={onClick}>
      <ScreenReaderText>Back to top</ScreenReaderText>
    </BackToTop>
  );
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const BackToTop = styled.button`
  display: none;
  position: fixed;
  border: 2px solid ${(props) => props.theme.colors.greenBean};
  border-radius: 50%;
  z-index: 1000;
  cursor: pointer;
  right: 10px;
  bottom: 20px;
  animation: ${fadeIn} 0.3s;
  transition: opacity 0.4s;
  opacity: 1;
  padding: 10px;
  background: ${(props) => props.theme.colors.white};
  &:before {
    content: '';
    mask: url(${arrow}) no-repeat 50% 50%;
    mask-size: cover;
    width: 20px;
    height: 20px;
    border: 1px solid ${(props) => props.theme.colors.greenBean};
    background: ${(props) => props.theme.colors.greenBean};
  }

  &:hover {
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background: ${(props) => props.theme.colors.greenBean};

    &:before {
      border-color: ${(props) => props.theme.colors.white};
      background: ${(props) => props.theme.colors.white};
    }
  }

  ${breakpoint('md')`
    display: ${(props) => (props.showScroll ? 'flex' : 'none')};
  `}

  ${breakpoint('md', 'lg')`
    transform: scale(0.7);
  `}

  ${breakpoint('lg')`
    margin-bottom: 60px;
  `}
`;

const ScreenReaderText = styled.span`
  ${(props) => props.theme.srOnly}
`;

export default backToTop;
