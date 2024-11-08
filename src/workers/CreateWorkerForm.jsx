import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWorker } from "../services/Workers";

export const CreateWorkerForm = () => {
  const navigate = useNavigate();

  const [worker, setWorker] = useState({
    user: {
      username: "",
      password: "", // Since this is for registration
      first_name: "",
      last_name: "",
      birth_date: "",
      phone_number: "",
      nickname: "",
      role: "worker", // Default to worker role
    },
    availability_status: "available", // Default status
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createWorker(worker)
      .then(() => {
        navigate("/workers");
      })
      .catch((error) => {
        console.error("Error creating worker:", error);
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Worker</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={worker.user.username}
            onChange={(e) =>
              setWorker({
                ...worker,
                user: { ...worker.user, username: e.target.value },
              })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={worker.user.password}
            onChange={(e) =>
              setWorker({
                ...worker,
                user: { ...worker.user, password: e.target.value },
              })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={worker.user.first_name}
            onChange={(e) =>
              setWorker({
                ...worker,
                user: { ...worker.user, first_name: e.target.value },
              })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={worker.user.last_name}
            onChange={(e) =>
              setWorker({
                ...worker,
                user: { ...worker.user, last_name: e.target.value },
              })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Birth Date
          </label>
          <input
            type="date"
            value={worker.user.birth_date}
            onChange={(e) =>
              setWorker({
                ...worker,
                user: { ...worker.user, birth_date: e.target.value },
              })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            value={worker.user.phone_number}
            onChange={(e) =>
              setWorker({
                ...worker,
                user: { ...worker.user, phone_number: e.target.value },
              })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nickname
          </label>
          <input
            type="text"
            value={worker.user.nickname}
            onChange={(e) =>
              setWorker({
                ...worker,
                user: { ...worker.user, nickname: e.target.value },
              })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Availability Status
          </label>
          <select
            value={worker.availability_status}
            onChange={(e) =>
              setWorker({
                ...worker,
                availability_status: e.target.value,
              })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          >
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="off">Off</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Worker
          </button>
          <button
            type="button"
            onClick={() => navigate("/workers")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
