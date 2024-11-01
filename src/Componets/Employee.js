import { useState } from "react";

export const useEmployeeDetails = () => {
  const [employees, setEmployees] = useState([
    {
      profile: "Jeremy Neigh",
      id: "A0B1C001",
      status: "Part-Time",
      department: "Support",
      shiftStart: "08:00",  // Start time in HH:mm format
      shiftEnd: "17:00",    // End time in HH:mm format
      joiningDate: "2024-10-18",
      role: "Tax Officer",
    },
    {
      profile: "Emily Johnson",
      id: "A0B1C002",
      status: "Full-Time",
      department: "Finance",
      shiftStart: "09:00",
      shiftEnd: "18:00",
      joiningDate: "2024-10-18",
      role: "Accountant",
    },
    {
      profile: "Mark Smith",
      id: "A0B1C003",
      status: "On-contract",
      department: "IT",
      shiftStart: "08:00",
      shiftEnd: "17:00",
      joiningDate: "2024-10-18",
      role: "Software Developer",
    },
    {
      profile: "Sophia Williams",
      id: "A0B1C004",
      status: "Full-Time",
      department: "HR",
      shiftStart: "08:00",
      shiftEnd: "17:00",
      joiningDate: "2024-10-18",
      role: "HR Manager",
    },
    {
      profile: "Liam Brown",
      id: "A0B1C005",
      status: "Seasonal",
      department: "Marketing",
      shiftStart: "10:00",
      shiftEnd: "19:00",
      joiningDate: "2024-10-18",
      role: "Marketing Specialist",
    },
    {
      profile: "Olivia Garcia",
      id: "A0B1C006",
      status: "Full-Time",
      department: "Sales",
      shiftStart: "08:00",
      shiftEnd: "17:00",
      joiningDate: "2024-10-18",
      role: "Sales Executive",
    },
    {
      profile: "Noah Martinez",
      id: "A0B1C007",
      status: "Part-Time",
      department: "Operations",
      shiftStart: "06:00",
      shiftEnd: "15:00",
      joiningDate: "2024-10-18",
      role: "Operations Coordinator",
    },
  ]);

  return { employees, setEmployees };
};
