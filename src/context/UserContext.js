import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [likedProperties, setLikedProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [contactedProperties, setContactedProperties] = useState([]);
  const [bookedVisits, setBookedVisits] = useState([]);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedLiked = localStorage.getItem('likedProperties');
    const storedSaved = localStorage.getItem('savedProperties');
    const storedContacted = localStorage.getItem('contactedProperties');
    const storedBooked = localStorage.getItem('bookedVisits');

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      // Load user-specific data if user email exists
      if (userData.email) {
        const userContacted = localStorage.getItem(`contactedProperties_${userData.email}`);
        const userBooked = localStorage.getItem(`bookedVisits_${userData.email}`);
        
        if (userContacted) {
          setContactedProperties(JSON.parse(userContacted));
        } else if (storedContacted) {
          setContactedProperties(JSON.parse(storedContacted));
        }
        
        if (userBooked) {
          setBookedVisits(JSON.parse(userBooked));
        } else if (storedBooked) {
          setBookedVisits(JSON.parse(storedBooked));
        }
      }
    }
    
    if (storedLiked) {
      setLikedProperties(JSON.parse(storedLiked));
    }
    if (storedSaved) {
      setSavedProperties(JSON.parse(storedSaved));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Load user-specific data
    if (userData.email) {
      const userLiked = localStorage.getItem(`likedProperties_${userData.email}`);
      const userSaved = localStorage.getItem(`savedProperties_${userData.email}`);
      const userContacted = localStorage.getItem(`contactedProperties_${userData.email}`);
      const userBooked = localStorage.getItem(`bookedVisits_${userData.email}`);
      
      if (userLiked) setLikedProperties(JSON.parse(userLiked));
      if (userSaved) setSavedProperties(JSON.parse(userSaved));
      if (userContacted) setContactedProperties(JSON.parse(userContacted));
      if (userBooked) setBookedVisits(JSON.parse(userBooked));
    }
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Initialize empty arrays for new user
    setLikedProperties([]);
    setSavedProperties([]);
    setContactedProperties([]);
    setBookedVisits([]);
  };

  const logout = () => {
    setUser(null);
    setLikedProperties([]);
    setSavedProperties([]);
    setContactedProperties([]);
    setBookedVisits([]);
    localStorage.removeItem('user');
    localStorage.removeItem('likedProperties');
    localStorage.removeItem('savedProperties');
    localStorage.removeItem('contactedProperties');
    localStorage.removeItem('bookedVisits');
    // Note: We don't remove 'allUsers' and 'userActivities' to preserve admin data
  };

  const toggleLike = (propertyId) => {
    setLikedProperties((prev) => {
      const newLiked = prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId];
      localStorage.setItem('likedProperties', JSON.stringify(newLiked));
      // Also store with user email for admin tracking
      if (user && user.email) {
        localStorage.setItem(`likedProperties_${user.email}`, JSON.stringify(newLiked));
      }
      return newLiked;
    });
  };

  const toggleSave = (propertyId) => {
    setSavedProperties((prev) => {
      const newSaved = prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId];
      localStorage.setItem('savedProperties', JSON.stringify(newSaved));
      // Also store with user email for admin tracking
      if (user && user.email) {
        localStorage.setItem(`savedProperties_${user.email}`, JSON.stringify(newSaved));
      }
      return newSaved;
    });
  };

  const addContactedProperty = (propertyId, propertyTitle, ownerName, message) => {
    const contactData = {
      propertyId,
      propertyTitle,
      ownerName,
      message,
      date: new Date().toISOString()
    };
    setContactedProperties((prev) => {
      const newContacted = [...prev, contactData];
      localStorage.setItem('contactedProperties', JSON.stringify(newContacted));
      // Also store with user email for admin tracking
      if (user) {
        localStorage.setItem(`contactedProperties_${user.email}`, JSON.stringify(newContacted));
      }
      return newContacted;
    });
  };

  const addBookedVisit = (propertyId, propertyTitle, ownerName, date, time) => {
    const bookingData = {
      propertyId,
      propertyTitle,
      ownerName,
      date,
      time,
      bookedOn: new Date().toISOString()
    };
    setBookedVisits((prev) => {
      const newBooked = [...prev, bookingData];
      localStorage.setItem('bookedVisits', JSON.stringify(newBooked));
      // Also store with user email for admin tracking
      if (user) {
        localStorage.setItem(`bookedVisits_${user.email}`, JSON.stringify(newBooked));
      }
      return newBooked;
    });
  };

  const isLiked = (propertyId) => likedProperties.includes(propertyId);
  const isSaved = (propertyId) => savedProperties.includes(propertyId);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        likedProperties,
        savedProperties,
        contactedProperties,
        bookedVisits,
        toggleLike,
        toggleSave,
        isLiked,
        isSaved,
        addContactedProperty,
        addBookedVisit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
