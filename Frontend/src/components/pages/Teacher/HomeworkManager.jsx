import React, { useState } from "react";
import { useTeacher } from "../../context/TeacherContext";

const HomeworkManager = () => {
  const { homeworkList, setHomeworkList } = useTeacher();

  const [form, setForm] = useState({
    subject: "",
    description: "",
    due: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddHomework = () => {
    if (!form.subject || !form.description || !form.due) return;
    setHomeworkList([
      ...homeworkList,
      {
        ...form,
        id: Date.now(), // Unique ID for deletion or editing
      },
    ]);
    setForm({ subject: "", description: "", due: "" });
  };

  const handleDelete = (id) => {
    setHomeworkList(homeworkList.filter((hw) => hw.id !== id));
  };

  return (
    <div className="p-5 w-full">
      <h1 className="text-2xl font-bold mb-5 text-gray-800">
        Homework Manager
      </h1>

      <div className="bg-blue-100 p-5 rounded-2xl shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Add New Homework
        </h2>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            className="p-2 rounded-lg border w-full"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="p-2 rounded-lg border w-full"
          />
          <input
            type="date"
            name="due"
            value={form.due}
            onChange={handleChange}
            className="p-2 rounded-lg border w-full"
          />
          <button
            onClick={handleAddHomework}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      <div className="shadow-md rounded-2xl p-5 bg-white">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Homework List
        </h2>
        <div className="space-y-3">
          {homeworkList.length === 0 ? (
            <p className="text-gray-500">No homework added yet.</p>
          ) : (
            homeworkList.map((hw) => (
              <div
                key={hw.id}
                className="flex flex-col md:flex-row justify-between items-center bg-blue-50 p-3 rounded-xl shadow-sm"
              >
                <div className="flex flex-col text-gray-800">
                  <span className="font-medium">{hw.subject}</span>
                  <span>{hw.description}</span>
                  <span className="text-sm text-gray-600">Due: {hw.due}</span>
                </div>
                <button
                  onClick={() => handleDelete(hw.id)}
                  className="text-red-600 mt-2 md:mt-0 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeworkManager;
