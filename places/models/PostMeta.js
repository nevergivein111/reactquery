import { Schema, model, models } from "mongoose";

const PostMetaSchema = new Schema(
  {
    meta_id: Number,
    post_id: Number,
    meta_key: String,
    meta_value: String,
    _createdAt: Date,
    _tableName: String,
  },
  {
    timestamps: false,
    collection: "wp_postmeta_corrected",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate for Post
PostMetaSchema.virtual("post", {
  ref: "Post",
  localField: "post_id",
  foreignField: "ID",
});

const PostMeta = models.PostMeta || model("PostMeta", PostMetaSchema);
export default PostMeta;
