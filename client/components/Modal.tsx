'use client'

import { AddingUserForm } from "./AddingUserForm";

export const Modal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-slate-800 p-6 py-4 rounded-lg shadow-lg flex flex-col">
                <h2 className="text-xl font-bold mb-4">Add New User</h2>
                <AddingUserForm onClose={onClose} />
            </div>
        </div>
    );
};