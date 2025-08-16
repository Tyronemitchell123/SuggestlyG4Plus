import { useState, useEffect } from 'react';

// Sample sites data - in a real app, this would come from a database
const SAMPLE_SITES = [
  {
    id: 'site1',
    name: 'OnTarget Couriers',
    subdomain: 'ontargetcouriers',
    path: '/ontargetcouriers',
    theme: 'modern',
    content: {
      title: 'OnTarget Couriers',
      description:
        'Professional courier services across the UK - Fast, reliable, and on target delivery solutions',
      sections: [
        {
          type: 'hero',
          title: 'OnTarget Couriers',
          subtitle: 'Fast & Reliable UK Delivery Services',
          content:
            'Professional courier services that deliver on time, every time. From same-day delivery to nationwide logistics solutions.',
        },
        {
          type: 'about',
          title: 'About Our Services',
          content:
            'With years of experience in the logistics industry, OnTarget Couriers provides reliable, fast, and secure delivery services across the United Kingdom. Our commitment to excellence ensures your packages reach their destination safely and on schedule.',
        },
        {
          type: 'projects',
          title: 'Our Services',
          content:
            'Comprehensive delivery solutions for all your shipping needs',
        },
        {
          type: 'contact',
          title: 'Get a Quote',
          content:
            'Ready to ship? Contact us for a competitive quote on your delivery needs.',
        },
      ],
    },
    settings: {
      primaryColor: '#dc2626',
      secondaryColor: '#991b1b',
      fontFamily: 'Inter',
      enableAnalytics: true,
    },
  },
  {
    id: 'site2',
    name: 'OnTarget Designs',
    subdomain: 'ontargetdesigns',
    path: '/ontargetdesigns',
    theme: 'minimal',
    content: {
      title: 'OnTarget Designs',
      description:
        'Creative design solutions for modern businesses - Web design, branding, and digital marketing',
      sections: [
        {
          type: 'hero',
          title: 'OnTarget Designs',
          subtitle: 'Creative Design Solutions',
          content:
            'Professional web design, branding, and digital marketing services that help your business stand out in the digital landscape.',
        },
        {
          type: 'about',
          title: 'About Our Design Studio',
          content:
            'We specialize in creating stunning websites, compelling brand identities, and effective digital marketing campaigns. Our team of creative professionals is dedicated to delivering designs that not only look great but also drive results.',
        },
        {
          type: 'projects',
          title: 'Our Portfolio',
          content: 'Explore our latest design projects and creative work',
        },
        {
          type: 'contact',
          title: 'Start Your Project',
          content:
            "Ready to transform your brand? Let's discuss your design project and create something amazing together.",
        },
      ],
    },
    settings: {
      primaryColor: '#7c3aed',
      secondaryColor: '#5b21b6',
      fontFamily: 'Inter',
      enableAnalytics: true,
    },
  },
  {
    id: 'site3',
    name: 'Velocities Ltd',
    subdomain: 'velocities',
    path: '/velocities',
    theme: 'dark',
    content: {
      title: 'Velocities Ltd',
      description:
        'Innovative technology solutions and digital transformation services for forward-thinking businesses',
      sections: [
        {
          type: 'hero',
          title: 'Velocities Ltd',
          subtitle: 'Accelerating Digital Innovation',
          content:
            'Cutting-edge technology solutions that accelerate your business growth and digital transformation journey.',
        },
        {
          type: 'about',
          title: 'About Velocities',
          content:
            'We are a technology consultancy specializing in digital transformation, software development, and innovative business solutions. Our expertise helps businesses navigate the digital landscape and achieve sustainable growth.',
        },
        {
          type: 'projects',
          title: 'Our Solutions',
          content: 'Comprehensive technology services and digital solutions',
        },
        {
          type: 'contact',
          title: 'Transform Your Business',
          content:
            "Ready to accelerate your digital transformation? Let's explore how our technology solutions can drive your business forward.",
        },
      ],
    },
    settings: {
      primaryColor: '#06b6d4',
      secondaryColor: '#0891b2',
      fontFamily: 'Inter',
      enableAnalytics: true,
    },
  },
];

export const useSiteManager = () => {
  const [sites, setSites] = useState([]);
  const [currentSite, setCurrentSite] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn('Site manager loading timeout - forcing completion');
        setIsLoading(false);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [isLoading]);

  // Load sites from localStorage or use sample data
  useEffect(() => {
    const loadSites = () => {
      try {
        const savedSites = localStorage.getItem('suggestly_sites');
        if (savedSites) {
          setSites(JSON.parse(savedSites));
        } else {
          // Initialize with sample sites
          setSites(SAMPLE_SITES);
          localStorage.setItem('suggestly_sites', JSON.stringify(SAMPLE_SITES));
        }
      } catch (error) {
        console.error('Error loading sites:', error);
        setSites(SAMPLE_SITES);
      }
      // Ensure loading is set to false after a short delay to prevent infinite loading
      setTimeout(() => setIsLoading(false), 100);
    };

    loadSites();
  }, []);

  // Detect current site based on subdomain or path
  useEffect(() => {
    const detectCurrentSite = () => {
      const hostname = window.location.hostname;
      const pathname = window.location.pathname;

      // Check for subdomain
      if (hostname.includes('.')) {
        const subdomain = hostname.split('.')[0];
        const site = sites.find(s => s.subdomain === subdomain);
        if (site) {
          setCurrentSite(site);
          return;
        }
      }

      // Check for path-based routing
      const pathSite = sites.find(s => pathname.startsWith(s.path));
      if (pathSite) {
        setCurrentSite(pathSite);
        return;
      }

      // No site detected, show main platform
      setCurrentSite(null);
    };

    if (!isLoading) {
      detectCurrentSite();
    }
  }, [sites, isLoading]);

  // Save sites to localStorage
  const saveSites = newSites => {
    setSites(newSites);
    localStorage.setItem('suggestly_sites', JSON.stringify(newSites));
  };

  // Add new site
  const addSite = siteData => {
    const newSite = {
      id: `site_${Date.now()}`,
      ...siteData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const newSites = [...sites, newSite];
    saveSites(newSites);
    return newSite;
  };

  // Update site
  const updateSite = (siteId, updates) => {
    const newSites = sites.map(site =>
      site.id === siteId
        ? { ...site, ...updates, updatedAt: new Date().toISOString() }
        : site
    );
    saveSites(newSites);
  };

  // Delete site
  const deleteSite = siteId => {
    const newSites = sites.filter(site => site.id !== siteId);
    saveSites(newSites);
  };

  // Get site by ID
  const getSiteById = siteId => {
    return sites.find(site => site.id === siteId);
  };

  // Get site by subdomain
  const getSiteBySubdomain = subdomain => {
    return sites.find(site => site.subdomain === subdomain);
  };

  // Get site by path
  const getSiteByPath = path => {
    return sites.find(site => path.startsWith(site.path));
  };

  return {
    sites,
    currentSite,
    isLoading,
    addSite,
    updateSite,
    deleteSite,
    getSiteById,
    getSiteBySubdomain,
    getSiteByPath,
  };
};
