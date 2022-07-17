import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useHistory();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate.push("/");
      localStorage.removeItem('accessToken');
      localStorage.removeItem('roleID');
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};

export default Home;
