
import prisma from "../config/prisma"
import { CreateReviewInput } from "../validators/order.schema"
import { AppError } from "../utils/AppError"



export const getProductDetail = async (slug: string) => {
  const productDetail = await prisma.product.findUnique({
    where: { slug },
    select: {
      image: true,
      title: true,
      price: true,
      stock: true,
      discount: true,
      specs: true,
      rating: true,
      numReviews: true,
      shortDesc: true,
      longDesc: true,
      id: true,
      slug: true,
      categoryId: true,
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          user: {
            select: {
              name: true,
              id: true
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
      categoryId: true,
      stock: true,
      discount: true,
    }
  });
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
      categoryId: true,
      stock: true,
      discount: true,
    }
  });
  return productCategory;

}

export const getRelatedProducts = async (slug: string) => {
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) throw new AppError("Product not found", 404);

  const related = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { slug: product.slug }
    },
    take: 6,
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
      stock: true,
      discount: true,
    }
  })
  return related;
}

export const getFeaturedProducts = async () => {
  const featuredProduct = await prisma.product.findMany({
    where: { isFeatured: true },
    take: 6,
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
      stock: true,
      discount: true,
    }
  });
  return featuredProduct;
}
export const getNewArrivalsProducts = async () => {

  const newArrivalsProduct = await prisma.product.findMany({
    where: { isNewArrival: true },
    take: 6,
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
      stock: true,
      discount: true,
    }
  });
  return newArrivalsProduct;
}
export const getReviews = async (productId: string) => {
  const reviews = await prisma.review.findMany({
    where: { productId: Number(productId) },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  })

  return reviews
}
export const addReviews = async (reviewData: CreateReviewInput) => {
  const { userId, productId, rating, comment } = reviewData;

  const existing = await prisma.review.findFirst({
    where: { userId, productId: Number(productId) }
  });

  if (existing) throw new AppError("You already reviewed this product", 400);

  const newReview = await prisma.review.create({
    data: {
      userId: userId,
      productId: Number(productId),
      comment,
      rating
    },
    include: {
      user: {
        select: {
          name: true,
          id: true
        }
      }
    }
  })
  return newReview;
}

export const getSearch = async (query: string) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { brand: { contains: query } },
        { shortDesc: { contains: query } },
      ],
    },
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
      stock: true,
      discount: true,
    },
    take: 10,
    orderBy: {
    createdAt: "desc",
  },
  });

return products;
};




