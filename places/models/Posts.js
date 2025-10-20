import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    ID: Number,
    post_author: Number,
    post_date: Date,
    post_date_gmt: Date,
    post_content: String,
    post_title: String,
    post_excerpt: String,
    post_status: String,
    comment_status: String,
    ping_status: String,
    post_password: String,
    post_name: { type: String, unique: [true, "Post Name already exists"] },
    to_ping: String,
    pinged: String,
    post_modified: Date,
    post_modified_gmt: Date,
    post_content_filtered: String,
    post_parent: Number,
    guid: String,
    menu_order: Number,
    post_type: String,
    post_mime_type: String,
    comment_count: Number,
    _createdAt: Date,
    _tableName: String,
  },
  {
    timestamps: false,
    collection: "wp_posts_corrected",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate for PostMeta
PostSchema.virtual("metas", {
  ref: "PostMeta",
  localField: "ID",
  foreignField: "post_id",
});

// Virtual populate for User (Author)
PostSchema.virtual("author", {
  ref: "NewUser",
  localField: "post_author",
  foreignField: "ID",
});

const Post = models.Post || model("Post", PostSchema);
export default Post;
