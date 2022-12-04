import pg from "pg";
import {urlConnection} from "../config.js";

import Pokemon from '../Pokedex.Backend.Domain/Pokemon.js'

const Client = pg.Client;

var conString = urlConnection;
const client = new Client(conString);



export async function GetPokemonsRepository(){
  try {
    client.connect(function (err) {
      if (err) {
        return err;
      }
    });
    const result = await client.query(`SELECT u.id, u.name, u.description, u.height, u.weight, u.ability, u.spriteone, u.spritetwo, c.type, d.typetwo
    FROM pokemon u 
    JOIN typeone c ON u.typeone_id = c.id
    JOIN typetwo d ON u.typetwo_id = d.id
    order by id`)
    return result.rows;

  } catch (error) {
   return error
  }
}


export async function GetPokemonByIdRepository(id){
  try {
    client.connect(function (err) {
      if (err) {
        return err;
      }
    });
    const result = await client.query(`SELECT u.id, u.name, u.description, u.height, u.weight, u.ability, u.spriteone, u.spritetwo, c.type, d.typetwo
    FROM pokemon u 
    JOIN typeone c ON u.typeone_id = c.id
    JOIN typetwo d ON u.typetwo_id = d.id
    WHERE u.id = ${id}`)
    return result.rows;

  } catch (error) {
   return error
  }
}

/**
 * @param {Pokemon} pokemon pokemonParameter
 */

export async function AddPokemonRepository(pokemon){
    try {
        client.connect(function (err) {
        if (err) {
            return err;
        }});

        const result = await client.query(`INSERT INTO pokemon(
        Name, Description, Height, Weight, Ability, SpriteOne, 
        SpriteTwo, TypeOne_Id, TypeTwo_Id) 
        VALUES ('${pokemon.name}', '${pokemon.description}', ${pokemon.height}, ${pokemon.weight}, 
        '${pokemon.ability}','${pokemon.spriteone}', '${pokemon.spritetwo}' , (SELECT id from typeone where type = '${pokemon.type}') , (SELECT id from typetwo where typetwo = '${pokemon.typetwo}'))`)
        return result;

    } catch (error) {
        return error
    }
}

/**
 * @param {Pokemon} pokemon pokemonParameter
 */
export async function UpdatePokemonRepository(pokemon){
  try {
      client.connect(function (err) {
      if (err) {
          return err;
      }});

      const result = await client.query(`UPDATE pokemon
      SET name = '${pokemon.name}' , description = '${pokemon.description}', height = ${pokemon.height}, weight= ${pokemon.weight}, ability = '${pokemon.ability}', typeone_id = (SELECT id from typeone where type = '${pokemon.type}'), typetwo_id = (SELECT id from typetwo where typetwo = '${pokemon.typetwo}') , spriteone = '${pokemon.spriteone}', spritetwo = '${pokemon.spritetwo}'
      WHERE id = ${pokemon.id}`)
      return result;

  } catch (error) {
      return error
  }
}