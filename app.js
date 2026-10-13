"use strict";

/* =========================================================
   CHANSONS D'AMOUR
   Slogan : Des mélodies qui parlent au cœur.
   ========================================================= */

/* -------------------- LISTE DES CHANSONS -------------------- */

const SONGS = [
  { title: "A Tes Côtés", audio: "A Tes Côtés.mp3", lyrics: "" },
  { title: "Comme dans les films", audio: "Comme dans les films.mp3", lyrics: "" },
  { title: "Dans tes bras", audio: "Dans tes bras.mp3", lyrics: "" },
  { title: "Derrire mon sourire", audio: "Derrire mon sourire.mp3", lyrics: "" },
  { title: "Je Pense à Toi la Nuit", audio: "Je Pense à Toi la Nuit.mp3", lyrics: "" },
  { title: "Je rêve encore de nous", audio: "Je rêve encore de nous.mp3", lyrics: "" },
  { title: "Je serai là pour toi", audio: "Je serai là pour toi.mp3", lyrics: "" },
  { title: "Je te choisis", audio: "Je te choisis.mp3", lyrics: "" },
  { title: "La Raison de mon sourire", audio: "La Raison de mon sourire.mp3", lyrics: "" },
  { title: "Le Chant de la pluie", audio: "Le Chant de la pluie.mp3", lyrics: "" },
  { title: "Le Jour Où Tu M'aimeras", audio: "Le Jour Où Tu M'aimeras.mp3", lyrics: "" },
  { title: "Messagère invisible", audio: "Messagère invisible.mp3", lyrics: "" },
  { title: "Mon coeur te choisit", audio: "Mon coeur te choisit.mp3", lyrics: "" },
  { title: "Mon Plus Beau Rêve", audio: "Mon Plus Beau Rêve.mp3", lyrics: "" },
  { title: "Mon éternit", audio: "Mon éternit.mp3", lyrics: "" },
  { title: "Même dans mes rêves", audio: "Même dans mes rêves.mp3", lyrics: "" },
  { title: "Même si tu pars", audio: "Même si tu pars", lyrics: "" },
  { title: "Plus que les mots", audio: "Plus que les mots.mp3", lyrics: "" },
  { title: "Quand nous serons ensemble", audio: "Quand nous serons ensemble.mp3", lyrics: "" },
  { title: "Reine de mon coeur", audio: "Reine de mon coeur.mp3", lyrics: "" },
  { title: "Sans Toi Je Ne Suis Rien", audio: "Sans Toi Je Ne Suis Rien.mp3", lyrics: "" },
  { title: "Si mon coeur pouvait parler", audio: "Si mon coeur pouvait parler.mp3", lyrics: "" },
  { title: "Si Tu Savais", audio: "Si Tu Savais.mp3", lyrics: "" },
  { title: "Tant de choses à te dire", audio: "Tant de choses à te dire.mp3", lyrics: "" },
  { title: "Ton Amour Mon Bonheur", audio: "Ton Amour Mon Bonheur.mp3", lyrics: "" },
  { title: "Ton nom dans mes silences", audio: "Ton nom dans mes silences.mp3", lyrics: "" },
  { title: "Tu as changé ma vie", audio: "Tu as changé ma vie.mp3", lyrics: "" },
  { title: "Tu es la première", audio: "Tu es la première.mp3", lyrics: "" },
  { title: "Tu fais danser mon coeur", audio: "Tu fais danser mon coeur.mp3", lyrics: "" },
  { title: "Un jour je te parlerai", audio: "Un jour je te parlerai.mp3", lyrics: "" }
];

/* -------------------- OUTILS -------------------- */

const $ = (selector) => document.querySelector(selector);

function loadStoredArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Impossible d'enregistrer les données :", error);
  }
}

/* -------------------- ÉTAT DE L'APPLICATION -------------------- */

