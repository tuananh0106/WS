import { useCallback, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { processPayment } from "../services/payment";
import axios from "axios";
import { toast } from "react-toastify";

const products = [
  {
    id: 1,
    title: "Tour Ha Giang",
    href: "#",
    price: "$1000",
    color: "",
    size: "",
    imageSrc: "data:image/jpeg;base64,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",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  // More products...
];

const paymentMethods = [{ id: "credit-card", title: "Credit card" }];

function randomTxIdString() {
  return Math.random().toString(36).substr(2, 9);
}

export default function Example() {
  const [txID, setTxID] = useState(randomTxIdString());
  const [paymentInfo, setPaymentInfo] = useState({
    amount: 1000,
    cardHolderName: "Nguyễn Hoàng Tuấn Anh",
    cardNumber: "1234567",
    expirationDate: "01/06",
    cvc: "777",
    txId: txID,
    cardType: "visa",
  });

  const handleChange = (key: string, value: string) => {
    setPaymentInfo({
      ...paymentInfo,
      [key]: value,
    });
  };

  const handlePayment = useCallback(async () => {
    const res = await axios.post("/api/payment", paymentInfo);
    if (res.data) {
      if (
        res.data["S:Envelope"]["S:Body"]["ns2:processPaymentResponse"][
          "return"
        ]["_text"] === "Failed"
      ) {
        toast("Payment Filed", {
          type: "error",
        });
      } else {
        toast("Payment Success", {
          type: "success",
        });
      }
    }
  }, [paymentInfo]);

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">TxId</h2>

              <div className="mt-4">
                <div className="mt-1">
                  <input
                    disabled={true}
                    value={txID}
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            {/* <div>
              <h2 className="text-lg font-medium text-gray-900 mt-5">
                Contact information
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email-address"
                    name="email-address"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Apartment, suite, etc.
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="apartment"
                      id="apartment"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div> */}

            {/* Payment */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Payment type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      {paymentMethodIdx === 0 ? (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          defaultChecked
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      ) : (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      )}

                      <label
                        htmlFor={paymentMethod.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                <div className="col-span-4">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      value={paymentInfo.cardNumber}
                      onChange={(e) =>
                        handleChange("cardNumber", e.target.value)
                      }
                      type="text"
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-4">
                  <label
                    htmlFor="name-on-card"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      value={paymentInfo.cardHolderName}
                      onChange={(e) =>
                        handleChange("cardHolderName", e.target.value)
                      }
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      value={paymentInfo.expirationDate}
                      onChange={(e) =>
                        handleChange("expirationDate", e.target.value)
                      }
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      value={paymentInfo.cvc}
                      onChange={(e) => handleChange("cvc", e.target.value)}
                      type="text"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="flex py-6 px-4 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a
                              href={product.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.title}
                            </a>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.size}
                          </p>
                        </div>

                        <div className="ml-4 flow-root flex-shrink-0">
                          <button
                            type="button"
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {product.price}
                        </p>

                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantity
                          </label>
                          <select
                            id="quantity"
                            name="quantity"
                            className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">$1000</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">$0</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">$10</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">$1010</dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button
                  onClick={handlePayment}
                  // type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Confirm order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
