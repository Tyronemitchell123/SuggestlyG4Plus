import React from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Shield, 
  Star,
  ArrowUp,
  Linkedin,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: "SUGGESTLY ELITE",
      items: [
        { label: "About Us", href: "#" },
        { label: "Our Mission", href: "#" },
        { label: "Leadership", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" }
      ]
    },
    {
      title: "Services",
      items: [
        { label: "AI Strategy", href: "#" },
        { label: "Quantum Computing", href: "#" },
        { label: "Neural Networks", href: "#" },
        { label: "Custom Development", href: "#" },
        { label: "Executive Advisory", href: "#" }
      ]
    },
    {
      title: "Solutions",
      items: [
        { label: "Enterprise AI", href: "#" },
        { label: "Financial Services", href: "#" },
        { label: "Healthcare", href: "#" },
        { label: "Manufacturing", href: "#" },
        { label: "Retail", href: "#" }
      ]
    },
    {
      title: "Resources",
      items: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Case Studies", href: "#" },
        { label: "White Papers", href: "#" },
        { label: "Blog", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const contactInfo = [
    { icon: Mail, text: "tyrone.mitchell76@hotmail.com", href: "mailto:tyrone.mitchell76@hotmail.com" },
    { icon: Phone, text: "+1 (555) ELITE-AI", href: "tel:+1555ELITEAI" },
    { icon: Globe, text: "suggestlyelite.io", href: "https://suggestlyelite.io" }
  ];

  return (
    <footer className="bg-luxury-darker border-t border-luxury-gold/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_100%,rgba(255,215,0,0.03),transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-luxury-gold">
                    SUGGESTLY ELITE
                  </h3>
                </div>
                <p className="text-luxury-gray mb-6 leading-relaxed">
                  The premier AI platform for UHNWI and global executives. 
                  Delivering quantum-level intelligence and strategic advantage 
                  through cutting-edge artificial intelligence.
                </p>
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-luxury-gold/10 border border-luxury-gold/20 rounded-lg flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all duration-300"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <h4 className="text-lg font-display font-bold text-luxury-light mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-luxury-gray hover:text-luxury-gold transition-colors duration-300 text-sm"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-luxury-gold/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-display font-bold text-luxury-light mb-4">
                  Contact Information
                </h4>
                <div className="space-y-3">
                  {contactInfo.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.href}
                      className="flex items-center space-x-3 text-luxury-gray hover:text-luxury-gold transition-colors duration-300"
                    >
                      <contact.icon className="w-4 h-4" />
                      <span className="text-sm">{contact.text}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-display font-bold text-luxury-light mb-4">
                  Security & Compliance
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-luxury-gray">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Bank-Grade Security</span>
                  </div>
                  <div className="flex items-center space-x-3 text-luxury-gray">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">ISO 27001 Certified</span>
                  </div>
                  <div className="flex items-center space-x-3 text-luxury-gray">
                    <Crown className="w-4 h-4" />
                    <span className="text-sm">Elite Client Protocol</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-display font-bold text-luxury-light mb-4">
                  Global Presence
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-luxury-gray">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">New York • London • Singapore</span>
                  </div>
                  <div className="flex items-center space-x-3 text-luxury-gray">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">24/7 Global Support</span>
                  </div>
                  <div className="flex items-center space-x-3 text-luxury-gray">
                    <Crown className="w-4 h-4" />
                    <span className="text-sm">Elite Network Access</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="py-6 border-t border-luxury-gold/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-luxury-gray">
              <span>&copy; 2024 SUGGESTLY ELITE. All rights reserved.</span>
              <a href="#" className="hover:text-luxury-gold transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-luxury-gold transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-luxury-gold transition-colors duration-300">
                Cookie Policy
              </a>
            </div>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-luxury-gold/10 border border-luxury-gold/20 rounded-lg flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all duration-300"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Elite Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-8 right-8 hidden lg:block"
      >
        <div className="bg-gradient-to-r from-luxury-gold to-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          ELITE CERTIFIED
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
