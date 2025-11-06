const Shop = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Shop Pet Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
          <h3 className="font-semibold mb-2">Sample Product</h3>
          <p className="text-primary-600 font-bold">₦5,000</p>
          <button className="btn-primary w-full mt-4">Add to Cart</button>
        </div>
        <div className="card">
          <p className="text-gray-600">Product catalog coming soon! We'll feature pet food, toys, accessories, and more.</p>
        </div>
      </div>
    </div>
  );
};

export default Shop;
