"use client"

// imports
import { useEffect, useReducer, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress"

import { PatternFormat } from 'react-number-format';

// Z validation schema
const step1Schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    age: z.number().min(18, 'You must be at least 18 years old'),
    phone: z.string().optional(),
});

const step2Schema = z.object({
    job: z.string().min(1, 'Job is required'),
    experience: z.number().min(1, 'Experience must be at least 1 year'),
});

const step3Schema = z.object({
    username: z.string().min(2, 'Username must be at least 2 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters long'),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

const getSchemaForStep = (step: number) => {
    switch (step) {
        case 1:
            return step1Schema;
        case 2:
            return step2Schema;
        case 3:
            return step3Schema;
        default:
            return step1Schema;
    }
};

// TypeScript Definitions
type StepData = {
    data: Partial<FormData>;
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
    | { type: 'SET_STEP_DATA'; payload: Partial<FormData> }
    | { type: 'RESET' };

type FormData = {
    name: string;
    email: string;
    age: number;
    phone?: string;
    job: string;
    experience: number;
    username: string;
    password: string;
    confirmPassword: string;
};

const initialState = {
    currentStep: 1,
    steps: {
        1: { data: {} },
        2: { data: {} },
        3: { data: {} },
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


export default function RHFMultiStepForm() {
    const [isLoaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(33);
    const [state, dispatch] = useReducer(wizardReducer, initialState);
    const [startTransition, setTransition] = useState(false);
    const [stepHeight, setStepHeight] = useState('0px');

    const Step1Ref = useRef<HTMLDivElement | null>(null);
    const Step2Ref = useRef<HTMLDivElement | null>(null);
    const Step3Ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 500)
    }, []);

    useEffect(() => {
        if (Step1Ref.current && Step2Ref.current && Step3Ref.current) {
            const step1Height = Step1Ref.current.offsetHeight + 25;
            const step2Height = Step2Ref.current.offsetHeight + 25;
            const step3Height = Step3Ref.current.offsetHeight + 25;

            switch (state.currentStep) {
                case 1:
                    setStepHeight(`${step1Height}px`);
                    break;
                case 2:
                    setStepHeight(`${step2Height}px`);
                    break;
                case 3:
                    setStepHeight(`${step3Height}px`);
                    break;
                default:
                    setStepHeight(`0px`);
            }
        }
    }, [state.currentStep]);

    const form = useForm({
        resolver: zodResolver(getSchemaForStep(state.currentStep)),
        defaultValues: {
            name: "",
            email: "",
            age: 18,
            phone: "",
            job: "",
            experience: 1,
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { trigger, getValues, reset } = form;

    type FieldNames = "name" | "email" | "age" | "phone" | "job" | "experience" | "username" | "password" | "confirmPassword";

    const handleNext = async () => {
        let fieldsToValidate: FieldNames[];

        switch (state.currentStep) {
            case 1:
                fieldsToValidate = ['name', 'email', 'age', 'phone'];
                break;
            case 2:
                fieldsToValidate = ['job', 'experience'];
                break;
            case 3:
                fieldsToValidate = ['username', 'password', 'confirmPassword'];
                break;
            default:
                fieldsToValidate = [];
                break;
        }

        const isStepValid = await trigger(fieldsToValidate); // Validate current step fields

        if (isStepValid) {
            setTransition(true);
            setTimeout(() => {
                dispatch({ type: "SET_STEP_DATA", payload: getValues() });
                dispatch({ type: 'NEXT_STEP' });
                setTransition(false);
            }, 1000);

            if (state.currentStep == 1) {
                setProgress(66);
            } else {
                setProgress(95);
            }
        }
    };

    const handlePrev = () => {
        setTransition(true);
        setTimeout(() => {
            dispatch({ type: 'PREV_STEP' });
            setTransition(false);
        }, 1000)

        if (state.currentStep == 3) {
            setProgress(66);
        } else {
            setProgress(33);
        }
    };

    const handleReset = () => {
        dispatch({ type: 'RESET' });
        reset({
            name: "",
            email: "",
            age: 18,
            phone: "",
            job: "",
            experience: 1,
            username: "",
            password: "",
            confirmPassword: "",
        });
        setProgress(33);
    };

    // Define a submit handler.
    const onSubmit = (data: FormData) => {
        dispatch({ type: "SET_STEP_DATA", payload: data });

        const aggregatedData = {
            ...state.steps[1].data,
            ...state.steps[2].data,
            ...state.steps[3].data,
        };
        console.log(aggregatedData);
        alert(`${aggregatedData?.name}, thank you! :) The form was submitted successfully!`);
        handleReset();
    }

    return (
        <div className="flex flex-col justify-center gap-2 my-2 border p-8">
            <h3 className="text-3xl text-white">Multi-Step Form</h3>
            <label className="w-full">Lesson: Learn React Form Hook basics, Zod validations, and error handling</label>

            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => onSubmit({ ...data, age: Number(data.age), experience: Number(data.experience) }))} className="flex flex-col gap-6 justify-start w-full max-w-[720px] min-h-[500px] mx-auto bg-slate-800 rounded-lg p-10 mt-6">

                    <p className="text-right">Step ({state.currentStep}/3)</p>
                    <Progress value={progress} className="w-full transition-all duration-300" />


                    <div className="step-container relative transition-all duration-300 overflow-hidden" style={{ minHeight: stepHeight }}>
                        <div id="step-1" ref={Step1Ref} className={`rhf-slide flex flex-col gap-6 opacity-0 transition-all duration-500  absolute w-full ${state.currentStep === 1 && !startTransition && isLoaded ? 'opacity-100 z-10' : 'opacity-0'}`}>
                            <p className="text-white text-3xl font-semibold border-b border-slate-600 pb-4">Personal Information</p>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-white">Full Name</FormLabel>
                                        <FormControl>
                                            <Input className="text-white bg-slate-700" placeholder="Your full name" autoComplete="name" {...field} {...form.register('name')} />
                                        </FormControl>
                                        <FormMessage className="absolute -bottom-7 left-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-white">Email</FormLabel>
                                        <FormControl>
                                            <Input className="text-white bg-slate-700" placeholder="Your email" {...field} />
                                        </FormControl>
                                        <FormMessage className="absolute -bottom-7 left-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-white">Age</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="text-white bg-slate-700"
                                                placeholder="Your age"
                                                autoComplete="age"
                                                type="number"
                                                min={1}
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage className="absolute -bottom-7 left-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-white">Phone (optional)</FormLabel>
                                        <FormControl>
                                            <PatternFormat
                                                format="###-###-####"
                                                mask="_"
                                                value={field.value || ""}
                                                onValueChange={(values) => field.onChange(values.value)}
                                                customInput={Input}
                                                placeholder="111-222-3333"
                                                className="text-white bg-slate-700"
                                            />
                                        </FormControl>
                                        <FormMessage className="absolute -bottom-7 left-3" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div id="step-2" ref={Step2Ref} className={`rhf-slide flex flex-col gap-6 opacity-0 transition-all duration-500  absolute w-full ${state.currentStep === 2 && !startTransition ? 'opacity-100 z-10' : 'opacity-0'}`}>
                            <p className="text-white text-3xl font-semibold border-b border-slate-600 pb-4">Job Background</p>
                            <FormField
                                control={form.control}
                                name="job"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-white">Previous Job Title</FormLabel>
                                        <FormControl>
                                            <Input className="text-white bg-slate-700" placeholder="Your job previous title" autoComplete="job" {...field} />
                                        </FormControl>
                                        <FormMessage className="absolute -bottom-7 left-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="experience"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-white">Years of Experience</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="text-white bg-slate-700"
                                                placeholder="Years of experience"
                                                autoComplete="experience"
                                                type="number"
                                                min={1}
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage className="absolute -bottom-7 left-3" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div id="step-3" ref={Step3Ref} className={`rhf-slide flex flex-col gap-6 opacity-0 transition-all duration-500  absolute w-full ${state.currentStep === 3 && !startTransition ? 'opacity-100 z-10' : 'opacity-0'}`}>
                            <p className="text-white text-3xl font-semibold border-b border-slate-600 pb-4">Account Information</p>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-white">Username</FormLabel>
                                        <FormDescription className="italic">
                                            Note: This is your public display name.
                                        </FormDescription>
                                        <FormControl>
                                            <Input className="text-white bg-slate-700" placeholder="Your username" autoComplete="username" {...field} />
                                        </FormControl>
                                        <FormMessage className="absolute -bottom-7 left-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-white">Password</FormLabel>
                                        <FormControl>
                                            <Input className="text-white bg-slate-700" placeholder="Your password..." type="password" autoComplete="new-password" {...field} />
                                        </FormControl>
                                        <FormMessage className="absolute -bottom-7 left-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-white">Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input className="text-white bg-slate-700" placeholder="Confirm your password..." type="password" autoComplete="new-password" {...field} />
                                        </FormControl>
                                        <FormMessage className="absolute -bottom-7 left-3" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    <div className="flex items-center justify-between border-t border-slate-600 py-4 mt-auto z-10">
                        <button type="button" onClick={handlePrev} disabled={state.currentStep === 1} className="px-4 py-2 cursor-pointer text-white rounded-lg bg-green-700 hover:bg-green-800">
                            Previous
                        </button>
                        {state.currentStep < 3 && (
                            <button type="button" onClick={handleNext} disabled={state.currentStep === 3} className="px-4 py-2 rounded-lg cursor-pointer text-white bg-green-700 hover:bg-green-800">
                                Next
                            </button>
                        )}
                        {state.currentStep === 3 && (
                            <>
                                <button className="px-4 py-2 rounded-lg cursor-pointer text-white bg-yellow-600 hover:bg-yellow-700" onClick={handleReset}>Reset</button>
                                <button type="submit" className="px-4 py-2 rounded-lg cursor-pointer text-white bg-red-700 hover:bg-red-800">Submit</button>
                            </>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
}
