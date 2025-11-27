import mongoose from "mongoose";
import UserModels from "./userModels.js";

const MovieSchema = new mongoose.Schema(
    {
        judul: {
            type : String,
            unique : true,
            required : true,
            trim : true,
        },
        tahunRilis : {
            type : String,
            required : true,
            trim : true,
        },
        sutradara: {
            type : String,
            required : true,
            trim : true,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: UserModels
        }  
    },
    {
        timestamps: true,
    }
);

const movieModels = mongoose.model("movies", MovieSchema);

export default movieModels;