export interface PokemonType {
  color: string;
  icon: string;
  name?: string;
};
export const colorType = (type: string): PokemonType => {
  let typeColor = {
    bug: {
      color: "#26de81",
      icon: "https://bugalert.org/images/bug.png"
    },
    dragon: {
      color: "#ffeaa7",
      icon: "https://lh3.googleusercontent.com/tEw6oZCFIrbcyuEJhFaDpy7FMyMVzRTKL3pO83x1VuCjD3B0aFPuKwxrZ3yDbGeutQ-05Rx2AaOqTHnvjgsIiYCnjIOA4HQplbJA-yoxUpjF3g"
    },
    electric: {
      color: "#fed330",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/120px-Pok%C3%A9mon_Electric_Type_Icon.svg.png"
    },
    fairy: {
      color: "#fb8aec",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/120px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png"
    },
    fighting: {
      color: "#30336b",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg/120px-Pok%C3%A9mon_Fighting_Type_Icon.svg.png"
    },
    fire: {
      color: "#f0932b",
      icon: "https://lh3.googleusercontent.com/xs3-1rHb8VTbdTcrSVEcC__sDrMnKGk3IfWnh5PJMFinc2uRQCYmzCOm5bvxrw1cN489dVkxkuHXBYNXSpZpkrCaOqYijNO6lGYK41mFDV9O"
    },
    flying: {
      color: "#81ecec",
      icon: "https://pixelmonmod.com/w/images/0/0d/FlyingType.png"
    },
    grass: {
      color: "#00b894",
      icon: "https://pixelmonmod.com/w/images/d/d6/GrassType.png"
    },
    ground: {
      color: "#EFB549",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg/120px-Pok%C3%A9mon_Ground_Type_Icon.svg.png"
    },
    ghost: {
      color: "#a55eea",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/640px-Pok%C3%A9mon_Poison_Type_Icon.svg.png"
    },
    ice: {
      color: "#74b9ff",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/120px-Pok%C3%A9mon_Ice_Type_Icon.svg.png"
    },
    normal: {
      color: "#3c4d58",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/120px-Pok%C3%A9mon_Normal_Type_Icon.svg.png"
    },
    poison: {
      color: "#6c5ce7",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/120px-Pok%C3%A9mon_Poison_Type_Icon.svg.png"
    },
    psychic: {
      color: "#a29bfe",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg/120px-Pok%C3%A9mon_Psychic_Type_Icon.svg.png"
    },
    rock: {
      color: "#2d3436",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/120px-Pok%C3%A9mon_Rock_Type_Icon.svg.png"
    },
    water: {
      color: "#0190FF",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/120px-Pok%C3%A9mon_Water_Type_Icon.svg.png"
    },
  };
  return typeColor[type];
}
