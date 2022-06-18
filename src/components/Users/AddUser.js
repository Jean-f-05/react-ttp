import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import styles from "./AddUser.module.css";

const AddUser = (props) => {
  const [userNameState, userNameStateHandler] = useState("");
  const [ageState, ageStateHandler] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (e) => {
    e.preventDefault();

    if (userNameState.trim().length === 0 || ageState.trim().length === 0) {
      setError({
        title: "Invalid Input!",
        message: "Please enter a valid name and age (non empty values)",
      });
      return;
    }

    if (+ageState < 1) {
      setError({
        title: "Invalid age!",
        message: "Please enter a valid age (>0)",
      });
      return;
    }

    props.onAddUser(userNameState, ageState);

    userNameStateHandler("");
    ageStateHandler("");
  };

  const usernameChange = (e) => {
    userNameStateHandler(e.target.value);
  };

  const ageChange = (e) => {
    ageStateHandler(e.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
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
          <input
            id="username"
            type="text"
            value={userNameState}
            onChange={usernameChange}
          ></input>

          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={ageState}
            onChange={ageChange}
          ></input>
          <Button type={"submit"} value={ageState}>
            Add User
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
