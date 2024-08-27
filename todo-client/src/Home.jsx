import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TaskForm from "./TaskForm";
import ClearIcon from "@mui/icons-material/Clear";
import BasicCard from "./Card";
import { getTasks, deleteTask } from "./api/GlobalApi";

const drawerWidth = 240;

// Transition component for the Dialog (Add Task)

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
     //Add Task Dialog box
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

function Home(props) {
   // State variables
   const [open, setOpen] = React.useState(false); // Dialog open state
   const [mobileOpen, setMobileOpen] = useState(false); // Mobile drawer open state
   const [isClosing, setIsClosing] = useState(false); // Drawer closing state
   const [heading, setHeading] = useState("All Task"); // Current heading
   const [selectedIndex, setSelectedIndex] = useState(0); // Selected list item index
   const [tasks, setTasks] = useState([]); // List of tasks
   const [filter, setFilter] = useState(""); // Task filter state


 // Function to open the Add Task dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the Add Task dialog
  const handleClose = () => {
    setOpen(false);
  };

   // Function to close the drawer
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

   // Handle the end of drawer closing transition
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

   // Toggle the drawer open/close state
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

   // Handle list item click and set the corresponding filter

  const handleListItemClick = (index, heading) => {
    setSelectedIndex(index);
    setHeading(heading);
    switch (heading) {
      case "All task":
        setFilter("");
        break;
      case "Important tasks":
        setFilter("important");
        break;
      case "Completed tasks":
        setFilter("completed");
        break;
      case "Uncompleted tasks":
        setFilter("uncompleted");
        break;
      default:
        setFilter("");
        break;
    }
  };

   // Function to fetch tasks from the API and apply the selected filter
  const fetchTasks = async () => {
    try {
      const response = await getTasks();  // Fetch tasks from API
      if (filter === "important") {
        setTasks(response.filter(task => task.isImportant));  // Filter important tasks
      } else if (filter === "completed") {
        setTasks(response.filter(task => task.isCompleted));  // Filter completed tasks
      } else if (filter === "uncompleted") {
        setTasks(response.filter(task => !task.isCompleted)); // Filter uncompleted tasks
      } else {
        setTasks(response); // Set all tasks
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);  // Handle fetch error
    }
  };

   // Fetch tasks whenever the filter changes
 useEffect(() => {
    fetchTasks();
  }, [filter]); // Fetch tasks whenever the filter changes

// Handle task deletion
  const handleDelete = async (id) => {
    try {
      await deleteTask(id); // Call API to delete task
      fetchTasks();  // Refresh tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error);  // Handle delete error
    }
  };


  // Handle task update (currently just logs the task)
  const handleUpdate = async (task) => {
    console.log("Update task:", task);
  };


   // Drawer content with list of task categories
  const drawer = (
    <div>
      <Toolbar className="flex flex-col gap-2 my-2">
        <Typography className="text-center" variant="h5">
          To-do list
        </Typography>
        <Button className="w-full" variant="contained" onClick={handleClickOpen}>
          Add Task
        </Button>
      </Toolbar>
      <Divider />
      <List>
        {[
          "All task",
          "Important tasks",
          "Completed tasks",
          "Uncompleted tasks",
        ].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => handleListItemClick(index, text)}
            className={selectedIndex === index ? "bg-[#9667e8] text-white" : ""}
          >
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );


 // Determine the container for the drawer (used for mobile responsiveness)
  const container =
    props.window !== undefined ? () => props.window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {heading}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <div className=" flex flex-wrap w-full gap-5 justice-arround">
          {tasks.map((task) => (
            <BasicCard
              key={task._id}
              task={task}
              onDelete={handleDelete} // Pass delete handler to the card
              onUpdate={handleUpdate} // Pass update handler to the card
              handleClickOpen={handleClickOpen} // Pass the dialog open handler to the card
            />
          ))}
        </div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className="flex justify-between">
            <Typography variant="h6">Add Task</Typography>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <TaskForm handleClose={handleClose} fetchTasks={fetchTasks} />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}

Home.propTypes = {
  window: PropTypes.func,
};

export default Home;
