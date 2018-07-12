import express from 'express';
import http from 'http';
import Router from './route'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import dbConfig from '../helper/mongodb'


const app=express();
const server=http.Server(app);

app.use(bodyParser());
app.use('/',Router());

mongoose.connect(dbConfig.url)
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

server.listen(3001,()=>{
    console.log("server started")
})