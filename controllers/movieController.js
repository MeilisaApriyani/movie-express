import { response } from "express";
import movieModels from "../models/movieModels.js";

export const listMovie = async (req, res)=>{
    try {
        const movies = await movieModels.find({
            createdBy : req.user?.user_id
        }).sort({createdAt : -1});
            
        return res.status (200).json({
            message : "List semua movie",
            data : movies,
        });
        
    }catch(error){
        return res.status(500).json({
            message : "Error",
            error : error.message,
            data : null,
        });
    }
};

export const createMovie = async (req, res)=>{
    try {
        const {judul, tahunRilis, sutradara } = req.body;

        if(!judul || !tahunRilis || !sutradara){
            return res.status(400).json ({
                message : "Semua data wajib diisi",
                data : null
            });
        }
        const movie = await movieModels.create({judul, tahunRilis, sutradara, createdBy : req.user?.user_id});
        res.status(201).json({
            message: "Movie berhasil ditambahkan",
            data: movie
        })
    }catch (error) {
        res.status(500).json({
            message: error.message,
            data: null

        })
    }
}
export const updateMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const { judul, tahunRilis, sutradara } = req.body;

        const movie = await movieModels.findOneAndUpdate(
            { _id: id, createdBy: req.user?.user_id },
            { judul, tahunRilis, sutradara },
            { new: true }
        );

        if (!movie) {
            return res.status(404).json({
                message: "Informasi data movie gagal diupdate",
                data: null,
            });
        }

        res.status(200).json({
            message: "Informasi data movie berhasil diupdate",
            data: movie,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

export const detailMovie = async (req, res) => {
    try {
        const id = req.params?.id;

        if (!id) {
            return res.status(400).json({
                message: "Id movie wajib di isi",
                data: null,
            })
        }
        const movie = await movieModels.findById({
            _id : id,
            createdBy: req.user?.user_id
        });
        if (!movie) {
            return res.status(404).json({
                message: "Movie tidak ditemukan",
                data: null,
            })
        }
        return res.status(200).json({
            message: "Detail Movie",
            data: movie,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
            data: null,
        })
    }
}
export const deleteMovie = async (req, res)=>{
    try{
        const id = req.params.id

        if(!id){
            return res.status (400).json({
                message : "ID movie wajib di isi",
                data : null,
            })
        }
        const movie = await movieModels.findByIdAndDelete({
            _id : id,
            createdBy : req.user?.user_id
        });
        if (movie) {
            return res.status(200).json({
                message: "Movie berhasil dihapus",
                data: null
            })
        }
        return res.status(404).json({
            message: "Movie tidak ditemukan",
            data: null
        })
    }catch (error) {
        res.status(500).json({
            message: error,
            data: null
        })
    }
}