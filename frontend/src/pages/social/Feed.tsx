const Feed = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h2 className="text-2xl font-bold mb-4">Your Feed</h2>
            <p className="text-gray-600">Feed feature coming soon! This will display posts from pets and users you follow.</p>
          </div>
        </div>
        <div>
          <div className="card">
            <h3 className="font-semibold mb-4">Suggested Friends</h3>
            <p className="text-gray-600 text-sm">Friend suggestions coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
