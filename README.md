Tinkerkit Arduio based audio player

### Install 

1\. Install SoX. For OSX it's best to use Homebrew

```
brew install sox
```

For Raspberry, run

```
sudo apt-get install sox
```

2\. Install modules (assuming you have npm and volo installed)

```
npm install duino socket.io tako
volo install
```

3\. Create ```music``` subdirectory and put some audio files there

4\. Connect Arduino with Tinkerkit joystick assigned to I0 and I1

4\. Run

```
node app.js
```

5\. Point browser to

```
localhost:8000/client/index.html
```

