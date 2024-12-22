import React from "react";

const WhyChooseUs = () => {
  const highlights = [
    {
      id: 1,
      title: "24/7 Customer Support",
      description: "We're always here to help, no matter the time.",
      icon: "https://example.com/icons/support.png",
    },
    {
      id: 2,
      title: "Flexible Cancellations",
      description: "Cancel your booking up to 24 hours before your stay.",
      icon: "https://example.com/icons/cancellation.png",
    },
    {
      id: 3,
      title: "Secure Payments",
      description: "Your transactions are safe with us.",
      icon: "https://example.com/icons/payment.png",
    },
    {
      id: 4,
      title: "Top-rated Rooms",
      description: "Thousands of satisfied guests love staying with us.",
      icon: "https://example.com/icons/rating.png",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose Us</h2>
          <p className="text-gray-600 mt-2">
            Here are some of the reasons why thousands of happy customers trust
            us.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              className="card bg-white shadow-lg p-6 rounded-lg">
              <div className="card-body items-center text-center">
                <img
                  src={highlight.icon}
                  alt={highlight.title}
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">{highlight.title}</h3>
                <p className="text-gray-600 mt-2">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
