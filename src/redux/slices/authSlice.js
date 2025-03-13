// slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../config/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
// Async thunk for logging in
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      const uid = userCredential.user.uid;
      const user = userCredential.user;

      // Firebase Auth returns photoURL and displayName if set
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
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      // Update the Firebase Auth profile with displayName and photoURL (profileImage)
      await updateProfile(userCredential.user, displayName);
      // In a a real app, you might also store the 'grade' in a Firestore user document.
      const userData = {
        name: displayName,
        uid: userCredential.user.uid,
        grade: grade, // e.g., "Grade1"
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
    user: null ||{} ,
    name: "",
    grade: "",
    group: "",
    part: "",
    age: 0,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    // You can add synchronous actions here if needed.
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    update(state, action){
      async ({ id, userData }, thunkAPI) => {
        try {
          // Update the document with the new data
          await updateDoc(doc(db, 'users', id), userData);
          // Return the updated data (including the user ID)
          return { id, ...userData };
        } catch (error) {
          return thunkAPI.rejectWithValue(error.message);
        }
      }
      state.user = action.payload;
    }
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
        state.name = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //Update User Details 
      .addCase(updateUserDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
       console.log('user updated')
        state.user = action.payload;
        state.status ='succeeded';
        state.name = action.payload.name;
        state.grade = action.payload.grade;
        state.group = action.payload.group;
        state.age = action.payload.age;
        state.part = action.payload.part;
        state.error =  action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
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
      });
  },
});
export const listenForAuthChanges = () => (dispatch) => {
  const authInstance = getAuth();
  onAuthStateChanged(authInstance, async (user) => {
    if (user) {
      // Optionally, fetch additional user details from Firestore:
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        dispatch(setUser({ uid: user.uid, ...userDoc.data() }));
      } else {
        dispatch(setUser({ uid: user.uid, email: user.email }));
      }
    } else {
      dispatch(clearUser());
    }
  });
};
export const { setUser, clearUser, update } = authSlice.actions;
export default authSlice.reducer;
