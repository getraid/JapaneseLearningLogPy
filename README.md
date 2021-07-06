# Webcommand Center

Required / Programmed with: Python 3.9

## Setup 
Clone the repository to your server with `git clone http://codeserver/rapidraid/JapaneseLearningLogPy.git`
Install all dependencies: `pip3 install -r requirements.txt`

Start: `python3 start.py`

To run this in the background on a Linux server, please look into [services](https://www.google.com/search?q=linux+setup+service).

## Settings
This server application has all its settings "baked in", but you can simply override them.
If you want to that, copy `config.ini.sample` to `config.ini` and edit them.

### Settings explaination
**port** - The port of this server application. Make sure to allow it in your firewall.

**host** - Can be 127.0.0.1 for localhost only, 0.0.0.0 for all network interfaces or an individual ip-adress

**usePassword** - This enables a basic http-authentication with the username/password below. Please don't run this publicly without https. If you want to run this with https, fork and modify the code or simply use [caddy](https://caddyserver.com/) with a reverse proxy. This was/is primary meant for "indoor"-use

**user** - the user account name (only one)

**unlock_password** - the user password (only one)

## Usage
Now open your webbrowser at your defined host:port in the settings (default:  `http://localhost:5000/`).

[To be continued]

## Development
To work on the gui check out JapaneseLearningLogFrontend. 
Before that, you should disable the `usePassword` option in the `config.ini` file. 

In order to debug, you just start this python server and run it in the background. Then move into the JapaneseLearningLogFrontend folder and run `npm install && npm run serve` there.
The actual UI testing will be easier this way. Once you're done, simply run `npm run build` in the JapaneseLearningLogFrontend directory and it will output its contents into the static folder here. 
Now you can just navigate to your defined host:port address of the regular server.