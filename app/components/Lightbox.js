import React, { Component } from 'React';
import Lightbox from 'react-accessible-lightbox';

export default class lightbox extends Component {
  render() {
    const {
      imageIds,
      imageCaptions,
      photoIndex,
      isOpen,
      closeLightbox,
      nextLightboxImage,
    } = this.props;

    return (
      <>
        {isOpen && (
          <Lightbox
            mainSrc={`app/assets/images/${imageIds[photoIndex]}/full.jpg`}
            nextSrc={`app/assets/images/${
              imageIds[(photoIndex + 1) % imageIds.length]
            }/full.jpg`}
            previousSrc={`app/assets/images/${
              imageIds[(photoIndex + imageIds.length - 1) % imageIds.length]
            }/full.jpg`}
            onCloseRequest={() => closeLightbox()}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex:
                  (photoIndex + imageIds.length - 1) % imageIds.length,
              })
            }
            onMoveNextRequest={() =>
              nextLightboxImage()
            }
            imageCaption={imageCaptions[photoIndex]}
          />
        )}
      </>
    );
  }
}
