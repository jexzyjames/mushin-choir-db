// AdminPanel.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postGradeAssignment, postGradeLesson } from '../redux/slices/adminSlice';
import { ToastContainer, toast } from 'react-toastify';
function AdminPanel() {
  const dispatch = useDispatch();
  const [grade, setGrade] = useState('');
  const [contentType, setContentType] = useState('assignment'); // 'assignment' or 'lesson'
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!grade) {
      alert('Please select a grade');
      toast.error('Please select a grade');
      return;
    }
    if (contentType === 'assignment') {

      try {
        
        await dispatch(postGradeAssignment({ grade, assignmentData: { title, content } }));
       toast.success('Assignment posted successfully');
      } catch (error) {
        toast.error(error.message);
        
      }
    } else if (contentType === 'lesson') {
      try {
        
       await dispatch(postGradeLesson({ grade, lessonData: { title, content } }));
        toast.success('Lesson posted successfully');
      } catch (error) {
        toast.error(error.message);
      }
    }
    // Clear fields after submission
    setTitle('');
    setContent('');
  };

  return (
    <div className="h-screen text-center bg-slate-400 text-white flex flex-col justify-center items-center">
      <h2 className='text-sky-600 mt-4 text-2xl font-extrabold  uppercase' >Admin Panel: Post Content by Grade</h2>
      <form className='bg-white rounded-md w-full m-auto max-w-[400px] shadow-lg text-black p-2 flex flex-col ' onSubmit={handleSubmit}>
        <label className='mb-1 text-left font-semibold text-sky-400'>
          Select Grade:
        </label>
          <select className='cursor-pointer p-1 rounded-md shadow-md w-full  bg-slate-700 text-white' value={grade} onChange={(e) => setGrade(e.target.value)} required>
            <option value="">--Select Grade--</option>
            <option value="PRELIM">PRELIM</option>
            <option value="GRADE 1">Grade1</option>
            <option value="GRADE 2">Grade2</option>
            <option value="GRADE 3">Grade3</option>
            <option value="GRADE 4">Grade4</option>
            <option value="GRADE 5">Grade5</option>
            {/* Add more grade options as needed */}
          </select>
        <br />
        <label className='text-left text-sky-400 mb-1 font-semibold' >
          Content Type:
        </label>
          <select className='bg-slate-700 text-white cursor-pointer p-1 rounded-md shadow-lg ' value={contentType} onChange={(e) => setContentType(e.target.value)}>
            <option value="assignment">Assignment</option>
            <option value="lesson">Lesson</option>
          </select>
        <br />
        <label className='text-left text-sky-500 font-semibold mb-1 ' >
          Title:
            </label>
          <input
          className='w-full bg-slate-700 p-1 rounded-md shadow-md text-white font-bold'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        <br />
        <label className='text-left text-sky-500 font-semibold mb-1' >
          Content:
          </label>
          <textarea
            value={content}
            className='text-white bg-slate-700 rounded-md shadow-md p-1'
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
            required
          />
        <br />
        <button className='text-white p-1 cursor-pointer  hover:bg-sky-400 bg-sky-500' type="submit">Post {contentType === 'assignment' ? 'Assignment' : 'Lesson'}</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AdminPanel;
