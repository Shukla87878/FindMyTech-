export interface Company {
  id: string;
  name: string;
  founded: number;
  linkedinFollowers?: number;
  revenue?: string;
  description: string;
  products: string[];
  headquarters: string;
  website: string;
  logo?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  applyUrl: string;
  postedDate: string;
}