import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axiosInstance.get('/students');
        setStudents(data.students);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.class}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
