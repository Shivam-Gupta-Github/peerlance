import React from "react";

function JobCard() {
  return (
    <div className="card bg-base-100 w-250 shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title">Job title!</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-between">
          <div>
            <h3 className="font-medium">Deadline: 21-June-2025</h3>
            <h3 className="font-medium">Budget: ₹250</h3>
          </div>
          <button className="btn btn-soft">Apply</button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
