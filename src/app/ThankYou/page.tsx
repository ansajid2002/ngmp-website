import React from 'react';

const ThankYou = () => {
    return (
        <div className="container mx-auto mt-8">
            <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md text-center">
                <h2 className="text-2xl font-semibold mb-4">Thank You for Refilling Your Wallet!</h2>
                <p className="text-gray-700 mb-4">
                    Your support helps us continue providing excellent services. We appreciate your trust in us.
                </p>
                <p className="text-gray-700 mb-4">
                    "Your wallet, your possibilities. Keep it full and explore!"
                </p>
                <p className="text-gray-700">
                    If you have any questions or need assistance, feel free to <a href="/contact" className="text-blue-500">contact us</a>.
                </p>
            </div>
        </div>
    );
};

export default ThankYou;
