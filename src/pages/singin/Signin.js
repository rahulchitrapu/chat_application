import React, { useEffect, useState } from "react";
import "./Signin.css";
import { baseurl } from "../../LocalExoprt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Signin() {
  const [login, setLogin] = useState(true);

  const [passwordeye, setPasswordEye] = useState(false);

  const userdata = {
    name: "",
    username: "",
    password: "",
  };
  const [data, setData] = useState({ ...userdata });

  const [error,setError]=useState('')

  const url = baseurl;

  const logininClickHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/login`, {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.result.message);
        setError(err.response.data.result.message)
      });
  };

  const signUpClickHandler = () => {
    axios
      .post(`${url}/signin`, {
        name: data.name,
        password: data.password,
        username: data.username,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.result.message);
        setError(err.response.data.result.message)
      });
  };

  useEffect(()=>{
    if(error!==''){
        setTimeout(()=>{
            setError('')
        },500)
    }
  },[error])

//   console.log(data)
  return (
    <div className="width-100 height-100 flex-center-center signup-container">
      <div class="wrapper">
        {!login && (
          <div class="form-container sign-up">
            <form onSubmit={signUpClickHandler}>
              <h2>sign up</h2>
              <div class="form-group">
                <input
                  value={data.name}
                  onChange={(e) => {
                    setData({
                      ...data,
                      name: e.target.value,
                    });
                  }}
                  type="text"
                  required
                />
                <label htmlFor="">Name</label>
                <FontAwesomeIcon className="icon-i" icon={faUser} />
              </div>
              <div class="form-group">
                <input
                  value={data.username}
                  onChange={(e) => {
                    setData({ ...data, username: e.target.value });
                  }}
                  type="text"
                  required
                />
                <label htmlFor="">username</label>
                <FontAwesomeIcon className="icon-i" icon={faUser} />
              </div>
              <div class="form-group">
                <input
                  style={{ width: "93%", paddingLeft: "0px" }}
                  type={passwordeye ? "text" : "password"}
                  required
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                />
                <FontAwesomeIcon className="icon-i" icon={faLock} />
                <label htmlFor="">password</label>
                <FontAwesomeIcon
                  className="eye-icon-password cursor-p"
                  onClick={() => {
                    setPasswordEye(!passwordeye);
                  }}
                  style={{ height: "16px" }}
                  icon={passwordeye ? faEyeSlash : faEye}
                />
              </div>
              <div style={{color:'red'}}>{error}</div>
              <button
                type="submit"
                class="btn"
                onClick={() => {
                  signUpClickHandler();
                }}
              >
                sign up
              </button>
              <div
                class="link"
                onClick={() => {
                  setLogin(true);
                  setPasswordEye(false);
                  setData({ ...userdata });
                }}
              >
                <p>
                  You already have an account?
                  <span>sign in</span>
                </p>
              </div>
            </form>
          </div>
        )}
        {login && (
          <div class="form-container sign-in">
            <form onSubmit={logininClickHandler}>
              <h2>login</h2>
              <div class="form-group flex-flex-start-center">
                <input
                  value={data.username}
                  onChange={(e) => {
                    setData({ ...data, username: e.target.value });
                  }}
                  type="text"
                  required
                />
                <FontAwesomeIcon className="icon-i" icon={faUser} />
                <label htmlFor="">username</label>
              </div>
              <div class="form-group">
                <input
                  style={{ width: "93%", paddingLeft: "0px" }}
                  type={passwordeye ? "text" : "password"}
                  required
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                />
                <FontAwesomeIcon className="icon-i" icon={faLock} />
                <label htmlFor="">password</label>
                <FontAwesomeIcon
                  className="eye-icon-password cursor-p"
                  onClick={() => {
                    setPasswordEye(!passwordeye);
                  }}
                  style={{ height: "16px" }}
                  icon={passwordeye ? faEyeSlash : faEye}
                />
              </div>
              <div style={{color:'red'}}>{error}</div>
              <button
                type="submit"
                class="btn"
                onClick={(e) => {
                  logininClickHandler(e);
                }}
              >
                login
              </button>
              <div
                class="link"
                onClick={() => {
                  setLogin(false);
                  setPasswordEye(false);
                  setData({ ...userdata });
                }}
              >
                <p>
                  Don't have an account?
                  <span>sign up</span>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
