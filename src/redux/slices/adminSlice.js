// slices/gradeContentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, arrayUnion, runTransaction } from 'firebase/firestore';
import { db } from '../../config/firebaseconfig';

// Thunk to add an assignment to a grade document
export const postGradeAssignment = createAsyncThunk(
  'gradeContent/postGradeAssignment',
  async ({ grade, assignmentData }, thunkAPI) => {
    try {
      const gradeDocRef = doc(db, 'grades', grade);
      await setDoc(gradeDocRef, {
        assignments: arrayUnion(assignmentData)
      }, { merge: true });
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
      await setDoc(gradeDocRef, {
        lessons: arrayUnion(lessonData)
      }, { merge: true });
      return lessonData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateGradeContent = createAsyncThunk(
  'gradeContent/update',
  async ({ grade, contentType, contentIndex, contentData }, thunkAPI) => {
    try {
      const field = contentType === 'lesson' ? 'lessons' : 'assignments';
      const gradeRef = doc(db, 'grades', grade);

      await runTransaction(db, async (transaction) => {
        const gradeSnapshot = await transaction.get(gradeRef);
        if (!gradeSnapshot.exists()) {
          throw new Error('The selected grade could not be found.');
        }

        const gradeData = gradeSnapshot.data();
        const items = Array.isArray(gradeData[field]) ? [...gradeData[field]] : [];
        if (!Number.isInteger(contentIndex) || !items[contentIndex]) {
          throw new Error('This content no longer exists. Refresh and try again.');
        }

        items[contentIndex] = { ...items[contentIndex], ...contentData };
        transaction.update(gradeRef, { [field]: items });
      });

      return { grade, contentType, contentIndex, contentData };
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
