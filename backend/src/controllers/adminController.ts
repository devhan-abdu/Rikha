// // handleGetProduct ,handleUpdateProduct ,handleAddProduct

// import type { NextFunction, Request, Response } from "express"
// import { addProduct, updateProduct, getAllProducts, deleteProduct, getProduct } from "../services/productsServices";

// export const handleAddProduct = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { sanityId, price, stock } = req.body;
//         if (!sanityId) {
//             res.status(400).json({ success: false, message: 'sanity id required' });
//             return;
//         }
//         if (!price && !stock) {
//             res.status(400).json({ success: false, message: 'both price nad stock required' });
//             return;
//         }
//         await addProduct(sanityId, price, stock) // is the frontend need the added metadata from the db or the input is from the frontend we will that theire
//         res.status(201).json({ success: true, message: "product meta data added successfully" })
//     } catch (error) {
//         next(error)
//     }

// }
// export const handleUpdateProduct = async (req: Request, res: Response, next: NextFunction) => {

//     try {
//         const { price, stock } = req.body;
//         const sanityId = req.params.sanityId; // get the
//         if (!sanityId) {
//             res.status(400).json({ success: false, message: 'sanity id required' });
//             return;
//         }
//         if (!price && !stock) {
//             res.status(400).json({ success: false, message: 'both price nad stock required' });
//             return;
//         }
//         await updateProduct(sanityId, price, stock)
//         res.status(201).json({ success: true, message: "product meta data updated successfully" })
//     } catch (error) {
//         next(error)
//     }
// }

// export const handleDeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const sanityId = req.params.sanityId;
//         if (!sanityId) {
//             res.status(400).json({ success: false, message: 'sanity id required' });
//             return;
//         }
//         await deleteProduct(sanityId)
//         res.status(201).json({ message: 'product deleted successfully' })
//     } catch (error) {
//         next(error)
//     }
// }


// export const handleGetProduct = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const sanityId = req.params.sanityId;
//         if (!sanityId) {
//             res.status(400).json({ success: false, message: 'sanity id required' });
//             return;
//         }
//         // get the product info from the sanity
//         const product = await getProduct(sanityId)
//         res.status(200).json({ message: 'successfully feached', product })

//     } catch (error) {
//         next(error)
//     }
// }

// export const handleGetAllProduct = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         //   get the produc info from the sanity 
//         const allproducts = await getAllProducts();
//         res.status(200).json({ message: 'successfully feached', allproducts })
//     } catch (error) {
//         next(error)
//     }
// }

