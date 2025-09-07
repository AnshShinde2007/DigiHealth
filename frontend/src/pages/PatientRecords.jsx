import React from "react";

const PatientRecords = () => {
  return (
    <div>
      <h1>Patient Records</h1>
      <h2>Patient List</h2>
      <ul>
        <li>Patient ID: 101, Name: Alice Smith, Condition: Fever</li>
        <li>Patient ID: 102, Name: Bob Johnson, Condition: Sprained Ankle</li>
        <li>Patient ID: 103, Name: Carol White, Condition: Diabetes</li>
      </ul>

      <h2>Recent Consultations</h2>
      <p><strong>Patient ID: 101</strong> - Date: 2025-09-05, Doctor: Dr. Emily White, Notes: Prescribed antibiotics.</p>
      <p><strong>Patient ID: 102</strong> - Date: 2025-09-04, Doctor: Dr. John Doe, Notes: Recommended R.I.C.E. therapy.</p>
    </div>
  );
};

export default PatientRecords;