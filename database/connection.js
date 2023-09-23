const mongoose = require('mongoose')

mongoose.connect(process.env.BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("____mongodb Atlas connected");
}).catch(() => {
    console.log("____mongodb Atlas not connected");
})