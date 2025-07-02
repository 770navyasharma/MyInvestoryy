import { useEffect, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const SimilarProjects = ({ slug }) => {
  const [allProjects, setAllProjects] = useState([]);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [isChargesModalOpen, setChargesModalOpen] = useState(false);
  const [isInterestModalOpen, setInterestModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const chargesModalRef = useRef(null);
  const interestModalRef = useRef(null);

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSimilarProjects = async () => {
      try {
        const response = await fetch(`${apiBase}api/projects/${slug}/similar`);
        const data = await response.json();
        console.log(data);
        // Map API data to match your custom field names
        const formatted = data.map((p) => ({
          id: p.id,
          name: p.project_name,
          slug: p.slug,
          type: p.type,
          launchType: p.status,
          bhk: p.configuration,
          area: p.carpet_area,
          location: p.location,
          price: p.price_range,
          extraCharges: p.extra_charges,
          possession: p.possession,
          image: p.property_images?.[0]?.image_path || "",
          images: [p.brochure_url], // or array if you have more
        }));

        setAllProjects(formatted);
      } catch (error) {
        console.error("Error fetching similar projects:", error);
      }
    };

    if (slug) {
      fetchSimilarProjects();
    }
  }, [slug]);

  // Modal and form handlers
  const handleChargesClick = (project) => {
    setSelectedProject(project);
    setChargesModalOpen(true);
  };
  
  const closeChargesModal = () => setChargesModalOpen(false);

  const handleInterestClick = (project) => {
    setSelectedProject(project);
    setInterestModalOpen(true);
  };
  
  const closeInterestModal = () => setInterestModalOpen(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Interest for:", selectedProject?.name);
    console.log("Form Data:", formData);
    closeInterestModal();
  };

  // Component to render each project
  const ProjectBox = ({ data }) => (
  <div className="w-full md:w-[400px] bg-white text-black rounded-[5px] overflow-hidden shadow-md border border-gray-300 font-[system-ui] px-3 py-2 relative">
    {/* Image */}
    <div
      className="bg-black h-[180px] sm:h-[200px] relative flex justify-end items-end p-2 bg-cover bg-center"
      style={{
        backgroundImage: `url(https://backend.myinvestoryy.com/backend/storage/app/public/${data.image})`,
      }}
    >
      {data.images?.length > 1 && (
        <span className="absolute bottom-2 right-2 bg-white text-[10px] sm:text-xs px-2 py-0.5 rounded text-black font-semibold">
          +{data.images.length - 1}
        </span>
      )}
    </div>

    {/* Content */}
    <div className="py-2 border-t border-gray-300 space-y-1 text-sm sm:text-[15px]">
      <h2 className="text-xl sm:text-2xl font-bold jaini-regular">{data.name}</h2>
      <hr className="border-black border-t-2 my-1" />
      <div className="flex justify-between text-xs sm:text-sm">
        <span className="underline">{data.type}</span>
        <span className="text-blue-800">{data.launchType}</span>
      </div>
      <div className="flex justify-between text-xs sm:text-sm">
        <span className="font-bold">{data.location}</span>
        <span className="text-[#7c7c7c]">Possession in {data.possession}</span>
      </div>
      <div className="flex justify-between text-xs sm:text-sm">
        <span>{data.bhk}</span>
        <span>{data.area}</span>
      </div>
      <div className="text-xs sm:text-sm text-[#1d1d1f] py-1">
        {data.price}{" "}
        <button onClick={() => handleChargesClick(data)} className="text-blue-800 focus:outline-none">
          + Charges
        </button>
      </div>
      <hr className="border-black border-t-2 my-1" />
      <div className="flex flex-row gap-4 pt-2">
                <button
                  onClick={() => handleInterestClick(data)}
                  className="bg-gradient-to-r from-[#529F77] to-[#3C8576] text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-xl shadow border-b-2 sm:border-b-3 md:border-b-4 border-r-2 sm:border-r-3 md:border-r-4 border-black  min-w-max hover:scale-[1.03] transition-transform duration-200 shadow-lg relative active:shadow-sm active:border-b-1 sm:active:border-b-2 active:border-r-1 sm:active:border-r-2 w-full md:w-auto">
                  Send Interest
                </button>
      
                <Link to={`/property/${data.slug}`} className="bg-[#AC1C30] text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-xl shadow border-b-2 sm:border-b-3 md:border-b-4 border-r-2 sm:border-r-3 md:border-r-4 border-black  min-w-max hover:scale-[1.03] transition-transform duration-200 shadow-lg relative active:shadow-sm active:border-b-1 sm:active:border-b-2 active:border-r-1 sm:active:border-r-2 w-full md:w-auto">
                  View Details
                </Link>
              </div>
    </div>
  </div>
);


  return (
    <>
      {allProjects.length > 0 && (
  <div className="mt-10">
    <h3 className="underline text-3xl md:text-4xl font-bold jaini-regular text-center mb-5">Similar Projects</h3>
    <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-lg mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {allProjects.map((project) => (
            <div key={project.id}>
              <ProjectBox data={project} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  </div>
)}


      {/* Charges Modal */}
      {isChargesModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            className="bg-[#0f1e17] text-white rounded-xl p-6 max-w-md w-full relative shadow-xl border border-green-700"
            ref={chargesModalRef}
          >
            <button className="absolute top-2 right-2 text-white text-xl" onClick={closeChargesModal}>
              ×
            </button>
            <h3 className="text-2xl font-bold mb-4">Additional Charges</h3>
            <p className="text-green-400 font-medium mb-2">{selectedProject.name}</p>
            <div
              className="text-sm space-y-2"
              dangerouslySetInnerHTML={{ __html: selectedProject.extraCharges || "<p>No additional charges listed.</p>" }}
            />
            <button onClick={closeChargesModal} className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 rounded shadow">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Interest Modal */}
      {isInterestModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div
            ref={interestModalRef}
            className="bg-gradient-to-br from-[#1a2e24] to-[#111827] text-white rounded-xl p-6 w-full max-w-md relative shadow-2xl border border-green-600 transform transition-all"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white rounded-full h-8 w-8 flex items-center justify-center bg-gray-800/50 hover:bg-gray-700 transition-colors"
              onClick={closeInterestModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h3 className="text-2xl font-bold mb-1 text-white flex items-center">
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                  <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                  <path d="M9 22V12h6v10" />
                  <path d="M2 10.6L12 2l10 8.6" />
                </svg>
              </span>
              Express Interest
            </h3>

            <p className="text-green-400 font-medium mb-2">{selectedProject.name}</p>
            <div className="text-gray-300 text-sm mb-6">
              <p>Location: {selectedProject.location}</p>
              <p>Type: {selectedProject.type} | {selectedProject.bhk}</p>
              <p>Price Range: {selectedProject.price}</p>
            </div>
            <p className="text-gray-300 text-sm mb-6">Please fill in your details to express interest in this property. Our team will contact you soon.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/70 border border-gray-700 focus:border-green-500 focus:ring focus:ring-green-500/30 focus:outline-none text-white placeholder-gray-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/70 border border-gray-700 focus:border-green-500 focus:ring focus:ring-green-500/30 focus:outline-none text-white placeholder-gray-500 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/70 border border-gray-700 focus:border-green-500 focus:ring focus:ring-green-500/30 focus:outline-none text-white placeholder-gray-500 transition-colors"
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Submit Interest
                </button>
              </div>
            </form>

            <p className="text-gray-400 text-xs mt-4 text-center">
              By submitting this form, you agree to our privacy policy and terms of service.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SimilarProjects;