import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { searchCompanies } from '../services/api';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ name: string; domain: string; logo: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchCompanies(searchQuery);
      setSuggestions(
        results.map(company => ({
          name: company.name,
          domain: company.website.replace('https://', ''),
          logo: company.logo || ''
        }))
      );
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  const handleSearch = useCallback((domain: string) => {
    navigate(`/company/${domain}`);
    setQuery('');
    setSuggestions([]);
  }, [navigate]);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            debouncedSearch(e.target.value);
          }}
          placeholder="Search for any software company..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600" />
          </div>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSearch(suggestion.domain)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b last:border-b-0 border-gray-100"
            >
              <div className="w-8 h-8 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                {suggestion.logo ? (
                  <img
                    src={suggestion.logo}
                    alt={suggestion.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(suggestion.name)}&background=random`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600">
                    {suggestion.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="flex-grow font-medium">{suggestion.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}