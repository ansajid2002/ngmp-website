import React from 'react';

const IncompleteProfile = ({ vendorDatastate }) => {
    const excludedFields = [
        'id',
        'password',
        'facebook_url',
        'instagram_url',
        'twitter_url',
        'business_logo_url',
        'business_license_url',
        'linkedin_url',
        'useridvendor',
        'payment_info',
        'total_product',
        'total_sales',
        'email_otp',
        'mobile_otp',
        'reset_otp',
        'followers',
        'following',
        'total_products',
        'average_rating',
        'registration_number',
        'business_address',
        'shipping_info',
        'support_contact',
        'categories',
        'return_policy',
        'shipping_policy',
        'terms_and_conditions',
        'vendor_profile_picture_url'
    ];

    const checkExcludedFields = () => {
        const nullFields = [];

        const fieldsToConsider = Object.keys(vendorDatastate?.[0]);

        // Check for null or empty fields in the fields not excluded
        fieldsToConsider.forEach((field) => {
            const fieldValue = vendorDatastate?.[0]?.[field];
            if (!excludedFields.includes(field) && (fieldValue === null || fieldValue === '')) {
                nullFields.push(field);
            }
        });

        return nullFields;
    };

    const nullFieldsList = checkExcludedFields();

    return (
        nullFieldsList.length > 0 && (
            <>
                <div className="bg-rose-200 p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-2 text-red-800">Complete your profile</h2>
                    <p className="mb-2 text-red-800">Please complete the following fields to enhance your profile:</p>
                    <ul className="list-disc pl-5">
                        {nullFieldsList.map((field, index) => (
                            <li key={index} className='text-red-800'>{field}</li>
                        ))}
                    </ul>
                </div>
            </>
        )
    );
};

export default IncompleteProfile;
