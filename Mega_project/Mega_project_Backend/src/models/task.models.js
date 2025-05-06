import mongoose from 'mongoose';
import { AvailableTaskStatuses, TaskStatusEnum } from '../utils/constants.js';
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project ref is required'],
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: AvailableTaskStatuses,
      default: TaskStatusEnum.TODO,
      required: true,
    },
    attachments: {
      type: [
        {
          url: String,
          mimeType: String,
          size: Number,
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
