import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import api from "../../services/api";
import { StyleDashboard } from "./StyleDashboard";

const Dashboard = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("@token");
    if (!user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      api.get(`profile`).then((response) => {
        console.log(response.data);
        setUser(response.data);
      });
    }
  }, []);

  const Logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <StyleDashboard>
      <header>
        <div className="header">
          <img src={Logo} alt="Logo" />
          <button onClick={() => Logout()}>Logout</button>
        </div>
      </header>
      <div className="information">
        <div className="body__information">
          <h1>Hello, {user.name}!</h1>
          <p>First module (Introduction to Frontend)</p>
        </div>
      </div>
      <div className="description">
        <div className="body__description">
          <h1>What a shame! We are under development :(</h1>
          <p>Our application is under development, soon we will have news!</p>
        </div>
      </div>
    </StyleDashboard>
  );
};

export default Dashboard;
