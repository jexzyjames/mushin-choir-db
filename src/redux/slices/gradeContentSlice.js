import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../config/firebaseconfig';
import { doc, updateDoc, getDocs, getDoc,collection,query,where, arrayUnion } from 'firebase/firestore';
import { useSelector } from 'react-redux';


// Post an assignment for a given grade
export const postGradeAssignment = createAsyncThunk(
  'gradeContent/postAssignment',
  async ({ grade, assignmentData }) => {
    const user = useSelector((state)=> state.auth.user);
     grade = user.grade
    // grade: e.g., "Grade1"
    const gradeDocRef = doc(db, 'grades', grade);
    await updateDoc(gradeDocRef, {
      assignments: arrayUnion(assignmentData)
    });
    return assignmentData;
  }
);

export const getgradeAssignment = createAsyncThunk(
  'gradeContent/getAssignment',
  async () => {
   const q = query(collection(db, 'grades'), where('assignments', 'array-contains', true));
    const querySnapshot = await getDocs(q);
    const assignments = [];
    querySnapshot.forEach((docSnap) => {
      assignments.push({ id: docSnap.id,...docSnap.data() });
    });
    return assignments;

  }
);



// Post a lesson for a given grade
export const postGradeLesson = createAsyncThunk(
  'gradeContent/postLesson',
  async ({ grade, lessonData }) => {
    const user = useSelector((state)=> state.auth.user);
    grade= user.grade
    const gradeDocRef = doc(db, 'grades', grade);
    await updateDoc(gradeDocRef, {
      lessons: arrayUnion(lessonData)
    });
    return lessonData;
  }
);
export const getgradesLessons = createAsyncThunk(
  'gradeContent/getLessons',
  async (grade, thunkAPI) => {
    try {
      const gradeDocRef = doc(db, 'grades', grade);
      const gradeDoc = await getDoc(gradeDocRef);
      if (gradeDoc.exists()) {
        return { grade, ...gradeDoc.data() };
      } else {
        return thunkAPI.rejectWithValue('No data found for this grade');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }

)
export const addAssignment = createAsyncThunk(
  'gradeContent/addAssignment',
  async ({ userGrade, assignment }, thunkAPI) => {
    try {
      const gradeDocRef = doc(db, 'grades', userGrade);
      await updateDoc(gradeDocRef, {
        assignments: arrayUnion(assignment)
      });
      return assignment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const gradeContentSlice = createSlice({
  name: 'gradeContent',
  initialState: {assign: [], gradeData:null, gradeAssignmentss:{}, assignments: [], lessons: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postGradeAssignment.fulfilled, (state, action) => {
        state.assignments.push(action.payload);
      })
     
      .addCase(addAssignment.fulfilled, (state, action) => {
        state.assignments.push(action.payload);
      })
      .addCase(postGradeLesson.fulfilled, (state, action) => {
        state.lessons.push(action.payload);
      })
      .addCase(getgradesLessons.fulfilled, (state, action) => {
        state.gradeData= action.payload;
        state.status ='succeeded';
        state.error = null;
      })
     .addCase(getgradeAssignment.fulfilled, (state, action) => {
      state.assign.push(...action.payload);
      state.assignments = action.payload;
      state.gradeAssignments = action.payload;
       state.status ='succeeded';
       state.error = null;
  });
  },
});

export default gradeContentSlice.reducer;
