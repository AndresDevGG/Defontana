export interface PokemonDetailDto {
	abilities: Abilities[];
	base_experience: number;
	forms: Forms[];
	game_indices: Game_indices[];
	height: number;
	held_items: unknown[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: Moves[];
	name: string;
	order: number;
	past_abilities: unknown[];
	past_types: unknown[];
	species: Species;
	sprites: Sprites;
	stats: Stats[];
	types: Types[];
	weight: number;
}

export interface Stats {
	base_stat: number;
	effort: number;
	stat: Stat;
}

export interface Stat {
	name: string;
	url: string;
}



export interface Types {
  type: Type
}

export interface Type {
  name: string
}

export interface Abilities {
	ability: Ability;
	is_hidden: boolean;
	slot: number;
}

export interface Ability {
	name: string;
	url: string;
}

export interface Forms {
	name: string;
	url: string;
}

export interface Game_indices {
	game_index: number;
	version: Version;
}

export interface Version {
	name: string;
	url: string;
}

export interface Moves {
	move: Move;
	version_group_details: Version_group_details[];
}

export interface Move {
	name: string;
	url: string;
}

export interface Version_group_details {
	level_learned_at: number;
	move_learn_method: Move_learn_method;
	version_group: Version_group;
}

export interface Move_learn_method {
	name: string;
	url: string;
}

export interface Version_group {
	name: string;
	url: string;
}

export interface Species {
	name: string;
	url: string;
}

export interface Sprites {
	back_default: string;
	back_female: null;
	back_shiny: string;
	back_shiny_female: null;
	front_default: string;
	front_female: null;
	front_shiny: string;
	front_shiny_female: null;
	other: any;
	versions: any;
}
