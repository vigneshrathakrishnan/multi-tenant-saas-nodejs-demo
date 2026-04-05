export default function errorHandler(err, req, res, next){
    console.log(err.errors)

    if (err.name === "ZodError"){
        return res.status(400).json({
            message: "Validation failed",
            // error: err.errors
        })
    }

    return res.status(400).json({
        message: err.message || "Something went wrong"
    })
}