import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Cloudinary configuration
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
   try {
      if (!localFilePath) return null;
      const response = await cloudinary.uploader.upload(localFilePath, {
         resource_type: "image",
      });
      fs.unlinkSync(localFilePath); // Delete local file after uploading
      return response;
   } catch (error) {
      console.log('Error in uploading image on Cloudinary', error);
      return null;
   }
};

export {
   uploadOnCloudinary
};
