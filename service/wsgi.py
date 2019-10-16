from flask_service import app

if __name__ == "__main__":
    currentPort = 3001
    app.run(host = '0.0.0.0', port = currentPort, threaded = True)
