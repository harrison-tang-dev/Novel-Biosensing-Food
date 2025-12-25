import mongoose from "mongoose";


const pageSchema = new mongoose.Schema({
  termsconditions: { type: mongoose.Schema.Types.Mixed },
  privacypolicy: { type: mongoose.Schema.Types.Mixed },
  aboutus: { type: mongoose.Schema.Types.Mixed },
});

const pagesschema = new mongoose.Schema({
  adminemail: {
    type: String,
  },
  pages: { type: [pageSchema], default: [] }
});


export const Pages = new mongoose.model("Pages", pagesschema);
