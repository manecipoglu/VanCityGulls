import { useState } from "react";

const emptyAddress = {
  city: "",
  country: "",
};

export default function Checkout({ cart }) {
  const [address, setAddress] = useState(emptyAddress);

  function handleChange(e) {}
  function handleBlur(e) {}
  function handleSubmit(e) {}

  return (
    <>
      <h1>Shipping Info</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="Canada">Canada</option>
            <option value="Brazil">Brazil</option>
            <option value="Turkey">Turkey</option>
            <option value="USA">USA</option>
          </select>
        </div>
        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
          />
        </div>
      </form>
    </>
  );
}
