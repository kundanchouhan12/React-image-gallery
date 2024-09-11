import React from 'react';
import { useLocation } from 'react-router-dom';

const ImageDetail = () => {
  const location = useLocation();
  const { image } = location.state;

  return (
    <div>
      <h1>{image.tags}</h1>
      <img src={image.webformatURL} alt={image.tags} />
      <p>Comments: {image.comments}</p>
      <p>Likes: {image.likes}</p>
    </div>
  );
};

export default ImageDetail;
