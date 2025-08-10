import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";

export default function CertificatesPage() {
  const certificates = [
    {
      category: "Regulatory Compliance",
      items: [
        {
          name: "FCA Authorization",
          issuer: "Financial Conduct Authority",
          date: "2024",
          description: "Full authorization for investment management and advisory services",
          icon: "🏛️"
        },
        {
          name: "SEC Registration",
          issuer: "Securities and Exchange Commission",
          date: "2024",
          description: "Registered Investment Advisor (RIA) status",
          icon: "⚖️"
        },
        {
          name: "FINRA Membership",
          issuer: "Financial Industry Regulatory Authority",
          date: "2024",
          description: "Broker-dealer registration and compliance",
          icon: "📊"
        }
      ]
    },
    {
      category: "Security & Technology",
      items: [
        {
          name: "SOC 2 Type II",
          issuer: "AICPA",
          date: "2024",
          description: "Service Organization Control 2 certification for data security",
          icon: "🔒"
        },
        {
          name: "ISO 27001",
          issuer: "International Organization for Standardization",
          date: "2024",
          description: "Information security management system certification",
          icon: "🛡️"
        },
        {
          name: "PCI DSS Level 1",
          issuer: "Payment Card Industry Security Standards Council",
          date: "2024",
          description: "Highest level payment security certification",
          icon: "💳"
        }
      ]
    },
    {
      category: "Professional Qualifications",
      items: [
        {
          name: "Chartered Financial Analyst (CFA)",
          issuer: "CFA Institute",
          date: "2024",
          description: "Team members hold CFA designations",
          icon: "📈"
        },
        {
          name: "Chartered Alternative Investment Analyst (CAIA)",
          issuer: "CAIA Association",
          date: "2024",
          description: "Alternative investment expertise certification",
          icon: "🎯"
        },
        {
          name: "Certified Financial Planner (CFP)",
          issuer: "CFP Board",
          date: "2024",
          description: "Comprehensive financial planning certification",
          icon: "📋"
        }
      ]
    },
    {
      category: "Partnerships & Accreditations",
      items: [
        {
          name: "Institutional Investor Recognition",
          issuer: "Institutional Investor Magazine",
          date: "2024",
          description: "Top 100 Private Equity Firms",
          icon: "🏆"
        },
        {
          name: "Family Office Association",
          issuer: "FOA Global",
          date: "2024",
          description: "Accredited family office service provider",
          icon: "👨‍👩‍👧‍👦"
        },
        {
          name: "Alternative Investment Management Association",
          issuer: "AIMA",
          date: "2024",
          description: "Global hedge fund and alternative investment association",
          icon: "🌍"
        }
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Certificates & Compliance - Aurum Private</title>
                 <meta name="description" content="Regulatory compliance, security certifications, and professional qualifications that ensure the highest standards for our £50,000/year elite membership." />
         <meta property="og:title" content="Certificates & Compliance - Aurum Private" />
         <meta property="og:description" content="Regulatory compliance, security certifications, and professional qualifications that ensure the highest standards for our £50,000/year elite membership." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="bg-black text-white font-sans min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-900 via-black to-zinc-900"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          />
          
          <div className="relative max-w-6xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6"
            >
              Certificates & Compliance
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl text-zinc-300 max-w-3xl mx-auto mb-12"
            >
                             Institutional-grade regulatory compliance, security certifications, and professional qualifications that ensure the highest standards for our £50,000/year elite membership.
            </motion.p>
          </div>
        </section>

        {/* Certificates Grid */}
        <section className="relative py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {certificates.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
                  {category.category}
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((cert, certIndex) => (
                    <motion.div
                      key={cert.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: (categoryIndex * 0.2) + (certIndex * 0.1) }}
                      className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105"
                    >
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{cert.icon}</span>
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400">{cert.name}</h3>
                          <p className="text-zinc-400 text-sm">{cert.issuer}</p>
                        </div>
                      </div>
                      
                      <p className="text-zinc-300 mb-4 leading-relaxed">
                        {cert.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-400 font-semibold">{cert.date}</span>
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-green-400 text-sm font-medium">Active</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Compliance Statement */}
        <section className="relative py-16 px-4 bg-zinc-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-yellow-400 mb-6">
                Regulatory Excellence
              </h2>
              
              <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
                Aurum Private maintains the highest standards of regulatory compliance and security. 
                                 Our comprehensive certification portfolio ensures that your £50,000/year investment 
                 is protected by institutional-grade safeguards and professional oversight.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔐</div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">Bank-Level Security</h3>
                  <p className="text-zinc-400">Enterprise-grade encryption and security protocols</p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-4">⚖️</div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">Full Compliance</h3>
                  <p className="text-zinc-400">Regulated by FCA, SEC, and FINRA authorities</p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">Elite Standards</h3>
                  <p className="text-zinc-400">Professional qualifications and industry recognition</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-yellow-400 mb-6">
                Ready to Experience Elite Investment Management?
              </h2>
              
              <p className="text-lg text-zinc-300 mb-8">
                                 Join our exclusive £50,000/year membership and benefit from institutional-grade 
                 security, compliance, and professional expertise.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.location.href = '/aurum-private'}
              >
                Apply for Membership
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
