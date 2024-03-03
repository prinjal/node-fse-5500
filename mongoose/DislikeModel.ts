/**
* @file Implements mongoose model to CRUD
* documents in the likes collection
*/

import mongoose from "mongoose";
import DisLikeSchema from "./DislikeSchema";
const DisLikeModel = mongoose.model("DisLikeModel", DisLikeSchema);
export default DisLikeModel;