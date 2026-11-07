// slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../config/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
// Async thunk for logging in
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return { uid, ...userData };
      } else {
        return thunkAPI.rejectWithValue("User data not found in Firestore.");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for registering a new user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { email, password, group, part, phoneNum, age, displayName, grade, imageUrl },
    thunkAPI
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      const userData = {
        name: displayName,
        uid: userCredential.user.uid,
        grade,
        email: userCredential.user.email,
        group: group,
        imageUrl: imageUrl,
        age: age,
        number: phoneNum,
        part: part,
      };

      // const gradeDocRef = doc(db, 'grades', grade);
      // await updateDoc(gradeDocRef, {
      //   userIds: arrayUnion(userData.uid),
      // });
      await setDoc(doc(db, "users", userCredential.user.uid), userData);

      return { uid: userCredential.user.uid, ...userData };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for logging out
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      return {};
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateUserDetails = createAsyncThunk(
  "users/updateUserDetails",
async ({ id, userData }, thunkAPI) => {
  try {
    await updateDoc(doc(db, "users", id), userData);
    return { id, ...userData };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }

});


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    name: "",
    grade: "",
    group: "",
    part: "",
    age: 0,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    authReady: false,
  },
  reducers: {
    // You can add synchronous actions here if needed.
    setUser(state, action) {
      state.user = action.payload;
      state.authReady = true;
    },
    clearUser(state) {
      state.user = null;
      state.authReady = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.authReady = true;
        state.name = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.authReady = true;
      })
      //Update User Details 
      .addCase(updateUserDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.status = "succeeded";
        state.name = state.user.name;
        state.grade = state.user.grade;
        state.group = state.user.group;
        state.age = state.user.age;
        state.part = state.user.part;
        state.error = null;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.authReady = true;
        state.name = action.payload.name;
        state.grade = action.payload.grade;
        state.group = action.payload.group;
        state.part = action.payload.part;
        state.age = action.payload.age;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.authReady = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const listenForAuthChanges = () => (dispatch) => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          dispatch(setUser({ uid: user.uid, ...userDoc.data() }));
        } else {
          dispatch(setUser({ uid: user.uid, email: user.email }));
        }
      } catch (error) {
        console.error("Unable to load signed-in user data:", error);
        dispatch(setUser({ uid: user.uid, email: user.email }));
      }
    } else {
      dispatch(clearUser());
    }
  });
  return unsubscribe;
};
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
