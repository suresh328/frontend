import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Forgot() {
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
      <div className="forgot" data-aos="flip-right">
        <p>{msg !== "" ? msg : null}</p>
        <div className="container">
          <form className="password-form">
            <p style={{borderBottom :"1px solid white", paddingBottom:'10px', fontSize:'25px'}}><i class="fa-solid fa-key " style={{marginRight:"6px"}}></i>Retrieve Password</p>
            <p style={{ fontSize:'14px'}}>
              Enter the Username and E-mail ID to receive <br />
              instructions for resetting your Password
            </p>
            <input type="text" placeholder="Username" id="username" />
            <input type="email" placeholder="Email ID" id="email" />
          </form>
          <div className="buttons">
            <div>
              <Link to="/" className="back-link">
                back to Login<i class="fa-solid fa-arrow-right" style={{marginLeft:"6px"}}></i>
             
              </Link>
            </div>
            <div>
              <button class="submit-button" onclick="sendPassword()">
                Send Me!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forgot;
