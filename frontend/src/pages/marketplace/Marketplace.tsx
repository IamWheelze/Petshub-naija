import { useState } from 'react';
import PetCard from '../../components/common/PetCard';
import { mockPets } from '../../data/mockData';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPets = mockPets.filter(pet => {
    const matchesSpecies = selectedSpecies === 'all' || pet.breed.toLowerCase().includes(selectedSpecies.toLowerCase());
    const matchesSearch = pet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecies && matchesSearch;
  });

  const species = ['all', 'Dog', 'Cat', 'Bird', 'Rabbit'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">Pet Marketplace</h1>
              <p className="text-xl text-white/90">Find your perfect furry companion from verified breeders</p>
            </div>
            <Link to="/marketplace/create" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2">
              <Plus size={20} />
              List Your Pet
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search pets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="flex gap-2">
              {species.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSpecies(s)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedSpecies === s
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {s === 'all' ? 'All Pets' : s}
                </button>
              ))}
            </div>

            <button className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition flex items-center gap-2">
              <SlidersHorizontal size={18} />
              More Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600 text-lg">
            <span className="font-semibold">{filteredPets.length}</span> pets available
          </p>
          <select className="input-field w-auto">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
            <option>Age: Youngest</option>
          </select>
        </div>

        {/* Pet Grid */}
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} {...pet} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">No pets found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedSpecies('all');
                setSearchQuery('');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-12 bg-primary-50 border border-primary-200 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-2 text-primary-900">✓ All Breeders Verified</h3>
          <p className="text-primary-700">
            We verify all breeders to ensure healthy, ethically bred pets. Every listing includes health certificates and vaccination records.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
