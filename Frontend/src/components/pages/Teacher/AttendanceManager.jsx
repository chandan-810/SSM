import React from "react";
import { useTeacher } from "../../context/TeacherContext";

const AttendanceManager = () => {
  const { students, attendance, markAttendance } = useTeacher();

  const handleSubmit = () => {
    const dataToSend = students.map((s) => ({
      id: s.id,
      name: s.name,
      status: attendance[s.id],
    }));
    console.log("Sending to server:", dataToSend);
    alert("Attendance submitted!");
  };

  return (
    <div className="p-5 w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mark Attendance</h1>

      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between bg-gray-100 p-3 rounded-md shadow-sm"
          >
            <span className="text-lg font-medium text-gray-700">
              {student.name}
            </span>
            <div className="flex gap-4">
              <button
                className={`px-4 py-1 rounded-full text-white ${
                  attendance[student.id] === "present"
                    ? "bg-green-500"
                    : "bg-gray-400 hover:bg-green-500"
                }`}
                onClick={() => markAttendance(student.id, "present")}
              >
                Present
              </button>
              <button
                className={`px-4 py-1 rounded-full text-white ${
                  attendance[student.id] === "absent"
                    ? "bg-red-500"
                    : "bg-gray-400 hover:bg-red-500"
                }`}
                onClick={() => markAttendance(student.id, "absent")}
              >
                Absent
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default AttendanceManager;
