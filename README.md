**Install Dependencies**
npm install

**Start the Server**
node server.js

You should see:

MongoDB Connected
Server running on port 3000

**API Endpoints**

POST /api/videos
Purpose: Add a new video record.
Request Body (JSON):

{
  "title": "JavaScript Basics",
  "description": "Learn the fundamentals of JS"
}

Response (201 Created):

{
  "success": true,
  "message": "Video added successfully!",
  "data": {
    "_id": "6508f912c8e4c4a1e17b49b2",
    "title": "JavaScript Basics",
    "description": "Learn the fundamentals of JS",
    "createdAt": "2025-11-06T14:00:00Z"
  }
}


**GET /api/videos**

Purpose: Retrieve all uploaded videos.

Response (200 OK):

{
  "success": true,
  "data": [
    {
      "_id": "6508f912c8e4c4a1e17b49b2",
      "title": "JavaScript Basics",
      "description": "Learn the fundamentals of JS",
      "createdAt": "2025-11-06T14:00:00Z"
    }
  ]
}


**PUT /api/videos/:id**

Purpose: Update a video by its ID.

Request Body (JSON):

{
  "title": "Advanced JavaScript",
  "description": "Deep dive into modern JS concepts"
}

Response (200 OK):

{
  "success": true,
  "message": "Video updated successfully!",
  "data": {
    "_id": "6508f912c8e4c4a1e17b49b2",
    "title": "Advanced JavaScript",
    "description": "Deep dive into modern JS concepts",
    "createdAt": "2025-11-06T14:00:00Z"
  }
}

**DELETE /api/videos/:id**

Purpose: Delete a video by its ID.

Response (200 OK):

{
  "success": true,
  "message": "Video deleted successfully!"
}

**Validation Rules**

title → required
description → optional

Returns 400 Bad Request if required fields are missing.
Returns 404 Not Found if the video ID doesn’t exist.

**Testing**

Use Postman to test all API routes.
Example:

POST → Add new video
GET → Retrieve all videos
PUT → Update video
DELETE → Delete video
