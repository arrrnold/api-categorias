const express = require('express');
const mongoose = require('mongoose');
const Categoria = require("../models/categoria.model");

exports.crearCategoria = async (req, res) => {
    const categoria = new Categoria(req.body);
    await categoria.save();
    res.status(201).json(categoria);
}

exports.obtenerCategorias = async (req, res) => {
    const categorias = await Categoria.find();
    res.json(categorias);
}

exports.obtenerCategoria = async (req, res) => {
    const categoria = await Categoria.findById(req.params.id);
    res.json(categoria);
}

exports.actualizarCategoria = async (req, res) => {
    const {id} = req.params;

    const categoria = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }

    await Categoria.findOneAndUpdate(
        {_id: id},
        {$set: categoria}
    );

    res.status(204).json({mensaje: "categoria actualizada"});

};

exports.eliminarCategoria = async (req, res) => {
    const {id} = req.params;
    await Categoria.findByIdAndDelete(id);
    res.status(204).json({mensaje: "categoria eliminada"});
}