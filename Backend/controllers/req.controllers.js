import userServices from '../services/user.services.js';
import RequestLog from '../models/request.js';

async function createRequest(req, res) {
    try {
        const{user_id, request_type, description} = req.body;
        const request = await userServices.createRequest(req.body);
        res.status(201).json({ request, message: "Request created successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

async function deleteRequest(req,res){
    try{
        const {request_id} = req.body;
        const request = await userServices.deleteRequest(request_id);
        res.status(200).json({request, message: "Request deleted successfully"});
    }
    catch(error){
        console.log(error);
        res.status(400).json({message: error.message});
    }
}

export{createRequest, deleteRequest};