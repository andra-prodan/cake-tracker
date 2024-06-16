import { useState } from "react";
import DatePicker from "tailwind-datepicker-react"
import usersService from "../services/usersService";
import { useFormik } from "formik";
import { schema } from "../utils/addingUserSchema";

export const AddingUserForm = ({ onClose }: { onClose: () => void }) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClose = (state: boolean) => {
        setShow(state)
    }

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            birthDate: new Date(),
            country: "",
            city: ""
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                await usersService().createUser(values);
                onClose();
            } catch (err: any) {
                setError(err.message);
            }
        }
    })

    const { errors, touched, values, handleChange, handleSubmit, setValues } = formik;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <div className="text-red-500">{error}</div>}
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                <input type="text" name="firstName" id="firstName" value={values.firstName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="First Name" required />
                {touched.firstName && errors.firstName && <div className="absolute text-xs text-red-500">{errors.firstName}</div>}
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input type="text" name="lastName" id="lastName" value={values.lastName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Last Name" required />
                {touched.lastName && errors.lastName && <div className="absolute text-xs text-red-500">{errors.lastName}</div>}
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birth Date</label>
                <DatePicker show={show} setShow={handleClose} value={values.birthDate} onChange={(date: Date) => setValues({ ...values, birthDate: date })} />
                {touched.birthDate && errors.birthDate && <div className="absolute text-xs text-red-500">You must be at least 18 years old</div>}
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                <input type="text" name="country" id="country" value={values.country} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Country" required />
                {touched.country && errors.country && <div className="absolute text-xs text-red-500">{errors.country}</div>}
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                <input type="text" name="city" id="city" value={values.city} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="City" required />
                {touched.city && errors.city && <div className="absolute text-xs text-red-500">{errors.city}</div>}
            </div>
            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="mt-4 text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-14 py-2"
                >
                    Close
                </button>
                <button
                    type="submit"
                    className="mt-4 text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-16 py-2"
                >
                    Add
                </button>
            </div>
        </form>
    )
}