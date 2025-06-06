
export default function ContactUs() {
  return (
    <div className="bg-white text-gray-800 px-4 py-16">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Get in Touch</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Have questions, feedback, or a project in mind? We'd love to hear from you.</p>
        <div className="w-16 h-1 bg-purple-600 mx-auto mt-4 rounded"></div>
      </section>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <form className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-6 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p>We’re always happy to assist. Reach out to us anytime.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-purple-600 text-xl">📍</span>
              <div>
                <p className="font-medium">Our Address</p>
                <p>Gate no.02 vijay market Ansari road Shastri park | 110053</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-600 text-xl">📞</span>
              <div>
                <p className="font-medium">Call Us</p>
                <p>+91 92057 53225</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-600 text-xl">📧</span>
              <div>
                <p className="font-medium">Email Us</p>
                <p>Furnishworld0@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-600 text-xl">🕒</span>
              <div>
                <p className="font-medium">Working Hours</p>
                <p>Mon – Sun: 10am – 8pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
