import {v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config();

cloudinary.config ({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME!,
    api_key:process.env.CLOUDINARY_API_KEY!,
    api_secret:process.env.CLOUDINARY_API_SECRET!,
});

export const uploadImage = async (imagePath:string):Promise<string> => {
    const options ={
        use_filename:true,
        unique_filename:true,
        overwrite:true,
        folder:"rikha/products",
    };

    try {
        const result = await cloudinary.uploader.upload(imagePath , options);
        return result.secure_url;
    } catch (error) {
        console.error(error)
        throw new Error("Image upload failed");
    }
}