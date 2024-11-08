import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getClient,
  updateClient,
  deleteClient,
} from "../services/ClientServices";

export const EditClientForm = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();

  const [client, setClient] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    nickname: "",
    email: "",
  });

  useEffect(() => {
    getClient(clientId).then((data) => {
      setClient(data);
    });
  }, [clientId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateClient(clientId, client).then(() => {
      navigate("/clients");
    });
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${client.first_name} ${client.last_name}?`
      )
    ) {
      deleteClient(clientId).then(() => {
        navigate("/clients");
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Edit Client</h2>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Client
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            required
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            value={client.first_name}
            onChange={(e) =>
              setClient({ ...client, first_name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            required
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            value={client.last_name}
            onChange={(e) =>
              setClient({ ...client, last_name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nickname
          </label>
          <input
            required
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            value={client.nickname}
            onChange={(e) => setClient({ ...client, nickname: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            required
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            value={client.address}
            onChange={(e) => setClient({ ...client, address: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            required
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            value={client.phone_number}
            onChange={(e) =>
              setClient({ ...client, phone_number: e.target.value })
            }
          />
          <small className="text-gray-500">Format: 123-456-7890</small>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            required
            type="email"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            value={client.email}
            onChange={(e) => setClient({ ...client, email: e.target.value })}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/clients")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
