import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { useEffect, useState } from 'react';
import { AdminUrl } from '../../Admin/constant';
import { Button, Form } from 'antd';
import { IoIosArrowForward } from 'react-icons/io';
import Swal from 'sweetalert2';

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

export const ProductImage = ({ formValues, selectRowProduct, callVendorProducts, handlNext, selectedKey }) => {

  const [files, setFiles] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleFilePondUpdate = (fileItems) => {
    // FilePond updates the file items whenever files are added or removed
    setFiles(fileItems.map((fileItem) => fileItem.file));
  };

  const handleSubmitImages = async () => {
    try {
      setLoader(true)
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
        formData.append('id', selectedKey);
      });


      const response = await fetch(`${AdminUrl}/api/uploadVendorProduct`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Handle the server response error
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();

      // Assuming the backend response contains a success flag
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product images updated successfully!',
      });
      const updatedImages = responseData.updatedImages; // Assuming the backend provides updated image paths
      selectRowProduct.images = updatedImages
      callVendorProducts(updatedImages); // Call the function to update the displayed data
      handlNext()

    } catch (error) {
      console.error('File processing error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while processing the file upload.',
      });
    } finally {
      setLoader(false)
    }
  };

  return (
    <div>
      <FilePond
        name="files"
        files={files}
        allowImageValidateSize
        allowFileTypeValidation
        
        imageValidateSizeMinWidth={300} // Minimum width set to 300px
        imageValidateSizeMinHeight={350} // Minimum height set to 350px
        imageValidateSizeMaxWidth={300} // Maximum width set to 300px
        imageValidateSizeMaxHeight={350} // Maximum height set to 350px
        onupdatefiles={handleFilePondUpdate}
        allowMultiple={true}
        
        allowImagePreview={true}
        acceptedFileTypes={['image/*']}
        labelIdle={
          '<div>Drag & Drop your files or <span className="filepond--label-action">Browse</span></div>'
        }
        maxFiles={10}
        instantUpload={false}
        onremovefile={(error, file) => {
          if (!error) {
            console.log('File removed:', file);
            // Make a server request here to handle the removal of the individual uploaded file
            // You can use the 'file' parameter to access the removed file
          } else {
            console.error('File removal error:', error);
          }
        }}
      />

      <div class="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Image Upload Guidelines:</strong>
        <ul class="list-disc mt-2 ml-5">
          <li class="mb-1">Images must be exactly 300x350 pixels in size.</li>
          <li class="mb-1">Accepted file types: JPG, PNG, GIF.</li>
          <li class="mb-1">Maximum file size: 1MB.</li>
          <li class="mb-1">Maximum of 10 images can be uploaded.</li>

        </ul>

      </div>

      <Form.Item className="animate__animated animate__fadeInRight animate__faster mt-10">
        <Button
          onClick={handleSubmitImages}
          className="transition-all items-center flex duration-200 ease-in-out ml-5 bg-blue-500 hover:bg-blue-600 hover:text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transform hover:scale-110 hover:rotate-3 text-white"
          icon={<IoIosArrowForward className="text-white" />}
          style={{ zIndex: 2 }}
          loading={loader}
        >
          Submit
        </Button>
      </Form.Item>
    </div>
  );
};
