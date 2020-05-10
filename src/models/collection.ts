import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
  name: String,
  userId: {
    type: String,
    required: true
  }
},
{
  timestamps: {
    createdAt: 'createDate',
    updatedAt: 'lastUpdated',
  },
  versionKey: 'version',
});

export const Collection = mongoose.model("Collection", CollectionSchema);
