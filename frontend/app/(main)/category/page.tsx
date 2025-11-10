import Common from "@/components/Common";
import CategoryContent from "./CategoryContent";
import { fetchAllProducts, fetchCategories, fetchProductsByCategory } from "@/lib/fetchers";
import { Category, Product } from "@/interface";

const CategoryPage = async ({ searchParams }: { searchParams: Promise<{ slug?: string }> }) => {
    const { slug } = await searchParams

    let categories: Category[] = [];
    let initialProducts: Product[] = [];
    let defaultCategory = slug || "";

    try {
        const productPromise = slug ? fetchProductsByCategory(slug) : fetchAllProducts()
        const results = await Promise.all([
            fetchCategories(),
            productPromise,
        ]);
        categories = results[0];
        initialProducts = results[1];
    } catch (err) {
        console.error("Failed to fetch categories or products", err);
        categories = [];
        initialProducts = [];
    }

    return (
        <>
            <Common header="Browse by Category" />
            <CategoryContent
                categories={categories}
                initialProducts={initialProducts}
                defaultCategory={defaultCategory}
            />
        </>
    )
}

export default CategoryPage;
