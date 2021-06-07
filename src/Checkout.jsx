import { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";

const emptyAddress = {
  city: "",
  country: "",
};

const STATUS = {
  IDLE: "IDLE",
  SUBMITTING: "SUBMITTING",
  SUBMITTED: "SUBMITTED",
  COMPLETED: "COMPLETED",
};

export default function Checkout({ cart }) {
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setAddress(prevAddress => {
      return {
        ...prevAddress,
        [e.target.id]: e.target.value,
      };
    });
  }
  function handleBlur(e) {}
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(STATUS.SUBMITTING);
    try {
      await saveShippingAddress(address);
    } catch (err) {
      setError(err);
    }
  }

  if (error) throw error;

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
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
