"use client"

// imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { addRecipe, removeRecipe, updateRecipe, resetRecipes, search } from "@/lib/redux/recipes/recipesSlice";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

// TypeScript Definitions
interface Recipe {
    id: number;
    title: string;
    description: string;
    category: string;
    steps: string[];
}

export default function RecipeManager() {
    // Redux variables
    const recipes = useSelector((state: RootState) => state.recipes.recipes);
    const searchResults = useSelector((state: RootState) => state.recipes.searchResults);
    const searchPerformed = useSelector((state: RootState) => state.recipes.searchPerformed);

    const dispatch = useDispatch<AppDispatch>();
  
    // Initial variables
    const initialID = recipes.length > 0 ? recipes.length : 0;
    const recipeIDRef = useRef(initialID);

    // Search variables
    const [searchValue, setSearchValue] = useState('');
    const recipesToRender = searchResults.length > 0 || searchPerformed ? searchResults : recipes;

    // Recipe object
    const [newRecipe, setNewRecipe] = useState({
        id: recipeIDRef.current,
        title: '',
        description: '',
        category: '',
        steps: [''],
    });
  
    // Action states
    const [isEditing, setEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    // Recipe Card Functions
    const handleRecipeCategory = (value: string) => {
        setNewRecipe((prevRecipe) => ({
            ...prevRecipe,
            category: value,
        }));
    }
    const handleRecipeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRecipe((prevRecipe) => ({
            ...prevRecipe,
            title: e.target.value,
        }));
    }
    const handleRecipeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewRecipe((prevRecipe) => ({
            ...prevRecipe,
            description: e.target.value,
        }));
    }
    const handleAddStep = () => {
        setNewRecipe({
            ...newRecipe,
            steps: [...newRecipe.steps, '']
        });
    };
    const handleRemoveStep = (index: number) => {
        const newSteps = newRecipe.steps.filter((_, i) => i !== index);
        setNewRecipe({
            ...newRecipe,
            steps: newSteps
        });
    };
    const handleStepChange = (index: number, value: string) => {
        const newSteps = newRecipe.steps.map((step, i) => (i === index ? value : step));
        setNewRecipe({
            ...newRecipe,
            steps: newSteps
        });
    };

    const getCategoryClass = (category: string) => {
        switch (category) {
            case 'breakfast':
                return 'bg-yellow-700 hover:bg-yellow-600';
            case 'lunch':
                return 'bg-green-700 hover:bg-green-600';
            case 'dinner':
                return 'bg-red-700 hover:bg-red-600';
            case 'drinks':
                return 'bg-purple-700 hover:bg-purple-600';
            case 'desserts':
                return 'bg-blue-700 hover:bg-blue-600';
            default:
                return 'bg-slate-600 hover:bg-slate-500';
        }
    };
    const getCategoryCardClass = (category: string) => {
        switch (category) {
            case 'breakfast':
                return 'bg-yellow-100';
            case 'lunch':
                return 'bg-green-100';
            case 'dinner':
                return 'bg-red-100';
            case 'drinks':
                return 'bg-purple-100';
            case 'desserts':
                return 'bg-blue-100';
            default:
                return 'bg-gray-300';
        }
    };
    const createRecipe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newRecipe.title !== '' && newRecipe.description !== '') {
            recipeIDRef.current += 1;
            dispatch(addRecipe(newRecipe));
            setNewRecipe((prevRecipe) => ({
                ...prevRecipe,
                id: recipeIDRef.current + 1,
                title: '',
                description: '',
                category: '',
                steps: [''],
            }));
            setErrorMessage('');
        } else {
            setErrorMessage('Fields cannot be empty.');
        }

    }
    const editRecipe = (recipe: Recipe) => {
        setErrorMessage('');
        setEditing(true);
        setNewRecipe({
            id: recipe.id,
            title: recipe.title,
            description: recipe.description,
            category: recipe.category,
            steps: recipe.steps,
        });
    }
    const resetEditRecipe = () => {
        setEditing(false);
        setErrorMessage('');
        setNewRecipe({
            id: recipeIDRef.current,
            title: '',
            description: '',
            category: '',
            steps: [''],
        });
    }
    const handleUpdateRecipe = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (newRecipe.title !== '' && newRecipe.description !== '' && newRecipe.category !== '') {
            dispatch(updateRecipe(newRecipe));
            resetEditRecipe();
            setErrorMessage('');
        } else {
            setErrorMessage('Fields cannot be empty.');
        }
    }
    const handleCancelRecipe = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        resetEditRecipe();
    }

    // Search functions
    const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }
    const searchRecipes = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(search(searchValue));
    }
    const resetAllRecipes = () => {
        dispatch(resetRecipes());
    }

    return (
        <div className="flex flex-col gap-2 border p-8">
            <div>
                <h3 className="text-3xl text-white py-2">Recipe Manager</h3>
                <p>(Redux Toolkit)</p>
            </div>

            <div className="flex flex-col gap-4">
                <div className="w-full container p-4">
                    <form onSubmit={createRecipe} className="flex flex-col gap-4 p-6 rounded-lg w-full max-w-[50%] mx-auto bg-slate-400">
                        <div>
                            <h4 className="text-2xl text-black font-semibold py-2 my-2 border-b border-black">{!isEditing ? 'Create a Recipe' : `Currently Editing: ${newRecipe.title}`}</h4>

                            <label className="block text-black pb-2">Category</label>
                            <Select value={newRecipe.category} onValueChange={handleRecipeCategory}>
                                <SelectTrigger className={`w-[180px] text-black ${isEditing && 'bg-yellow-50 italic'}`}>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Categories</SelectLabel>
                                        <SelectItem value="breakfast">Breakfast</SelectItem>
                                        <SelectItem value="lunch">Lunch</SelectItem>
                                        <SelectItem value="dinner">Dinner</SelectItem>
                                        <SelectItem value="drinks">Drinks</SelectItem>
                                        <SelectItem value="desserts">Desserts</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-black pb-2">Title</label>
                            <Input type="text" placeholder="Recipe title..." value={newRecipe.title} onChange={handleRecipeTitle} className={`text-black ${isEditing && 'bg-yellow-50 italic'}`} />
                        </div>
                        <div>
                            <label className="block text-black pb-2">Description</label>
                            <Textarea placeholder="Type your description here." value={newRecipe.description} onChange={handleRecipeDescription} className={`text-black ${isEditing && 'bg-yellow-50 italic'}`} />
                        </div>
                        <div className="steps-container">
                            <label className="block text-black pb-2">Steps</label>
                            {newRecipe.steps.map((step, index) => (
                                <div key={index} className="flex items-center gap-2 my-2">
                                    <label className="mx-2 text-black">{index + 1}.</label>
                                    <Textarea rows={2} placeholder="Type here..." value={step} onChange={(e) => handleStepChange(index, e.target.value)} className={`text-black ${isEditing && 'bg-yellow-50 italic'}`} />
                                    <Button type="button" onClick={() => handleRemoveStep(index)} className="bg-red-500 text-white px-2 py-1 rounded">
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button type="button" onClick={handleAddStep} className="text-white px-4 py-2 rounded">
                            Add Step
                        </Button>

                        {errorMessage && <p className="text-white bg-red-700 py-2 px-4 mb-2">Oops! {errorMessage}</p>}

                        <div className="flex items-center justify-between">
                            {isEditing ?
                                (
                                    <>
                                        <Button type="button" onClick={handleUpdateRecipe} className="w-fit cursor-pointer px-4 py-2 rounded-lg bg-green-700 hover:bg-green-800">Update</Button>
                                        <Button type="button" onClick={handleCancelRecipe} className="w-fit cursor-pointer px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800">Cancel</Button>
                                    </>
                                ) :
                                <Button type="submit" className="w-fit cursor-pointer px-4 py-2 rounded-lg bg-green-700 hover:bg-green-800">Add Recipe</Button>
                            }
                        </div>
                    </form>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-center gap-10 bg-slate-500 rounded-lg py-2 px-4">
                        <form onSubmit={searchRecipes} className="flex items-center gap-2 w-full">
                            <Input type="text" placeholder="Search recipe..." value={searchValue} onChange={handleSearchValue} className="text-white bg-slate-800" />
                            <Button type="submit" className="w-auto">Submit</Button>
                        </form>
                        <Button onClick={resetAllRecipes} className="w-fit bg-red-500/50 hover:bg-red-500">Reset All Recipes</Button>
                    </div>
                </div>

                <div>
                    <p>Total Recipes: {recipesToRender.length}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {searchPerformed && searchResults.length === 0 ? (
                        <div className="col-span-2 border rounded-lg p-10 text-center text-white">
                            <p>No results found! Please search another recipe.</p>
                        </div>
                    ) : (
                        recipesToRender.map((item, i) => {
                            return (
                                <div key={i} className={`text-black p-6 rounded-lg ${getCategoryCardClass(item.category)}`}>
                                    <div className="flex items-center justify-between">
                                        <p className={`text-white text-xs w-fit px-2 py-1 rounded-full cursor-pointer ${getCategoryClass(item.category)}`}>{item.category}</p>
                                        <Button onClick={() => dispatch(removeRecipe(item.title))} className="text-xs text-black px-2 py-1 border border-transparent bg-transparent hover:bg-transparent hover:underline hover:border hover:border-black">Remove</Button>
                                    </div>
                                    <h4 className="text-2xl font-semibold border-b border-black pb-2 mb-6">{item.title}</h4>
                                    <div className="card-content">
                                        <p className="font-semibold">Description:</p>
                                        <p>{item.description}</p>
                                        <p className="mt-6 font-semibold">Steps:</p>
                                        <ol className="ml-3 leading-8">
                                            {item.steps.map((step, i) => {
                                                return (<li key={i} className="list-decimal ml-5">{step}</li>);
                                            })}
                                        </ol>
                                    </div>
                                    <div className="border-t border-black pt-2 mt-6">
                                        <Button onClick={() => editRecipe(item)} className="w-full bg-black hover:bg-gray-700">Edit Recipe</Button>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>

            </div>

            <div className="border-t border-white/25 py-4">
                <h4 className="text-xl text-white py-2">What I Learned:</h4>
                <ul className="list-disc px-6">
                    <li>A Redux slice can be used to create reducers that perform add, remove, update, reset, and search functionalities</li>
                    <li>Action payloads can be used to pass data between the reducer functions and react components</li>
                    <li>Functions can be used to output css classes. In this example, I used the recipe category to determine how to style each recipe cards.</li>
                </ul>
            </div>
        </div>
    )
}