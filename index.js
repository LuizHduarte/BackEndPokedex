import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import {port} from "./config.js";

import {GetPokemonByIdService, GetPokemonsService, AddPokemonService, UpdatePokemonService, GetAllPokemonsByTypeService} from './Pokedex.Backend.Application/PokemonService.js'
import Pokemon from './Pokedex.Backend.Domain/Pokemon.js'
import { AddTypeService } from "./Pokedex.Backend.Application/TypeService.js";


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

app.get("/", async (req, res) => {
  res.status(200).send("ok");
});

app.get("/pokemon", async (req, res) => {
  const response = await GetPokemonsService();
  res.status(response.status).send(response.data);
});

app.get("/pokemon/:id", async (req, res) => {
  const response = await GetPokemonByIdService(req.params.id);
  res.status(response.status).send(response.data);
});

app.post("/pokemon", async (req, res) => {
  let pokemon = new Pokemon(
    req.body.id,
    req.body.name,
    req.body.description,
    req.body.height,
    req.body.weight,
    req.body.ability,
    req.body.spriteone,
    req.body.spritetwo,
    req.body.type,
    req.body.typetwo,
  );
  const response = await AddPokemonService(pokemon);
  
  res.status(response.status).send(response.data);
});

app.put("/pokemon/:id", async (req, res) => {
  let pokemon = new Pokemon(
    req.params.id,
    req.body.name,
    req.body.description,
    req.body.height,
    req.body.weight,
    req.body.ability,
    req.body.spriteone,
    req.body.spritetwo,
    req.body.type,
    req.body.typetwo,
  );
  const response = await UpdatePokemonService(pokemon);
  
  res.status(response.status).send(response.data);
});

app.get("/pokemon/:type", async (req, res) => {
  const response = await GetAllPokemonsByTypeService(req.params.type);
  res.status(response.status).send(response.data);
});

app.post("/type", async (req, res) => {
  const response = await AddTypeService(req.body.type);
  res.status(response.status).send(response.data);
});

app.listen(port, () =>
  console.log("Servidor funcionando na porta " + port)
);
