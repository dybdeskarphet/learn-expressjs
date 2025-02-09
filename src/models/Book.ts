import mg from "mongoose";

interface IBook {
  title: string;
  author: string;
  addedAt: Date;
}

const bookSchema = new mg.Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
});

const Book = mg.model("Book", bookSchema);

export { Book, IBook };
