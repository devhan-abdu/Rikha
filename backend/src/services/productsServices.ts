
import prisma from "../config/prisma"
import client from "../config/sanityClient"
import {SanityProduct ,sanityCategory,review} from '../types/type'
import { AppError } from "../utils/AppError"



export const getProductDetail = async (slug: string) => {
  const product = await prisma.productMeta.findFirst({
    where: { slug: slug }
  });
  const [foundProductSanity] = await client.fetch<SanityProduct[]>(`*[_id == "${product?.sanityId}"]{
    _id,
      description,
      specs
    }`)

  if (!foundProductSanity || !product) throw new AppError("the product is not exist", 404);
  return { ...product, ...foundProductSanity }
}
export const getAllProducts = async () => {
 return await prisma.productMeta.findMany();
 
}

export const getCategory = async () => {
  const categories: sanityCategory[] = await client.fetch(
    `*[_type == "category"]{
      _id,
      name,
      slug,
      description,
      image
    }`
  );
  if (!categories) throw new AppError("empty category", 404)
  return categories;
}

export const getProductsByCategory = async (slug: string) => {
  
 return await prisma.productMeta.findMany({
  where: {category: slug}
});
}

export const getRelatedProducts = async (slug: string) => {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{tags, _id}`,
    { slug }
  );
  if (!product) return [];
  return await client.fetch(
    `*[_type == "product" && _id != $id && count(tags[@ in $tags]) > 0][0...4]{
      _id, title, slug, tags, images, brand, shortDescription
    }`,
    { id: product._id, tags: product.tags }
  );
};

export const getFeaturedProducts = async () => {
  const featuredProduct = await client.fetch(`
    *[_type == "product" && isFeatured == true][0...6]{
      _id,
      title,
      description,
      image,
      category
    }
  `);
  if (!featuredProduct) throw new AppError("no featured products found", 404);
  return featuredProduct;
}
export const getNewArrivalsProducts = async () => {
  const newArrivalsProduct = await client.fetch(`
    *[_type == "product" && isNew == true][0...6]{
       _id,
      title,
      description,
      image,
      category
    } `)
     if(!newArrivalsProduct) throw new AppError("no new arrivals products found", 404)
      return newArrivalsProduct
}
export const getReviews = async (slug:string) => {
   const reviews = await prisma.review.findMany(
    {
      where:{productId:slug}
    }
   )
   if (!reviews) throw new AppError("no reviews found", 404)
    return reviews
}
export const addReviews = async (reviewData:review) => {
   await prisma.review.create(
    {
      data: reviewData
    }
   )
    return true;
}




// admin related services

// export const addProduct = async (sanityId: string, price: string, stock: string) => {
//   // for the first time add how do i make the reviw part 
//   await prisma.productMeta.create({
//     data: {
//       sanityId,
//       price: Number(price),
//       stock: Number(stock),
//       rating: 0.0,
//       numReviews: 0
//     }
//   })
// }

// export const updateProduct = async (sanityId: string, price?: string, stock?: string) => {
//   const foundProduct = await prisma.productMeta.findUnique({
//     where: { sanityId }
//   })
//   if (!foundProduct) throw new AppError("the product is not exist", 404);

//   let updatedProduct: Prisma.productMetaUpdateInput = {};
//   if (price) updatedProduct.price = Number(price);
//   if (stock) updatedProduct.stock = Number(stock);

//   await prisma.productMeta.update({
//     where: { id: foundProduct.id },
//     data: updatedProduct
//   })
// }
// export const deleteProduct = async (sanityId: string) => {
//   const foundProduct = await prisma.productMeta.findUnique({
//     where: { sanityId }
//   });
//   if (!foundProduct) throw new AppError("the product is not exist", 404);

//   await prisma.productMeta.delete({
//     where: { id: foundProduct.id }
//   });

//   //  what about when the sanity the product not exist
//   await client.delete(sanityId).catch((error) => {
//   console.warn("Sanity delete failed:", error.message); 
// })
// }




