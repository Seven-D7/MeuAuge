'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    const Component = hover ? motion.div : 'div';
    const motionProps = hover ? {
      whileHover: { y: -4, scale: 1.02 },
      transition: { duration: 0.2 }
    } : {};

    return (
      <Component
        ref={ref}
        className={cn(
          'bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6',
          hover && 'cursor-pointer',
          className
        )}
        {...motionProps}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export default Card;