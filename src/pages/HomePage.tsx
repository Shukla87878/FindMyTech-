import React from 'react';
import { Search } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { CompanyCard } from '../components/CompanyCard';
import { useQuery } from '@tanstack/react-query';
import { searchCompanies } from '../services/api';

export function HomePage() {
  const { data: featuredCompanies = [] } = useQuery({
    queryKey: ['featuredCompanies'],
    queryFn: () => searchCompanies('')
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Search className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Company Finder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Instantly discover any software company worldwide. Get comprehensive details, insights, and job openings in real-time.
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="col-span-full">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Featured Companies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}