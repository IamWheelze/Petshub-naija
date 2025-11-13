import PostCard from '../../components/common/PostCard';
import { mockPosts } from '../../data/mockData';
import { Image, Video, Smile } from 'lucide-react';

const Feed = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://i.pravatar.cc/150?img=15"
                  alt="Your avatar"
                  className="w-12 h-12 rounded-full"
                />
                <input
                  type="text"
                  placeholder="Share your pet's moment..."
                  className="flex-1 input-field"
                  readOnly
                />
              </div>
              <div className="flex gap-4 border-t pt-3">
                <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition">
                  <Image size={20} />
                  <span className="text-sm font-medium">Photo</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition">
                  <Video size={20} />
                  <span className="text-sm font-medium">Video</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition">
                  <Smile size={20} />
                  <span className="text-sm font-medium">Feeling</span>
                </button>
              </div>
            </div>

            {/* Posts */}
            {mockPosts.map((post) => (
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
