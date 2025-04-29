# Auction Site Admin Dashboard (MERN Stack)

## Setup MongoDB

1. You have a MongoDB Atlas cloud cluster. To connect your backend to it:

- Go to your MongoDB Atlas dashboard.
- Click "Connect" for your cluster.
- Choose "Connect your application".
- Copy the connection string URI. It looks like:
```
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```
- Replace `<username>`, `<password>`, and `<dbname>` with your actual credentials and database name.

2. Create a `.env` file in the `backend` folder with the following content:
```
MONGO_URI=your_mongodb_connection_string_here
```
Replace `your_mongodb_connection_string_here` with the URI you copied.

3. The backend server is already configured to use this environment variable.

## Backend Setup

1. Navigate to the `backend` folder:
```
cd backend
```

2. Install dependencies:
```
npm install express mongoose cors dotenv
```

3. Start the backend server:
```
node server.js
```

The backend server will run on port 5000.

## Frontend Setup

1. Navigate to the `frontend` folder:
```
cd frontend
```

2. Install dependencies:
```
npm install
```

3. Start the React development server:
```
npm start
```

The frontend will run on port 3000 by default.

## Usage

- Access the admin dashboard at `http://localhost:3000`.
- Use the filters to view statistics.
- Use the admin actions to suspend auctions and warn users by their IDs.

## Notes

- Make sure the backend server is running before using the frontend.
- Adjust MongoDB connection string and ports as needed.
node server.js
cd backend
1. Navigate to the `backend` folder:
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
