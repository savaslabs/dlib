import React, { Component } from 'React';
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
    const { imageIds, imageCaptions, imageAltText } = this.props;
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
          {imageIds &&
            imageIds.map((id, i) => {
              return (
                <Image
                  src={`app/assets/images/${id}/full.jpg`}
                  alt={imageAltText[i]}
                  key={i}
                  data-photoindex={i}
                  onClick={openLightbox}
                />
              );
            })}

          {isOpen && (
            <Lightbox
              mainSrc={`app/assets/images/${imageIds[photoIndex]}/full.jpg`}
              nextSrc={`app/assets/images/${
                imageIds[(photoIndex + 1) % imageIds.length]
              }/full.jpg`}
              previousSrc={`app/assets/images/${
                imageIds[(photoIndex + imageIds.length - 1) % imageIds.length]
              }/full.jpg`}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + imageIds.length - 1) % imageIds.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % imageIds.length,
                })
              }
              imageCaption={imageCaptions[photoIndex]}
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
