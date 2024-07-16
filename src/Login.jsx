import React, { useEffect, useState } from "react";
import axios from "axios";
import log from "../src/assest/logop.png";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const initialErr = { usermsg: "", passmsg: "" };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(initialErr);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSumbit = async (event) => {
    event.preventDefault();
    setMsg("");
    let isValid = true;
    const errors = { usermsg: "", passmsg: "" };

    if (username === "") {
      errors.usermsg = "Username cannot be blank";
      isValid = false;
    }
    if (password === "") {
      errors.passmsg = "Password cannot be blank";
      isValid = false;
    }

    setError(errors);

    if (isValid) {
      axios({
        method: "post",
        url: `http://localhost:8081/login`,
        data: {
          username,
          password,
        },
      })
        .then((response) => {
          console.log(response);
          setMsg(response.data.message);
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setMsg(err.response?.data?.message || "An error occurred");
        });
    }
  };

  useEffect(() => {}, [msg, error]);
  return (
    <>
      <div>
        <p className="annotation">{msg !== "" ? msg : null}</p>
        <div className="form" data-aos="flip-left" >
          <div className="login-container">
            <div className="logo">
              <div className="logo-container">
                <img src={log} alt="" />
              </div>
              <div className="header">
                <p>Sign In</p>
              </div>
              <form onSubmit={handleSumbit} className="inp-con">
                <div>
                  <label htmlFor="username " />
                  <input
                    type="username"
                    placeholder="Username "
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <p>{error.usermsg !== "" ? error.usermsg : null}</p>
                </div>
                <div>
                  <label htmlFor="password " />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p>{error.passmsg !== "" ? error.passmsg : null}</p>
                </div>
                <p>{msg !== "" ? msg : null}</p>
                <div className="sub-con">
                  <div>
                    <Link to="/forgot">
                      {" "}
                      <i class="fa-solid fa-arrow-left" style={{marginRight:"6px"}}></i>i forgot password
                    </Link>
                  </div>
                  <div>
                    <button type="Submit"><i class="fa-solid fa-key " style={{marginRight:"6px"}}></i>Secure Login</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="powered-by">Powered By KG Hawes, LLC.</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
