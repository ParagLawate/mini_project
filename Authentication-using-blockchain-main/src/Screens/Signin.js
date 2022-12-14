import * as React from "react";
import myimage from './logo.jpg'
import  "./logo8.jpg";

import { loadBlockchainData, loadWeb3 } from "../Web3helpers";
import { useNavigate } from "react-router-dom";
import { Bloodtype, BloodtypeOutlined } from "@mui/icons-material";

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const [accounts, setAccounts] = React.useState(null);
  const [auth, setAuth] = React.useState(null);

  const loadAccounts = async () => {
    let { auth, accounts } = await loadBlockchainData();

    setAccounts(accounts);
    setAuth(auth);
  };

  const login = async () => {
    if (!email || !password) {
      alert("please fill all details");

      return;
    }

    try {
      const res = await auth.methods.usersList(email).call();

      if (res.password === password) {
        localStorage.setItem("email", email);
        localStorage.setItem("account", accounts);
        navigate("/Home");
      } else {
        alert("wrong user credintinals or please signup");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  React.useEffect(() => {
    loadWeb3();
  }, []);

  React.useEffect(() => {
    loadAccounts();
  }, []);

  return (
    <div style={rootDiv}>
      <img
        src={myimage}
        style={{ width: 200, height: 200, styleborder :"solid #ffffff" } }
        
        alt="DeAuth"
      />

      <input
        style={input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="text"
      />
      <input
        style={input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button style={button} onClick={login}>
        {" "}
        Sign In
      </button>

      <span
        style={{ cursor: "pointer", color : "white" }}
        onClick={() => {
          navigate("/Signup");
        }}
      >
        {" "}
        Create new account{" "}
      </span>
    </div>

   
  );
}

const rootDiv = {
  backgroundImage : `url("./logo8.jpg")`,
  backgroundSize : "cover",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const input = {
  width: 300,
  padding: 10,
  margin: 10,
  borderRadius: 10,
  outline: "none",
  border: "2px solid grey",
  fontSize: 17,
};

const button = {
  width: 325,
  padding: 10,
  borderRadius: 10,
  margin: 10,
  cursor: "pointer",
  fontSize: 19,
  fontWeight :"bold" ,
   color: "white",
  backgroundColor: "#212622",
  border: "none",
};

const image = {
  width: 70,
  height: 70,
  objectFit: "contain",
  borderRadius: 70,
};
