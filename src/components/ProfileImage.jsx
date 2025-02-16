// ProfileImage.jsx
import React, { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

function ProfileImage({ userId }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const storage = getStorage();
    // Assuming images are stored at: users/{userId}/profileImage.jpg
    const imageRef = ref(storage, `users/${userId}/profileImage.jpg`);
    getDownloadURL(imageRef)
      .then(url => setImageUrl(url))
      .catch(error => {
        console.error('Error fetching profile image:', error);
        // Optionally, set a default placeholder URL here
      });
  }, [userId]);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Profile" style={{ width: 150, height: 150, borderRadius: '50%' }} />
      ) : (
        <p>No profile image</p>
      )}
    </div>
  );
}

export default ProfileImage;
