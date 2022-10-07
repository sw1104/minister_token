const dotenv = require("dotenv");
dotenv.config();

const { createApp } = require("./app");
const { AppDataSource } = require("./src/models/datasource");

const startServer = async ()=>{
        const PORT = process.env.PORT
        const app = createApp();

        AppDataSource
        .initialize()
        .then(() => {
            console.log("Data Source has been initialized!");
        })
        .catch((err) => {
            console.error("Error occurred during Data Source initialization", err);
            AppDataSource.destroy();
        });

        app.get("/ping", (req,res)=>{
            res.status(200).json({message : "pong"});
        })

        app.listen(PORT, ()=>{
            console.log(`🚀 Listening on Port ${PORT} 🚀`)
        });
}
startServer();