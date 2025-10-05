import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import FAQ from '../components/landing/FAQ';
import TranslationPortal from '../components/ui/TranslationPortal';
import HowToUseSection from '../components/ui/HowToUseSection';
import BlurText from '../components/ui/BlurText';
import Stack from '../components/ui/CardRotate';
import chinaImage from '../assets/china.png';
import franceImage from '../assets/france.png';
import spainImage from '../assets/spain.png';
import brazilImage from '../assets/brazil.png';

const LandingPage = () => {
  const navigate = useNavigate();
  
  const images = [
    { id: 1, img: chinaImage },
    { id: 2, img: franceImage },
    { id: 3, img: spainImage },
    { id: 4, img: brazilImage }
  ];

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        
        {/* How it Works Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How Fluent.io Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Three simple steps to break down language barriers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Create a Room</h3>
                <p className="text-gray-600">Start a call and share the link with participants. No downloads or installations required.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Your Language</h3>
                <p className="text-gray-600">Each participant selects their preferred language. Our AI handles the rest automatically.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Talking</h3>
                <p className="text-gray-600">Speak naturally in your language. Everyone hears you in theirs, with your tone preserved.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section - No More Language Barriers */}
        <section className="py-20 bg-gray-50">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center">
              <BlurText
                text="No more language barriers"
                delay={360}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center"
              />
            </div>
            <TranslationPortal />
          </div>
          
          <HowToUseSection />
          
          {/* Join in Any Language Section */}
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                      Join in Any
                      <br />
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Language</span>
                    </h2>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Our AI interprets 40+ languages as you speak—no interpreters, no delays.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      onClick={() => navigate('/register')}
                      className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
                      <span className="relative z-10">Get Started</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    <Stack
                      randomRotation={true}
                      sensitivity={180}
                      sendToBackOnClick={true}
                      cardDimensions={{ width: 400, height: 400 }}
                      cardsData={images}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-xl text-gray-600">
                Start free. Upgrade as you grow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <p className="text-gray-600 mb-6">Perfect for trying out Fluent.io</p>
                <p className="text-4xl font-bold text-gray-900 mb-6">$0<span className="text-lg font-normal text-gray-600">/month</span></p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">30-minute calls</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Up to 2 participants</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">5 languages</span>
                  </li>
                </ul>
                <button className="w-full py-3 px-6 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Get Started
                </button>
              </div>

              {/* Pro Plan */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-xl text-white relative transform scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-white/90 mb-6">For professionals and small teams</p>
                <p className="text-4xl font-bold mb-6">$19<span className="text-lg font-normal text-white/80">/month</span></p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Unlimited call duration</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Up to 10 participants</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>40+ languages</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Voice cloning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>HD video quality</span>
                  </li>
                </ul>
                <button className="w-full py-3 px-6 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Start Free Trial
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-6">For large organizations</p>
                <p className="text-4xl font-bold text-gray-900 mb-6">Custom</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Unlimited everything</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">SSO & SAML</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Priority support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Custom integrations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">SLA guarantee</span>
                  </li>
                </ul>
                <button className="w-full py-3 px-6 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        <FAQ />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Fluent.io</h3>
              <p className="text-gray-400">Breaking down language barriers, one conversation at a time.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="https://github.com/Ohimoiza1205/Fluent.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Fluent.io. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;