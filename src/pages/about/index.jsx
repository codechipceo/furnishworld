import React from "react";

export default function AboutUs() {
  return (
    <div className="bg-white text-gray-800">
      {/* Who Are We Section */}

      {/* Hero Section */}
      <section className="bg-gray-100 py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600">
          Welcome to our world of furnishing! We blend design, comfort, and quality to create elegant living spaces that reflect your style.
        </p>
      </section>

      <section className="bg-white text-center py-16 px-4">
        <h3 className="text-gray-500 text-sm uppercase tracking-widest mb-2">Who Are We</h3>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Welcome To Furnishworld</h1>
        <div className="w-16 h-1 bg-gray-800 mx-auto mb-6 rounded"></div>
        <p className="text-gray-600 max-w-2xl mx-auto mb-2">
          Explore exquisite furniture from top brands on our site and elevate your home with just a click.
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto">Discover style, comfort, and elegance in one seamless shopping experience.</p>
      </section>
      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 space-y-12">
        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Founded with a passion for fine interiors and functional design, we began our journey to redefine modern living. What started as a small
              studio has evolved into a trusted name in furniture and decor, known for craftsmanship, reliability, and customer satisfaction.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Showroom"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Our Vision */}
        <div className="grid md:grid-cols-2 gap-12 items-center flex-col-reverse md:flex-row">
          <img
            src="https://images.unsplash.com/photo-1618220179428-22790b461013"
            alt="Vision"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
          />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              Our vision is to become the go-to destination for home and office furnishings by offering timeless designs, sustainable materials, and a
              personalized shopping experience. We aim to transform spaces into reflections of your identity.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Crafted from the finest materials with attention to detail and durability in mind.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Modern Designs</h3>
              <p className="text-gray-600">Trendy and functional designs that enhance every space aesthetically and practically.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Customer Commitment</h3>
              <p className="text-gray-600">We prioritize satisfaction, from consultation to delivery and beyond.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Commitment to You</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          We’re more than just a furniture brand — we’re a community built on trust, creativity, and service. Every product is thoughtfully selected
          to help you craft your perfect space.
        </p>
      </section>
    </div>
  );
}
