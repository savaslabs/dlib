import React, { Component } from 'React';
import { images, captions } from '../../utils/constants';
import Lightbox from 'react-accessible-lightbox';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export default class gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  render() {
    const { photoIndex, isOpen } = this.state;
    // Open lightbox anytime a photo is clicked.
    const openLightbox = (e) => {
      const photoIndex = e.target.getAttribute('data-photoindex');
      this.setState({ photoIndex: photoIndex });
      this.setState({ isOpen: true });
    };

    return (
      <main>
        <h1>Photo Gallery</h1>
        <GalleryGrid>
          {images &&
            images.map((image, i) => {
              return (
                <Image
                  src={`app/assets/images/${image}/full.jpg`}
                  alt={captions[i]}
                  key={i}
                  data-photoindex={i}
                  onClick={openLightbox}
                />
              );
            })}

          {isOpen && (
            <Lightbox
              mainSrc={`app/assets/images/${images[photoIndex]}/full.jpg`}
              nextSrc={`app/assets/images/${
                images[(photoIndex + 1) % images.length]
              }/full.jpg`}
              previousSrc={`app/assets/images/${
                images[(photoIndex + images.length - 1) % images.length]
              }/full.jpg`}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + images.length - 1) % images.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % images.length,
                })
              }
              imageCaption={captions[photoIndex]}
            />
          )}
        </GalleryGrid>
      </main>
    );
  }
}

const GalleryGrid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  row-gap: 24px;

  ${breakpoint('md')`
    grid-template-columns: repeat(2, 1fr);
    column-gap: 61px;
    row-gap: 61px;
  `}

  ${breakpoint('lg')`
    grid-template-columns: repeat(3, 1fr);
  `}
`;

const Image = styled.img`
  max-width: calc(100vw - 36px);
  ${breakpoint('md')`
    max-width: 339px;
    max-height: 339px;
  `}
  ${breakpoint('lg')`
    max-width: 347px;
    max-height: 347px;
  `}
`;