let favorites = loadStoredArray("chansonsAmourFavorites");
let currentSongIndex = -1;
let currentLibrary = SONGS.slice();
let currentPage = "page-home";
let previousPage = "page-home";
let navigationHistory = [];
let lyricsVisible = false;
let repeatMode = "none";
let isChangingSong = false;

/* -------------------- ÉLÉMENTS HTML -------------------- */

const audioPlayer = $("#audio-player");
const songList = $("#song-list");
const searchInput = $("#search");
const emptyMessage = $("#empty-message");

const nowPlaying = $("#now-playing");
const audioStatus = $("#audio-status");

const lyricsBox = $("#lyrics-box");
const lyricsTitle = $("#lyrics-title");
const lyricsText = $("#lyrics-text");

const repeatButton = $("#repeat-mode");
const themeButton = $("#theme-toggle");
const backButton = $("#back-button");

/* -------------------- CHEMIN DES CHANSONS -------------------- */

function getAudioPath(song) {
  return "audios/" + encodeURI(song.audio);
}


window.addEventListener("popstate", () => {
  if (navigationHistory.length > 0) {
    const previous = navigationHistory.pop();
    showPage(previous, false);
  } else if (currentPage !== "page-home") {
    showPage("page-home", false);
/* -------------------- NAVIGATION -------------------- */

function showPage(pageId, addToHistory = true) {
  const targetPage = document.getElementById(pageId);

  if (!targetPage) {
    console.warn("Page introuvable :", pageId);
    return;
  }

  if (addToHistory && currentPage !== pageId) {
    navigationHistory.push(currentPage);
    previousPage = currentPage;

    // Permet au bouton Retour Android de revenir à la page précédente.
    history.pushState({ page: pageId }, "", "#" + pageId);
  }

  document.querySelectorAll(".page").forEach((page) => {
    page.hidden = true;
    page.classList.remove("active");
  });

  targetPage.hidden = false;
  targetPage.classList.add("active");

  currentPage = pageId;

  if (backButton) {
    backButton.hidden = pageId === "page-home";
  }

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });
}

function goHome() {
  showPage("page-home");
}

function goBack() {
  if (navigationHistory.length > 0) {
    history.back();
    return;
  }

  if (currentPage !== "page-home") {
    showPage("page-home", false);
    return;
  }

  const shouldLeave = window.confirm(
    "Voulez-vous vraiment quitter Chansons d’Amour ?"
  );

  if (shouldLeave) {
    history.back();
  }
}

/* Boutons de retour visibles */

backButton?.addEventListener("click", goBack);

$("#player-back")?.addEventListener("click", goBack);

$("#creator-back")?.addEventListener("click", goBack);

/* Retour navigateur et navigation Android */

window.addEventListener("popstate", () => {
  if (navigationHistory.length > 0) {
    const previous = navigationHistory.pop();
    showPage(previous, false);
  } else if (currentPage !== "page-home") {
    showPage("page-home", false);
  }
});
/* -------------------- PAGE D'ACCUEIL -------------------- */

$("#show-all")?.addEventListener("click", () => {
  currentLibrary = SONGS.slice();

  if (searchInput) {
    searchInput.value = "";
  }

  renderSongList(currentLibrary);
  showPage("page-songs");
});

$("#show-favorites")?.addEventListener("click", () => {
  currentLibrary = SONGS.filter((song) =>
    favorites.includes(song.audio)
  );

  if (searchInput) {
    searchInput.value = "";
  }

  renderSongList(currentLibrary);
  showPage("page-songs");
});

$("#creator-button")?.addEventListener("click", () => {
  showPage("page-creator");
});

/* -------------------- AFFICHAGE DES CHANSONS -------------------- */

function renderSongList(songs) {
  if (!songList) {
    return;
  }

  songList.replaceChildren();

  if (emptyMessage) {
    emptyMessage.hidden = songs.length > 0;
  }

  songs.forEach((song) => {
    const originalIndex = SONGS.findIndex(
      (item) => item.audio === song.audio
    );

    const row = document.createElement("div");
    row.className = "song-row";

    const playButton = document.createElement("button");
    playButton.type = "button";
    playButton.className = "song-title-button";
    playButton.textContent = song.title;
    playButton.setAttribute("aria-label", "Écouter " + song.title);

    playButton.addEventListener("click", () => {
      playSong(originalIndex);
    });

    const favoriteButton = document.createElement("button");
    favoriteButton.type = "button";
    favoriteButton.className = "favorite-button";

    updateFavoriteButton(favoriteButton, song);

    favoriteButton.addEventListener("click", () => {
      toggleFavorite(song);
      updateFavoriteButton(favoriteButton, song);
    });

    row.append(playButton, favoriteButton);
    songList.appendChild(row);
  });
}

function updateFavoriteButton(button, song) {
  const isFavorite = favorites.includes(song.audio);

  button.textContent = isFavorite ? "♥" : "♡";
  button.setAttribute(
    "aria-label",
    isFavorite
      ? "Retirer des favoris"
      : "Ajouter aux favoris"
  );
  button.setAttribute("aria-pressed", String(isFavorite));
  button.title = isFavorite
    ? "Retirer des favoris"
    : "Ajouter aux favoris";
}

/* -------------------- RECHERCHE -------------------- */

searchInput?.addEventListener("input", () => {
  const query = searchInput.value.trim().toLocaleLowerCase("fr");

  const results = currentLibrary.filter((song) =>
    song.title.toLocaleLowerCase("fr").includes(query)
  );

  renderSongList(results);
});

/* -------------------- FAVORIS -------------------- */

function toggleFavorite(song) {
  if (favorites.includes(song.audio)) {
    favorites = favorites.filter(
      (filename) => filename !== song.audio
    );
  } else {
    favorites.push(song.audio);
  }

  saveValue("chansonsAmourFavorites", favorites);

  if (currentPage === "page-songs") {
    if (
      currentLibrary.every((item) =>
        favorites.includes(item.audio)
      ) ||
      currentLibrary.length === 0
    ) {
      currentLibrary = SONGS.filter((item) =>
        favorites.includes(item.audio)
      );
    }

    const query = searchInput?.value.trim().toLocaleLowerCase("fr") || "";

    const results = currentLibrary.filter((item) =>
      item.title.toLocaleLowerCase("fr").includes(query)
    );

    renderSongList(results);
  }
}

/* -------------------- LECTEUR MUSICAL -------------------- */

function playSong(index) {
  if (index < 0 || index >= SONGS.length) {
    return;
  }

  if (!audioPlayer) {
    return;
  }

  currentSongIndex = index;

  const song = SONGS[currentSongIndex];

  isChangingSong = true;

  audioPlayer.pause();
  audioPlayer.src = getAudioPath(song);
  audioPlayer.loop = repeatMode === "one";
  audioPlayer.load();

  if (nowPlaying) {
    nowPlaying.textContent = song.title;
  }

  if (audioStatus) {
    audioStatus.textContent = "Chargement de la chanson…";
  }

  updateLyrics(song);
  updateCurrentRepeatControl();

  showPage("page-player");

  const playPromise = audioPlayer.play();

  if (playPromise && typeof playPromise.then === "function") {
    playPromise
      .then(() => {
        if (audioStatus) {
          audioStatus.textContent = "Lecture en cours";
        }
      })
      .catch((error) => {
        console.warn("Lecture impossible :", error);

        if (audioStatus) {
          audioStatus.textContent =
            "Impossible de lire cette chanson. Vérifiez le fichier audio.";
        }
      })
      .finally(() => {
        isChangingSong = false;
      });
  } else {
    isChangingSong = false;
  }
}

function playNextSong() {
  if (SONGS.length === 0) {
    return;
  }

  const nextIndex = (currentSongIndex + 1) % SONGS.length;
  playSong(nextIndex);
}

function playPreviousSong() {
  if (SONGS.length === 0) {
    return;
  }

  const previousIndex =
    (currentSongIndex - 1 + SONGS.length) % SONGS.length;

  playSong(previousIndex);
}

$("#next")?.addEventListener("click", playNextSong);

$("#previous")?.addEventListener("click", playPreviousSong);

audioPlayer?.addEventListener("play", () => {
  if (audioStatus) {
    audioStatus.textContent = "Lecture en cours";
  }
});

audioPlayer?.addEventListener("pause", () => {
  if (
    audioStatus &&
    !audioPlayer.ended &&
    audioPlayer.currentSrc
  ) {
    audioStatus.textContent = "Lecture en pause";
  }
});

audioPlayer?.addEventListener("waiting", () => {
  if (audioStatus) {
    audioStatus.textContent = "Chargement…";
  }
});

audioPlayer?.addEventListener("error", () => {
  if (isChangingSong) {
    return;
  }

  if (audioStatus) {
    audioStatus.textContent =
      "Fichier audio introuvable ou impossible à lire.";
  }
});

/* -------------------- MODES DE RÉPÉTITION -------------------- */

const repeatLabels = {
  none: "Répétition : aucune",
  one: "Répétition : chanson actuelle",
  all: "Répétition : toute la liste"
};

function updateCurrentRepeatControl() {
  if (repeatButton) {
    repeatButton.value = repeatMode;
    repeatButton.setAttribute(
      "aria-label",
      repeatLabels[repeatMode]
    );
    repeatButton.title = repeatLabels[repeatMode];
  }

  if (audioPlayer) {
    audioPlayer.loop = repeatMode === "one";
  }
}

function setRepeatMode(mode) {
  if (!["none", "one", "all"].includes(mode)) {
    return;
  }

  repeatMode = mode;
  updateCurrentRepeatControl();
}

repeatButton?.addEventListener("change", () => {
  setRepeatMode(repeatButton.value);
});

audioPlayer?.addEventListener("ended", () => {
  if (repeatMode === "one") {
    return;
  }

  if (repeatMode === "all") {
    playNextSong();
    return;
  }

  if (currentSongIndex < SONGS.length - 1) {
    playSong(currentSongIndex + 1);
  } else if (audioStatus) {
    audioStatus.textContent = "Fin de la liste de chansons.";
  }
});

/* -------------------- PAROLES DES CHANSONS -------------------- */

function updateLyrics(song) {
  if (lyricsTitle) {
    lyricsTitle.textContent = "Paroles — " + song.title;
  }

  if (lyricsText) {
    lyricsText.textContent = song.lyrics.trim()
      ? song.lyrics
      : "Les paroles de cette chanson n’ont pas encore été ajoutées.";
  }

  if (lyricsBox) {
    lyricsBox.hidden = !lyricsVisible;
  }

  const toggleButton = $("#lyrics-toggle");

  if (toggleButton) {
    toggleButton.textContent = lyricsVisible
      ? "Masquer les paroles"
      : "Afficher les paroles";
  }
}

$("#lyrics-toggle")?.addEventListener("click", () => {
  lyricsVisible = !lyricsVisible;

  const song = SONGS[currentSongIndex];

  if (song) {
    updateLyrics(song);
  }
});

$("#copy-lyrics")?.addEventListener("click", async () => {
  const song = SONGS[currentSongIndex];

  if (!song || !song.lyrics.trim()) {
    window.alert("Les paroles de cette chanson ne sont pas encore disponibles.");
    return;
  }

  try {
    await navigator.clipboard.writeText(song.lyrics);
    window.alert("Les paroles ont été copiées.");
  } catch (error) {
    console.warn("Copie impossible :", error);
    window.alert("La copie automatique n'est pas disponible sur cette page.");
  }
});

/* -------------------- THÈME CLAIR / SOMBRE -------------------- */

function applyTheme(theme) {
  const darkMode = theme === "dark";

  document.body.classList.toggle("dark", darkMode);

  if (themeButton) {
    themeButton.textContent = darkMode ? "☀️" : "🌙";
    themeButton.setAttribute(
      "aria-label",
      darkMode ? "Activer le thème clair" : "Activer le thème sombre"
    );
  }
}

let savedTheme = "light";

try {
  savedTheme = localStorage.getItem("chansonsAmourTheme") || "light";
} catch (error) {
  console.warn("Impossible de lire le thème enregistré :", error);
}

applyTheme(savedTheme);

themeButton?.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark")
    ? "light"
    : "dark";

  applyTheme(nextTheme);

  try {
    localStorage.setItem("chansonsAmourTheme", nextTheme);
  } catch (error) {
    console.warn("Impossible d'enregistrer le thème :", error);
  }
});

