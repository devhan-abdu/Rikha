
import prisma from "../config/prisma"
import { SanityProduct, sanityCategory, review } from '../types/type'
import { AppError } from "../utils/AppError"



export const getProductDetail = async (slug: string) => {
  const productDetail = await prisma.product.findUnique({
    where:{slug},
     select: {
      image: true,
      title: true,
      price: true,
      stock:true,
      discount:true,
      specs: true,
      rating: true,
      numReviews: true,
      shortDesc: true,
      longDesc:true,
      id: true,
      slug: true,
      categoryId: true,
      reviews:{
        select:{
          id:true,
          rating:true,
          comment:true,
          user:{
            select:{
              name:true,
            }
          }
        }
      }
    }
  })
    if (!productDetail) throw new AppError("empty products", 404)
  return productDetail;
}
export const getAllProducts = async () => {

  const allProducts = await prisma.product.findMany({
    select: {
      image: true,
      title: true,
      price: true,
      specs: true,
      rating: true,
      numReviews: true,
      shortDesc: true,
      id: true,
      slug: true,
      categoryId: true
    }
  });
  if (!allProducts || allProducts.length === 0) throw new AppError("empty products", 404)
  return allProducts;

}

export const getCategory = async () => {

  const categories = await prisma.category.findMany({
    select: {

      id: true,
      name: true,
      image: true,
      slug: true,

    }
  });
  if (!categories) throw new AppError("empty category", 404)
  return categories;
}

export const getProductsByCategory = async (slug: string) => {
  const category = await prisma.category.findUnique({ where: { slug } })
  if (!category) throw new AppError('category not found', 404)

  const productCategory = await prisma.product.findMany({
    where: { categoryId: category.id },
    select: {
      image: true,
      title: true,
      price: true,
      specs: true,
      rating: true,
      numReviews: true,
      shortDesc: true,
      id: true,
      slug: true,
      categoryId: true
    }
  });
  if (!productCategory) throw new AppError("empty product category", 404)
  return productCategory;

}

export const getRelatedProducts = async (slug: string) => {

  const relatedProduct = await prisma.product.findMany({
    where: { categoryId: Number(slug) },
    select: {
      image: true,
      title: true,
      price: true,
      specs: true,
      rating: true,
      numReviews: true,
      shortDesc: true,
      id: true,
      slug: true,
      categoryId: true
    }
  })
  if (!relatedProduct) throw new AppError("no related products found", 404);
  return relatedProduct;
}

export const getFeaturedProducts = async () => {
  const featuredProduct = await prisma.product.findMany({
    where: { isFeatured: true },
    take: 4,
    select: {
      image: true,
      title: true,
      price: true,
      specs: true,
      rating: true,
      numReviews: true,
      shortDesc: true,
      id: true,
      slug: true,
      categoryId: true
    }
  }); /// how to make this to get only six product
  if (!featuredProduct) throw new AppError("no featured products found", 404);
  return featuredProduct;
}
export const getNewArrivalsProducts = async () => {

  const newArrivalsProduct = await prisma.product.findMany({
    where: { isFeatured: true },
    take: 4,
    select: {
      image: true,
      title: true,
      price: true,
      specs: true,
      rating: true,
      numReviews: true,
      shortDesc: true,
      id: true,
      slug: true,
      categoryId: true,
      stock: true
    }
  }); /// how to make this to get only six product
  if (!newArrivalsProduct) throw new AppError("no new arrivals products found", 404);
  return newArrivalsProduct;
}
export const getReviews = async (slug: string) => {
  //   const reviews = await prisma.review.findMany(
  //     {
  //       where: { productId: slug }
  //     }
  //   )
  //   if (!reviews) throw new AppError("no reviews found", 404)
  //   return reviews
  // }
  // export const addReviews = async (reviewData: review) => {
  //   await prisma.review.create(
  //     {
  //       data: reviewData
  //     }
  //   )
  //   return true;
}

export const getSearch = async (query: string) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: query } },        
        { brand: { contains: query } },        
        { shortDesc: { contains: query } },    
        // { specs: { has: query } },            
      ],
    },
    select: {
      title:true,
      id: true,
      image: true,
      price: true,
      specs: true,
      reviews: true,
      numReviews: true,
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};





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




