import { AddTypeRepository, TypeOneSearchRepository } from "../Pokedex.Backend.Infra.Data/TypeRepository.js";

export async function AddTypeService(type){
    const typeOneSearchRepository = await TypeOneSearchRepository(type);

    if(Object.keys(typeOneSearchRepository).length > 0){
        return{
            status:400,
            data:"Impossível inserir um tipo já existente"
        }
    }
    
    const result = await AddTypeRepository(type);
    if(result.rowCount === 1){
         return {
            status : 200,
            data:"Tipo adicionado com sucesso",
        };
    }
    
    return{
        status:400,
        data: "Não foi possível inserir o tipo, por favor tente novamente."
    };
}