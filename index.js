
const {initializeDatabase} = require("./db/db.connect")
const express = require("express")
const app = express();

const Meetup = require("./models/meetup.models")

app.use(express.json());

initializeDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// const newEvent = {
//   "eventTitle": "Marketing Seminar",
//   "host": "Marketing Experts",
//   "eventImageUrl": "https://img.freepik.com/free-photo/people-meeting-showing-presentation_23-2148817060.jpg",
//   "startDateTime": "2023-08-15T10:00:00.000Z",
//   "endDateTime": "2023-08-15T12:00:00.000Z",
//   "mode": "Offline",
//   "address": "Marketing City, 789 Marketing Avenue, City",
//   "price": 3000,
//   "speakers": [
//     {
//       "speakerName": "Sarah Johnson",
//       "speakerDesignation": "Marketing Manager",
//       "speakerImageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlVparuZ4feRMJDAKgjimGIgPRBCI5jgvPrQ&s"
//     },
//     {
//       "speakerName": "Michael Brown",
//       "speakerDesignation": "SEO Specialist",
//       "speakerImageUrl": "https://plus.unsplash.com/premium_photo-1683121523671-9617aba661d7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//     }
//   ],
//   "eventDetails": "Stay ahead of the game in the dynamic field of digital marketing by attending the Marketing Seminar organized by Marketing Experts. This offline seminar will be held on August 15th from 10:00 AM to 12:00 PM at Marketing City, situated at 789 Marketing Avenue, City. Join industry leaders Sarah Johnson, Marketing Manager, and Michael Brown, SEO Specialist, as they delve into the latest trends and strategies in digital marketing. The seminar is open to individuals aged 18 and above and requires a ticket priced at ₹3,000. The dress code for the event is smart casual.",
//   "dressCode": "Smart casual",
//   "ageRestrictions": 18,
//   "eventTags": ["marketing", "digital"]
// }


async function createEvent(newEvent){
    try {
        const event = new Meetup(newEvent);
        const saveData = await event.save();
        return saveData;
        
    } catch (error) {
        console.log(error);
    }
}
app.post("/meetup", async(req, res) => {
    try {
        const data = await createEvent(req.body)
        res.status(200).json({message: "Data Added Successfully.", Event : data})
    } catch (error) {
        res.status(500).json({error: "Unable to add data." })
    }
})
async function getAllEvents(){
    try {
        const data = await Meetup.find();
        
            return data;
        
    } catch (error) {
        throw error;
         
    }
}

app.get("/meetup", async (req, res) => {
    try {
        const data = await getAllEvents();
        if(data.listen != 0){
            res.status(200).json(data)
        } else {
            res.status(404).json({error: "Unable to fetch Events."})
        }
    } catch (error) {
        res.status(500).json({error: "Unable to fetch data."})
    }
})




const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server running on port 3000.");
    
} )