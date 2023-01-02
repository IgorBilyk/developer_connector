import React from "react";

export const DashboardHeader = ({ company }) => {
  return (
    <thead>
      <tr>
        <th>{company ? "Company" : "School/Course"}</th>
        <th className="hide-sm">Title</th>
        <th className="hide-sm">Years</th>
      </tr>
    </thead>
  );
};
