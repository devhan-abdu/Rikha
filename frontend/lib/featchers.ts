import { Category, Product, ProductDetail } from "@/interface/index";

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
    });
    if (!res.ok) throw new Error("Failed to fetch featured products");
    const json = await res.json();
    return json.featuredProducts;
}

export const fetchNewArrivals = async (): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/new-arrivals`, {
    });
    if (!res.ok) throw new Error("Failed to fetch new arrival products");
    const json = await res.json();
    return json.newArrivalsProducts;
}

export const fetchAllProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    });
    if (!res.ok) throw new Error("Failed to fetch all products");
    const json = await res.json();
    return json.newArrivalsProducts;
}

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${category}`)
    if (!res.ok) throw new Error("failed to fetch products")
    const json = await res.json();
    return json.products;
}

export const fetchProductDetail = async (slug: string): Promise<ProductDetail> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {
    });
    if (!res.ok) throw new Error("failed to fetch productdetail")
    const json = await res.json();
    return json.product;
}
export const fetchRelatedProducts = async (category: number): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${category}/related`, {
    });
    if (!res.ok) throw new Error("Failed to fetch related products");
    const json = await res.json();
    return json.relatedProducts;
}
export const fetchSearchProducts = async (query: string): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/search?query=${encodeURIComponent(query)}`, {
    });
    if (!res.ok) throw new Error("Failed to fetch search products");
    const json = await res.json();
    return json.products;
}

export const createTransaction = async (email: string, amount: number): Promise<string> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-transaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, amount }),
  });

  if (!res.ok) throw new Error("Failed to create the transaction");

  const json = await res.json();

  if (!json.url) throw new Error("No checkout URL returned");

  return json.url;
};

