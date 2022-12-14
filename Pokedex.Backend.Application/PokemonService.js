import { GetPokemonsRepository, GetPokemonByIdRepository, AddPokemonRepository, UpdatePokemonRepository, GetAllPokemonsByTypeRepository} from '../Pokedex.Backend.Infra.Data/PokemonRepository.js'
import {TypeOneSearchRepository, TypeTwoSearchRepository} from '../Pokedex.Backend.Infra.Data/TypeRepository.js'
import Pokemon from '../Pokedex.Backend.Domain/Pokemon.js'

export async function GetPokemonsService(){
    const result = await GetPokemonsRepository();

    if(Object.keys(result).length === 0){
        return{
            status:404,
            data:"Nenhum pokemon foi encontrado"
        }
    }

    return {
        status:200,
        data:result
    };
}

export async function GetPokemonByIdService(id){

    const result = await GetPokemonByIdRepository(id);
    
    if(Object.keys(result).length === 0){
        return{
            status:404,
            data:"Pokemon não encontrado"
        }
    }

    return {
        status:200,
        data: result
    };
}

export async function GetAllPokemonsByTypeService(type){
    const result = await GetAllPokemonsByTypeRepository(type);

    if(Object.keys(result).length === 0){
        return{
            status:404,
            data:"Pokemon não encontrado"
        }
    }

    return {
        status:200,
        data: result
    };

}

/**
* @param {Pokemon} pokemon pokemonParameter
*/
export async function AddPokemonService(pokemon){
    
    const verifyPokemonData = await VerifyPokemonData(pokemon);
    if(verifyPokemonData.status === 400){
        return{
            status : verifyPokemonData.status,
            data : verifyPokemonData.data
        }
    }

    const verifyExistingType = await VerifyExistingType(pokemon.type, pokemon.typetwo)
    
    if(verifyExistingType.status === 400){
        return{
            status : verifyExistingType.status,
            data : verifyExistingType.data
        }
    }
    
    const result = await AddPokemonRepository(pokemon);
    console.log(result)
    if(result.rowCount === 1){
        return {
            status : 200,
            data:"Pokemon adicionado com sucesso",
        };
    }

    return{
        status:400,
        data: "Não foi possível inserir o pokemon, por favor tente novamente."
    };
}

/**
 * @param {Pokemon} pokemon pokemonParameter
 */
export async function UpdatePokemonService(pokemon){

    const verifyPokemon = await GetPokemonByIdRepository(pokemon.id);

    if(Object.keys(verifyPokemon).length === 0){
        return{
            status:404,
            data:"Não é possível atualizar um pokemon inexistente."
        }
    }
    
    const verifyPokemonData = await VerifyPokemonData(pokemon);
    if(verifyPokemonData.status === 400){
        return{
            status : verifyPokemonData.status,
            data : verifyPokemonData.data
        }
    }

    const verifyExistingType = await VerifyExistingType(pokemon.type, pokemon.typetwo)
    if(verifyExistingType.status === 400){
        return{
            status : verifyExistingType.status,
            message : verifyExistingType.data
        }
    }

    const result = await UpdatePokemonRepository(pokemon);
    if(result.rowCount === 1){
        return {
            status : 200,
            data:"Pokemon atualizado com sucesso",
        };
    }

    return{
        status:400,
        data: "Não foi possível atualizar o pokemon, por favor tente novamente."
    };
}

async function VerifyExistingType(typeOne, typeTwo){

    const typeOneSearch = await TypeOneSearchRepository(typeOne);
    console.log(typeTwo)
    const typeTwoSearch = await TypeTwoSearchRepository(typeTwo);
    console.log(typeTwoSearch)

    if(Object.keys(typeOneSearch).length === 0){
        return{
            status:400,
            data:"Por favor insira um tipo primário existente"
        }
    }

    if(Object.keys(typeTwoSearch).length === 0){
        return{
            status:400,
            data:"Por favor insira um tipo secundário existente"
        }
    }
    return 200
}

/**
 * @param {Pokemon} pokemon pokemonParameter
 */
async function VerifyPokemonData(pokemon){
    if(pokemon.name == "" || pokemon.name == null ){
        return{
            status:400,
            data: "Por favor, insira um nome válido"
        };
    }

    if(pokemon.description == "" || pokemon.description == null ){
        return{
            status:400,
            data: "Por favor, insira uma descrição válida"
        };
    }

    if(pokemon.height <= 0 || pokemon.height == null ){
        return{
            status:400,
            data: "Por favor, insira uma altura válida."
        };
    }

    if(pokemon.weight <= 0 || pokemon.weight == null ){
        return{
            status:400,
            data: "Por favor, insira um peso válido."
        };
    }

    if(pokemon.ability == "" || pokemon.ability == null ){
        return{
            status:400,
            data: "Por favor, insira uma habilidade válida."
        };
    }

    if(pokemon.spriteone == "" || pokemon.spriteone == null ){
        return{
            status:400,
            data: "Por favor, insira um sprite válido."
        };
    }

    if(pokemon.type == "" || pokemon.type == null ){
        return{
            status:400,
            data: "Por favor, insira um tipo válido."
        };
    }
    return 200
}