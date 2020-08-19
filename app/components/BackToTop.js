import React from 'react';
import styled, { keyframes } from 'styled-components';

const backToTop = ({ showScroll, onClick }) => {
  return (
    <BackToTop showScroll={showScroll} onClick={onClick}>
      <ScreenReaderText>Back to top</ScreenReaderText>
    </BackToTop>
  );
};

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
  border: 2px solid ${props => props.theme.colors.greenBean};
  border-radius: 50%;
  z-index: 1000;
  cursor: pointer;
  right: 10px;
  bottom: 20px;
  animation: ${fadeIn} 0.3s;
  transition: opacity 0.4s;
  opacity: 1;
  padding: 10px;
  background: ${props => props.theme.colors.white};

  @media ${props => props.theme.breakpoints.md} {
    display: ${props => (props.showScroll ? 'flex' : 'none')};
  }

  @media ${props => props.theme.breakpoints.mdMax} {
    transform: scale(0.7);
  }

  @media ${props => props.theme.breakpoints.lg} {
    margin-bottom: 60px;
  }

  &:before {
    content: '';
    mask: url('/app/assets/icons/arrow.svg') no-repeat 50% 50%;
    mask-size: cover;
    width: 20px;
    height: 20px;
    border: 1px solid ${props => props.theme.colors.greenBean};
    background: ${props => props.theme.colors.greenBean};
  }

  &:hover {
    box-shadow: ${props => props.theme.boxShadow.xLight};
  }

  &:active {
    background: ${props => props.theme.colors.greenBean};

    &:before {
      border-color: ${props => props.theme.colors.white};
      background: ${props => props.theme.colors.white};
    }
  }
`;

const ScreenReaderText = styled.span`
  ${props => props.theme.srOnly}
`;

export default backToTop;
