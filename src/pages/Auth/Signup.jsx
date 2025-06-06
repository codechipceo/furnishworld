import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../../api/endpoints/auth.endpoint";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    gender: "",
    dob: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      const code = await Auth.signUp(form);
      console.log(code)

    if (code >= 200 && code <=299) {
        toast.success("Signup completed")
        navigate("/signin");
    }
    console.log("Submitting:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl space-y-4">
        <h2 className="text-3xl font-bold text-center">Create Account</h2>
        <p className="text-center text-gray-600">Enter your details below</p>

        <div>
          <label htmlFor="name" className="label">
            Full Name
          </label>
          <input id="name" name="name" required className="input" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input id="email" name="email" type="email" required className="input" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="phone" className="label">
            Phone
          </label>
          <input id="phone" name="phone" required className="input" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input id="password" name="password" type="password" required className="input" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="street" className="label">
            Street Address
          </label>
          <input id="street" name="address.street" required className="input" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="city" className="label">
            City
          </label>
          <input id="city" name="address.city" required className="input" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="state" className="label">
            State
          </label>
          <input id="state" name="address.state" className="input" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="postalCode" className="label">
            Postal Code
          </label>
          <input id="postalCode" name="address.postalCode" required className="input" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="country" className="label">
            Country
          </label>
          <input id="country" name="address.country" required className="input" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="gender" className="label">
            Gender
          </label>
          <select id="gender" name="gender" required className="input" onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="dob" className="label">
            Date of Birth
          </label>
          <input id="dob" name="dob" type="date" className="input" onChange={handleChange} />
        </div>

        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-2xl hover:bg-purple-700">
          Create Account
        </button>

        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link to={"/signin"} className="font-semibold">
            Sign In
          </Link>
        </p>
      </form>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.75rem;
          background-color: #e5e7eb;
          border-radius: 1rem;
          border: none;
          outline: none;
          margin-top: 0.25rem;
        }
        .label {
          display: block;
          font-weight: 500;
          margin-top: 0.5rem;
          color: #374151;
        }
      `}</style>
    </div>
  );
}
