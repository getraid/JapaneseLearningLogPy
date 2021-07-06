
import os
import server

from server import config, app

if __name__ == '__main__':
    if(not os.path.exists("database.db")):
        import createDatabase

    # get port / host from config
    portNo = int(config['SETTINGS']['port'])
    hostStr = str(config['SETTINGS']['host'])

    port = int(os.environ.get('PORT', portNo))
    app.run(host=hostStr, port=port)
