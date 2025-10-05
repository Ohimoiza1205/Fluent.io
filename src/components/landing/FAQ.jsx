import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const faqData = [
    {
      question: "How does real-time translation work?",
      answer: "Our AI-powered engine processes speech in milliseconds, translating across 40+ languages while preserving tone and context. The technology adapts to accents and speaking styles for natural conversations."
    },
    {
      question: "Is my conversation data secure?",
      answer: "We use enterprise-grade encryption for all communications. Your conversations are never stored, and our zero-knowledge architecture ensures complete privacy. All data is processed in real-time and immediately discarded."
    },
    {
      question: "What makes your voice synthesis unique?",
      answer: "Our neural voice synthesis creates natural-sounding speech that maintains emotional nuance and speaking patterns. We use advanced machine learning models trained on diverse voice samples to ensure authenticity across languages."
    },
    {
      question: "How many participants can join a call?",
      answer: "Our platform supports up to 20 participants simultaneously, each speaking different languages. The system intelligently manages audio streams to ensure crystal-clear communication for everyone."
    },
    {
      question: "Do I need special equipment?",
      answer: "No special hardware required. Our platform works in any modern browser with just a microphone and camera. We support Chrome, Firefox, Safari, and Edge browsers on desktop and mobile devices."
    },
    {
      question: "What languages are supported?",
      answer: "We currently support over 40 languages including English, Spanish, Mandarin, Hindi, Arabic, French, German, Japanese, and many more. We're continuously adding new languages and dialects based on user demand."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/Ohimoiza1205/Fluent.io', '_blank', 'noopener noreferrer');
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            If you can't find an answer that you're looking for, feel free to drop us a line.
          </p>
          
          {/* Action buttons - all link to GitHub */}
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={handleGitHubClick}
              className="px-6 py-3 border-2 border-gray-900 rounded-full text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors"
            >
              About the company
            </button>
            <button 
              onClick={handleGitHubClick}
              className="px-6 py-3 border-2 border-gray-900 rounded-full text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors"
            >
              Contact support
            </button>
            <button 
              onClick={handleGitHubClick}
              className="px-6 py-3 border-2 border-gray-900 rounded-full text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors"
            >
              Visit help center
            </button>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-0 divide-y divide-gray-200">
          {faqData.map((item, index) => (
            <div key={index} className="py-6">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between text-left focus:outline-none group"
                aria-expanded={activeIndex === index}
              >
                <h3 className="text-xl font-medium text-gray-900 pr-8">
                  {item.question}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      height: { duration: 0.4, ease: "easeInOut" },
                      opacity: { duration: 0.3, ease: "easeInOut" }
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 leading-relaxed mt-4">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg transition-all">
            Get in touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

// DEBUG: Confirmed accordion toggle and animation transitions for FAQ.
