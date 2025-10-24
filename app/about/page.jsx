import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="w-full bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full">
        <Image
          src="/investments.jpg"
          alt="investors hub"
          width={1920}
          height={1080}
          className="w-full h-[40vh] sm:h-[50vh] lg:h-[65vh] object-cover rounded-b-2xl shadow-lg"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-b-2xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white text-center px-4">
            About <span className="text-green-400">EnergyVest</span>
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Intro */}
        <section className="text-center space-y-6">
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            At <span className="font-semibold text-green-700">Energy-Vest</span>, we are redefining
            how people invest in the future. We merge financial intelligence with sustainability,
            empowering investors to build long-term wealth while accelerating innovation in renewable
            energy. Our mission:{" "}
            <strong className="text-green-800">
              make smart investing accessible, transparent, and impactful for everyone.
            </strong>
          </p>
        </section>

        {/* Who We Are */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Energy-Vest was founded by a team of passionate financial experts, engineers, and
            sustainability leaders who saw the need for a trusted, easy-to-use platform that combines
            wealth growth with real-world impact. Our ecosystem is secure, regulated, and designed to
            simplify investing for both beginners and professionals.
            <br />
            <br />
            We provide cutting-edge tools, detailed analytics, and verified investment opportunities
            backed by transparency and technology. With a growing network of global investors,
            Energy-Vest stands as a symbol of empowerment and innovation.
          </p>
        </section>

        {/* Vision */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            We envision a world where financial success and sustainability go hand in hand.
            As the global energy sector shifts toward renewable and eco-friendly solutions, our
            mission is to connect everyday investors to opportunities that deliver both strong
            returns and a healthier planet.
            <br />
            <br />
            Through technologies like AI forecasting, blockchain transparency, and energy-sector
            analytics, we empower our community to invest smarter, faster, and more confidently.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800">Why Choose Energy-Vest</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2">
            <li>
              <strong>Full Transparency:</strong> Real-time reporting and total portfolio control.
            </li>
            <li>
              <strong>No Hidden Fees:</strong> No charges for deposits or withdrawals — your money stays yours.
            </li>
            <li>
              <strong>Bank-Grade Security:</strong> Multi-layer encryption and regulated systems.
            </li>
            <li>
              <strong>Global Reach:</strong> Access worldwide investment opportunities across multiple sectors.
            </li>
            <li>
              <strong>Smart Technology:</strong> AI-driven insights and predictive analytics for better investing.
            </li>
            <li>
              <strong>Impact-Driven:</strong> Every investment supports sustainable, planet-friendly projects.
            </li>
          </ul>
        </section>

        {/* Core Values */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800">Our Core Values</h2>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            At Energy-Vest, we don’t just invest in markets — we invest in people and the planet.
            Our core values define our purpose:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2">
            <li>
              <strong>Integrity:</strong> Honesty, fairness, and trust guide our every move.
            </li>
            <li>
              <strong>Innovation:</strong> We evolve with technology to enhance user experience.
            </li>
            <li>
              <strong>Sustainability:</strong> Eco-conscious projects that protect our world.
            </li>
            <li>
              <strong>Empowerment:</strong> Making financial growth simple and inclusive.
            </li>
            <li>
              <strong>Excellence:</strong> We strive for exceptional service and outcomes.
            </li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800">
            Join Us on the Journey
          </h2>
          <p className="text-gray-700 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Energy-Vest isn’t just a platform — it’s a movement reshaping the future of investing.
            We connect thousands of investors to high-potential projects that drive both profits
            and positive change. Whether you’re a first-time investor or a seasoned trader,
            we’ll guide you every step of the way.
            <br />
            <br />
            <span className="font-semibold">
              Be part of a future where your investments create both profits and purpose.
            </span>
          </p>
          <Link href="/register">
            <button className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
              Start Your Investment Journey
            </button>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
