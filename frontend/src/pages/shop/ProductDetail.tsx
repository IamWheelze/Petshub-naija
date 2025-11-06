const ProductDetail = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-200 h-96 rounded-lg"></div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">Product Name</h1>
          <p className="text-2xl text-primary-600 font-bold mb-4">₦10,000</p>
          <p className="text-gray-600 mb-6">Product details coming soon!</p>
          <button className="btn-primary w-full">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
