import { fetchFeaturedProducts, fetchCategories, fetchProductsByCategory } from '@/lib/featchers'
import CategoryPage from "./Category";
import Common from '@/components/Common';


const Collection = async ({searchParams}:{searchParams:{slug?: string}}) => {
    const categories = await fetchCategories();

    let initialProducts , defaultCategory;
    if(!searchParams.slug) {
       initialProducts = await fetchFeaturedProducts();
         defaultCategory="";
       
    } else {
        initialProducts = await fetchProductsByCategory(searchParams.slug);
        defaultCategory= searchParams.slug;
    }

    return (
        <div>
         <Common header="Browse by Category"/>  
            <CategoryPage
                categories={categories}
                initialProducts={initialProducts}
                defaultCategory = {defaultCategory}
            />
        </div>
    )
}

export default Collection
