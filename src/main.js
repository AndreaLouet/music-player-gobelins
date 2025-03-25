import { gsap } from "gsap";
    
import { Draggable } from "gsap/Draggable";

class MusicPlayer {
  // Explication : Le constructeur est la première fonction lancée quand la Classe est instanciée. On y initialise les propriété, et appelle des fonctions.
  constructor() {
    this.tracks = [
      { id: 1, title: "Honey, Im Good", url: "track.mp3", img: "img.jpg", artist: "Andy Grammer"},
      { id: 2, title: "Sun Is Shining", url: "track2.mp3", img: "img2.jpeg", artist: "Axwell /\ Ingrosso"},
      { id: 3, title: "Enfance 80", url: "track3.mp3", img: "img3.jpeg", artist: "Videoclub"}
    ];
    this.currentTrackIndex = 0;
    this.audio = new Audio();
    this.isPlaying = false;
    this.volume = 0.5;
    this.init();
  }


// Explication : Ici, on est en dehors du constructor, on y défini toutes les fonctions que la classe possède.

init() {
  this.cacheDOM();
  this.bindEvents();
  this.loadTrack();
}

cacheDOM() {
  this.playlist = document.querySelector("#playlist");
  this.playButton = document.querySelector("#play");
  this.nextButton = document.querySelector("#next");
  this.prevButton = document.querySelector("#prev");
  this.trackTitle = document.querySelector("#track-title");
  this.trackImg = document.querySelector("#track-img");
  this.trackArtist = document.querySelector("#track-artist");
}

bindEvents() {
  this.playButton.addEventListener("click", () => this.togglePlay());
  this.nextButton.addEventListener("click", () => this.nextTrack());
  this.prevButton.addEventListener("click", () => this.prevTrack());
  this.audio.addEventListener("ended", () => this.nextTrack());
}

loadTrack(){
if (this.currentTrackIndex < 0 || this.currentTrackIndex >= this.tracks.length) {
  console.error("Index de piste invalide");
  return;
}
this.audio.src = this.tracks[this.currentTrackIndex].url;
this.trackTitle.textContent = this.tracks[this.currentTrackIndex].title;
this.trackImg.src = "./" + this.tracks[this.currentTrackIndex].img;
this.trackArtist.textContent = this.tracks[this.currentTrackIndex].artist;
// this.animateTitle();
}

togglePlay() {
  if (this.isPlaying) {
    this.audio.pause();
    this.isPlaying = false
  } else {
    this.audio.play().catch(err => console.error("Erreur de lecture :", err));
    this.isPlaying = true
  }
}

// Challenge : les fonction Next et previous track ont sensiblement le même traitement. En code, on cherche toujours à ne pas dupliquer de la logique, mais plutôt à factoriser.
// Peux tu créer une seule fonction à la place de deux ? Comment gérerais tu le cas à ce moment ?

nextTrack() {
  this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
  this.changeTrack();
}

prevTrack() {
  console.log(this.isPlaying)

  this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
  this.changeTrack();
}

changeTrack(){
  this.loadTrack();
  this.audio.play();
  this.isPlaying = true;
}
}


new MusicPlayer();


// BUG : Ici, on est en dehors de la classe Music Player. 
// On peut donc l'instancier avec le mot clef New, pour qu'elle soit utilisée.


// Fonctionnalités : Draggable
// On va utiiser Draggable pour drag n drop les images de notre slider, et passer d'une musique à l'autre
// https://gsap.com/docs/v3/Plugins/Draggable/

gsap.registerPlugin(Draggable, InertiaPlugin);

Draggable.create("#track-img", {
  type: "x",
  inertia: true,
  onClick: function () {
    console.log("clicked");
  },
  onDragEnd: function () {
    console.log("drag ended");
  },
});


// Tu dois commencer par installer gsap dans ton projet : npm i gsap
// L'importer en haut du fichier, puis entre ton import et ta classe, ajouter gsap.registerPlugin(Draggable)

// On va créer une fonction setupDraggable que l'on va appeler ensuite dans le constructor. Elle contiendra la logique du drag.
// On va utiliser la fonction create de Draggable pour construire notre instance de Draggable.
// On voit dans la doc que Draggable a besoin d'un id de container HTML pour déclencher la feature de drag sur cet élément.
// En deuxième paramètre, c'est l'objet de config de cette instance draggable

// Dans cet objet veut utiliser le "Snap", c'est à dire la magnétisation vers un item lorsqu'on relache le drag
// Pour utiliser Snap, il faut également ajouter le Inertia Plugin, (normalement payant, mais la on peut simplement utiliser une version gratos)
// La façon de le faire est d'importer le fichier js https://assets.codepen.io/16327/InertiaPlugin.min.js, dans une balise script, dans ton fichier HTML.

// Bien, si tu cherches dans la doc de Draggable le mot "snap", tu vas trouver comment est ce qu'on s'en sert. Elle se déclenche dès lors que tu relâche le drag.

// Ton objectif est de lui passer la valeur vers laquelle il va se déplacer (en fonction de la où tu te trouves déjà)
// Indice : tu as besoin de la largeur de tes covers de musique.
// Teste, expérimente, réfléchis.


// Fonctionnalité : Split Text

// De même, on va utiliser le Plugin Split Text (normalement payant) de GSAP.
// Tu peux trouver le fichier à utiliser ici : https://codepen.io/GreenSock/full/OPqpRJ/


// De même, on va créer une fonction à appeler dans le constructeur pour "Split" tous nos titres en petits lignes, mots, ou caractères. Nomme la comme tu veux.
// Dedans, construit un SplitText comme dans la doc (avec le mot clef New)
// Split text prend en premier paramètre le selecteur (ID, class css...) à Splitter, et en second, un objet de config, comprenant le type en quoi casser ce texte : lines, words, chars.

// Tu peux regarder dans ton inspecteur, il aura automatiquement cassé le HTML en plus petits blocs.

// De la, tu peux utiliser la fonction gsap.from

// NB : gsap.to(), prends les valeurs par défaut de ton élément, et anime jusqu'aux valeurs que tu donnes dans le to()
// alors que gsap.from(), prend les valeurs que tu donnes dans le from(), et les anim jusqu'à la valeur de base de ton élément.

// ex: j'ai une div avec un background bleu par défaut, si je fais

// gsap.to('#element', {
//   duration: 1, 
//   backgroundColor: 'red'
// });

// il passera du bleu à rouge.
// alors que si je fais

// gsap.from('#element', {
//   duration: 1, 
//   backgroundColor: 'red'
// });

// il passera de rouge à bleu.

// Quand tu auras fait le split, tu voudras peut être qu'il soit caché par un bloc invisible.
// Indice : Tu peux surement y arriver avec une dif parente qui possède un overflow: hidden


// Si tu veux lancer les animations de texte sur le bon élément à chaque fois que tu changes de musique, il va falloir que tu créer une fonction qui sera appelée :
// A chaque snap (quand tu changes de musique avec Draggable)
// A chaque click sur (previous ou next)

// Tu voudras surement que tes éléments soient en absolute.
// Et tu cherches à lancer une fonction pour "cacher" ton split text précédent, et "faire apparaitre" ton split text suivant

// Je te laisse chercher et collaborer avec les autres :)