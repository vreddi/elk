import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  videos: [String],
},
{
  timestamps: {
    createdAt: 'createDate',
    updatedAt: 'lastUpdated',
  },
  versionKey: 'version',
});

export const Collection = mongoose.model("Collection", CollectionSchema);
