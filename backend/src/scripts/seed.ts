import { uploadImage } from "../config/cloudinary";
import prisma from "../config/prisma";
import path from "path";

// Seed data defined outside the function
export const macProducts = [
  {
    title: "MacBook Pro 16-inch (M2 Max)",
    slug: "macbook-pro-16-m2-max",
    image: "../assets/category1/p11.jpg",
    specs: ["M2 Max Chip", "16-inch Liquid Retina XDR", "32GB RAM", "1TB SSD"],
    price: 3499,
    discount: 200,
    shortDesc: "Powerful laptop for pros with next-level performance.",
    longDesc: "The MacBook Pro 16-inch with M2 Max delivers exceptional power for demanding workflows with brilliant display and long battery life.",
    brand: "Apple",
    stock: 25,
    isFeatured: true,
    isNewArrival: true,
    isHot: true,
    rating: 4.9,
    numReviews: 420,
    categoryId: 10,
  },
  {
    title: "MacBook Air 13-inch (M2)",
    slug: "macbook-air-13-m2",
    image: "../assets/category1/p21.jpg",
    specs: ["M2 Chip", "13.6-inch Retina Display", "8GB RAM", "512GB SSD"],
    price: 1199,
    discount: null,
    shortDesc: "Thin, light, and powerful laptop for everyday use.",
    longDesc: "The MacBook Air with M2 chip features a sleek design, great battery life, and solid performance for daily tasks and creativity.",
    brand: "Apple",
    stock: 40,
    isFeatured: true,
    isNewArrival: true,
    isHot: false,
    rating: 4.7,
    numReviews: 800,
    categoryId: 10,
  },
  {
    title: "iMac 24-inch (M1)",
    slug: "imac-24-m1",
    image: "../assets/category1/p31.jpg",
    specs: ["M1 Chip", "24-inch 4.5K Retina Display", "8GB RAM", "256GB SSD"],
    price: 1299,
    discount: 100,
    shortDesc: "All-in-one desktop with vibrant display and great power.",
    longDesc: "The iMac 24-inch with M1 chip combines power and beauty in a sleek, colorful design ideal for home and office.",
    brand: "Apple",
    stock: 30,
    isFeatured: false,
    isNewArrival: false,
    isHot: false,
    rating: 4.6,
    numReviews: 300,
    categoryId: 10,
  },
  {
    title: "Mac Studio (M1 Ultra)",
    slug: "mac-studio-m1-ultra",
    image: "../assets/category1/p41.jpg",
    specs: ["M1 Ultra Chip", "32-core GPU", "64GB RAM", "1TB SSD"],
    price: 3999,
    discount: 300,
    shortDesc: "Ultra-powerful desktop for pro creators and studios.",
    longDesc: "Mac Studio with M1 Ultra offers unprecedented power and versatility for demanding professional workflows and 3D rendering.",
    brand: "Apple",
    stock: 10,
    isFeatured: true,
    isNewArrival: false,
    isHot: true,
    rating: 4.8,
    numReviews: 150,
    categoryId: 10,
  },
];





async function main() {

  for (const product of macProducts) {
    const mainImagePath = path.resolve(__dirname, product.image);
    const mainImageUrl = await uploadImage(mainImagePath);

   

    await prisma.product.create({
      data: {
        title: product.title,
        slug: product.slug,
        image: mainImageUrl,
        specs: product.specs,
        price: product.price,
        discount: product.discount,
        shortDesc: product.shortDesc,
        longDesc: product.longDesc,
        brand: product.brand,
        stock: product.stock,
        isFeatured: product.isFeatured,
        isNewArrival: product.isNewArrival,
        isHot: product.isHot,
        rating: product.rating,
        numReviews: product.numReviews,
        categoryId: product.categoryId
      }
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
