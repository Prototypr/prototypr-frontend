import React, { useState } from 'react';
import axios from 'axios';

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        try {
            // Make API call to update the post's like field
            // await axios.put(`/api/posts/${postId}`, { liked: !liked });

            // Toggle the liked state
            setLiked(!liked);
        } catch (error) {
            console.error('Error updating post like:', error);
        }
    };

    return (
        <button onClick={handleLike}>
            {liked ? '❤️ Liked' : '🤍 Like'}
        </button>
    );
};

export default LikeButton;