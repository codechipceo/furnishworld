import { Filter, Search, Check } from "lucide-react";
import { useState } from "react";

const allCategories = [
  { id: "clothing", name: "Clothing" },
  { id: "electronics", name: "Electronics" },
  { id: "furniture", name: "Furniture" },
  { id: "books", name: "Books" },
];

const TopBar = ({ categories, selectedCategories, handleCategoryChange }) => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  return (
    <nav className="bg-white  flex items-center justify-between sticky top-0 z-10">
      {/* Search Bar */}
      <div className="flex-grow max-w-md my-4 hidden md:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-[320px] pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-primary-500 focus:outline-none text-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="p-2 cursor-pointer relative rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-primary-500 hidden md:block"
          onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          aria-label="Filter"
        >
          <span className="absolute -top-2 -right-1">{selectedCategories.length > 0 && selectedCategories.length}</span>
          <Filter className="h-5 w-5" />
        </button>
        {isFilterMenuOpen && (
          <div className="absolute top-full right-8  w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <ul className="py-1">
              {categories.map(({ title, id }) => {
                return (
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between items-center"
                    onClick={() => {
                      handleCategoryChange(id);
                    }}
                  >
                    {title}
                    {selectedCategories.includes(id) && (
                      <span className="text-primary-500">
                        {" "}
                        <Check size={18} />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
