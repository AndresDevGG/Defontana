export interface EvolutionDto {
	baby_trigger_item: null;
	chain: Chain;
	id: number;
}

export interface Chain {
	evolution_details: unknown[];
	evolves_to: Evolves_to[];
	is_baby: boolean;
	species: Species;
}

export interface Evolves_to {
	evolution_details: Evolution_details[];
	evolves_to: Evolves_to[];
	is_baby: boolean;
	species: Species;
}

export interface Evolution_details {
	gender: null;
	held_item: null;
	item: null;
	known_move: null;
	known_move_type: null;
	location: null;
	min_affection: null;
	min_beauty: null;
	min_happiness: null;
	min_level: number;
	needs_overworld_rain: boolean;
	party_species: null;
	party_type: null;
	relative_physical_stats: null;
	time_of_day: string;
	trade_species: null;
	trigger: Trigger;
	turn_upside_down: boolean;
}

export interface Trigger {
	name: string;
	url: string;
}

export interface Species {
	name: string;
	url: string;
}
