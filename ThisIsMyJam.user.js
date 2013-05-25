// ==UserScript==
// @name          thisismyjam-unity-integration
// @include       http://www.thisismyjam.com/*
// @require       utils.js
// ==/UserScript==

window.Unity = external.getUnityObject(1.0);

function isCorrectPage() {
    var i, ids = ['player-bar'];

    for (i = 0; i < ids.length; i++) {
        if (!document.getElementById(ids[i])) {
            return false;
        }
    }

    return true;
}

function getTrackInfo() {
    var artist = null,
    title = null,
    artLocation = null;
    try {
        artist = document.getElementById('artist-name').textContent;
        title = document.getElementById('track-title').textContent;
        //artLocation = document.evaluate('//*[@class="playing"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.src;
    } catch (x) {}

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

function musicPlayerSetup() {
    Unity.MediaPlayer.init("This Is My Jam");

    setInterval(wrapCallback(function retry() {
        var trackInfo = getTrackInfo();

        if (!trackInfo) {
            return;
        }

        var notpaused = document.getElementById('playPause').className.match(/playing$/);
        if (null !== notpaused) {
            Unity.MediaPlayer.setPlaybackState(Unity.MediaPlayer.PlaybackState.PLAYING);
        } else {
            Unity.MediaPlayer.setPlaybackState(Unity.MediaPlayer.PlaybackState.PAUSED);
        }
        Unity.MediaPlayer.setTrack(trackInfo);
    }), 1000);

    Unity.MediaPlayer.onPlayPause(wrapCallback(function () {
        launchClickEvent(document.getElementById('playPause'));
    }));

    Unity.MediaPlayer.onNext(wrapCallback(function () {
        launchClickEvent(document.getElementById('forwards'));
    }));

    Unity.MediaPlayer.onPrevious(wrapCallback(function () {
        launchClickEvent(document.getElementById('backwards'));
    }));
}

if (isCorrectPage()) {
  Unity.init({ name: "This Is My Jam",
    domain: "thisismyjam.com",
    homepage: "http://www.thisismyjam.com/",
    iconUrl: "icon://unity-webapps-thisismyjam",
    onInit: wrapCallback(musicPlayerSetup) });
}
