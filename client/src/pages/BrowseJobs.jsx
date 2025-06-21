import React from "react";
import JobCard from "../components/JobCard";

function BrowseJobs() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Browse Jobs</h1>
      <div>
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
    </div>
  );
}

export default BrowseJobs;
