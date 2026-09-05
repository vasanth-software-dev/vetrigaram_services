import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Semantic Breadcrumb Navigation Component
 * Provides clear navigational trail and microdata styling.
 */
export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-white/60 backdrop-blur-sm border-b border-gray-100 mb-6 rounded-2xl">
      <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-navy/60 font-medium">
        <li className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center gap-1 hover:text-primary transition-colors focus:outline-none"
            title="Vetrikharam Home Services"
          >
            <Home className="w-3.5 h-3.5 text-primary" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url || index} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              {isLast ? (
                <span className="font-semibold text-navy truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link 
                  to={item.url} 
                  className="hover:text-primary transition-colors focus:outline-none"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
