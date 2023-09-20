import React from "react";

const Table = ({ students, handleEdit, handleDelete, handleSend }) => {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Arm</th>
            <th>Behavior</th>
            <th colSpan={3} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {students ? (
            students.map((student, i) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.sclass}</td>
                <td>{student.arm}</td>
                <td>{student.behavior}</td>

                <td className="text-right">
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
                <td className="text-right">
                  <button
                    onClick={() => handleSend(student.id)}
                    className="button muted-button"
                  >
                    Send
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>No Students</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
