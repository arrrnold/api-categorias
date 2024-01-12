const express = require('express');
const mongoose = require('mongoose');
const Categoria = require("../models/categoria.model");

exports.crearCategoria = async (req, res) => {
    const categoria = new Categoria(req.body);

    if (!categoria) {
        res.status(400).json({ mensaje: "Faltan datos" });
    }
    else {
        try {

            // validar que no exista una categoria con el mismo nombre
            const categoriaExistente = await Categoria.findOne({ nombre: categoria.nombre });
            if (categoriaExistente) {
                res.status(400).json({
                    estado: 0,
                    mensaje: "Ya existe una categoria con ese nombre",
                    categoria: categoriaExistente
                });
            } else {
                await categoria.save();
                res.status(201).json({
                    estado: 1,
                    mensaje: "Categoria creada",
                    categoria: categoria
                });
            }


        } catch (error) {
            res.status(500).json({
                estado: 0,
                mensaje: "Error al crear categoria",
            });
        }
    }
}

exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        if (!categorias) {
            res.status(404).json({
                estado: 0,
                mensaje: "No hay categorias",
            });
        } else {
            res.status(200).json({
                estado: 1,
                mensaje: "Categorias encontradas",
                categorias: categorias
            });
        }
    } catch (error) {
        res.status(500).json({
            estado: 0,
            mensaje: "Error al obtener categorias",
        });
    }
}

exports.obtenerCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) {
            res.status(404).json({
                estado: 0,
                mensaje: "No existe categoria",
            });
        } else {
            res.status(200).json({
                estado: 1,
                mensaje: "Categoria encontrada",
                categoria: categoria
            });
        }
    } catch (error) {
        res.status(500).json({
            estado: 0,
            mensaje: "Error al obtener categoria",
        });

    }
}

exports.actualizarCategoria = async (req, res) => {
    const { id } = req.params;

    const categoria = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }

    if (!categoria) {
        res.status(400).json({ mensaje: "Faltan datos" });
    } else {
        // encontrar categoria
        const categoriaExistente = await Categoria.findById(id);
        if (!categoriaExistente) {
            res.status(404).json({
                estado: 0,
                mensaje: "No existe categoria",
            });
        } else {
            try {
                // validar que no exista una categoria con el mismo nombre
                const categoriaMismoNombre = await Categoria.findOne({ nombre: categoria.nombre });

                if (categoriaMismoNombre) { // si existe
                    res.status(400).json({
                        estado: 0,
                        mensaje: "Ya existe una categoria con ese nombre",
                        categoria: categoriaMismoNombre
                    });
                } else { // si no existe
                    await categoriaExistente.updateOne(categoria);
                    res.status(200).json({
                        estado: 1,
                        mensaje: "Categoria actualizada",
                        categoria: categoria
                    });
                }

            } catch (error) {
                res.status(500).json({
                    estado: 0,
                    mensaje: "Error al actualizar categoria",
                });
            }
        };
    }
}

exports.eliminarCategoria = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ mensaje: "Faltan datos" });
    } else {
        try {
            categoriaEliminada = await Categoria.findByIdAndDelete(id);
            if (!categoriaEliminada) {
                res.status(404).json({
                    estado: 0,
                    mensaje: "No existe categoria",
                });
            } else {
                res.status(204).json({
                    estado: 1,
                    mensaje: "categoria eliminada"
                });
            }
        } catch (error) {
            res.status(500).json({
                estado: 0,
                mensaje: "Error al eliminar categoria",
            });
        }
    }
}