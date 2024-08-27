import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks'; // Replace with your actual (http://localhost:8080/api/tasks) backend URL


// Function to get all tasks from the server
export const getTasks = async () => {
  try {
     // Make a GET request to the API to fetch all tasks
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    // Log and rethrow any errors that occur during the request
    console.error('Error fetching tasks:', error);
    throw error;
  }
};


// Function to get a single task by its ID from the server
export const getTaskById = async (id) => {
  try {
     // Make a GET request to fetch a task by its ID
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // Return the specific task data
  } catch (error) {
    // Log and rethrow any errors that occur during the request
    console.error(`Error fetching task with id ${id}:`, error);
    throw error;
  }
};


// Function to create a new task on the server
export const createTask = async (task) => {
  try {
    // Make a POST request to create a new task
    const response = await axios.post(API_URL, task);
    return response.data;// Return the created task data
  } catch (error) {
     // Log and rethrow any errors that occur during the request
    console.error('Error creating task:', error);
    throw error;
  }
};

// Function to update an existing task by its ID
export const updateTask = async (id, task) => {
  try {
     // Make a PUT request to update the task with the specified ID
    const response = await axios.put(`${API_URL}/${id}`, task);
    return response.data; // Return the updated task data
  } catch (error) {
     // Log and rethrow any errors that occur during the request
    console.error(`Error updating task with id ${id}:`, error);
    throw error;
  }
};

// Function to delete a task by its ID from the server
export const deleteTask = async (id) => {
  try {
     // Make a DELETE request to remove the task with the specified ID
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;// Return confirmation of deletion
  } catch (error) {
     // Log and rethrow any errors that occur during the request
    console.error(`Error deleting task with id ${id}:`, error);
    throw error;
  }
};
