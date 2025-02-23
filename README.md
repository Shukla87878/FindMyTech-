# 🌍 Company Finder

**Company Finder** is a fully frontend-based platform that allows users to search for **IT companies worldwide**, from startups to MNCs, and view real-time company details along with job openings—all without using a backend.

## 🚀 Features

### 🔎 Real-Time Search with Auto-Suggestions  
- As users type a company name, **relevant company names appear dynamically**.  
- Uses **Algolia Search API** or **Google Knowledge Graph API** for instant suggestions.  
- Implements **debounced API calls** for smooth searching.  

### 🏢 Company Information Page  
For each company, the following details are displayed:  
✅ **Company Name**  
✅ **Founded Year**  
✅ **LinkedIn Followers** (via LinkedIn API)  
✅ **Budget & Revenue**  
✅ **Products & Services**  
✅ **Global Scope & Market Reach**  
✅ **Headquarters Location**  
✅ **Official Website** (Clickable Link)  

### 💼 Job Openings with Direct Apply Links  
- Fetches **real-time job listings** from LinkedIn Jobs API, Indeed API, or Glassdoor API.  
- Displays available roles and provides an **"Apply Now"** button linking to the official job posting.  

### 🎨 Modern, Responsive UI  
- Built with **Next.js + Tailwind CSS** for a clean, mobile-friendly experience.  
- Optimized for **speed, SEO, and smooth navigation**.  

### 🔄 Dynamic Data Updates (No Backend Required)  
- Fetches updated company info on page load using **Next.js serverless API calls (`getServerSideProps`)**.  
- **No database needed**—data is directly retrieved from third-party APIs.  

### ⭐ User Experience Enhancements  
- **Stores search history & user preferences** using `localStorage` or `IndexedDB`.  
- Allows users to **bookmark** their favorite companies for quick access.  

## 🛠 Tech Stack  

| Feature | Technology / Service |
|---------|----------------------|
| **Frontend** | Next.js (React.js), Tailwind CSS, TypeScript |
| **Search (Auto-Suggestions)** | Algolia Search API / Google Knowledge Graph API |
| **Company Data** | Crunchbase API, LinkedIn API, Google Knowledge Graph API |
| **Job Listings** | LinkedIn Jobs API, Indeed API, Glassdoor API |
| **Storage (User Preferences)** | LocalStorage / IndexedDB |
| **Deployment** | Vercel / Netlify |

## 📦 Installation & Setup  

First install the npm with clearbit
then go for npm run dev