/* -------------------- INFORMATIONS DU CRÉATEUR -------------------- */

const creatorPhoto = document.querySelector(".creator-photo");

if (creatorPhoto) {
  creatorPhoto.alt = "Photo du créateur de Chansons d’Amour";
}

/*
  La page du créateur utilise la photo images/createur.png.
  La biographie détaillée pourra être ajoutée dans index.html.
*/

/* -------------------- INITIALISATION -------------------- */

function initializeApp() {
  renderSongList(SONGS);
  updateCurrentRepeatControl();

  if (audioPlayer) {
    audioPlayer.loop = false;
  }

  showPage("page-home", false);

  console.log("Chansons d’Amour est prête.");
  console.log("Nombre de chansons :", SONGS.length);
}

document.addEventListener("DOMContentLoaded", initializeApp);

/* -------------------- SERVICE WORKER -------------------- */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        console.log(
          "Service worker enregistré :",
          registration.scope
        );
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'enregistrement du service worker :",
          error
        );
      });
  });
});

  if (playPromise && typeof playPromise.then === "function") {
    playPromise
      .then(() => {
        if (audioStatus) {
          audioStatus.textContent = "Lecture en cours";
        }
      })
      .catch((error) => {
        console.warn("Lecture impossible :", error);

        if (audioStatus) {
          audioStatus.textContent =
            "Impossible de lire cette chanson. Vérifiez le fichier audio.";
        }
      })
      .finally(() => {
        isChangingSong = false;
      });
  } else {
    isChangingSong = false;
  }
}

