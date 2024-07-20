"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TransitionContextType {
    isTransitioning: boolean;
    setIsTransitioning: (state: boolean) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);

    return (
        <TransitionContext.Provider value={{ isTransitioning, setIsTransitioning }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const useTransition = () => {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error('useTransition must be used within a TransitionProvider');
    }
    return context;
};
