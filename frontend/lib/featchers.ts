import { Category, Product } from "@/interface/index";

export const fetchCategories = async (): Promise<Category[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const json = await res.json();

    console.log(json, 'check for category')
    return json.categories;
};

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/featured`, {
        next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error("Failed to fetch featured products");
    const json = await res.json();
    return json.featuredProducts;
}

export const fetchNewArrivals = async (): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/new-arrivals`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch new arrival products");
    const json = await res.json();
    return json.newArrivalsProducts;
}

export const fetchAllProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error("Failed to fetch all products");
    const json = await res.json();
    return json.newArrivalsProducts;
}

export const fetchProductsByCategory = async (category:string):Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${category}`)
    if(!res.ok) throw new Error("failed to fetch products")
        const json = await res.json();
        return json.products;
}
