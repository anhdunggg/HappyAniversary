'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function ScrollSection({ children, className = '', delay = 0 }: ScrollSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
