'use client'

import { useState } from "react";
import DatePicker from "tailwind-datepicker-react";
import { IUser } from "../interfaces/IUser";
import dayjs from "dayjs";
import usersService from "../services/usersService";

export const Modal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState<IUser>({ firstName: "", lastName: "", birthDate: "", country: "", city: "" });

    const handleClose = (state: boolean) => {
        setShow(state)
    }

    const handleSubmit = () => {
        usersService().createUser(user)

        onClose()
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, [e.target.id]: e.target.value })

    const handleDate = (date: Date) => {
        const newDate = dayjs(date).format('YYYY-MM-DD');
        setUser({ ...user, birthDate: newDate })
    }


    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col gap-2">
                <h2 className="text-xl font-bold mb-4">Add New User</h2>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                    <input type="text" name="firstName" id="firstName" onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="First Name" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                    <input type="text" name="lastName" id="lastName" onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Last Name" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birth Date</label>
                    <DatePicker show={show} setShow={handleClose} onChange={handleDate} />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                    <input type="text" name="country" id="country" onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Country" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                    <input type="text" name="city" id="city" onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="City" required />
                </div>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-4 text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-14 py-2.5"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="mt-4 text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-16 py-2.5"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};