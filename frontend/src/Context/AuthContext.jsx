
import React, { useState, useEffect, createContext } from 'react';
import { auth } from '../../firebase-config';
import { onAuthStateChanged, signOut, deleteUser } from 'firebase/auth';
import getUser from '../Requests/GetUser';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        try {
          const response = await getUser(user.email);
          if (response.status === 404) {
            console.warn('Ghost user detected: Firebase user exists, but no corresponding user in the database.');
            await deleteUser(user);
            await signOut(auth);
            setCurrentUser(null);
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.warn('Ghost user detected: Firebase user exists, but no corresponding user in the database.');
            try {
              await deleteUser(user);
              await signOut(auth);
              setCurrentUser(null);
            } catch (deleteError) {
              console.error('Error deleting ghost user:', deleteError);
            }
          } else {
            console.error('Error checking for ghost user:', error);
          }
        }
      }
    });
    return unsubscribe;
  }, []);

  const value = { currentUser };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
