import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchCategories() {
    const response = await fetch('https://fakestoreapi.com/products/categories');

    if (!response.ok) {
        const error = new Error('An error occured while fetching categories')
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const categories = await response.json();

    return categories;
}

export async function fecthCategorie({ signal, categorie }) {
    const url = 'https://fakestoreapi.com/products/category/' + categorie;

    const response = await fetch(url, { signal: signal })

    if (!response.ok) {
        const error = new Error('An error occured while fetching' + categorie)
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;

}