import { PokemonDetailDto } from "src/app/models/pokemon-detail-dto";
import { PokemonDto } from "src/app/models/pokemon-dto";

export interface PokemonState {
  pokemons: Array<PokemonDto>;
  pokemon: PokemonDetailDto;
  idEvolution: string;
  evolution: Array<PokemonDto>;
  showSpinner: boolean;
}