function playNextSong() {
  if (SONGS.length === 0) {
    return;
  }

  const nextIndex = (currentSongIndex + 1) % SONGS.length;
  playSong(nextIndex);
}

function playPreviousSong() {
  if (SONGS.length === 0) {
    return;
  }

  const previousIndex =
    (currentSongIndex - 1 + SONGS.length) % SONGS.length;

  playSong(previousIndex);
}

$("#next")?.addEventListener("click", playNextSong);

$("#previous")?.addEventListener("click", playPreviousSong);

audioPlayer?.addEventListener("play", () => {
  if (audioStatus) {
    audioStatus.textContent = "Lecture en cours";
  }
});

audioPlayer?.addEventListener("pause", () => {
  if (
    audioStatus &&
    !audioPlayer.ended &&
    audioPlayer.currentSrc
  ) {
    audioStatus.textContent = "Lecture en pause";
  }
});

audioPlayer?.addEventListener("waiting", () => {
  if (audioStatus) {
    audioStatus.textContent = "Chargement…";
  }
});

audioPlayer?.addEventListener("error", () => {
  if (isChangingSong) {
    return;
  }

  if (audioStatus) {
    audioStatus.textContent =
      "Fichier audio introuvable ou impossible à lire.";
  }
});

/* -------------------- MODES DE RÉPÉTITION -------------------- */

