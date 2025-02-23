import React from 'react';
import { Building2, Users, Globe, ExternalLink } from 'lucide-react';
import { Company } from '../types/company';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        {company.logo ? (
          <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-lg object-contain" />
        ) : (
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold">{company.name}</h2>
          <p className="text-gray-600">Founded {company.founded}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5" />
          <span>{company.linkedinFollowers?.toLocaleString()} LinkedIn followers</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <Globe className="w-5 h-5" />
          <span>{company.headquarters}</span>
        </div>

        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ExternalLink className="w-5 h-5" />
          Visit Website
        </a>
      </div>

      <div className="mt-4">
        <p className="text-gray-700">{company.description}</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Products & Services</h3>
        <div className="flex flex-wrap gap-2">
          {company.products.map((product, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
            >
              {product}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}