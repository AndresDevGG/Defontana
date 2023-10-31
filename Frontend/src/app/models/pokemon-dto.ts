export interface PokemonResultDto {
  count: number;
  results: Array<PokemonDto>;
}

export interface PokemonDto {
  name: string;
  url?: string;
  image?: string;
}

export interface PokemonSpecificationDto {
  evolution_chain: {
    url: string;
  };
}



