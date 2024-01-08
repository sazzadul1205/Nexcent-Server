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
        const NavLinksCollection = client.db('PNexcentDB').collection('NavLink');
        const BannersCollection = client.db('PNexcentDB').collection('Banners');
        const ServicesCollection = client.db('PNexcentDB').collection('Services');
        const FeaturesCollection = client.db('PNexcentDB').collection('Features');
        const ProductsCollection = client.db('PNexcentDB').collection('Products');
        const FAQCollection = client.db('PNexcentDB').collection('FAQ');
        const TestimonialsCollection = client.db('PNexcentDB').collection('Testimonials');

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

        // NavLinks API
        // view all NavLinks
        app.get('/NavLink', async (req, res) => {
            const result = await NavLinksCollection.find().toArray();
            res.send(result);
        });

        // Banners API
        // view all Banners
        app.get('/Banners', async (req, res) => {
            const { bannerNo } = req.query;
            if (bannerNo) {
                const query = { bannerNo: parseInt(bannerNo) };
                const result = await BannersCollection.findOne(query);
                res.send(result);
            }
            else {
                const result = await BannersCollection.find().toArray();
                res.send(result);
            }
        });

        // Services API
        // view all Services
        app.get('/Services', async (req, res) => {
            const result = await ServicesCollection.find().toArray();
            res.send(result);
        });

        // Features API
        // view all Features
        app.get('/Features', async (req, res) => {
            const result = await FeaturesCollection.find().toArray();
            res.send(result);
        });

        // Products API
        // View all Products 
        app.get('/Products', async (req, res) => {
            const { category, name } = req.query;
        
            const query = {};
        
            if (category) {
                query.category = category;
            }
        
            if (name) {
                query.name = { $regex: new RegExp(name, 'i') };
            }
        
            const result = await ProductsCollection.find(query).toArray();
            res.json(result);
        });

        // FAQ API
        // view all FAQ
        app.get('/FAQ', async (req, res) => {
            const result = await FAQCollection.find().toArray();
            res.send(result);
        });

        // Testimonials API
        // view all Testimonials
        app.get('/Testimonials', async (req, res) => {
            const result = await TestimonialsCollection.find().toArray();
            res.send(result);
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

