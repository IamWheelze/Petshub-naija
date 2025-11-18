import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Camera, Edit2, MapPin, Calendar, Mail, Phone, Save, X } from 'lucide-react';
import { mockPosts, mockPets } from '../data/mockData';
import PostCard from '../components/common/PostCard';
import PetCard from '../components/common/PetCard';

const Profile = () => {
  const { id } = useParams(); // Will be used for fetching user profile by ID
  const { user } = useAuth();
  console.log('Viewing profile:', id); // Temporary - will be used for API call
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'pets' | 'about'>('posts');

  // Mock user data (in real app, fetch by id)
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || 'John',
    lastName: user?.lastName || 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+234 123 456 7890',
    location: 'Lagos, Nigeria',
    bio: 'Pet lover and enthusiast. Proud owner of 2 golden retrievers.',
    avatar: 'https://i.pravatar.cc/150?img=15',
    coverPhoto: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200',
    joinedDate: 'January 2024',
    stats: {
      posts: 23,
      followers: 1234,
      following: 892,
      pets: 2,
    },
  });

  const [formData, setFormData] = useState(profileData);

  const isOwnProfile = true; // In real app: user?.id === id

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  const userPosts = mockPosts.slice(0, 3);
  const userPets = mockPets.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="relative h-64 bg-gradient-to-r from-primary-400 to-primary-600">
        <img
          src={profileData.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {isOwnProfile && !isEditing && (
          <button className="absolute bottom-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 flex items-center gap-2">
            <Camera size={18} />
            Edit Cover
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative pb-6 border-b">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-20">
            {/* Avatar & Name */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt={`${profileData.firstName} ${profileData.lastName}`}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg"
                />
                {isOwnProfile && !isEditing && (
                  <button className="absolute bottom-2 right-2 bg-primary-600 text-white p-2 rounded-full shadow-lg hover:bg-primary-700">
                    <Camera size={18} />
                  </button>
                )}
              </div>

              <div className="text-center md:text-left mb-4 md:mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2 text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>Joined {profileData.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            {isOwnProfile && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary flex items-center gap-2 self-center md:self-auto mt-4 md:mt-0"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6 max-w-2xl">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{profileData.stats.posts}</p>
              <p className="text-sm text-gray-600">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{profileData.stats.followers}</p>
              <p className="text-sm text-gray-600">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{profileData.stats.following}</p>
              <p className="text-sm text-gray-600">Following</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{profileData.stats.pets}</p>
              <p className="text-sm text-gray-600">Pets</p>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mt-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'posts'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Posts
              </button>
              <button
                onClick={() => setActiveTab('pets')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'pets'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Pets
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'about'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                About
              </button>
            </nav>
          </div>

          <div className="py-8">
            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <div className="max-w-2xl mx-auto space-y-6">
                {userPosts.map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
              </div>
            )}

            {/* Pets Tab */}
            {activeTab === 'pets' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPets.map((pet) => (
                  <PetCard key={pet.id} {...pet} />
                ))}
                {isOwnProfile && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:border-primary-600 hover:bg-primary-50 transition cursor-pointer">
                    <div className="text-primary-600 text-5xl mb-2">+</div>
                    <p className="text-gray-600 font-medium">Add New Pet</p>
                  </div>
                )}
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="max-w-2xl mx-auto">
                {isEditing ? (
                  <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    <h2 className="text-xl font-bold mb-4">Edit Profile Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={4}
                        className="input-field"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                        <Save size={18} />
                        Save Changes
                      </button>
                      <button onClick={handleCancel} className="btn-outline flex items-center gap-2">
                        <X size={18} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Bio</h3>
                      <p className="text-gray-600">{profileData.bio}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <Mail className="text-primary-600 mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold">Email</h4>
                          <p className="text-gray-600">{profileData.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="text-primary-600 mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold">Phone</h4>
                          <p className="text-gray-600">{profileData.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="text-primary-600 mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold">Location</h4>
                          <p className="text-gray-600">{profileData.location}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Calendar className="text-primary-600 mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold">Joined</h4>
                          <p className="text-gray-600">{profileData.joinedDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
