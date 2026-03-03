import { FaBolt } from "react-icons/fa6";

export default function FeatureSection() {
  return (
    <section>
      <div className="container">
        <h2>Book your perfect accomodation</h2>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-4">
          <div className="bg-fuchsia-500/20 px-4 py-8 rounded-3xl">
            <FaBolt size={15} className="mb-4" />
            <h3 className="font-bold mb-2">Quick and instant search</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolor
              magni dignissimos exercitationem in nemo cupiditate perspiciatis
              dolorum, atque sapiente.
            </p>
          </div>

          <div className="bg-fuchsia-500/20 px-4 py-8 rounded-3xl">
            <FaBolt size={15} className="mb-4" />
            <h3 className="font-bold mb-2">Quick and instant search</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolor
              magni dignissimos exercitationem in nemo cupiditate perspiciatis
              dolorum, atque sapiente.
            </p>
          </div>

          <div className="bg-fuchsia-500/20 px-4 py-8 rounded-3xl">
            <FaBolt size={15} className="mb-4" />
            <h3 className="font-bold mb-2">Quick and instant search</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolor
              magni dignissimos exercitationem in nemo cupiditate perspiciatis
              dolorum, atque sapiente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
