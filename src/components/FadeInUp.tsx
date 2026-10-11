import React from 'react';
import {useLocation} from 'react-router-dom';
import {isMainRoute} from '../lib/routeLoader';
import { motion } from 'motion/react';

export default function FadeInUp({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  const location = useLocation();
  if (isMainRoute(location.pathname)) return <div {...props}>{children}</div>;
  return (
    <motion.div
      initial={typeof window === 'undefined' ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
