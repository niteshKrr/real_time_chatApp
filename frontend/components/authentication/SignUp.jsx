import React from "react";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [show, setShow] = useState(false);
  const onClick = () => {
    setShow(true);
  };
  const onClose = () => {
    setShow(false);
  };

  const createUser = () => {
    axios
      .post(`http://127.0.0.1:8000/user/register`, {
        name,
        email,
        password,
        cpassword,
      })
      .then((response) => {
        // console.log(response);
        alert(`${response.data}.`);
      })
      .catch((e) => {
        alert(`an error occurred: ${e}`);
      });
  };

  return (
    <React.Fragment>
      <Button size="lg" onClick={onClick} gradientDuoTone="redToYellow">
        Sign Up
      </Button>
      <Modal show={show} size="md" popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign up to our platform
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your name" />
              </div>
              <TextInput
                onChange={(e) => {
                  setname(e.target.value);
                }}
                id="name"
                placeholder="name"
                required={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                id="email"
                placeholder="name@company.com"
                required={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                id="password"
                type="password"
                required={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="cpassword" value="Conform password" />
              </div>
              <TextInput
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
                id="cpassword"
                type="password"
                required={true}
              />
            </div>

            <div className="w-full">
              <Button onClick={createUser}>Sign Up</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default SignUp;
