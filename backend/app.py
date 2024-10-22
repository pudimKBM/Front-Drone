from flask import Flask, request
from flask_socketio import SocketIO, emit, disconnect
import time
import sqlite3
import sys
import logging
from camera import Camera

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'  # Replace with your secret key

# Initialize SocketIO with threading mode
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize camera based on mode (mock or real)
if len(sys.argv) > 1 and sys.argv[1] == 'mock':
      # Import your mock Camera class
    camera = Camera(mock=True)
    logging.info("Running in mock mode.")
else:
    # Import your real Camera class
    camera = Camera()
    logging.info("Running in normal mode.")

def emit_rankings():
    """
    Fetch the current rankings from the database and emit them to all connected clients.
    """
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT name, max_accuracy FROM groups ORDER BY max_accuracy DESC')
    results = c.fetchall()
    conn.close()
    rankings = [{'name': row[0], 'max_accuracy': row[1]} for row in results]
    socketio.emit('update_rankings', {'rankings': rankings})
    logging.debug(f"Emitted updated rankings: {rankings}")

@socketio.on('connect')
def handle_connect():
    """
    Handle new client connections.
    """
    logging.debug("New client connected.")
    emit_rankings()  # Send the current rankings to the new client

@socketio.on('get_podium')
def handle_get_podium():
    """
    Handle requests for the top 3 groups (podium).
    """
    logging.debug("Received 'get_podium' event from client.")
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT name, max_accuracy FROM groups ORDER BY max_accuracy DESC LIMIT 3')
    results = c.fetchall()
    conn.close()
    groups = [{'name': row[0], 'max_accuracy': row[1]} for row in results]
    emit('podium', {'groups': groups})
    logging.debug(f"Emitted podium data: {groups}")

@socketio.on('start_stream')
def handle_start_stream(data):
    """
    Handle the start of a streaming session for a group.
    """
    group_name = data.get('group_name')
    logging.debug(f"Group '{group_name}' started streaming.")

    # Save the group in the database if it doesn't exist
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('INSERT OR IGNORE INTO groups (name, max_accuracy) VALUES (?, ?)', (group_name, 0))
    conn.commit()
    conn.close()

    time_limit = 50  # Time limit in seconds
    start_time = time.time()  # Record the start time

    # Emit the time limit to the client
    emit('time_limit', {'time_limit': time_limit})

    # Start streaming frames
    for frame_data in camera.stream_frames():
        # Check if time limit has been reached
        elapsed_time = time.time() - start_time
        if elapsed_time >= time_limit:
            logging.debug(f"Time limit reached for group '{group_name}'. Stopping stream.")
            emit('time_up')
            disconnect()
            break  # Exit the loop to stop streaming

        frame, accuracy = frame_data
        logging.debug(f"Accuracy for '{group_name}': {accuracy:.2f}%")

        # Update the group's max accuracy in the database
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute('SELECT max_accuracy FROM groups WHERE name = ?', (group_name,))
        current_max = c.fetchone()[0]
        if accuracy > current_max:
            c.execute('UPDATE groups SET max_accuracy = ? WHERE name = ?', (accuracy, group_name))
            conn.commit()
            logging.debug(f"Updated max_accuracy for group '{group_name}' to {accuracy:.2f}%")
            # Emit updated rankings since the max accuracy has changed
            emit_rankings()
        conn.close()

        # Emit the frame and accuracy to the frontend
        emit('new_frame', {'frame': frame, 'accuracy': accuracy})

        # If accuracy is 100%, emit event to play sound
        if accuracy >= 100:
            emit('play_sound')

        # Small pause to prevent overload
        socketio.sleep(0.1)

@socketio.on('disconnect')
def handle_disconnect():
    """
    Handle client disconnections.
    """
    logging.debug("Client disconnected.")

# Test route to verify backend is running
@app.route('/test')
def test():
    return {'status': 'Backend is running in mock mode.' if camera.mock else 'Backend is running normally.'}

if __name__ == '__main__':
    # Create the database table if it doesn't exist
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS groups (
            name TEXT PRIMARY KEY,
            max_accuracy REAL
        )
    ''')
    conn.commit()
    conn.close()
    logging.info("Database initialized.")

    # Run the SocketIO server
    socketio.run(app, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True)
