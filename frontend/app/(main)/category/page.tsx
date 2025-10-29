import { fetchCategories, fetchProductsByCategory, fetchAllProducts } from '@/lib/featchers'
import CategoryPage from "./Category";
import Common from '@/components/Common';


const Category = async ({searchParams}:{searchParams:{slug?: string}}) => {
    const categories = await fetchCategories();
    const { slug } = await searchParams

    let initialProducts , defaultCategory;
    if(!slug) {
       initialProducts = await fetchAllProducts();
        defaultCategory="";
       
    } else {
        initialProducts = await fetchProductsByCategory(slug);
        defaultCategory= slug;
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

export default Category
