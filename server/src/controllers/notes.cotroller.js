import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Note } from "../models/notes.model.js";
import mongoose from "mongoose";

const createNote = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  console.log(title, description);

  // TODO: trim function for description and title

  if (!title || !description) {
    throw new ApiError(400, "Title and description must be provided");
  }

  const note = await Note.create({
    title,
    description,
    admin: req.user?._id,
  });

  if (!note) {
    throw new ApiError(500, "Server Failed to create note! Try again");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, note, "Note created successfully!"));
});

const updateNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "title and description must be provided");
  }

  const existedNote = await Note.findById(noteId);

  if (!existedNote) {
    throw new ApiError(404, "Note not found");
  }

  const updatedNote = await Note.findByIdAndUpdate(
    noteId,
    {
      $set: {
        title,
        description,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedNote) {
    throw new ApiError(500, "Server Failed to update note");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedNote, "Note updated!"));
});

const deleteNote = asyncHandler(async (req, res) => {
  console.log(req.params.noteId);
  const noteId = new mongoose.Types.ObjectId(req.params.noteId);

  if (!noteId) {
    throw new ApiError(400, "noteId not specified");
  }

  const existingNote = await Note.findById(noteId);

  if (!existingNote) {
    throw new ApiError(404, "Note not found");
  }

  const deletedNote = await Note.findByIdAndDelete(noteId);

  if (!deletedNote) {
    throw new ApiError(500, "Server failed to delete note");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedNote, "Note deleted successfully"));
});

const getNoteById = asyncHandler(async (req, res) => {
  const { noteId } = req.params;

  const existingNote = await Note.findById(noteId);

  if (!existingNote) {
    throw new ApiError(404, "Note not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, existingNote, "Note Fetched successfully!"));
});

const getAllNote = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const notes = await Note.find({
    admin: new mongoose.Types.ObjectId(userId),
  });

  if (notes.length === 0) {
    throw new ApiError(404, "Notes not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "Notes fetched successfully"));
});

export { createNote, updateNote, deleteNote, getNoteById, getAllNote };
