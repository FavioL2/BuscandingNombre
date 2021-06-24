const http = require('http');
const { ApolloServer } = require('apollo-server');
require("dotenv").config({path: 'variables.env'});
const JWT = require("jsonwebtoken");
const typeDefs = require('./schema');
const express = require('express');
const mongose = require('mongoose');
const graphqlHTTP= require('express-graphql')
const typeDef = require('../src/schema'); //el schema
const resolvers = require('./resolvers/resolver');
//para que permita accesos
var cors = require('cors')
//https://buddy.works/tutorials/how-to-connect-mongodb-to-graphql-server
//usuario: hector    password: contraseña
const conectarDB = require("../src/config/db");
conectarDB();
const server = new ApolloServer({
    typeDefs,
    resolvers
    ,context:({ req }) => {
      const token = req.headers['authorization'] || "";
        if (token) {
            try {
                const verificar = JWT.verify(token, process.env.SECRETA)
                return verificar
            } catch (error) {
                console.log(error)
            }
        }
    }
});

server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
    console.log(`servidor listo ${url}`)
})
