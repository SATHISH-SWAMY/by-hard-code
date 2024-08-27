import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";
import { UserContext } from "./context/ContextProvider";

// Functional component that displays a card with task details

export default function BasicCard({
  task,
  onDelete,
  onUpdate,
  handleClickOpen,
}) {

   // Accessing context values and functions for managing task updates
  const {
    setTitle,
    id,
    setID,
    setDescription,
    setIsCompleted,
    setIsImportant,
    setUpdate,
  } = React.useContext(UserContext);

  // State variables to manage local state for task completion and importance

  const [complete, setComplete] = React.useState(task?.isCompleted);
  const [important, setImportant] = React.useState(task?.isImportant);

  // Function to handle task deletion

  const handleDelete = () => {
    if (onDelete) {
      onDelete(task._id);  // Call the onDelete function with the task ID
    }
  };


   // Function to handle task update and open the dialog

  const handleUpdate = () => {
    setUpdate(true); // Set the update state to true
    setTitle(task?.title); // Set the title in context
    setDescription(task?.description); // Set the description in context
    setIsCompleted(task?.isCompleted); // Set completion status in context
    setIsImportant(task?.priority); // Set importance in context
    setID(task._id); // Set the current task ID in context

    if (onUpdate) {
      onUpdate(task); // Call the onUpdate function with the task object
    }

    handleClickOpen(); // Open the dialog for editing the task
  };

  // Format date to dd/MM/yyyy
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy'); // Convert date to desired format
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent className="bg-[#7C3AED] text-white min-h-[150px]">
        <Typography sx={{ fontSize: 20 }} gutterBottom>
          {task?.title}
        </Typography>
        <Typography variant="body2" className="text-gray-200">
          {task?.description}
          <br />
        </Typography>
        <br />
        <br />
        <Typography sx={{ fontSize: 16 }} gutterBottom>
          {formatDate(task?.date)}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between">
        <div>
          <Button
            variant="contained"
            color={complete ? "success" : "secondary"}
            size="small"
          >
            {complete ? "Completed" : "UnCompleted"}
          </Button>
        </div>

        
        <div className="flex gap-2">
          {important ? (
            <StarIcon className="cursor-pointer" />
          ) : (
            <StarBorderIcon className="cursor-pointer" />
          )}

          
          {/* DeleteIcon  */}
          <DeleteIcon
            className="cursor-pointer"
            onClick={handleDelete}
          />

          {/* EditIcon  */}
          <EditIcon
            className="cursor-pointer"
            onClick={handleUpdate}
          />
        </div>
      </CardActions>
    </Card>
  );
}
