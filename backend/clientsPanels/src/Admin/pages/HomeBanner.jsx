import React, { useEffect, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import axios from 'axios';
import { AdminUrl } from '../constant';
import { Button, Image, Input } from 'antd';
import Swal from 'sweetalert2';

registerPlugin(FilePondPluginImagePreview);

const HomeBanner = () => {
    const initialInstances = Array(10).fill({ files: [], title: '', link: '' });
    const [filePondInstances, setFilePondInstances] = useState(initialInstances);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        // Fetch banners from the backend when the component mounts
        fetchBanners();
    }, []);

    const fetchBanners = () => {
        // Replace 'backendBannersUrl' with the actual endpoint to fetch banners
        const backendBannersUrl = `${AdminUrl}/api/getBanners`;

        axios.get(backendBannersUrl)
            .then((response) => {
                // Update the state with the fetched banners
                setBanners(response.data);
            })
            .catch((error) => {
                console.error('Failed to fetch banners:', error);
            });
    };

    const handleInit = (instanceIndex) => {
        // Initialize FilePond instance and set the initial files
        return (instance) => {
            instance.setOptions({
                server: {
                    process: (fieldName, file, metadata, load, error, progress, abort) => {
                        // Handle file uploads to the server for the specific instance
                        console.log(`Uploading file for FilePond instance ${instanceIndex}`);
                    },
                    revert: (uniqueFileId, load, error) => {
                        // Handle file deletion for the specific instance
                        console.log(`Reverting file for FilePond instance ${instanceIndex}`);
                    },
                },
                onprocessfile: (error, file) => {
                    if (!error) {
                        // File processed successfully for the specific instance
                        console.log(`File processed successfully for FilePond instance ${instanceIndex}`);
                    }
                },
            });
        };
    };

    const handleFilePondUpdate = (instanceIndex) => (fileItems) => {
        const updatedInstances = [...filePondInstances];
        updatedInstances[instanceIndex] = {
            ...filePondInstances[instanceIndex],
            files: fileItems.map((fileItem) => fileItem.file),
        };
        setFilePondInstances(updatedInstances);
    };

    const handleTextChange = (instanceIndex, event) => {
        const updatedInstances = [...filePondInstances];
        updatedInstances[instanceIndex] = {
            ...filePondInstances[instanceIndex],
            title: event.target.value,
        };
        setFilePondInstances(updatedInstances);
    };

    const handleLinkChange = (instanceIndex, event) => {
        const updatedInstances = [...filePondInstances];
        updatedInstances[instanceIndex] = {
            ...filePondInstances[instanceIndex],
            link: event.target.value,
        };
        setFilePondInstances(updatedInstances);
    };

    const renderFilePondInstances = () => {
        return filePondInstances.map((instanceData, index) => (
            <div key={index} className='md:w-[40%] '>
                <h2 className='mt-4  text-2xl font-semibold mb-2'>Desktop Home Banner Upload - #{index + 1}</h2>
                <FilePond
                    files={instanceData.files}
                    allowMultiple={false}
                    maxFiles={1}
                    acceptedFileTypes={['image/*']}
                    oninit={handleInit(index)}
                    onupdatefiles={handleFilePondUpdate(index)}
                    imagePreviewMaxFileSize='1'
                    labelIdle={`Drag & Drop your image or <span class="filepond--label-action">Browse</span> (only PNG or JPEG allowed)`}
                />


                <div className='h-[80px]'>
                    {banners[index] && banners[index].banner_url && (
                        <>
                            <div className='flex  items-center'>
                                <Image
                                    width={50}
                                    src={`${AdminUrl}/uploads/Banners/${banners[index].banner_url}`}
                                    className="w-full h-full object-contain  border-4 border-white shadow-xl"
                                />
                                <p className='cursor-pointer mt-2 ml-2 text-blue-600' onClick={() => handleDelete(index)}>Delete</p>
                            </div>
                        </>
                    )}
                </div>


                <div className="mt-4">
                    <Input
                        type="text"
                        placeholder="Enter text"
                        value={instanceData.title || (banners[index]?.title ? banners[index].title : '')}
                        onChange={(e) => handleTextChange(index, e)}
                    />
                </div>
                <div className="mt-2">
                    <Input
                        type="text"
                        placeholder="Enter link"
                        value={instanceData.link || (banners[index]?.link ? banners[index].link : '')}
                        onChange={(e) => handleLinkChange(index, e)}
                    />
                </div>
                <Button className='mt-4 bg-blue-600 text-white w-24 h-10 mb-10' onClick={() => handleUpload(index)}>Submit</Button>
            </div>
        ));
    };

    const handleUpload = (instanceIndex) => {
        const instance = filePondInstances[instanceIndex];

        // Prepare the data to send to the backend
        const formData = new FormData();
        instance.files[0] && formData.append('bannerUrl', instance.files[0]); // Assuming you want to send the first file
        formData.append('title', instance.title === "" ? banners[instanceIndex].title : instance.title);
        formData.append('link', instance.link === "" ? banners[instanceIndex].link : instance.link);
        formData.append('id', instanceIndex);
        console.log(instance);
        console.log(formData);
        // Replace 'backendUploadUrl' with your actual backend API endpoint
        const backendUploadUrl = `${AdminUrl}/api/uploadBanner`;
        console.log(backendUploadUrl,"backendUploadUrl");
        // Send a POST request to the backend
        axios
            .post(backendUploadUrl, formData)
            .then(async (response) => {
                // Handle a successful response from the backend
                const data = response.data;
                const updatedBanner = data.updatedBanner;
                const updatedInstances = [...filePondInstances];

                // Find the index of the banner in the 'banners' state array
                const bannerIndex = banners.findIndex((item) => item.id === updatedBanner.id);

                if (bannerIndex !== -1) {
                    // Replace the old banner with the updated banner
                    const updatedBanners = [...banners];
                    updatedBanners[bannerIndex] = updatedBanner;

                    // Update the 'banners' state with the updated data
                    setBanners(updatedBanners);
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Updated',
                    text: '',
                });
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error('Upload failed:', error);
            });

    };

    const handleDelete = (instanceIndex) => {
        // Get the banner id for deletion
        const bannerId = banners[instanceIndex]?.id;
        if (bannerId) {
            // Send a request to the backend to delete the banner by its id
            axios
                .delete(`${AdminUrl}/api/deleteBanner/${bannerId}`)
                .then(() => {
                    // Banner deleted successfully, now remove it from the state
                    const updatedBanners = [...banners];
                    updatedBanners.splice(instanceIndex, 1);
                    setBanners(updatedBanners);

                    // Clear the FilePond instance
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted',
                        text: 'Banner deleted successfully.',
                    });
                })
                .catch((error) => {
                    console.error('Failed to delete banner:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to delete the banner.',
                    });
                });
        }
    };

    return (
        <div className="sm:p-4 sm:ml-64">
            <div className='md:flex md:flex-row flex-wrap gap-8'>
                {renderFilePondInstances()}
            </div>
        </div>
    );
};

export default HomeBanner;