const repeatLabels = {
  none: "Répétition : aucune",
  one: "Répétition : chanson actuelle",
  all: "Répétition : toute la liste"
};

function updateCurrentRepeatControl() {
  if (repeatButton) {
    repeatButton.value = repeatMode;
    repeatButton.setAttribute(
      "aria-label",
      repeatLabels[repeatMode]
    );
    repeatButton.title = repeatLabels[repeatMode];
  }

  if (audioPlayer) {
    audioPlayer.loop = repeatMode === "one";
  }
}

function setRepeatMode(mode) {
  if (!["none", "one", "all"].includes(mode)) {
    return;
  }

  repeatMode = mode;
  updateCurrentRepeatControl();
}

repeatButton?.addEventListener("change", () => {
  setRepeatMode(repeatButton.value);
});

audioPlayer?.addEventListener("ended", () => {
  if (repeatMode === "one") {
    return;
  }

  if (repeatMode === "all") {
    playNextSong();
    return;
  }

  if (currentSongIndex < SONGS.length - 1) {
    playSong(currentSongIndex + 1);
  } else if (audioStatus) {
    audioStatus.textContent = "Fin de la liste de chansons.";
  }
});

/* -------------------- PAROLES DES CHANSONS -------------------- */

function updateLyrics(song) {
  if (lyricsTitle) {
    lyricsTitle.textContent = "Paroles — " + song.title;
  }

  if (lyricsText) {
    lyricsText.textContent = song.lyrics.trim()
      ? song.lyrics
      : "Les paroles de cette chanson n’ont pas encore été ajoutées.";
  }

  if (lyricsBox) {
    lyricsBox.hidden = !lyricsVisible;
  }

  const toggleButton = $("#lyrics-toggle");

  if (toggleButton) {
    toggleButton.textContent = lyricsVisible
      ? "Masquer les paroles"
      : "Afficher les paroles";
  }
}

