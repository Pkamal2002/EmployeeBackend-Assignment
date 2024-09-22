import mongoose from "mongoose";

const employeeDetailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{10}$/,
    },
    designation: {
      type: String,
      required: true,
      enum: ["Manager", "Developer", "Tester", "Designer","HR","Sales"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    course: {
      type: Array,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dmitriy-kama/image/upload/v1630536766/default-user-image.png",
    },
  },
  { timestamps: true }
);

// Export the model as default for easier importing
export default mongoose.model("EmployeeDetail", employeeDetailSchema);
