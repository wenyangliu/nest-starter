import * as mongoose from 'mongoose'

export const MoviesSchema = new mongoose.Schema({
  id: Number,
  name: String
}, {
  collection: 'movies', versionKey: false
});
