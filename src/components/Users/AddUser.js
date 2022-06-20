import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

import styles from "./AddUser.module.css";

const AddUser = (props) => {
  const UserNameRef = useRef();
  const UserAgeRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (e) => {
    e.preventDefault();

    const enteredName = UserNameRef.current.value;
    const enteredAge = UserAgeRef.current.value;

    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input!",
        message: "Please enter a valid name and age (non empty values)",
      });
      return;
    }

    if (+enteredAge < 1) {
      setError({
        title: "Invalid age!",
        message: "Please enter a valid age (>0)",
      });
      return;
    }

    props.onAddUser(enteredName, enteredAge);
    UserNameRef.current.value = "";
    UserAgeRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input ref={UserNameRef} id="username" type="text"></input>

          <label htmlFor="age">Age (Years)</label>
          <input ref={UserAgeRef} id="age" type="number"></input>
          <Button type={"submit"}>Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
