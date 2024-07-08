"use client"

// imports
import { useReducer } from "react";

// TypeScript Definitions
type StepData = {
    data: string | null;
};

type State = {
    currentStep: number;
    steps: {
        1: StepData;
        2: StepData;
        3: StepData;
    };
};

type Action =
    | { type: 'NEXT_STEP' }
    | { type: 'PREV_STEP' }
    | { type: 'SET_STEP_DATA'; payload: string }
    | { type: 'RESET' };

const initialState = {
    currentStep: 1,
    steps: {
        1: { data: null },
        2: { data: null },
        3: { data: null },
    },
};

function wizardReducer(state: State, action: Action) {
    switch (action.type) {
        case 'NEXT_STEP':
            return {
                ...state,
                currentStep: state.currentStep + 1,
            };
        case 'PREV_STEP':
            return {
                ...state,
                currentStep: state.currentStep - 1,
            };
        case 'SET_STEP_DATA':
            return {
                ...state,
                steps: {
                    ...state.steps,
                    [state.currentStep]: {
                        data: action.payload,
                    },
                },
            };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

export default function WizardStepper() {
    const [state, dispatch] = useReducer(wizardReducer, initialState);

    const handleNext = () => {
        dispatch({ type: 'NEXT_STEP' });
    };

    const handlePrev = () => {
        dispatch({ type: 'PREV_STEP' });
    };

    const handleDataChange = (data: string) => {
        dispatch({ type: 'SET_STEP_DATA', payload: data });
    };

    const handleReset = () => {
        dispatch({ type: 'RESET' });
    };

    return (
        <div className="border p-4">
            <h3 className="text-3xl text-white">useReducer Form</h3>
            <p>(useReducer hook)</p>

            <div className="bg-slate-800 p-4 my-3 min-h-[500px]">
                <p className="text-right">Step ({state.currentStep}/3)</p>
                {state.currentStep === 1 && (
                    <Step1 data={state.steps[1].data} onDataChange={handleDataChange} />
                )}
                {state.currentStep === 2 && (
                    <Step2 data={state.steps[2].data} onDataChange={handleDataChange} />
                )}
                {state.currentStep === 3 && (
                    <Step3 data={state.steps[3].data} onDataChange={handleDataChange} />
                )}
            </div>

            <div className="flex items-center justify-between">
                <button onClick={handlePrev} disabled={state.currentStep === 1} className="px-4 py-2 cursor-pointer text-white bg-green-700 hover:bg-green-800">
                    Previous
                </button>
                {state.currentStep < 3 && (
                    <button onClick={handleNext} disabled={state.currentStep === 3} className="px-4 py-2 cursor-pointer text-white bg-green-700 hover:bg-green-800">
                        Next
                    </button>
                )}
                {state.currentStep === 3 && (
                    <button onClick={handleReset}>Reset</button>
                )}
            </div>
        </div>
    )
}

// More TypeScript Definitions
type StepProps = {
    data: string | null;
    onDataChange: (data: string) => void;
};

function Step1({ data, onDataChange }: StepProps) {
    return (
        <div className="flex flex-col py-4">
            <label>Name</label>
            <input
                type="text"
                value={data || ''}
                onChange={(e) => onDataChange(e.target.value)}
                className="border p-2"
            />
        </div>
    );
}

function Step2({ data, onDataChange }: StepProps) {
    return (
        <div className="flex flex-col py-4">
            <label>Address</label>
            <input
                type="text"
                value={data || ''}
                onChange={(e) => onDataChange(e.target.value)}
                className="border p-2"
            />
        </div>
    );
}

function Step3({ data, onDataChange }: StepProps) {
    return (
        <div className="flex flex-col py-4">
            <label>Contact</label>
            <input
                type="text"
                value={data || ''}
                onChange={(e) => onDataChange(e.target.value)}
                className="border p-2"
            />
        </div>
    );
}