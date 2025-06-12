import { useState } from "react";
import { Check } from "lucide-react";
import PayPalLogo from "../SVGs/paypal-svgrepo-com.svg";
import GPayLogo from "../SVGs/google-pay-icon-svgrepo-com.svg";
import UpiLogo from "../SVGs/qr-code-svgrepo-com.svg";

export default function Pricing() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("stripe");
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      name: "Basic",
      price: 0,
      features: [
        "Access to Core Course Materials",
        "Community Support",
        "Monthly Webinars",
        "Email Support",
      ],
    },
    {
      name: "Plus",
      price: "499/",
      period: "month",
      featured: true,
      features: [
        "Everything in the Free Plan",
        "Advanced Course Materials",
        "Priority Community Access",
        "Bi-Weekly Webinars",
        "Priority Email Support",
      ],
    },
    {
      name: "Pro",
      price: "999/",
      period: "month",
      features: [
        "Everything in Plus Plan",
        "Full Course Access",
        "1-on-1 Coaching Sessions",
        "Weekly Webinars",
        "24/7 Support",
      ],
    },
  ];

  const paymentMethods = [
    {
      id: "paypal",
      name: "PayPal",
      logo: PayPalLogo,
      description: "Pay with your PayPal account",
    },
    {
      id: "stripe",
      name: "GPay",
      logo: GPayLogo,
      description: "Pay with your GPay account",
    },
    {
      id: "mollie",
      name: "UPI",
      logo: UpiLogo,
      description: "Pay with any other UPI Apps",
    },
  ];

  const handlePayment = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate processing
    setIsLoading(false);
    setShowPaymentModal(false);
    setSelectedPlan(null); // Reset selection
  };

  return (
    <div
      className="min-h-screen  mb-[100px] bg-[#040313] text-white py-20 px-4 w-[80%] mx-auto glassmorphism"
      style={{ fontFamily: "Sora, sans-serif" }}
    >
      <h1 className="text-3xl font-bold justify-center text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500">Coming Soon...Stay Tuned!</h1>
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold w-auto text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500 text-center" >Our Pricing Plans</h1>
        <div className="relative flex justify-center">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-6 bg-[#141327] h-[450px] rounded-lg border border-zinc-800 transition-all duration-300 ease-in-out
                ${
                  showPaymentModal
                    ? "opacity-30 scale-95 pointer-events-none"
                    : "opacity-100 hover:scale-105 hover:shadow-lg"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-2 right-4 bg-white  text-black px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </div>
                )}
                <h3 className="text-lg font-medium text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-bold tracking-tight mb-4 text-white">
                    ₹{plan.price}
                  </span>
                  <span className="ml-1 text-sm font-medium text-zinc-400">
                    {plan.period}
                  </span>
                </div>
                <button
                  className="w-full bg-purple-600 hover:bg-purple-700 mt-4 mb-4 p-2 rounded-lg"
                  onClick={() => {
                    setSelectedPlan(plan);
                    setShowPaymentModal(true);
                  }}
                >
                  Get {plan.name}
                </button>
                <ul className="space-y-3 mt-4">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-zinc-300"
                    >
                      <Check className="h-4 w-4 text-zinc-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-zinc-900 text-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-medium mb-4">Choose payment method</h2>
            <div className="mb-4">
              <h3 className="text-sm text-zinc-400">Selected plan</h3>
              <div className="text-right">
                <div className="text-sm font-medium">{selectedPlan.name}</div>
                <div className="text-2xl font-bold">
                  ₹{selectedPlan.price}{" "}
                  <span className="text-sm text-zinc-400">
                    /{selectedPlan.period}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition ${
                    selectedMethod === method.id
                      ? "border-purple-600 bg-purple-600/10"
                      : "border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={() => setSelectedMethod(method.id)}
                      className="form-radio"
                    />
                    <div>
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-zinc-400">
                        {method.description}
                      </div>
                    </div>
                  </div>
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="h-8 w-20 object-contain"
                  />
                </label>
              ))}
            </div>
            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full mt-4 p-3 bg-purple-600 hover:bg-purple-700 rounded-lg"
            >
              {isLoading ? "Processing..." : "Continue to payment"}
            </button>
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setSelectedPlan(null); // Reset selection
              }}
              className="mt-2 w-full text-sm text-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
