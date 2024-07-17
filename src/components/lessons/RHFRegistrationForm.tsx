"use client"

// imports
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Z validation schema
const formSchema = z.object({
    username: z.string().min(2, 'Username must be at least 2 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters long'),
    phone: z.string().optional(),
    age: z.number().min(18, { message: "Age must be at least 18" })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

// TypeScript Validations
type FormValues = z.infer<typeof formSchema>;

export default function RHFRegistrationForm() {
    const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            age: 18,
        },
    });

    // Define a submit handler.
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        setSubmittedData(values);
        form.reset();
        alert('Form has been submitted Successfully!');
    }

    return (
        <div className="flex flex-col justify-center gap-2 my-2 border p-8">
            <h3 className="text-3xl text-white">Advanced Registration Form</h3>
            <label className="w-full">Lesson: Learn React Form Hook basics, Zod validations, and error handling</label>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center space-y-4 w-full max-w-[720px] min-h-[500px] mx-auto bg-slate-800 p-10 mt-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Username</FormLabel>
                                <FormDescription className="italic">
                                    Note: This is your public display name.
                                </FormDescription>
                                <FormControl>
                                    <Input className="text-white bg-slate-700" placeholder="Your username" autoComplete="username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Email</FormLabel>
                                <FormControl>
                                    <Input className="text-white bg-slate-700" placeholder="Your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Password</FormLabel>
                                <FormControl>
                                    <Input className="text-white bg-slate-700" placeholder="Your password..." type="password" autoComplete="new-password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Confirm Password</FormLabel>
                                <FormControl>
                                    <Input className="text-white bg-slate-700" placeholder="Confirm your password..." type="password" autoComplete="new-password" {...field} />
                                </FormControl>
                                {form.formState.errors.confirmPassword && <p className="text-red-500">{form.formState.errors.confirmPassword.message}</p>}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Age</FormLabel>
                                <FormControl>
                                    <Input className="text-white bg-slate-700" placeholder="Your age" autoComplete="age" type="number" min={18} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="bg-blue-800 hover:bg-blue-700">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
