const About = () => {
  return (
    <div className=" flex flex-col items-center justify-center mt-16">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black mb-2">About Chatify</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Chatify is a modern chat platform that connects people around the
          world instantly. Our mission is to make communication seamless, fast,
          and fun.
        </p>
      </header>

      {/* Features Section */}
      <section className="grid gap-8 md:grid-cols-3 mb-12 w-full max-w-6xl">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 text-center">
          <h2 className="text-2xl font-semibold mb-2">Real-time Messaging</h2>
          <p className="text-gray-500">
            Send and receive messages instantly without any delay. Stay
            connected 24/7.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 text-center">
          <h2 className="text-2xl font-semibold mb-2">Secure & Private</h2>
          <p className="text-gray-500">
            Your privacy matters. All messages are end-to-end encrypted.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 text-center">
          <h2 className="text-2xl font-semibold mb-2">Cross-Platform</h2>
          <p className="text-gray-500">
            Chatify works on web, mobile, and desktop. Stay connected wherever
            you go.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
            <img
              src="https://i.pravatar.cc/150?img=1"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Alice Johnson</h3>
            <p className="text-gray-500">Frontend Developer</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
            <img
              src="https://i.pravatar.cc/150?img=2"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Bob Smith</h3>
            <p className="text-gray-500">Backend Developer</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Carol Lee</h3>
            <p className="text-gray-500">UI/UX Designer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
