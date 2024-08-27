import { createContext, useState } from "react";


// Create a new context called UserContext with an empty object as the default value
export const UserContext = createContext({});

const ContextProvider = ({ children }) => {

  // Define various state variables to hold the data for the context
  const [title, setTitle] = useState(""); // Stores the title of the task
  const [date, setDate] = useState(null); // Stores the date of the task
  const [description, setDescription] = useState(""); // Stores the description of the task
  const [isCompleted, setIsCompleted] = useState(false); // Stores whether the task is completed or not
  const [isImportant, setIsImportant] = useState(false); // Stores whether the task is marked as important or not
  const [update, setUpdate] = useState(false); // Stores whether the task is in update mode or not
  const [id, setID] = useState(null); // Stores the ID of the task (if available)

  return (
    // Provide the context to the children components
    <UserContext.Provider
      value={{
        title,
        setTitle,
        date,
        setDate,
        description,
        setDescription,
        isCompleted,
        setIsCompleted,
        isImportant,
        setIsImportant,
        id,
        setID,
        update,
        setUpdate
      }}>
      {children}
    </UserContext.Provider>
  );
};

// Export the ContextProvider component for use in other parts of the app

export default ContextProvider;