$("#lyrics-toggle")?.addEventListener("click", () => {
  lyricsVisible = !lyricsVisible;

  const song = SONGS[currentSongIndex];

  if (song) {
    updateLyrics(song);
  }
});

$("#copy-lyrics")?.addEventListener("click", async () => {
  const song = SONGS[currentSongIndex];

  if (!song || !song.lyrics.trim()) {
    window.alert("Les paroles de cette chanson ne sont pas encore disponibles.");
    return;
  }

  try {
    await navigator.clipboard.writeText(song.lyrics);
    window.alert("Les paroles ont été copiées.");
  } catch (error) {
    console.warn("Copie impossible :", error);
    window.alert("La copie automatique n'est pas disponible sur cette page.");
  }
});

/* -------------------- THÈME CLAIR / SOMBRE -------------------- */

function applyTheme(theme) {
  const darkMode = theme === "dark";

  document.body.classList.toggle("dark", darkMode);

  if (themeButton) {
    themeButton.textContent = darkMode ? "☀️" : "🌙";
    themeButton.setAttribute(
      "aria-label",
      darkMode ? "Activer le thème clair" : "Activer le thème sombre"
    );
  }
}

let savedTheme = "light";

try {
  savedTheme = localStorage.getItem("chansonsAmourTheme") || "light";
} catch (error) {
  console.warn("Impossible de lire le thème enregistré :", error);
}

applyTheme(savedTheme);

themeButton?.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark")
    ? "light"
    : "dark";

  applyTheme(nextTheme);

  try {
    localStorage.setItem("chansonsAmourTheme", nextTheme);
  } catch (error) {
    console.warn("Impossible d'enregistrer le thème :", error);
  }
});

/* -------------------- INFORMATIONS DU CRÉATEUR -------------------- */

const creatorPhoto = document.querySelector(".creator-photo");

if (creatorPhoto) {
  creatorPhoto.alt = "Photo du créateur de Chansons d’Amour";
}

/*
  La page du créateur utilise la photo images/createur.png.
  La biographie détaillée pourra être ajoutée dans index.html.
*/

/* -------------------- INITIALISATION -------------------- */

