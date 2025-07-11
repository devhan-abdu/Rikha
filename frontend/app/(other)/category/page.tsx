import { fetchFeaturedProducts, fetchCategories } from '@/lib/featchers'
import CategoryPage from "./Category";
import { Suspense } from 'react';


const Collection = async () => {
    const categories = await fetchCategories();
    const initialProducts = await fetchFeaturedProducts()

    return (
        <div>
            <CategoryPage
                categories={categories}
                initialProducts={initialProducts}
            />
        </div>
    )
}

export default Collection
