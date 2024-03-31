"use client";

import { useState } from "react";

async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
}

export default function Page() {
  const [users, setUsers] = useState([]);

  async function handleDelete(id) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const newUsers = users.filter((user) => user.id !== id);
      setUsers(newUsers);
    }
  }
  async function handleAdd() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: "POST",
      body: JSON.stringify({
        name: "Mahima Chudhury",
        email: "mhaaud@gmail.com",
        phone: "5192568741",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response.ok) {
      const newUser = await response.json();
      setUsers([...users, newUser]);
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-7xl my-4 text-center">List of Users</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-4 mb-4 py-2 px-4 rounded"
        onClick={async () => {
          const users = await getUsers();
          setUsers(users);
        }}
      >
        Get
      </button>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center mx-4">
            <h4 className="text-2xl">Name: {user.name}</h4>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>

            <button
              className="btn btn-error my-2 text-white"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
        <button className="btn btn-accent mx-4 text-white" onClick={handleAdd}>
          add
        </button>
      </ul>
    </div>
  );
}
