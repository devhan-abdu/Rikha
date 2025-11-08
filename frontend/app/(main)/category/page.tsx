import Common from "@/components/Common";
import CategoryContent from "./CategoryContent";
import { fetchAllProducts, fetchCategories, fetchProductsByCategory } from "@/lib/featchers";
import { Category, Product } from "@/interface";

const CategoryPage = async ({ searchParams }: { searchParams: Promise<{ slug?: string }> }) => {
    let categories: Category[] = [];
    let initialProducts: Product[] = [];
    let defaultCategory = "";
    const { slug } = await searchParams

    try {
        categories = await fetchCategories();
        if (slug) {
            initialProducts = await fetchProductsByCategory(slug);
            defaultCategory = slug;
        } else {
            initialProducts = await fetchAllProducts();
        }
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
