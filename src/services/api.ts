import axios from 'axios';
import { Company, Job } from '../types/company';

// Using Clearbit's Company Autocomplete API for real-time company search
const CLEARBIT_AUTOCOMPLETE_URL = 'https://autocomplete.clearbit.com/v1/companies/suggest';

async function fetchCompanySuggestions(query: string): Promise<any[]> {
  try {
    const response = await axios.get(CLEARBIT_AUTOCOMPLETE_URL, {
      params: { query },
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching company suggestions:', error);
    return [];
  }
}

function getClearbitLogoUrl(domain: string): string {
  return `https://logo.clearbit.com/${domain}`;
}

export async function searchCompanies(query: string): Promise<Company[]> {
  if (!query) {
    // Return featured companies when no query
    return getFeaturedCompanies();
  }

  try {
    const suggestions = await fetchCompanySuggestions(query);
    return suggestions.map(suggestion => ({
      id: suggestion.domain,
      name: suggestion.name,
      founded: 0, // Will be populated with real data in getCompanyDetails
      linkedinFollowers: 0,
      description: suggestion.name,
      products: [],
      headquarters: '',
      website: `https://${suggestion.domain}`,
      logo: suggestion.logo || getClearbitLogoUrl(suggestion.domain)
    }));
  } catch (error) {
    console.error('Error in searchCompanies:', error);
    return [];
  }
}

async function enrichCompanyData(domain: string): Promise<Partial<Company>> {
  // In a real application, this would call various APIs to get company data
  // For demo purposes, we'll return mock data
  return {
    founded: Math.floor(1980 + Math.random() * 40),
    linkedinFollowers: Math.floor(10000 + Math.random() * 1000000),
    revenue: `$${Math.floor(1 + Math.random() * 100)} billion`,
    description: `A leading technology company specializing in innovative solutions.`,
    products: ['Enterprise Software', 'Cloud Services', 'Digital Solutions'],
    headquarters: 'United States'
  };
}

export async function getCompanyDetails(domain: string): Promise<Company> {
  try {
    // First get basic company info
    const suggestions = await fetchCompanySuggestions(domain.split('.')[0]);
    const basicInfo = suggestions.find(s => s.domain === domain);
    
    if (!basicInfo) {
      throw new Error('Company not found');
    }

    // Enrich with additional data
    const enrichedData = await enrichCompanyData(domain);

    return {
      id: basicInfo.domain,
      name: basicInfo.name,
      logo: basicInfo.logo || getClearbitLogoUrl(basicInfo.domain),
      website: `https://${basicInfo.domain}`,
      ...enrichedData,
      founded: enrichedData.founded || 2000,
      linkedinFollowers: enrichedData.linkedinFollowers || 0,
      description: enrichedData.description || '',
      products: enrichedData.products || [],
      headquarters: enrichedData.headquarters || 'Unknown'
    };
  } catch (error) {
    console.error('Error in getCompanyDetails:', error);
    throw new Error('Failed to fetch company details');
  }
}

function getFeaturedCompanies(): Company[] {
  const featuredDomains = [
    'microsoft.com',
    'apple.com',
    'google.com',
    'amazon.com',
    'meta.com',
    'netflix.com'
  ];

  return featuredDomains.map((domain, index) => ({
    id: domain,
    name: domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1),
    founded: 1970 + (index * 5),
    linkedinFollowers: 1000000 * (index + 1),
    description: `A leading technology company.`,
    products: ['Technology', 'Software', 'Services'],
    headquarters: 'United States',
    website: `https://${domain}`,
    logo: getClearbitLogoUrl(domain)
  }));
}

export async function getCompanyJobs(companyDomain: string): Promise<Job[]> {
  // Simulate API call to get jobs
  return new Promise((resolve) => {
    setTimeout(() => {
      const jobTitles = [
        'Senior Software Engineer',
        'Product Manager',
        'Data Scientist',
        'UX Designer',
        'DevOps Engineer',
        'Full Stack Developer'
      ];

      const locations = [
        'Remote',
        'New York, NY',
        'San Francisco, CA',
        'London, UK',
        'Singapore',
        'Berlin, Germany'
      ];

      const jobs = Array.from({ length: 6 }, (_, i) => ({
        id: crypto.randomUUID(),
        title: jobTitles[i],
        company: companyDomain.split('.')[0].toUpperCase(),
        location: locations[i],
        type: 'Full-time',
        applyUrl: `https://careers.${companyDomain}/jobs/${i + 1}`,
        postedDate: new Date(Date.now() - i * 86400000).toISOString().split('T')[0]
      }));

      resolve(jobs);
    }, 300);
  });
}