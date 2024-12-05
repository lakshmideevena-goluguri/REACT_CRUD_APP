import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";

const ShowUser = () => {
  const showUserApi = "http://localhost:3000/user";

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    console.log("id : -", id);
    setIsLoading(true);
    try {
      const response = await fetch(showUserApi.concat("/") + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setUser(user.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(showUserApi)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);

        const dummyData = [
          { id: 1, name: "Amit Kumar", email: "amit.kumar@example.com", phone: "987-654-3210" },
          { id: 2, name: "Priya Sharma", email: "priya.sharma@example.com", phone: "988-765-4321" },
          { id: 3, name: "Ravi Patel", email: "ravi.patel@example.com", phone: "999-888-7777" },
          { id: 4, name: "Neha Gupta", email: "neha.gupta@example.com", phone: "998-877-6655" },
          { id: 5, name: "Suresh Reddy", email: "suresh.reddy@example.com", phone: "987-654-1234" },
          { id: 6, name: "Kavita Desai", email: "kavita.desai@example.com", phone: "995-433-2211" },
          { id: 7, name: "Sanjay Singh", email: "sanjay.singh@example.com", phone: "993-554-6677" },
        ];
        setUser(dummyData);

      });
  };

  if (user.length < 0) {
    return <h1>no user found</h1>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((item, i) => {
              return (
                <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Link to={`/edit-user/${item.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    <Link to={`/user/${item.id}`}>
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link>

                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handelDelete(item.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowUser;
