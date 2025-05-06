import mongoose from 'mongoose';
import { AvailableUserRoles, UserRoleEnum } from '../utils/constants.js';
const projectmemberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRoleEnum.MEMBER,
      required: true,
    },
  },
  { timestamps: true },
);

const ProjectMember = mongoose.model('ProjectMember', projectmemberSchema);

export default ProjectMember;
