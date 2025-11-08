import { fetchCategories, fetchProductsByCategory, fetchAllProducts } from '@/lib/featchers'
import CategoryPage from "./Category";
import Common from '@/components/Common';
import { Suspense } from 'react';
import Loading from './loading';


const Category = async ({ searchParams }: { searchParams: Promise<{ slug?: string }> }) => {
    const categories = await fetchCategories();
    const { slug } = await searchParams

    let initialProducts, defaultCategory;
    if (!slug) {
        initialProducts = await fetchAllProducts();
        defaultCategory = "";

    } else {
        initialProducts = await fetchProductsByCategory(slug);
        defaultCategory = slug;
    }

    return (
        <Suspense fallback={<Loading />}>
            <Common header="Browse by Category" />
            <CategoryPage
                categories={categories}
                initialProducts={initialProducts}
                defaultCategory={defaultCategory}
            />
        </Suspense>
    )
}

export default Category
