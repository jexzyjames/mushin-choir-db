// slices/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, functions } from '../../config/firebaseconfig';

// Create a user (C)
export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData) => {
    // userData might be { name, grade, number, part, district, group, profileImage }
    const docRef = await addDoc(collection(db, 'users'), userData);
    return { id: docRef.id, ...userData };
  }
);

// Fetch users (R)
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = [];
    querySnapshot.forEach((docSnap) => {
      users.push({ ...docSnap.data(), id: docSnap.id });
    });
    return users;
  }
);

// Update a user (U)
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }) => {
    const userDocRef = doc(db, 'users', id);
    await updateDoc(userDocRef, userData);
    return { id, ...userData };
  }
);

// Delete a user (D)
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async ({ uid, profileId }, thunkAPI) => {
    try {
      const deleteUserAccount = httpsCallable(functions, 'deleteUserAccount');
      await deleteUserAccount({ uid, profileId });
      return profileId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createUser.pending, state => { state.status = 'loading'; })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
     
      
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'deleting';
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default usersSlice.reducer;
