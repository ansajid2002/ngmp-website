import React from 'react';

const AccountApprovalPending = () => {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Account Approval Pending</h1>
            </header>
            <main className="text-center">
                <img
                    src="/pending.png"
                    alt="Account Approval Pending"
                    className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
                />
                <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                    Your account is currently being reviewed. We appreciate your patience.
                </p>
            </main>
        </section>
    );
};

export default AccountApprovalPending;
