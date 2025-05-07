import React, { memo } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useTeacher } from "../../context/TeacherContext";
import { PieChart, Pie, Cell } from "recharts";
import Logout from "../../../Logout";

const Dashboard = () => {
  const { students, attendance, homeworkList } = useTeacher();
  const loggedInUser = localStorage.getItem("LoggedInUser") || "Teacher";

  const total = students.length;
  const present = students.filter((s) => attendance[s.id] === "present").length;
  const absent = total - present;
  const percentage = total === 0 ? 0 : Math.round((present / total) * 100);

  const attendanceData = [
    { name: "Present", value: present },
    { name: "Absent", value: absent },
  ];

  const COLORS = ["#22c55e", "#ef4444"]; // green, red

  return (
    <div className="flex flex-col gap-10 p-2 md:p-5 w-full">
      {/* New Header Section */}
      <div className="shadow-lg w-full relative rounded-3xl py-5 px-2 md:px-10 bg-blue-100 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-figtree font-bold text-gray-800">
          Hey, {loggedInUser}!
        </h1>
        <div className="mr-12">
          <Logout />
        </div>
      </div>

      {/* Existing Sections */}
      <div className="shadow-lg rounded-3xl py-5 px-2 md:px-10">
        <h1 className="text-xl mb-4 md:text-2xl font-bold text-gray-800">
          Teacher Dashboard
        </h1>
        <div className="flex flex-wrap justify-center md:justify-start gap-5">
          <div className="bg-blue-200 hover:scale-95 transition-transform duration-200 flex flex-col items-center justify-center h-40 w-56 p-5 rounded-3xl border shadow-xl border-blue-400">
            <h2 className="text-xl text-blue-900 font-semibold">
              Mark Attendance
            </h2>
            <Link
              to="/teacher/attendance"
              className="text-lg text-blue-600 font-semibold hover:scale-105 transition-transform duration-200"
              aria-label="Mark today's attendance"
            >
              Fill Now | Today
            </Link>
          </div>
          <div className="bg-blue-200 hover:scale-95 transition-transform duration-200 flex flex-col items-center justify-center h-40 w-56 p-5 rounded-3xl border shadow-xl border-blue-400">
            <h2 className="text-xl text-blue-900 font-semibold">
              Add Homework
            </h2>
            <Link
              to="/teacher/homework"
              className="text-lg text-blue-600 font-semibold hover:scale-105 transition-transform duration-200"
              aria-label="Create a new homework assignment"
            >
              Create Assignment
            </Link>
          </div>
          <div className="bg-blue-200 hover:scale-95 transition-transform duration-200 flex flex-col items-center justify-center h-40 w-56 p-5 rounded-3xl border shadow-xl border-blue-400">
            <h2 className="text-xl text-blue-900 font-semibold">Messages</h2>
            <Link
              to="/teacher/messages"
              className="text-lg text-blue-600 font-semibold hover:scale-105 transition-transform duration-200"
              aria-label="Check messages"
            >
              Check Now
            </Link>
          </div>
        </div>
      </div>

      <div className="shadow-lg rounded-3xl py-5 px-2 md:px-10">
        <h1 className="text-xl mb-4 md:text-2xl font-bold text-gray-800">
          Today's Attendance
        </h1>
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="relative w-56 h-40 flex items-center justify-center">
            <PieChart width={160} height={160}>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                startAngle={90}
                endAngle={-270}
                paddingAngle={1}
                dataKey="value"
              >
                {attendanceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <span className="absolute text-xl font-bold text-gray-700">
              {percentage}%
            </span>
          </div>
          <div className="p-5">
            <h3 className="text-xl text-gray-800 font-medium">
              Total Students: {total}
            </h3>
            <h3 className="text-xl text-gray-800 font-medium">
              Present: {present}
            </h3>
            <h3 className="text-xl text-gray-800 font-medium">
              Absent: {absent}
            </h3>
          </div>
        </div>
      </div>

      <div className="shadow-lg rounded-3xl py-5 px-2 md:px-10">
        <h1 className="text-xl mb-4 md:text-2xl font-bold text-gray-800">
          Recent Homework
        </h1>
        <div className="flex flex-col py-5 px-2 bg-blue-100 gap-5">
          {homeworkList.length === 0 ? (
            <p className="text-gray-500">No homework added yet.</p>
          ) : (
            homeworkList.map((hw, index) => (
              <div
                key={index}
                className="bg-blue-50 px-3 py-2 rounded-3xl flex flex-wrap md:flex-nowrap items-center justify-between"
              >
                <span className="w-full md:w-auto inline-block font-medium text-gray-800">
                  {hw.subject} - {hw.description}
                </span>
                <span className="w-40 inline-block text-sm text-gray-600">
                  Due: {hw.due}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Dashboard);
