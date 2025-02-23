import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Building2, Users, Globe, ExternalLink, Briefcase } from 'lucide-react';
import { getCompanyDetails, getCompanyJobs } from '../services/api';

export function CompanyPage() {
  const { domain } = useParams<{ domain: string }>();

  const { data: company, isLoading: isLoadingCompany } = useQuery({
    queryKey: ['company', domain],
    queryFn: () => getCompanyDetails(domain!),
    enabled: !!domain
  });

  const { data: jobs, isLoading: isLoadingJobs } = useQuery({
    queryKey: ['jobs', domain],
    queryFn: () => getCompanyJobs(domain!),
    enabled: !!domain
  });

  if (isLoadingCompany || isLoadingJobs) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Company not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
          ← Back to search
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-6 mb-8">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="w-24 h-24 rounded-lg object-contain bg-gray-50"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span>Founded {company.founded}</span>
                <span>•</span>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <Globe className="w-4 h-4" />
                  Website
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600">{company.description}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Quick Facts</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>{company.linkedinFollowers?.toLocaleString()} LinkedIn followers</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="w-5 h-5" />
                  <span>{company.headquarters}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Products & Services</h2>
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

          <div>
            <h2 className="text-xl font-semibold mb-4">Open Positions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs?.map((job) => (
                <div
                  key={job.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
                >
                  <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                  <div className="space-y-2 text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    Apply now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}