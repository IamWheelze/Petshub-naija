import { useState, useRef, useEffect } from 'react';
import PostCard from '../../components/common/PostCard';
import { mockPosts } from '../../data/mockData';
import { Image as ImageIcon, X } from 'lucide-react';
import { usePostStore } from '../../stores/postStore';
import { useAuth } from '../../context/AuthContext';

const Feed = () => {
  const { user } = useAuth();
  const { posts, addPost, setPosts } = usePostStore();
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // Will be used for Cloudinary upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log('Image file ready for upload:', imageFile?.name); // Temporary logging

  // Initialize with mock posts
  useEffect(() => {
    if (posts.length === 0) {
      setPosts(mockPosts);
    }
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreatePost = () => {
    if (!caption.trim() && !selectedImage) {
      alert('Please add a caption or image');
      return;
    }

    // In real app, upload image to cloudinary and get URL
    addPost({
      user: {
        name: `${user?.firstName || 'User'} ${user?.lastName || ''}`,
        avatar: 'https://i.pravatar.cc/150?img=15',
      },
      caption: caption,
      image: selectedImage || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800',
    });

    // Reset form
    setCaption('');
    setSelectedImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-start gap-3 mb-4">
                <img
                  src="https://i.pravatar.cc/150?img=15"
                  alt="Your avatar"
                  className="w-12 h-12 rounded-full"
                />
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Share your pet's moment..."
                  className="flex-1 input-field resize-none"
                  rows={3}
                />
              </div>

              {/* Image Preview */}
              {selectedImage && (
                <div className="relative mb-4">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full rounded-lg max-h-96 object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between border-t pt-3">
                <div className="flex gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition"
                  >
                    <ImageIcon size={20} />
                    <span className="text-sm font-medium">Photo</span>
                  </button>
                </div>
                <button
                  onClick={handleCreatePost}
                  disabled={!caption.trim() && !selectedImage}
                  className="btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}

            {/* Load More */}
            <button className="w-full py-3 text-primary-600 hover:text-primary-700 font-semibold">
              Load More Posts
            </button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Quick View */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <img
                  src="https://i.pravatar.cc/150?img=15"
                  alt="Profile"
                  className="w-20 h-20 rounded-full mx-auto mb-3"
                />
                <h3 className="font-semibold text-lg">Welcome Back!</h3>
                <p className="text-gray-600 text-sm">Share your pet's adventures</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div className="text-center">
                  <p className="font-bold text-primary-600">23</p>
                  <p className="text-xs text-gray-600">Posts</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-primary-600">1.2K</p>
                  <p className="text-xs text-gray-600">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-primary-600">892</p>
                  <p className="text-xs text-gray-600">Following</p>
                </div>
              </div>
            </div>

            {/* Suggested Friends */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4">Suggested Pet Lovers</h3>
              <div className="space-y-4">
                {[
                  { name: 'Sarah Johnson', pets: '2 Dogs', avatar: 'https://i.pravatar.cc/150?img=20' },
                  { name: 'Mike Chen', pets: '1 Cat', avatar: 'https://i.pravatar.cc/150?img=21' },
                  { name: 'Emily Brown', pets: '3 Pets', avatar: 'https://i.pravatar.cc/150?img=22' },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-gray-600">{user.pets}</p>
                      </div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4">Trending</h3>
              <div className="space-y-3">
                {[
                  { tag: '#PetCareNigeria', posts: '1.2K posts' },
                  { tag: '#LagosPets', posts: '856 posts' },
                  { tag: '#DogLovers', posts: '2.3K posts' },
                  { tag: '#CatLife', posts: '1.8K posts' },
                ].map((topic, i) => (
                  <div key={i} className="pb-3 border-b last:border-0">
                    <p className="font-medium text-primary-600 text-sm">{topic.tag}</p>
                    <p className="text-xs text-gray-600">{topic.posts}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
