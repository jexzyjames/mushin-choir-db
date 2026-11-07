import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebaseconfig";

export const postGradeAssignment = createAsyncThunk(
  "gradeContent/postAssignment",
  async ({ grade, assignmentData }, thunkAPI) => {
    try {
      await updateDoc(doc(db, "grades", grade), {
        assignments: arrayUnion(assignmentData),
      });
      return assignmentData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getgradeAssignment = createAsyncThunk(
  "gradeContent/getAssignment",
  async (_, thunkAPI) => {
    try {
      const snapshot = await getDocs(collection(db, "grades"));
      return snapshot.docs
        .map((gradeDoc) => ({ id: gradeDoc.id, ...gradeDoc.data() }))
        .filter((grade) => Array.isArray(grade.assignments) && grade.assignments.length);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postGradeLesson = createAsyncThunk(
  "gradeContent/postLesson",
  async ({ grade, lessonData }, thunkAPI) => {
    try {
      await updateDoc(doc(db, "grades", grade), {
        lessons: arrayUnion(lessonData),
      });
      return lessonData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getgradesLessons = createAsyncThunk(
  "gradeContent/getLessons",
  async (grade, thunkAPI) => {
    try {
      const gradeDoc = await getDoc(doc(db, "grades", grade));
      if (!gradeDoc.exists()) {
        return { grade, lessons: [], assignments: [] };
      }
      return { grade, ...gradeDoc.data() };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addAssignment = createAsyncThunk(
  "gradeContent/addAssignment",
  async ({ userGrade, assignment }, thunkAPI) => {
    try {
      await updateDoc(doc(db, "grades", userGrade), {
        assignments: arrayUnion(assignment),
      });
      return assignment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const gradeContentSlice = createSlice({
  name: "gradeContent",
  initialState: {
    gradeData: null,
    assignments: [],
    lessons: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getgradesLessons.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getgradesLessons.fulfilled, (state, action) => {
        state.gradeData = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getgradesLessons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(getgradeAssignment.fulfilled, (state, action) => {
        state.assignments = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getgradeAssignment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(postGradeAssignment.fulfilled, (state, action) => {
        state.assignments.push(action.payload);
      })
      .addCase(addAssignment.fulfilled, (state, action) => {
        state.assignments.push(action.payload);
      })
      .addCase(postGradeLesson.fulfilled, (state, action) => {
        state.lessons.push(action.payload);
      });
  },
});

export default gradeContentSlice.reducer;
