const Marketplace = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Pet Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
          <h3 className="font-semibold mb-2">Sample Pet Listing</h3>
          <p className="text-gray-600 text-sm mb-2">Dog • 6 months old</p>
          <p className="text-primary-600 font-bold">₦150,000</p>
        </div>
        <div className="card">
          <p className="text-gray-600">Pet marketplace coming soon! Buy, sell, and adopt pets from verified breeders.</p>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
