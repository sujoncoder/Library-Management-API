import app from "./app";
import { PORT } from "./config/constant";
import connectDB from "./config/db";


// APP LISTENING
app.listen(PORT, async () => {
    console.log(`Server is running on ${PORT} ➡️`);
    await connectDB();
});
