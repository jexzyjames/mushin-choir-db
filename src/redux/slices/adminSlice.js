// slices/gradeContentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/firebaseconfig';

// Thunk to add an assignment to a grade document
export const postGradeAssignment = createAsyncThunk(
  'gradeContent/postGradeAssignment',
  async ({ grade, assignmentData }, thunkAPI) => {
    try {
      const gradeDocRef = doc(db, 'grades', grade);
      await updateDoc(gradeDocRef, {
        assignments: arrayUnion(assignmentData)
      });
      return assignmentData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk to add a lesson to a grade document
export const postGradeLesson = createAsyncThunk(
  'gradeContent/postGradeLesson',
  async ({ grade, lessonData }, thunkAPI) => {
    try {
      const gradeDocRef = doc(db, 'grades', grade);
      await updateDoc(gradeDocRef, {
        lessons: arrayUnion(lessonData)
      });
      return lessonData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const gradeContentSlice = createSlice({
  name: 'gradeContent',
  initialState: {
    assignments: [],
    lessons: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postGradeAssignment.fulfilled, (state, action) => {
        state.assignments.push(action.payload);
      })
      .addCase(postGradeLesson.fulfilled, (state, action) => {
        state.lessons.push(action.payload);
      });
  },
});

export default gradeContentSlice.reducer;
