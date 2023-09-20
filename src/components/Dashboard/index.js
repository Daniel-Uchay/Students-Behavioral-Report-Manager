import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";

import Swal from "sweetalert2";
import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import {emailconfig} from "../../config/emailjsconfig";

const Dashboard = ({ setIsAuthenticated, setIsResgistered }) => {
  const [students, setStudents] = useState();
  const [selectedStudent, setselectedStudent] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    const students = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(students);
  };
  // TODO: create getstudents function and call it here
  useEffect(() => {
    getStudents();
  }, []);

  const handleEdit = (id) => {
    const [student] = students.filter((student) => student.id === id);

    setselectedStudent(student);
    setIsEditing(true);
  };

  // To be Edited
  const handleSend = (id) => {
    // console.log(student.email)
    const [student] = students.filter((student) => student.id === id);

    const templateParam = {
      to_name: `${student.firstName.toUpperCase()} ${student.lastName.toUpperCase()}`,
      to_email: student.email,
      message: student.behavior,
    };

    emailjs
      .send(emailconfig.serviceid, emailconfig.templateid, templateParam, emailconfig.publickey)
      .then((response) => {
        console.log("Sent successful", response);
        Swal.fire({
          icon: "success",
          title: "Sent!",
          text: `Email sent to ${student.email} was successfully.`,
          showConfirmButton: false,
          timer: 1700,
        });
      })
      .catch((error) => {
        // console.error("error sending Email", error);
        Swal.fire({
          icon: "error",
          title: "error!",
          text: `Email to ${student.email} failed. ${error} `,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const [student] = students
          .filter((student) => student.id === id)
          .sort((a, b) => (a.id > b.id ? 1 : -1));

        // TODO delete document
        deleteDoc(doc(db, "students", id));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${student.firstName} ${student.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const studentsCopy = students.filter((student) => student.id !== id);
        setStudents(studentsCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
            setIsResgistered={setIsResgistered}
          />
          <Table
            students={students}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleSend={handleSend}
          />
        </>
      )}
      {isAdding && (
        <Add
          students={students}
          setIsAdding={setIsAdding}
          setStudents={setStudents}
          getStudents={getStudents}
        />
      )}
      {isEditing && (
        <Edit
          students={students}
          selectedStudent={selectedStudent}
          setStudents={setStudents}
          setIsEditing={setIsEditing}
          getStudents={getStudents}
        />
      )}
    </div>
  );
};

export default Dashboard;
