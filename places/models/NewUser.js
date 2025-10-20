import { Schema, model, models } from "mongoose";

const NewUserSchema = new Schema(
  {
    ID: Number,
    user_login: String,
    user_pass: String,
    user_nicename: String,
    user_email: String,
    user_url: String,
    user_registered: Date,
    user_activation_key: String,
    user_status: Number,
    display_name: String,
    _createdAt: Date,
    _tableName: String,
  },
  {
    timestamps: false,
    collection: "wp_users_corrected",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate for Posts
NewUserSchema.virtual("posts", {
  ref: "Post",
  localField: "ID",
  foreignField: "post_author",
});

const NewUser = models.NewUser || model("NewUser", NewUserSchema);
export default NewUser;