function initializeApp() {
  renderSongList(SONGS);
  updateCurrentRepeatControl();

  if (audioPlayer) {
    audioPlayer.loop = false;
  }

  showPage("page-home", false);

  console.log("Chansons d’Amour est prête.");
  console.log("Nombre de chansons :", SONGS.length);
}

document.addEventListener("DOMContentLoaded", initializeApp);

/* -------------------- SERVICE WORKER -------------------- */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        console.log(
          "Service worker enregistré :",
          registration.scope
        );
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'enregistrement du service worker :",
          error
        );
      });
  });
                         }g = true;

  audioPlayer.pause();
  audioPlayer.src = getAudioPath(song);
  audioPlayer.loop = repeatMode === "one";
  audioPlayer.load();

  if (nowPlaying) {
    nowPlaying.textContent = song.title;
  }

  if (audioStatus) {
    audioStatus.textContent = "Chargement de la chanson…";
  }

  updateLyrics(song);
  updateCurrentRepeatControl();

  showPage("page-player");

  const playPromise = audioPlayer.play();

  if (playPromise && typeof playPromise.then === "function") {
    playPromise
      .then(() => {
        if (audioStatus) {
          audioStatus.textContent = "Lecture en cours";
        }
      })
      .catch((error) => {
        console.warn("Lecture impossible :", error);

        if (audioStatus) {
          audioStatus.textContent =
            "Impossible de lire cette chanson. Vérifiez le fichier audio.";
        }
      })
      .finally(() => {
        isChangingSong = false;
      });
  } else {
    isChangingSong = false;
  }
}

function playNextSong() {
  if (SONGS.length === 0) {
    return;
  }

  const nextIndex = (currentSongIndex + 1) % SONGS.length;
  playSong(nextIndex);
}

function playPreviousSong() {
  if (SONGS.length === 0) {
    return;
  }

  const previousIndex =
    (currentSongIndex - 1 + SONGS.length) % SONGS.length;

  playSong(previousIndex);
}

$("#next")?.addEventListener("click", playNextSong);

$("#previous")?.addEventListener("click", playPreviousSong);

audioPlayer?.addEventListener("play", () => {
  if (audioStatus) {
    audioStatus.textContent = "Lecture en cours";
  }
});

audioPlayer?.addEventListener("pause", () => {
  if (
    audioStatus &&
    !audioPlayer.ended &&
    audioPlayer.currentSrc
  ) {
    audioStatus.textContent = "Lecture en pause";
  }
});

audioPlayer?.addEventListener("waiting", () => {
  if (audioStatus) {
    audioStatus.textContent = "Chargement…";
  }
});

audioPlayer?.addEventListener("error", () => {
  if (isChangingSong) {
    return;
  }

  if (audioStatus) {
    audioStatus.textContent =
      "Fichier audio introuvable ou impossible à lire.";
  }
});

/* -------------------- MODES DE RÉPÉTITION -------------------- */

/*
  none : aucune répétition de la liste
  one  : répéter la chanson actuelle
  all  : répéter toute la liste
*/

const repeatLabels = {
  none: "Répétition : aucune",
  one: "Répétition : chanson actuelle",
  all: "Répétition : toute la liste"
};

function updateCurrentRepeatControl() {
  if (repeatButton) {
    repeatButton.value = repeatMode;
    repeatButton.setAttribute(
      "aria-label",
      repeatLabels[repeatMode]
    );
    repeatButton.title = repeatLabels[repeatMode];
  }

  if (audioPlayer) {
    audioPlayer.loop = repeatMode === "one";
  }
}

function setRepeatMode(mode) {
  if (!["none", "one", "all"].includes(mode)) {
    return;
  }

  repeatMode = mode;
  updateCurrentRepeatControl();
}

repeatButton?.addEventListener("change", () => {
  setRepeatMode(repeatButton.value);
});

