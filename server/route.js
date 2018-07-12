import express from 'express';
import Operations from './operation'

export default ()=>{
    const router = new express.Router();

    router.post('/api/todo/',Operations.loadDetails);
    router.get('/api/todo/',Operations.fetchDetails);
    router.delete('/api/todo/:id',Operations.deleteDetails);
    router.put('/api/todo/:id',Operations.updateDetails);

    return router;

}