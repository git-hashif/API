const express = require ("express");
const mongoose = require ('mongoose');
const cors = require('cors')
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const mongoUrl = ''
mongoose.connect(mongoUrl)
.then(()=>console.log('connected MongoDB Atlas'))
.catch(err=>console.error(err.message))

const videoSchema = new mongoose.Schema({
    title :{
        type:String,
        required:[true,'Title is required'],
        description:'Title of the video',
        trim:true
    },
    description:{
        type:String,
        required:[false,'Description is optional'],
        trim:true
    },
    createdAt:{
        type:Date,
        default: Date.now

    }
});

videoSchema.pre('save',function(next){
    this.createdAt=Date.now();
    next();
})

const videoModal = new mongoose.model("Video",videoSchema);

app.post('/api/videos', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const video = new videoModal({ title, description });
    await video.save();

    res.status(201).json({
      success: true,
      message: 'Video added successfully!',
      data: video
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
});


app.get('/api/videos', async (req, res) => {
  try {
    const videos = await videoModal.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: videos
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
});


app.put('/api/videos/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const video = await videoModal.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    res.json({ success: true, message: 'Video updated successfully!', data: video });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
});


app.delete('/api/videos/:id', async (req, res) => {
  try {
    const video = await videoModal.findByIdAndDelete(req.params.id);

    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    res.json({ success: true, message: 'Video deleted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
});


const port = 3000;
app.listen(port,()=>{
    console.log("server running on port 3000")
})

