import { useState } from "react";
import todoStore from "../store/todoStore";
import { useEffect } from "react";

function MainPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState("Incomplete");

  const { getTodo, todos, createTodo, deleteTodo, filterTodo } = todoStore();

  useEffect(() => {
    if (filter == "All") {
      filterTodo(active);
    } else {
      filterTodo(filter, active);
      setActive(active);
      setFilter(filter);
    }
  }, [filter, active]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTodo({ title, description, priority });
    if (filter == "All") {
      getTodo();
    } else {
      filterTodo(filter, active);
    }
    setTitle("");
    setDescription("");
    setPriority("Low");
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    if (filter == "All") {
      getTodo();
    } else {
      filterTodo(filter, active);
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create a To-Do
          </h2>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Title"
            required
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Description"
            rows={2}
            required
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 mb-6 border rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </form>

        {/* Filter */}

        <div className="flex items-center space-x-4 mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option>Incomplete</option>
            <option>Complete</option>
          </select>
        </div>

        {/* To-Do List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500">No to-dos yet</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex items-center justify-between bg-white p-3 rounded-lg shadow border-l-4"
                style={{
                  borderColor:
                    todo.priority === "High"
                      ? "red"
                      : todo.priority === "Medium"
                      ? "orange"
                      : "green",
                }}
              >
                <div className="flex-1">
                  <h3 className="text-md font-semibold truncate">
                    {todo.title}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {todo.description}
                  </p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full text-white ${
                      todo.priority === "High"
                        ? "bg-red-500"
                        : todo.priority === "Medium"
                        ? "bg-orange-400"
                        : "bg-green-500"
                    }`}
                  >
                    {todo.priority}
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="complete"
                  id="complete"
                  className="px-3 py-1"
                  // disabled
                />

                <button
                  onClick={() => handleDelete(todo._id)}
                  className="ml-4 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded transition"
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
}

export default MainPage;
