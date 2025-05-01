import React, { createContext, useContext, useState } from "react";

// Dummy student data (can be fetched from API later)
const dummyStudents = [
  { id: 1, name: "Aman Sharma" },
  { id: 2, name: "Pooja Verma" },
  { id: 3, name: "Ravi Kumar" },
  { id: 4, name: "Simran Kaur" },
  { id: 5, name: "Anil Joshi" },
];

const TeacherContext = createContext();

export const useTeacher = () => useContext(TeacherContext);

export const TeacherProvider = ({ children }) => {
  const [students, setStudents] = useState(dummyStudents);
  const [homeworkList, setHomeworkList] = useState([]);

  // Track attendance per day (object with student ID as key)
  const [attendance, setAttendance] = useState(
    dummyStudents.reduce((acc, student) => {
      acc[student.id] = "present"; // default status
      return acc;
    }, {})
  );

  const markAttendance = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  return (
    <TeacherContext.Provider
      value={{
        students,
        attendance,
        setAttendance,
        homeworkList,
        markAttendance,
        setHomeworkList,
        setStudents,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
