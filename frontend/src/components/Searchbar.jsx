import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
            setSearchQuery("");
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-gray-800 text-gray-300 rounded-md px-4 py-2 pl-10 
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                    placeholder-gray-500"
                />
                <button
                    type="submit"
                    className="absolute inset-y-0 left-0 pl-3 flex items-center"
                >
                    <Search className="h-5 w-5 text-gray-400 hover:text-emerald-500 transition-colors" />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;