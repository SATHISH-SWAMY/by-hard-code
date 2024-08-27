import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTask, updateTask } from "./api/GlobalApi";
import { UserContext } from "./context/ContextProvider";

const TaskForm = ({ handleClose, fetchTasks}) => {
  // Destructure values and setters from UserContext
  const {
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
    update,  // Boolean to determine if the form is in update mode
    id, // Task ID for updating an existing task
  } = useContext(UserContext);  // Use context to access global state


  // Handle form submission for creating a new task
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
     // Check if required fields are filled
    if (title && description && isImportant !== undefined) {
      try {
        await createTask({ title, date, description, isCompleted, isImportant });
        fetchTasks(); // Fetch tasks after creation
        handleClose(); // Close form if creation is successful
      } catch (error) {
        console.error("Error creating task:", error);  // Log any errors
      }
    }
  };

  // Handle task update if the form is in update mode
  const handleUpdate = async () => {

      // Check if required fields are filled
    if (title && description && isImportant !== undefined) {
      try {
         // Update the existing task with the new values
        await updateTask(id, {
          title,
          description,
          isCompleted,
          isImportant,
        });

        handleClose(); // Close form if update is successful
        window.location.reload();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  return (
    <div>
      <Box
        component="form" // Declare the component as a form
        onSubmit={handleSubmit}// Handle form submission
        sx={{
          "& > :not(style)": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off" // Disable auto-complete for the form
      >
        <TextField
          id="title" // ID for the title field
          label="Title" // Label for the title field
          variant="outlined" // Outlined variant for styling
          value={title} // Bind the title value from context
          onChange={(e) => setTitle(e.target.value)} // Update title in context on change
          required
        />
        {/* Render DatePicker only if not in update mode */}
        {!update && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Date"
                value={date} // Label for the date picker
                onChange={(newDate) => setDate(newDate)}  // Bind the date value from context
                required
              />
            </DemoContainer>
          </LocalizationProvider>
        )}
        <TextField
          id="description" // ID for the description field
          label="Description" // Label for the description field
          variant="outlined" // Outlined variant for styling
          value={description} // Bind the description value from context
          onChange={(e) => setDescription(e.target.value)} // Update description in context on change
          required
        />
        <RadioGroup
          aria-labelledby="priority-label"
          value={isImportant}
          onChange={(e) => setIsImportant(e.target.value === "true")}
          required
        >
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="Mark as important"
          />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="Not important"
          />
        </RadioGroup>
        <RadioGroup
          aria-labelledby="completed-label"
          value={isCompleted}
          onChange={(e) => setIsCompleted(e.target.value === "true")}
          required
        >
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="Mark as completed"
          />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="Not completed"
          />
        </RadioGroup>
        {update ? (
          <Button
            type="button"
            variant="contained"
            color="warning"
            onClick={handleUpdate}
          >
            Update Task
          </Button>
        ) : (
          <Button
          type="submit" // Submit type for creating a new task
          variant="contained" // Contained button style
          color="primary" // Primary color for add
          >
            Add Task
          </Button>
        )}
      </Box>
    </div>
  );
};

export default TaskForm;
