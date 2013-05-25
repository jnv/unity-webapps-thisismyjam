# Ubuntu Unity Integration for [This Is My Jam](http://www.thisismyjam.com/)

> This Is My Jam is for sharing one song at a time. Pick the one that means the most to you right now and discover which songs truly matter to your friends.
> [More…](http://www.thisismyjam.com/about)

This integration adds Media Player support.
Once you start playing a playlist, you can pause and skip songs from the sound menu.

![This Is My Jam sound menu](https://raw.github.com/jnv/unity-webapps-thisismyjam/screenshots/screenshot.png)

You also get a convenient icon in the application launcher.

## Installation

### Build Your Own Package

You can build and install DEB package yourself, using e.g. `dpkg-buildpackage`:

```sh
sudo apt-get install dpkg-dev # For dpkg-buildpackage

git clone https://github.com/jnv/unity-webapps-thisismyjam.git
cd unity-webapps-thisismyjam
dpkg-buildpackage
sudo dpkg -i ../unity-webapps-thisismyjam*.deb
```

### Install from PPA

If you trust me, you can use my [Unity-Webapps Personal Package Archive](https://launchpad.net/~jnv/+archive/unity-webapps).

Review PPA's content and run:

```sh
sudo add-apt-repository ppa:jnv/unity-webapps
sudo apt-get update
sudo apt-get install unity-webapps-thisismyjam
```

## TODO

* Cover images support; maybe from `.blackHole.playing` element?
* Like support, possibly via `Unity.Launcher` actions
* Indicate playlist status via `setCanGoNext`/`setCanGoPrev`/`setCanPlay`/`setCanPause` methods
* Test coverage
* Use TIMJ's `unsafeWindow.player` for playback events instead of polling (how risky is that?)
* Submit to Webapps team to make it official part of Ubuntu