audioPlayer?.addEventListener("ended", () => {
  if (repeatMode === "one") {
    return;
  }

  if (repeatMode === "all") {
    playNextSong();
    return;
  }

  if (currentSongIndex < SONGS.length - 1) {
    playSong(currentSongIndex + 1);
  } else if (audioStatus) {
    audioStatus.textContent = "Fin de la liste de chansons.";
  }
});

/* -------------------- PAROLES DES CHANSONS -------------------- */

function updateLyrics(song) {
  if (lyricsTitle) {
    lyricsTitle.textContent = "Paroles — " + song.title;
  }

  if (lyricsText) {
    lyricsText.textContent = song.lyrics.trim()
      ? song.lyrics
      : "Les paroles de cette chanson n’ont pas encore été ajoutées.";
  }

  if (lyricsBox) {
    lyricsBox.hidden = !lyricsVisible;
  }

  const toggleButton = $("#lyrics-toggle");

  if (toggleButton) {
    toggleButton.textContent = lyricsVisible
      ? "Masquer les paroles"
      : "Afficher les paroles";
  }
}

$("#lyrics-toggle")?.addEventListener("click", () => {
  lyricsVisible = !lyricsVisible;

  const song = SONGS[currentSongIndex];

  if (song) {
    updateLyrics(song);
  }
});

$("#copy-lyrics")?.addEventListener("click", async () => {
  const song = SONGS[currentSongIndex];

  if (!song || !song.lyrics.trim()) {
    window.alert("Les paroles de cette chanson ne sont pas encore disponibles.");
    return;
  }

  try {
    await navigator.clipboard.writeText(song.lyrics);
    window.alert("Les paroles ont été copiées.");
  } catch (error) {
    console.warn("Copie impossible :", error);
    window.alert("La copie automatique n'est pas disponible sur cette page.");
  }
});

/* -------------------- THÈME CLAIR / SOMBRE -------------------- */

function applyTheme(theme) {
  const darkMode = theme === "dark";

  document.body.classList.toggle("dark", darkMode);

  if (themeButton) {
    themeButton.textContent = darkMode ? "☀️" : "🌙";
    themeButton.setAttribute(
      "aria-label",
      darkMode ? "Activer le thème clair" : "Activer le thème sombre"
    );
  }
}

let savedTheme = "light";

try {
  savedTheme = localStorage.getItem("chansonsAmourTheme") || "light";
} catch (error) {
  console.warn("Impossible de lire le thème enregistré :", error);
}

applyTheme(savedTheme);

themeButton?.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark")
    ? "light"
    : "dark";

  applyTheme(nextTheme);

  try {
    localStorage.setItem("chansonsAmourTheme", nextTheme);
  } catch (error) {
    console.warn("Impossible d'enregistrer le thème :", error);
  }
});

/* -------------------- INFORMATIONS DU CRÉATEUR -------------------- */

const creatorPhoto = document.querySelector(".creator-photo");

if (creatorPhoto) {
  creatorPhoto.alt = "Photo du créateur de Chansons d’Amour";
}

/*
  La page du créateur utilise la photo images/createur.png.
  La biographie détaillée pourra être ajoutée dans index.html.
*/

/* -------------------- INITIALISATION -------------------- */

function initializeApp() {
  renderSongList(SONGS);
  updateCurrentRepeatControl();

  if (audioPlayer) {
    audioPlayer.loop = false;
  }

  showPage("page-home", false);

  console.log("Chansons d’Amour est prête.");
  console.log("Nombre de chansons :", SONGS.length);
}

document.addEventListener("DOMContentLoaded", initializeApp);

/* -------------------- SERVICE WORKER -------------------- */

/*
  Prépare la mise en cache des fichiers pour une utilisation
  hors connexion. Le site doit être servi en HTTPS ou depuis
  localhost pour que le navigateur puisse normalement l'activer.
*/

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        console.log(
          "Service worker enregistré :",
          registration.scope
        );
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'enregistrement du service worker :",
          error
        );
      });
  });
}
