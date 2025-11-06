import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';
import { useState } from 'react';

interface PostCardProps {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  pet?: {
    name: string;
    avatar: string;
  };
  caption: string;
  image: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  timestamp: string;
}

const PostCard: React.FC<PostCardProps> = ({
  user,
  pet,
  caption,
  image,
  likes,
  comments,
  isLiked = false,
  timestamp,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">{user.name}</p>
            {pet && (
              <p className="text-sm text-gray-600">
                with <span className="font-medium text-primary-600">{pet.name}</span>
              </p>
            )}
            <p className="text-xs text-gray-500">{timestamp}</p>
          </div>
        </div>
        <button className="text-gray-600 hover:text-gray-800">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Image */}
      <div className="relative">
        <img src={image} alt="Post" className="w-full h-auto max-h-[600px] object-cover" />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 ${
              liked ? 'text-red-500' : 'text-gray-600'
            } hover:text-red-500 transition-colors`}
          >
            <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
            <span className="font-semibold">{likeCount}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
            <MessageCircle size={24} />
            <span className="font-semibold">{comments}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors ml-auto">
            <Share2 size={24} />
          </button>
        </div>

        {/* Caption */}
        {caption && (
          <p className="text-gray-800">
            <span className="font-semibold mr-2">{user.name}</span>
            {caption}
          </p>
        )}

        {/* View Comments */}
        {comments > 0 && (
          <button className="text-gray-500 text-sm mt-2">
            View all {comments} comments
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
