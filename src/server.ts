import app from "./app";

app.listen(process.env.PORT as string, () => console.log(`Listening on Port ${process.env.PORT}`));