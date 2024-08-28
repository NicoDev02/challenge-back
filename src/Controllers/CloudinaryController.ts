import cloudinary from "../cloudinary";
export const cloudinaryUploadController = async (image: string) => {
  try {
    const response = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${image}`
    );
    console.log("response", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const cloudinaryDeleteController = async (public_id: string) => {
  try {
    const response = await cloudinary.uploader.destroy(public_id);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
