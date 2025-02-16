// slices/assignmentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../config/firebaseconfig';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Create an assignment
export const createAssignment = createAsyncThunk(
  'assignments/createAssignment',
  async (assignmentData) => {
    // assignmentData might be { grade, tittle, content }
    const docRef = await addDoc(collection(db, 'assignments'), assignmentData);
    return { id: docRef.id, ...assignmentData };
  }
);

// Fetch assignments
export const fetchAssignments = createAsyncThunk(
  'assignments/fetchAssignments',
  async () => {
    const querySnapshot = await getDocs(collection(db, 'assignments'));
    const assignments = [];
    querySnapshot.forEach((docSnap) => {
      assignments.push({ id: docSnap.id, ...docSnap.data() });
    });
    return assignments;
  }
);

// Update an assignment
export const updateAssignment = createAsyncThunk(
  'assignments/updateAssignment',
  async ({ id, assignmentData }) => {
    const assignmentDocRef = doc(db, 'assignments', id);
    await updateDoc(assignmentDocRef, assignmentData);
    return { id, ...assignmentData };
  }
);

// Delete an assignment
export const deleteAssignment = createAsyncThunk(
  'assignments/deleteAssignment',
  async (id) => {
    await deleteDoc(doc(db, 'assignments', id));
    return id;
  }
);

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createAssignment.pending, state => { state.status = 'loading'; })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(createAssignment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAssignments.pending, state => { state.status = 'loading'; })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default assignmentsSlice.reducer;
