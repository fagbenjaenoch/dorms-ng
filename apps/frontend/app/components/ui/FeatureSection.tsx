import { FaVideo } from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

export default function FeatureSection() {
  return (
    <section>
      <div className="container">
        <h2>Book your perfect accomodation</h2>
        <div className="flex flex-col *:flex-1  gap-8 lg:flex-row lg:gap-4">
          <div className="bg-fuchsia-500/20 px-4 py-8 rounded-3xl">
            <FaBolt size={15} className="mb-4" />
            <h3 className="font-bold mb-2">Quick and instant search</h3>
            <p>
              Quickly get information of hostels either by searching for them
              specifically or searching the campus or location and get results
              instantly.
            </p>
          </div>

          <div className="bg-sky-300/50 px-4 py-8 rounded-3xl">
            <FaVideo size={15} className="mb-4" />
            <h3 className="font-bold mb-2">Verified video or image walkthroughs</h3>
            <p>
              What you see is exactly what you get. Every listing includes a verified
              video walkthrough so you never have to guess.
            </p>
          </div>

          <div className="bg-amber-400/70 px-4 py-8 rounded-3xl">
            <HiSparkles size={20} className="mb-4" />
            <h3 className="font-bold mb-2">Hostel Insights</h3>
            <p>
              Get useful insights about the hostel like how far it is from the
              school's campus, amenities provided, enviromental condition and other
              useful information that will help you make the right choice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
