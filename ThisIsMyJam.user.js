// ==UserScript==
// @include       http://www.thisismyjam.com/*
// @include       http://www.thisismyjam.com
// @include       https://www.thisismyjam.com/*
// @include       https://www.thisismyjam.com
// @require       utils.js
// ==/UserScript==

window.Unity = external.getUnityObject(1);
var _lastArtLocation = null;

function isCorrectPage() {
    var i, ids = ['player-bar'];

    for (i = 0; i < ids.length; i++) {
        if (!document.getElementById(ids[i])) {
            return false;
        }
    }

    return true;
}

function getArtLocation() {
    var img = null;

    // On Playlist page, things are easy
    img = document.querySelector('.blackHole.playing img');
    if(img)
    {
        return img.getAttribute('data-thumb');
    }

    // Let's try profile page
    img = document.querySelector('#jamHolder img');
    if(img)
    {
        return img.src;
    }

    // No can do
    return null;
}

function getTrackInfo() {
    var artist = null,
    title = null,
    artLocation = null;
    try {
        artist = document.getElementById('artist-name').textContent;
        title = document.getElementById('track-title').textContent;
        artLocation = getArtLocation();
    } catch (x) {}

    if (artLocation) {
        _lastArtLocation = artLocation;
    }
    else {
        artLocation = _lastArtLocation;
    }

    if(!title) {
        return null;
    }

    return {
        title: title,
        artist: artist,
        artLocation: artLocation,
        album: null
    };
}

function setPlaybackState() {
    var notpaused = document.getElementById('playPause').className.match(/playing$/);
    if (null !== notpaused) {
        Unity.MediaPlayer.setPlaybackState(Unity.MediaPlayer.PlaybackState.PLAYING);
    } else {
        Unity.MediaPlayer.setPlaybackState(Unity.MediaPlayer.PlaybackState.PAUSED);
    }
}

function musicPlayerSetup() {
    Unity.MediaPlayer.init("This Is My Jam");

    setInterval(wrapCallback(function retry() {
        var trackInfo = getTrackInfo();

        setPlaybackState();

        if (!trackInfo) {
            return;
        }

        Unity.MediaPlayer.setTrack(trackInfo);
    }), 1000);

    Unity.MediaPlayer.onPlayPause(wrapCallback(function () {
        click(document.getElementById('playPause'));
        setPlaybackState();
    }));

    Unity.MediaPlayer.onNext(wrapCallback(function () {
        click(document.getElementById('forwards'));
    }));

    Unity.MediaPlayer.onPrevious(wrapCallback(function () {
        click(document.getElementById('backwards'));
    }));
}

if (isCorrectPage()) {
  Unity.init({ name: "This Is My Jam",
    domain: "thisismyjam.com",
    homepage: "http://www.thisismyjam.com",
    iconUrl: "icon://unity-webapps-thisismyjam",
    onInit: wrapCallback(musicPlayerSetup) });
}
