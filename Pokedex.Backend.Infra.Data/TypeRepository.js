import pg from "pg";
import {urlConnection} from "../config.js";

const Client = pg.Client;

var conString = urlConnection;
const client = new Client(conString);

export async function TypeOneSearchRepository(type){
  try {
    client.connect(function (err) {
      if (err) {
        return err;
      }
    });
    const result = await client.query(`SELECT type FROM TypeOne where type = '${type}'`)
    return result.rows;

  } catch (error) {
   return error
  }
}

export async function TypeTwoSearchRepository(type){
  try {
    client.connect(function (err) {
      if (err) {
        return err;
      }
    });
    const result = await client.query(`SELECT typetwo FROM TypeTwo where typetwo = '${type}'`)
    return result.rows;

  } catch (error) {
   return error
  }
}


export async function AddTypeRepository(type){
  try {
    client.connect(function (err) {
      if (err) {
        return err;
      }
    });
    const result = await client.query(`INSERT INTO typeone (type) values ('${type}');
    INSERT INTO typetwo (typetwo) values ('${type}')`)
    return result[0].rowCount;
  } catch (error) {
   return error
  }
}
