
"use client"

import React, { useState, useMemo } from 'react';

const Performance: React.FC = () => {
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState('');

    // Simulate an expensive computation
    const expensiveComputation = (num: number) => {
        console.log('Performing expensive computation...');
        let result = 0;
        for (let i = 0; i < 1000000000; i++) {
            result += num;
        }
        return result;
    };

    // Without useMemo, this computation will run on every render
    const computedValue = expensiveComputation(count);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div>
            <h1>Expensive Computation Component</h1>
            <div>
                <label>
                    Input:
                    <input type="text" value={inputValue} onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <button onClick={() => setCount(count + 1)}>Increment Count</button>
            </div>
            <div>
                <p>Computed Value: {computedValue}</p>
                <p>Count: {count}</p>
            </div>
        </div>
    );
};

export default Performance;
