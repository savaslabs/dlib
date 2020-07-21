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
      eventPage
    } = this.props;

    let location;
    if (eventPage) {
      location = "../app";
    } else {
      location = 'app';
    }
    return (
      <>
        {isOpen && (
          <Lightbox
            mainSrc={`${location}/assets/images/${imageIds[photoIndex]}/full.jpg`}
            nextSrc={`${location}/assets/images/${
              imageIds[(photoIndex + 1 < imageIds.length)
                ? photoIndex + 1
                : 0]
            }/full.jpg`}
            onCloseRequest={() => closeLightbox()}
            onMoveNextRequest={() => nextLightboxImage()}
            imageCaption={imageCaptions[photoIndex]}
          />
        )}
      </>
    );
  }
}
