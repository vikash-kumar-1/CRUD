import knex from '../helper/index'
import Todo from '../models/todo.js'

export default class operation {


    static loadDetails(req, res) {

        if(!req.body.content) {
            return res.status(400).send({
                message: "todo content can not be empty"
            });
        }

        // Create a todo
        const todo = new Todo({
            title: req.body.title || "Untitled todo",
            content: req.body.content
        });

        // Save todo in the database
        todo.save().then(data => {
                res.send(data);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the todos."
            });
        });

    }

    static fetchDetails(req, res) {
        Todo.find().then(todos => {
                res.send(todos);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving todos."
            });
        });


    }

    static deleteDetails(req, res) {
        Todo.findByIdAndRemove(req.params.id)
            .then(todo => {
                if(!todo) {
                    return res.status(404).send({
                        message: "todo not found with id " + req.params.id
                    });
                }
                res.send({message: "todo deleted successfully!"});
            }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "todo not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete todo with id " + req.params.id
            });
        });


    }

    static updateDetails(req, res) {


        if(!req.body.content) {
            return res.status(400).send({
                message: "todo content can not be empty"
            });
        }

        // Find todo and update it with the request body
        Todo.findByIdAndUpdate(req.params.id, {
            title: req.body.title || "Untitled todo",
            content: req.body.content
        }, {new: true})
            .then(todo => {
                if(!todo) {
                    return res.status(404).send({
                        message: "todo not found with id " + req.params.id
                    });
                }
                res.send(todo);
            }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "todo not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating todo with id " + req.params.id
            });
        });


    }


}