import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-soft ${
        hover ? 'hover:shadow-medium hover:border-gray-200 hover:-translate-y-1 transition-all duration-300' : ''
      } ${className} animate-fade-in`}
    >
      {children}
    </div>
  );
};

export default Card;