import React, { useState, useEffect, useRef, useCallback } from "react";
import ProjectCard from "./ProjectCard";
import CategoryTabs from "./CategoryTabs";
import FilterDropdown from "./FilterDropDown";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const RealEstateListings = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [category, setCategory] = useState("All");
  const [launchFilter, setLaunchFilter] = useState("All");
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [statusOptions, setStatusOptions] = useState(["All"]);

  const observerRef = useRef();
  const perPage = 2;

  // ✅ Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/properties`);
        const formatted = response.data.map((item) => ({
          id: item.id,
          name: item.project_name,
          type: item.type,
          category: item.type,
          launchType: item.status,
          location: item.location,
          bhk: item.configuration,
          area: item.carpet_area,
          possession: item.possession,
          price: item.price_range,
          status: item.status,
          slug: item.slug,
          linkType: item.project_name,
          extraCharges: item.extra_charges,
          image: item.property_images?.[0]?.image_path || null,
          brochure: item.brochure_url,
          layoutPlan: item.layout_plan_url,
          whyToInvest: item.why_to_invest,
          videoUrl: item.video_url,
          videoThumbnail: item.video_thumbnail,
          amenities: item.amenities,
          aboutBuilder: item.about_builder,
          images: item.property_images || [],
        }));

        setAllProjects(formatted);
        // console.log(response);
        // Extract unique statuses
        const uniqueStatuses = Array.from(new Set(response.data.map(item => item.status))).filter(Boolean);
        setStatusOptions(["All", ...uniqueStatuses]);

      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);


  const loadProjects = useCallback(() => {
    const filtered = allProjects.filter((p) => {
      const categoryMatch = category === "All" || p.type === category;
      const launchMatch = launchFilter === "All" || p.launchType === launchFilter;
      return categoryMatch && launchMatch;
    });
    setVisibleProjects(filtered.slice(0, page * perPage));
  }, [category, launchFilter, page, allProjects]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) observer.observe(currentObserver);

    return () => {
      if (currentObserver) observer.unobserve(currentObserver);
    };
  }, [visibleProjects]);

  useEffect(() => {
    setPage(1);
  }, [category, launchFilter]);

  return (
    <div className="bg-black text-white min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6 jaini-regular">Real Estate</h1>

      <div className="max-w-7xl mx-auto">
        <CategoryTabs selected={category} onSelect={setCategory} />

        <div className="text-center my-3 sm:my-4 lg:my-5">
          <FilterDropdown selected={launchFilter} onChange={setLaunchFilter} options={statusOptions} />
        </div>

       <div className="flex justify-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-[60px] mt-6 sm:mt-8 lg:mt-10 w-full">
    <AnimatePresence>
      {visibleProjects.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <ProjectCard data={project} />
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
</div>

        <div ref={observerRef} className="h-10 mt-8 lg:mt-10" />
      </div>
    </div>
  );
};

export default RealEstateListings;