export const swaggerOption = { 
    "openapi" : "3.0.0",
    "info":{
        "title" : "PokéAPI",
        "description":"API made for WEB development class of UNIFEI",
        "terms of service" : "Free for use",
        "contact":{
            "email":"luiz.duarte@unifei.edu.br"
        },
        "version" : "1.0.0"
    },
    "paths" : {
        "/pokemon" : {
            "post" : {
                "summary" : "Add a new Pokémon",
                "description" : "This route allows the user to add a new Pokémon to the Pokédex",
                "tags" : ["pokemon"],
                "requestBody" : {
                    "content" : {
                        "application/json" : {
                            "schema" : {
                                "$ref" : "#/components/schemas/Pokemon"
                            },
                            "examples":{
                                "pokémon" : {
                                    "value" : {
                                        "name" : "Bulbasaur",
                                        "description" : "A plant pokémon",
                                        "height" : 0.96,
                                        "weight" : 0.52,
                                        "ability" : "Overgrow",
                                        "spriteone" : "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
                                        "type" : "Grass",
                                        "typetwo" : "Poison"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses" : {
                    "200" : {
                        "description": "Pokémon added with success",
                        "content" : {
                            "application/json":{
                                "schema" : {
                                    "type" : "object",
                                    "$ref" : "#/components/schemas/Pokemon"
                                }
                            }
                        }
                    },
                    "400" : {
                        "description" : "Unable to create Pokémon. Please Try again"
                    }
                }
            },
            "get" : {
                "description" : "Search a pokémon by ID",
                "summary" : "This route allow the user to saerch a existing pokemon by it's id",
                "tags" : ["pokemon"],
                "parameters" : [
                    {
                        "name" : "id",
                        "in" : "header",
                        "description" : "Id of desired pokemon",
                        "required" : true
                    }
                ],
                "responses" : {
                    "200" : {
                        "description": "ok",
                        "content" : {
                            "application/json":{
                                "schema" : {
                                    "type" : "object",
                                    "$ref" : "#/components/schemas/Pokemon"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "components" : {
        "schemas" : {
            "Pokemon" : {
                "type" : "object",
                "properties": {
                    "name" : {
                        "type" : "string"
                    },
                    "description" : {
                        "type" : "string"
                    },
                    "height" : {
                        "type" : "number"
                    },
                    "weight" : {
                        "type" : "number"
                    },
                    "ability" : {
                        "type" : "string"
                    },
                    "spriteone" : {
                        "type" : "string"
                    },
                    "type" : {
                        "type" : "string"
                    },
                    "typetwo" : {
                        "type" : "string"
                    }
                }
            }
        }
    }
  }