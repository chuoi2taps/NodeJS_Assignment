import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()

export const getAll = async(req,res)=>{
    try{
        const {data:users} = await axios.get(`${process.env.API_URL}`)
        if(users.length === 0){
            res.status(404).json({
                message: "không có user nào hết"
            })
        }
        return res.status(200).json(users)
    }
    catch(error){
        res.status(500).json({
            message:error
        })
    }
}

export const get = async(req,res)=>{
    try{
        const {data:user} = await axios.get(`${process.env.API_URL}/${req.params.id}`)
        if(!user){
            return res.status(404).json({
                message:"khong tim thay user"
            })
        }
        return res.status(200).json({
            message:"Da tim thay user",
            data:user,
        })
    }
    catch(error){
        return res.status(500).json({
            message:error
        })
    }
}
export const create = async(req,res)=>{
    try{
        const {data:user} = await axios.post(`${process.env.API_URL}`,req.body)
        if(!user){
            return res.status(400).json({
                message:"khong tao duoc user"
            })
        }
        return res.status(201).json({
            message:"Tao user thanh cong",
            data:user,
        })
    }
    catch(error){
        return res.status(500).json({
            message:error
        })
    }
}
export const remove = async(req,res)=>{
    try{
        await axios.delete(`${process.env.API_URL}/${req.params.id}`);
        return res.status(200).json({
            message:"da xoa user"
        })
    }
    catch(error){
        return res.status(500).json({
            message:error
        })
    }
}
export const update = async(req,res) =>{
    try{
        const {data:user} = await axios.patch(`${process.env.API_URL}/${req.params.id}`,req.body)
        if(!user){
            return res.status(404).json({
                message:"khong tim thay duoc user"
            })
        }
        return res.status(200).json({
            message:"cap nhat user thanh cong",
            data:user,
        })
    }
    catch(error){
        return res.status(500).json({
            message:error
        })
    }
}
export const put = async (req,res)=>{
    try{
        const {data:user} = await axios.put(`${process.env.API_URL}/${req.params.id}`,req.body)
        if(!user){
            return res.status(404).json({
                message:"khong tim thay duoc user"
            })
        }
        return res.status(200).json({
            message:"cap nhat user thanh cong",
            data:user,
        })
    }
    catch(error){
        return res.status(500).json({
            message:error
        })
    }
}
