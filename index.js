const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

// Middle Ware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://nexcent-88b82.web.app',
        'https://nexcent-88b82.firebaseapp.com',
    ],
    credentials: true
}))

app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@nexcent.vidq1en.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        // Collection's 
        const ClientsCollection = client.db('PNexcentDB').collection('Clients');
        const CommunityCollection = client.db('PNexcentDB').collection('Community');
        const HelpingCollection = client.db('PNexcentDB').collection('Helping');
        const CommunityUpdateCollection = client.db('PNexcentDB').collection('CommunityUpdate');
        const RegisteredUserCollection = client.db('PNexcentDB').collection('RegisteredUser');

        // API's


        // Clients API
        // view all Clients
        app.get('/clients', async (req, res) => {
            const result = await ClientsCollection.find().toArray();
            res.send(result);
        });


        // Community API
        // view all Community
        app.get('/Community', async (req, res) => {
            const result = await CommunityCollection.find().toArray();
            res.send(result);
        });


        // Helper API
        // view all Helping
        app.get('/Helping', async (req, res) => {
            const result = await HelpingCollection.find().toArray();
            res.send(result);
        });



        // CommunityUpdate API
        // view all CommunityUpdates
        app.get('/CommunityUpdate', async (req, res) => {
            const result = await CommunityUpdateCollection.find().toArray();
            res.send(result);
        });


        // RegisteredUser API
        // view all RegisteredUser
        app.get('/RegisteredUser', async (req, res) => {
            const result = await RegisteredUserCollection.find().toArray();
            res.send(result);
        });
        // Post RegisteredUser
        app.post('/RegisteredUser', async (req, res) => {
            const request = req.body;
            const result = await RegisteredUserCollection.insertOne(request);
            res.send(result)
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Nexcent is Running')
})
app.listen(port, () => {
    console.log(`Nexcent Server is Running On Port ${port}`);
})

