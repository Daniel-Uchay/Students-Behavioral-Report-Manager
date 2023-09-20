import React, { useState } from "react";
import Swal from "sweetalert2";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

const Add = ({ students, setStudents, setIsAdding, getStudents }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [sclass, setSclass] = useState("");
  const [arm, setArm] = useState("");
  const [behavior, setBehavior] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !sclass || !arm || !behavior) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newStudent = {
      firstName,
      lastName,
      email,
      sclass,
      arm,
      behavior,
    };

    students.push(newStudent);

    // Add a new document with a generated id.
    try {
      await addDoc(collection(db, "students"), {
        ...newStudent,
      });
    } catch (error) {
      console.log(error);
    }

    // TODO: Add doc to DB

    setStudents(students);
    setIsAdding(false);
    getStudents()

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Student</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="sclass">Class</label>
        <input
          id="sclass"
          type="text"
          name="sclass"
          value={sclass}
          onChange={(e) => setSclass(e.target.value)}
        />
        <label htmlFor="arm">Arm</label>
        <input
          id="arm"
          type="text"
          name="arm"
          value={arm}
          onChange={(e) => setArm(e.target.value)}
        />
        <label htmlFor="behavior">Behavior</label>
        <input
          id="behavior"
          type="text"
          name="behavior"
          value={behavior}
          onChange={(e) => setBehavior(e.target.value)}
        />
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
