import Todo from "../models/todoModel.js";

// Create a new todo
export const create = async (req, res) => {
    const { title, description, priority } = req.body;

    // Validate required fields
    if (!title || !description || !priority) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Create a new todo item
        const todo = await Todo.create({
            title,
            description,
            status: "Incomplete", // Default status
            priority,
            owner: req.user // Assumes req.user is set by authentication middleware
        });

        if (!todo) {
            return res.status(500).json({ error: "Failed to create todo." });
        }

        res.status(201).json({
            message: todo
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
};

// Get all todos for the current user
export const get = async (req, res) => {
    try {
        // Find all todos where the owner is the current user
        const getAllTodo = await Todo.find({ owner: req.user._id });

        if (!getAllTodo) {
            return res.status(500).json({ error: "Failed to find a todo." });
        }

        res.status(200).json({
            data: getAllTodo
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
};

// Update the status of a todo item
export const update = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    // Validate input
    if (!id || !value) {
        return res.status(400).json({ error: "Id and value are required." });
    }

    try {
        // Find todo by ID and update its status
        const updateTodo = await Todo.findOneAndUpdate(
            { _id: id },
            { status: value },
            { new: true }
        );

        if (!updateTodo) {
            return res.status(404).json({ error: "Todo not found or failed to update." });
        }

        return res.status(200).json({
            date: updateTodo
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
};

// Delete a todo item
export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    const myId = req.user._id;

    if (!id) {
        return res.status(400).json({ error: "Id is required." });
    }

    try {
        // Delete todo if it belongs to the current user
        const deleteTask = await Todo.findOneAndDelete(
            { _id: id, owner: myId },
            { new: true }
        );

        if (!deleteTask) {
            return res.status(404).json({ error: "Todo not found or failed to delete." });
        }

        return res.status(200).json({
            data: deleteTask
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
};

// Filter todos based on query parameters
export const filter = async (req, res) => {
    if (!req.query) {
        return res.status(400).json({ error: "Filter parameter not available." });
    }

    try {
        // Use $and to combine owner filter with other query filters
        const filterTodos = await Todo.find({
            $and: [{ owner: req.user._id }, req.query]
        });

        if (!filterTodos) {
            return res.status(404).json({ error: "Todo not found." });
        }

        return res.status(200).json({
            data: filterTodos
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
};
