

import { useState, useEffect } from "react";
import { db } from "../config/firebaseconfig"; // Import Firebase config
import { collection, onSnapshot } from "firebase/firestore";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { saveAs } from "file-saver";
import dummy from '../assets/dummy-img.jpeg'
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);
const Filter = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [selectedLessons, setSelectedLessons] = useState("All");
  const [selectedPart, setSelectedPart] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [lessons, setLesssons] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
        const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);

        const dats = onSnapshot(collection(db, "lessons"), (snapshot) => {
            const lessonsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLesssons(lessonsData);
        }
        );
        const dats2 = onSnapshot(collection(db, "assignments"), (snapshot) => {
            const assignmentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAssignments(assignmentsData);
        }
        );
      });
  
      return () => unsubscribe(); 

  }, []);

  useEffect(() => {
    filterUsers();
    filterLessons()
  }, [selectedGroup, selectedLessons,lessons, selectedGrade,selectedPart, users]);

  const filterUsers = () => {
    let filtered = users;

    if (selectedGroup !== "All") {
        filtered = filtered.filter(user => user.group === selectedGroup);
      }
  
      // Extract available parts & grades **after** applying group filter
      const availableParts = [...new Set(filtered.map(user => user.part))];
      const availableGrades = [...new Set(filtered.map(user => user.grade))];
  
      // Apply part and grade filters only if they exist in the available options
      if (selectedPart !== "All" && availableParts.includes(selectedPart)) {
        filtered = filtered.filter(user => user.part === selectedPart);
      }
  
      if (selectedGrade !== "All" && availableGrades.includes(selectedGrade)) {
        filtered = filtered.filter(user => user.grade === selectedGrade);
      }
    setFilteredUsers(filtered);
  };

  const filterLessons = ()=>{
    let filtered = lessons;
    if(setSelectedGrade !== "All"){
        filtered = filtered.filter(lesson => lesson.grade === selectedGrade);
    }
    if(selectedGrade == 'GRADE 1'){
        filtered = filtered.filter(lesson => lesson.grade === 'GRADE 1');
    }
    if(selectedGrade == 'GRADE 2'){
        filtered = filtered.filter(lesson => lesson.grade === 'GRADE 2');
    }
    if(selectedGrade == 'GRADE 3'){
        filtered = filtered.filter(lesson => lesson.grade === 'GRADE 3');
    }
    if(selectedGrade == 'GRADE 4'){
        filtered = filtered.filter(lesson => lesson.grade === 'GRADE 4');
    }
    if(selectedGrade == 'GRADE 5'){
        filtered = filtered.filter(lesson => lesson.grade === 'GRADE 5');
    }
    if(selectedGrade == 'PRELIM'){
        filtered = filtered.filter(lesson => lesson.grade === 'PRELIM');
    }
    setFilteredLessons(filtered)

  }

  // Count users per grade
  const gradeCounts = filteredUsers.reduce((acc, user) => {
    acc[user.grade] = (acc[user.grade] || 0) + 1;
    return acc;
  }, {});

//  Count users per group for pie chart
  const groupCounts = filteredUsers.reduce((acc, user) => {
    acc[user.part] = (acc[user.part] || 0) + 1;
    return acc;
  }, {});
  const groups = [...new Set(users.map(user => user.group))];

  // Get available parts & grades based on filtered group
  const parts = [...new Set(users.filter(user => selectedGroup === "All" || user.group === selectedGroup).map(user => user.part))];
  const grades = [...new Set(users.filter(user => selectedGroup === "All" || user.group === selectedGroup).map(user => user.grade))];
  const pieChartData = {
    labels: Object.keys(groupCounts),
    datasets: [{ label: "Users per Group", data: Object.values(groupCounts), backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"] }]
  };
  const chartData = {
    labels: Object.keys(gradeCounts), // Grade names (e.g., "Grade 1", "Grade 2")
    datasets: [
      {
        label: "Number of Users",
        data: Object.values(gradeCounts), // Count of users per grade
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  };
//   Export CSV
  const exportCSV = () => {
    const csvData = [["Name", "Group", "Part", "Grade"], ...filteredUsers.map(user => [user.name, user.group, user.part, user.grade])];
    const csvContent = "data:text/csv;charset=utf-8," + csvData.map(e => e.join(",")).join("\n");
    const blob = new Blob([decodeURIComponent(encodeURIComponent(csvContent))], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "filtered_users.csv");
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard - User Grades</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block font-semibold">Select Group:</label>
          <select className="border p-2 rounded" onChange={(e) => setSelectedGroup(e.target.value)}>
            <option value="All">All</option>
            {[...new Set(users.map(user => user.group))].map(group => <option key={group} value={group}>{group}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-semibold">Select Part:</label>
          <select className="border p-2 rounded" onChange={(e) => setSelectedPart(e.target.value)} >
            <option value="All">All</option>
            {parts.map(part => <option key={part} value={part}>{part}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-semibold">Select Grade:</label>
          <select className="border p-2 rounded" onChange={(e) => setSelectedGrade(e.target.value)} >
            <option value="All">All</option>
            {grades.map(grade => <option key={grade} value={grade}>{grade}</option>)}
          </select>
        </div>

         <div>
          <label className="block font-semibold">Select Lessons:</label>
          <select className="border p-2 rounded" onChange={(e) => setSelectedLessons(e.target.value)}>
            <option value="All">All</option>
            {grades.map(grade => <option key={grade} value={grade}>{grade}</option>)}

            {/* {[...new Set(grades.map(user => user.group))].map(group => <option key={group} value={group}>{group}</option>)} */}
          </select>
        </div>
      </div>
      {/* Export Button */}
      <button onClick={exportCSV} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Export CSV</button>

      {/* Total Users in Filtered Group */}
      <div className="bg-white p-4 shadow rounded mb-4">
        <h3 className="text-lg font-semibold">Total Users in Selected Filter:</h3>
        <p><strong>{filteredUsers.length} Users</strong></p>
      </div>
 {/*  Chart */}
 <div className="flex gap-4">
        <div className="w-1/2 bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold">Grade Distribution</h3>
          <Bar data={chartData} />
        </div>
        <div className="w-1/2 bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold">User Distribution by Group</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
      {/* User Table */}
      <div className="bg-white p-4 shadow rounded mb-4">
        <h3 className="text-lg font-semibold mb-2">Users & Grades</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Group</th>
              <th className="border p-2">Part</th>
              <th className="border p-2">Grade</th>
              <th className="border p-2">D-0-B</th>
              <th className="border p-2">Image</th>
            </tr>
          </thead>
          <tbody key={users.part}>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border">
                <td className="border p-2">
                    <img className='rounded-full w-8 h-8' src={user.imageUrl || dummy } alt="user" />
                </td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.group}</td>
                <td className="border p-2">{user.part}</td>
                <td className="border p-2">{user.grade}</td>
                <td className="border p-2">{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
    </div>
  );
};

export default Filter;
