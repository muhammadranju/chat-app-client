import { Link } from "react-router";

const Home = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      {/* Hero Section */}
      <section className="lg:grid lg:place-content-center bg-gray-50 py-10">
        <div className="mx-auto w-screen max-w-screen-xl px-4 sm:px-6 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8">
          <div className="max-w-prose text-left">
            <h1 className="text-4xl font-bold text-black sm:text-5xl">
              Connect instantly with
              <strong className="text-foreground"> anyone</strong>, anywhere
            </h1>

            <p className="mt-4 text-base text-black sm:text-lg/relaxed">
              Chatify is a modern messaging platform that helps you stay in
              touch with friends, family, and colleagues. Share messages,
              images, and videos securely and effortlessly.
            </p>

            {!token ? (
              <div className="mt-4 flex gap-4 sm:mt-6">
                <Link
                  className="inline-block rounded-lg border border-black bg-black px-5 py-3 font-medium text-white shadow-sm transition-colors "
                  to="/signup"
                >
                  Sign Up
                </Link>

                <Link
                  className="inline-block rounded-lg border border-gray-200 px-5 py-3 font-medium text-black shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                  to="/login"
                >
                  Sign In
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex gap-4 sm:mt-6">
                <Link
                  className="inline-block rounded-lg border border-black bg-black px-5 py-3 font-medium text-white shadow-sm transition-colors "
                  to="/users"
                >
                  See Users
                </Link>

                <Link
                  className="inline-block rounded-lg border border-gray-200 px-5 py-3 font-medium text-black shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                  to="/about"
                >
                  About Us
                </Link>
              </div>
            )}
          </div>

          <img
            src="../../chat-cat.svg"
            alt="Chat illustration"
            className="mt-8 md:mt-0 w-full max-w-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Features That Make Chatify Unique
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">
                Real-time Messaging
              </h3>
              <p className="text-black/70">
                Send and receive messages instantly. Stay connected with your
                friends, family, or coworkers anytime.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">
                Secure Conversations
              </h3>
              <p className="text-black/70">
                End-to-end encryption ensures your chats are private and secure
                from prying eyes.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Cross-Platform</h3>
              <p className="text-black/70">
                Access Chatify on web, mobile, and desktop, so your messages
                always travel with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">1. Sign Up</h3>
              <p className="text-black/70">
                Create your free account in seconds. Start connecting with your
                friends instantly.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">2. Add Contacts</h3>
              <p className="text-black/70">
                Find your friends or colleagues on Chatify and start adding them
                to your contact list.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">3. Start Chatting</h3>
              <p className="text-black/70">
                Send text, images, or videos instantly. Enjoy real-time
                conversations without any delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            What Users Say
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 bg-gray-50 rounded-xl shadow">
              <p className="text-black/70 mb-4">
                "Chatify made keeping in touch with my friends so much easier. I
                love the simplicity and speed!"
              </p>
              <strong className="text-gray-900">– Sarah L.</strong>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow">
              <p className="text-black/70 mb-4">
                "The security features are top-notch. I can chat confidently
                knowing my conversations are private."
              </p>
              <strong className="text-gray-900">– Mark T.</strong>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow">
              <p className="text-black/70 mb-4">
                "I use Chatify on my phone and laptop seamlessly. Truly
                cross-platform!"
              </p>
              <strong className="text-gray-900">– Jessica K.</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-foreground py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Join Chatify Today</h2>
        <p className="mb-6">
          Experience secure, fast, and fun messaging. Connect with friends and
          family instantly.
        </p>
        {!token && (
          <Link
            className="inline-block rounded-lg bg-white text-black font-medium px-6 py-3 shadow hover:bg-gray-100"
            to="/signup"
          >
            Join Now!
          </Link>
        )}
      </section>
    </>
  );
};

export default Home;
