import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postGradeAssignment, getgradeAssignment, postGradeLesson } from '../redux/slices/gradeContentSlice';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../config/firebaseconfig'; 
function GradeContentForm() {
  const dispatch = useDispatch();
  const userGrade = useSelector(state => state.auth.user?.grade);
  const [assignments, setAssignments] = useState([]);
  const [lessons, setLessons] = useState([]);
  const assignmentsData = useSelector(state => state.gradeContent.gradeAssignment );
  const assign = useSelector(state => state.gradeContent.assign);
  const lessonsData = useSelector(state => state.gradeContent.lessons);
  const [assignmentId, setAssignmentId] = useState('');
  const [lessonId, setLessonId] = useState('');

  useEffect(() => {
    dispatch(getgradeAssignment({ grade: userGrade }, assignments => setAssignments(assignments)  ));
    console.log(assignmentsData, assignments);
  }, [dispatch, userGrade]);
  
  useEffect(() => {
    setLessons(lessonsData.filter(l => l.grade === userGrade));
  }, [lessonsData, userGrade]);


  const handleAssignmentSelect = (id) => {
    setAssignmentId(id);
  };
  const handleLessonSelect = (id) => {
    setLessonId(id);
  };

  const[title, setTitle] = useState('');
  const[content, setContent] = useState('');
 const [val, setVal] = useState({
  
   assignments : {
  title: title,
    content: content
   },

   lessons: {
    title: '',
    content: ''
   }

 });



 const setFirebaseDoc = async (e) => {
  e.preventDefault()
  try {
    await setDoc(doc(db, 'grades', userGrade), val);
    console.log('Document successfully written!');
  }
  catch (error) {
    console.error('Error writing document: ', error);
  }

 }
  // Add new assignment form


  
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentContent, setAssignmentContent] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonContent, setLessonContent] = useState('');

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    if (!userGrade) {
      alert("User grade not set");
      return;
    }
    const newAssignment = {
      title: assignmentTitle,
      content: assignmentContent,
    };
    dispatch(postGradeAssignment({ grade: userGrade, assignmentData: newAssignment }));
    setAssignmentTitle('');
    setAssignmentContent('');
  };

  const handleLessonSubmit = (e) => {
    e.preventDefault();
    if (!userGrade) {
      alert("User grade not set");
      return;
    }
    const newLesson = {
      title: lessonTitle,
      content: lessonContent,
    };
    dispatch(postGradeLesson({ grade: userGrade, lessonData: newLesson }));
    setLessonTitle('');
    setLessonContent('');
  };

  return (
    <div>
      <h2>Post Content for Grade {userGrade}</h2>

      <form onSubmit={setFirebaseDoc} >

        <label htmlFor="">Assignment Title</label>
        <input value={val.assignments.title}  onChange={
          e => setVal(prev => ({
            ...prev,
            assignments: {
              ...prev.assignments,
              title: e.target.value,
            }
          }))
      
        } type="text" />
        <label htmlFor="">Assignment Content</label>
        <input value={val.assignments.content}  onChange={
          e => setVal(prev => ({
            ...prev,
            assignments: {
              ...prev.assignments,
              content: e.target.value,
            }
          }))
        } type="text" />



<label htmlFor="">Content Title</label>
        <input value={val.lessons.title}  onChange={
          e => setVal(prev => ({
            ...prev,
            lessons: {
              ...prev.lessons,
              title: e.target.value,
            }
          }))
      
        } type="text" />
        <label htmlFor="">Content Content</label>
        <input value={val.lessons.content}  onChange={
          e => setVal(prev => ({
            ...prev,
            lessons: {
              ...prev.lessons,
              content: e.target.value,
            }
          }))
        } type="text" />




        <button type="submit">Save</button>
        <h3>Preview</h3>
        <p>
          <strong>Assignments Title:</strong> {val.assignments.title}
        </p>
        <p>
          <strong>Content Title:</strong> {val.lessons.title}
        </p>
        <p>
          <strong>Assignment Content:</strong> {val.assignments.content}
        </p>

        <p>
          <strong>Content Content:</strong> {val.lessons.content}
        </p>

      </form>

      {assignments.map((a)=>{
            return(
              <div key={a.id}>
            <p className='text-purple-500 font-bold uppercase' > Title: {a.title} </p>
            <p className='text-purple-500 font-bold uppercase' > Content: {a.content} </p>

              </div>
            )
          } )}

<p className='text-purple-500 font-bold uppercase' > Title: {assignmentsData?.title} </p>
<p className='text-purple-500 font-bold uppercase' > Content: {assignmentsData?.content} </p>

      {
        assign.length > 0 && (
          <div>
            <h3>Select Lesson</h3>
            <ul>
              {lessons.map((lesson) => (
                <li key={lesson.id}>
                  <button onClick={() => handleLessonSelect(lesson.id)}>
                    {lesson.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )

      }

      {
        assignmentsData  && (
          <div>
            <h3>Select Assignment</h3>

          {assignmentsData.map((a)=>{
            return(
              <>
            <p> Title: {a.title} </p>
            <p> Content: {a.content} </p>

              </>
            )
          } )}


              
            

           
          </div>
          )}
        {assignmentId && (
          <div>
            <h3>Assignment Details</h3>
            <p>Title: {assignments.find((a) => a.id === assignmentId)?.title}</p>
            <p>Content: {assignments.find((a) => a.id === assignmentId)?.content}</p>
          </div>
        )}


      


      <div>
        <h3>Post Assignment</h3>
        <form onSubmit={handleAssignmentSubmit}>
          <input
            type="text"
            placeholder="Assignment Title"
            value={assignmentTitle}
            onChange={(e) => setAssignmentTitle(e.target.value)}
            required
          />
          <br />
          <textarea
            placeholder="Assignment Content"
            value={assignmentContent}
            onChange={(e) => setAssignmentContent(e.target.value)}
            required
          />
          <br />
          <button type="submit">Post Assignment</button>
        </form>
      </div>
      <div>
        <h3>Post Lesson</h3>
        <form onSubmit={handleLessonSubmit}>
          <input
            type="text"
            placeholder="Lesson Title"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            required
          />
          <br />
          <textarea
            placeholder="Lesson Content"
            value={lessonContent}
            onChange={(e) => setLessonContent(e.target.value)}
            required
          />
          <br />
          <button type="submit">Post Lesson</button>
        </form>
      </div>
    </div>
  );
}

export default GradeContentForm;
