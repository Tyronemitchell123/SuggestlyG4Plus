import React from 'react';
import Head from 'next/head';
import Logo from '../src/components/Logo';

export default function LogoTestPage() {
  return (
    <>
      <Head>
        <title>Logo Test - SuggestlyG4Plus</title>
        <meta name="description" content="Testing the animated SVG logo component" />
      </Head>
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          SuggestlyG4Plus Logo Component Test
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-center">
          {/* Default Logo */}
          <div className="text-center">
            <h2 className="text-xl mb-4 text-yellow-400">Default Size</h2>
            <Logo />
            <p className="text-gray-400 text-sm mt-2">120px, animated</p>
          </div>
          
          {/* Small Logo */}
          <div className="text-center">
            <h2 className="text-xl mb-4 text-yellow-400">Small Size</h2>
            <Logo size={80} />
            <p className="text-gray-400 text-sm mt-2">80px, animated</p>
          </div>
          
          {/* Large Logo */}
          <div className="text-center">
            <h2 className="text-xl mb-4 text-yellow-400">Large Size</h2>
            <Logo size={160} />
            <p className="text-gray-400 text-sm mt-2">160px, animated</p>
          </div>
          
          {/* No Animation */}
          <div className="text-center">
            <h2 className="text-xl mb-4 text-yellow-400">No Animation</h2>
            <Logo animate={false} />
            <p className="text-gray-400 text-sm mt-2">120px, static</p>
          </div>
          
          {/* Custom Class */}
          <div className="text-center">
            <h2 className="text-xl mb-4 text-yellow-400">Custom Styling</h2>
            <Logo className="border-2 border-yellow-500 rounded-full p-4" size={120} />
            <p className="text-gray-400 text-sm mt-2">With border</p>
          </div>
          
          {/* Extra Large */}
          <div className="text-center">
            <h2 className="text-xl mb-4 text-yellow-400">Extra Large</h2>
            <Logo size={200} />
            <p className="text-gray-400 text-sm mt-2">200px, animated</p>
          </div>
        </div>
        
        <div className="mt-16 max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">Usage Examples</h2>
          <div className="bg-gray-900 p-6 rounded-lg text-left">
            <pre className="text-green-400 text-sm overflow-x-auto">
{`// Basic usage
<Logo />

// Custom size
<Logo size={80} />

// Disable animation
<Logo animate={false} />

// With custom classes
<Logo className="my-custom-class" size={150} />

// All props combined
<Logo size={120} className="header-logo" animate={true} />`}
            </pre>
          </div>
        </div>
      </main>
    </>
  );
}