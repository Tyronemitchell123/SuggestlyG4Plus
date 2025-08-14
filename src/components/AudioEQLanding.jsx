import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Volume2,
  Zap,
  Crown,
  Shield,
  Play,
  Download,
  Settings,
  Users,
  Award,
  Star,
} from 'lucide-react';

const AudioEQLanding = () => {
  const features = [
    {
      icon: Volume2,
      title: 'Professional Equalizer',
      description:
        '10-band parametric equalizer with precise frequency control from 32Hz to 16kHz',
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description:
        'Instant audio processing with live visualization and dual mode support',
    },
    {
      icon: Crown,
      title: 'Elite Presets',
      description:
        'Professional presets for vocals, music, podcast, and custom configurations',
    },
    {
      icon: Shield,
      title: 'Studio Quality',
      description:
        'Enterprise-grade audio processing with 24-bit precision and lossless export',
    },
  ];

  const useCases = [
    {
      title: 'Podcast Production',
      description:
        'Enhance voice clarity and reduce background noise for professional podcasts',
      icon: Users,
    },
    {
      title: 'Music Production',
      description:
        'Professional mixing and mastering with precise frequency control',
      icon: Award,
    },
    {
      title: 'Content Creation',
      description:
        'Optimize audio for YouTube, TikTok, and social media platforms',
      icon: Star,
    },
    {
      title: 'Business Presentations',
      description:
        'Crystal clear audio for webinars, training, and corporate communications',
      icon: Crown,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-darker via-luxury-dark to-luxury-darker text-luxury-light">
      {/* Header */}
      <div className="bg-glass backdrop-blur-md border-b border-luxury-gold/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold">
                  SUGGESTLY ELITE
                </h1>
                <p className="text-luxury-gray text-sm">
                  Professional Audio Equalizer
                </p>
              </div>
            </Link>

            <Link
              to="/audio-eq"
              className="bg-gradient-to-r from-luxury-gold to-yellow-500 text-black font-medium px-6 py-3 rounded-xl hover:scale-105 transition-transform"
            >
              Launch EQ
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                Professional
                <span className="text-luxury-gold block">Audio Equalizer</span>
              </h1>
              <p className="text-xl text-luxury-gray mb-8 leading-relaxed">
                Experience studio-quality audio processing with our advanced
                equalizer. Perfect for podcasters, musicians, content creators,
                and audio professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/audio-eq"
                  className="bg-gradient-to-r from-luxury-gold to-yellow-500 text-black font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Processing</span>
                </Link>
                <button className="border border-luxury-gold/30 text-luxury-gold font-medium px-8 py-4 rounded-xl hover:bg-luxury-gold/10 transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Audio Equalizer</h3>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-luxury-gold" />
                      <span className="text-sm text-luxury-gray">Live</span>
                    </div>
                  </div>

                  {/* Mock EQ Interface */}
                  <div className="grid grid-cols-10 gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center space-y-1"
                      >
                        <div className="text-xs text-luxury-gray">
                          {
                            [
                              '32Hz',
                              '64Hz',
                              '125Hz',
                              '250Hz',
                              '500Hz',
                              '1kHz',
                              '2kHz',
                              '4kHz',
                              '8kHz',
                              '16kHz',
                            ][i]
                          }
                        </div>
                        <div className="relative h-20 w-4">
                          <div className="absolute inset-0 bg-luxury-dark rounded-full">
                            <div
                              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-t from-luxury-gold to-yellow-500 rounded-full w-2"
                              style={{
                                height: `${Math.random() * 60 + 20}%`,
                                minHeight: '4px',
                              }}
                            />
                          </div>
                        </div>
                        <div className="text-xs font-mono">
                          {Math.random() > 0.5 ? '+' : ''}
                          {Math.floor(Math.random() * 8)}dB
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-luxury-dark rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Spectrum Analyzer
                      </span>
                      <span className="text-xs text-luxury-gray">
                        Real-time
                      </span>
                    </div>
                    <div className="h-16 bg-gradient-to-r from-luxury-gold/20 to-yellow-500/20 rounded flex items-end justify-between px-2">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-t from-luxury-gold to-yellow-500 rounded-sm"
                          style={{
                            width: '3px',
                            height: `${Math.random() * 60 + 10}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-luxury-dark/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Professional Features
            </h2>
            <p className="text-xl text-luxury-gray max-w-3xl mx-auto">
              Everything you need for professional audio processing in one
              powerful tool
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6 text-center hover:border-luxury-gold/40 transition-colors"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-luxury-gray">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Perfect For
            </h2>
            <p className="text-xl text-luxury-gray max-w-3xl mx-auto">
              Whether you're a professional or just getting started, our
              equalizer adapts to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8 hover:border-luxury-gold/40 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <useCase.icon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                    <p className="text-luxury-gray">{useCase.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-luxury-gold/10 to-yellow-500/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Ready to Transform Your Audio?
            </h2>
            <p className="text-xl text-luxury-gray mb-8">
              Join thousands of professionals who trust our equalizer for their
              audio processing needs
            </p>
            <Link
              to="/audio-eq"
              className="bg-gradient-to-r from-luxury-gold to-yellow-500 text-black font-bold px-12 py-4 rounded-xl hover:scale-105 transition-transform inline-flex items-center space-x-2"
            >
              <Volume2 className="w-5 h-5" />
              <span>Start Processing Now</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AudioEQLanding;
