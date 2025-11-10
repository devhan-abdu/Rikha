import { Category, Product, ProductDetail } from "@/interface/index";

export const fetchCategories = async (): Promise<Category[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const json = await res.json();
    return json.data;
};

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/featured`, {
        next: { revalidate: 300 }
    });
    if (!res.ok) throw new Error("Failed to fetch featured products");
    const json = await res.json();
    return json.data;
}

export const fetchNewArrivals = async (): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/new-arrivals`, {
        next: { revalidate: 300 }
    });
    if (!res.ok) throw new Error("Failed to fetch new arrival products");
    const json = await res.json();
    return json.data;
}

export const fetchAllProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        next: { revalidate: 300 }
    });
    if (!res.ok) throw new Error("Failed to fetch all products");
    const json = await res.json();
    return json.data;
}

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${category}`, {
        next: { revalidate: 300 }
    })
    if (!res.ok) throw new Error("failed to fetch products")
    const json = await res.json();
    return json.data;
}

export const fetchProductDetail = async (slug: string): Promise<ProductDetail> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {
        next: { revalidate: 300 }
    });
    if (!res.ok) throw new Error("failed to fetch productdetail")
    const json = await res.json();
    return json.data;
}
export const fetchRelatedProducts = async (slug: string): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}/related`, {
        next: { revalidate: 300 }
    });
    if (!res.ok) throw new Error("Failed to fetch related products");
    const json = await res.json();
    return json.data;
}
export const fetchSearchProducts = async (query: string): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/search?query=${encodeURIComponent(query)}`, {
        cache: "no-store"
    });
    if (!res.ok) throw new Error("Failed to fetch search products");
    const json = await res.json();
    return json.data;
}
export const addReview = async ({ productId, comment, rating }: { productId: number, comment: string, rating: number }): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ comment, rating }),
        credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to add review");
    const json = await res.json();
    return json.data;
}

