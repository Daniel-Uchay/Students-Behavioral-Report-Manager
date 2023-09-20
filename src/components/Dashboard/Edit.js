import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firestore";
import Swal from "sweetalert2";

const Edit = ({ students, selectedStudent, setStudents, setIsEditing, getStudents }) => {
  const id = selectedStudent.id;

  const [firstName, setFirstName] = useState(selectedStudent.firstName);
  const [lastName, setLastName] = useState(selectedStudent.lastName);
  const [email, setEmail] = useState(selectedStudent.email);
  const [sclass, setSclass] = useState(selectedStudent.sclass);
  const [arm, setArm] = useState(selectedStudent.arm);
  const [behavior, setBehavior] = useState(selectedStudent.behavior);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !sclass || !arm || !behavior) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const student = {
      id,
      firstName,
      lastName,
      email,
      sclass,
      arm,
      behavior,
    };

    await setDoc(doc(db, "students", id), {
     ...student
    });

    setStudents(students);
    setIsEditing(false);
    getStudents();

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${student.firstName} ${student.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Student</h1>
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
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
