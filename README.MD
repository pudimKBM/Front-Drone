# FrontDrone Project

Welcome to the **FrontDrone** project! This repository contains both the **frontend** and **backend** components of the application designed to provide a live feed, real-time rankings, and competition results using React and Flask with Socket.IO.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
  - [Running in Development Mode](#running-in-development-mode)
  - [Running in Mock Mode](#running-in-mock-mode)
- [Documentation](#documentation)
  - [Frontend Documentation](#frontend-documentation)
  - [Backend Documentation](#backend-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

**FrontDrone** is a web application that facilitates live streaming, real-time competition rankings, and result displays for groups participating in a competition. The application comprises a React-based frontend and a Flask-based backend, leveraging Socket.IO for real-time communication.

---

## Features

- **Live Feed:** Real-time video streaming with accuracy metrics.
- **Real-Time Rankings:** Dynamic leaderboard updating as groups improve their performance.
- **Podium Display:** Visual representation of top-performing groups with celebratory animations and sounds.
- **Results Page:** Comprehensive display of all competition results.
- **Mock Mode:** Backend can run in mock mode for testing without a real camera feed.

---
## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Material-UI (MUI)**: React UI framework for styling and components.
- **Socket.IO Client**: Enables real-time, bidirectional communication between frontend and backend.
- **Howler.js**: JavaScript library for audio playback.
- **Anime.js**: Animation library.
- **React Confetti**: Confetti animations for celebratory effects.

### Backend

- **Flask**: Python web framework.
- **Flask-SocketIO**: Enables real-time communication between clients and the server.
- **SQLite**: Lightweight relational database.
- **OpenCV**: Computer vision library for image processing.
- **PyTorch & torchvision**: Deep learning frameworks for model inference.
- **Eventlet**: Concurrent networking library for Python.

---

## Project Structure

```
frontDrone/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── styles.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
└── backend/
    ├── app.py
    ├── camera.py
    ├── requirements.txt
    └── database.db
```

---

## Installation
Before setting up the project, ensure you have the following installed on your system:

- **Python:** Version **3.8.x** (compatible up to 3.11.x)
  - **Download:** [Python Downloads](https://www.python.org/downloads/)
  
- **Node.js:** Version **16.x** or higher
  - **Download:** [Node.js Downloads](https://nodejs.org/en/download/)

### Frontend Setup

1. **Navigate to the Frontend Directory:**

   ```bash
   cd D:\frontDrone\frontend
   ```

2. **Install Dependencies:**

   Ensure you have [Node.js](https://nodejs.org/) installed. Then, install the required packages:

   ```bash
   npm install
   ```

### Backend Setup

1. **Navigate to the Backend Directory:**

   ```bash
   cd D:\frontDrone\backend
   ```

2. **Set Up a Virtual Environment (Optional but Recommended):**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies:**

   Ensure you have [Python](https://www.python.org/) installed. Then, install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize the Database:**

   The database is automatically initialized when you run the backend for the first time.

---

## Usage

### Running in Development Mode

#### Start the Backend Server

1. **Navigate to the Backend Directory:**

   ```bash
   cd D:\frontDrone\backend
   ```

2. **Run the Flask Server:**

   ```bash
   python app.py
   ```

   - **Note:** By default, the server runs in normal mode. To run in mock mode (useful for testing without a real camera), use:

     ```bash
     python app.py mock
     ```

#### Start the Frontend Server

1. **Navigate to the Frontend Directory:**

   ```bash
   cd D:\frontDrone\frontend
   ```

2. **Run the React App:**

   ```bash
   npm start
   ```

   The application should now be accessible at `http://localhost:3000`.

### Running in Mock Mode

Mock mode allows you to test the application without a real camera feed.

1. **Start the Backend in Mock Mode:**

   ```bash
   python app.py mock
   ```

2. **Proceed to Start the Frontend as Usual.**

---

## Documentation

Comprehensive documentation for both frontend and backend components is provided below.

### Frontend Documentation

#### Overview

The frontend is built using React and Material-UI, providing a responsive and interactive user interface. It communicates with the backend via Socket.IO for real-time data updates.

#### Components

1. **LiveFeed**

   - **Location:** `src/components/LiveFeed.js`
   - **Description:** 
     - Handles the live video feed.
     - Manages state for group name, streaming status, frame data, accuracy, countdown, remaining time, and rankings.
     - Connects to the backend via Socket.IO to receive real-time updates.
     - Plays sounds using Howler.js based on events.
   - **Key Features:**
     - Start streaming with group name input.
     - Display live frames with accuracy metrics.
     - Show real-time rankings.
     - Navigate to results page.

2. **Results**

   - **Location:** `src/components/Results.js`
   - **Description:** 
     - Displays the competition results in a tabular format.
     - Receives updated rankings from the backend.
     - Provides navigation to the podium view.
   - **Key Features:**
     - View all group rankings and their maximum accuracies.
     - Navigate back to live feed or to podium.

3. **Podium**

   - **Location:** `src/components/Podium.js`
   - **Description:** 
     - Showcases the top 3 groups with celebratory animations and sounds.
     - Uses React Confetti for visual effects.
   - **Key Features:**
     - Display first, second, and third place with respective styling.
     - Play celebratory sounds upon rendering.
     - Navigate to results page.

4. **App**

   - **Location:** `src/App.js`
   - **Description:** 
     - Sets up routing for the application using React Router.
     - Applies Material-UI theming.
   - **Routes:**
     - `/` - LiveFeed
     - `/results` - Results
     - `/podium` - Podium

#### Styling

- **CSS File:** `src/styles.css`
- **Description:** 
  - Defines global styles and podium-specific styles.
  - Implements animations for the podium steps.

#### State Management

- Utilizes React's `useState` and `useEffect` hooks for managing component states and side effects.
- Uses `useRef` for maintaining the Socket.IO connection.

#### Real-Time Communication

- **Socket.IO Client:** 
  - Establishes a connection to the backend server at `http://localhost:5000`.
  - Listens to events such as `new_frame`, `play_sound`, `update_rankings`, `time_limit`, and `time_up`.
  - Emits events like `start_stream` to initiate streaming.

---

### Backend Documentation

#### Overview

The backend is built using Flask and Flask-SocketIO, providing APIs and real-time communication capabilities. It handles video frame processing, accuracy calculations, and maintains the competition data in an SQLite database.

#### Files

1. **app.py**

   - **Description:** 
     - Entry point for the Flask application.
     - Sets up Socket.IO event handlers.
     - Manages client connections and streaming sessions.
     - Interacts with the SQLite database to store and retrieve competition data.
   - **Key Functions:**
     - `handle_connect`: Sends current rankings to newly connected clients.
     - `handle_get_podium`: Sends top 3 groups to clients requesting podium data.
     - `handle_start_stream`: Manages the streaming session for a group, including frame processing and accuracy updates.
     - `emit_rankings`: Retrieves and emits updated rankings to all clients.
     - `handle_disconnect`: Logs client disconnections.

2. **camera.py**

   - **Description:** 
     - Defines the `Camera` class responsible for capturing and processing video frames.
     - Supports both real and mock modes.
     - In real mode, captures frames from a camera URL, processes them using a YOLOv5 model to detect objects, and calculates accuracy.
     - In mock mode, generates dummy frames and random accuracy values for testing.
   - **Key Functions:**
     - `stream_frames`: Yields processed frames and corresponding accuracy metrics.
     - `generate_mock_frame`: Creates a dummy image for mock streaming.

3. **requirements.txt**

   - **Description:** 
     - Lists all Python dependencies required to run the backend.
   - **Contents:**
     ```
     Flask
     Flask-SocketIO
     flask-cors==3.0.10
     numpy
     opencv-python==4.5.5.64
     torch==2.5.0
     torchvision==0.20.0
     eventlet==0.33.0
     ```

#### Database

- **Database File:** `database.db`
- **Description:** 
  - SQLite database storing competition data.
  - **Tables:**
    - `groups`:
      - `name` (TEXT, Primary Key): Name of the participating group.
      - `max_accuracy` (REAL): Highest accuracy achieved by the group.

#### Real-Time Communication

- **Socket.IO Events:**
  - **From Client:**
    - `connect`: Triggered when a client connects.
    - `get_podium`: Request to retrieve top 3 groups.
    - `start_stream`: Initiates a streaming session for a specific group.
  - **From Server:**
    - `update_rankings`: Sends updated rankings to clients.
    - `podium`: Sends podium data to clients.
    - `new_frame`: Sends a new video frame and accuracy metric.
    - `play_sound`: Instructs clients to play a sound.
    - `time_limit`: Informs clients about the time limit for the session.
    - `time_up`: Notifies clients that the session time has ended.

#### Running the Backend

1. **Initialize the Database:**

   On the first run, the backend will automatically create the `groups` table if it does not exist.

2. **Start the Server:**

   ```bash
   python app.py
   ```

   - **Parameters:**
     - `mock` (optional): Run the server in mock mode.

   **Example:**

   ```bash
   python app.py mock
   ```

3. **Server Details:**

   - **Host:** `0.0.0.0`
   - **Port:** `5000`

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add some feature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

Please ensure that your code adheres to the project's coding standards and includes appropriate documentation.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any inquiries or support, please contact:

- **Email:** your.email@example.com
- **GitHub:** [YourGitHubUsername](https://github.com/YourGitHubUsername)

---

# Documentation

## FrontDrone Project Documentation

This documentation provides an in-depth overview of the **FrontDrone** project, detailing both frontend and backend components, their interactions, and how to extend or maintain the system.

---

### Table of Contents

- [Frontend](#frontend)
  - [Architecture](#architecture)
  - [Components](#components)
    - [LiveFeed](#livefeed)
    - [Results](#results)
    - [Podium](#podium)
    - [App](#app)
  - [State Management](#state-management)
  - [Real-Time Communication](#real-time-communication)
  - [Styling and Theming](#styling-and-theming)
  - [Assets](#assets)
- [Backend](#backend)
  - [Architecture](#architecture-1)
  - [Key Modules](#key-modules)
    - [app.py](#apppy)
    - [camera.py](#camerapy)
  - [Database Schema](#database-schema)
  - [Real-Time Communication](#real-time-communication-1)
  - [Model Integration](#model-integration)
  - [Running Modes](#running-modes)
- [Deployment](#deployment)
- [Testing](#testing)
- [Extending the Project](#extending-the-project)
- [Troubleshooting](#troubleshooting)
- [FAQs](#faqs)

---

## Frontend

### Architecture

The frontend is built using **React** with a component-based architecture. It leverages **Material-UI (MUI)** for consistent styling and **Socket.IO Client** for real-time data synchronization with the backend.

### Components

#### LiveFeed

- **Location:** `src/components/LiveFeed.js`
- **Purpose:** 
  - Serves as the main interface for users to start streaming, view live video frames, monitor accuracy, and see real-time rankings.
- **Key Functionalities:**
  - **Group Name Input:** Allows users to enter their group name to participate.
  - **Start Streaming:** Initiates the streaming session upon user input.
  - **Countdown Timer:** Displays a countdown before the streaming starts.
  - **Live Video Feed:** Shows the real-time video frames received from the backend.
  - **Accuracy Display:** Shows the current accuracy metric of the group.
  - **Remaining Time:** Indicates the remaining time for the current session.
  - **Rankings:** Displays a list of groups with their respective accuracies.
  - **Navigation:** Provides a button to navigate to the results page.

- **State Variables:**
  - `groupName`: Stores the name of the user's group.
  - `started`: Boolean indicating if streaming has started.
  - `frame`: Holds the current video frame data.
  - `accuracy`: Current accuracy percentage.
  - `countdown`: Countdown timer before streaming begins.
  - `remainingTime`: Time left in the streaming session.
  - `rankings`: List of group rankings.
  - `groupAccuracy`: Highest accuracy achieved by the user's group.

- **Socket.IO Integration:**
  - Connects to the backend server to receive `new_frame`, `play_sound`, `update_rankings`, `time_limit`, and `time_up` events.
  - Emits `start_stream` event to initiate streaming.

#### Results

- **Location:** `src/components/Results.js`
- **Purpose:** 
  - Displays the final results of the competition in a tabular format.
- **Key Functionalities:**
  - **Results Table:** Lists all groups with their positions and maximum accuracies.
  - **Navigation Buttons:** Allows users to return to the live feed or view the podium.

- **State Variables:**
  - `results`: Stores the list of group rankings received from the backend.

- **Socket.IO Integration:**
  - Listens to `update_rankings` events to update the results in real-time.

#### Podium

- **Location:** `src/components/Podium.js`
- **Purpose:** 
  - Showcases the top three groups with visual enhancements like confetti and sounds.
- **Key Functionalities:**
  - **Confetti Animation:** Celebratory confetti effect using `react-confetti`.
  - **Sound Playback:** Plays a sound when the podium is displayed using `Howler.js`.
  - **Podium Display:** Visually represents first, second, and third place with styling.
  - **Navigation Button:** Allows users to navigate to the results page.

- **State Variables:**
  - `topGroups`: Stores the top three groups received from the backend.
  - `dimensions`: Holds the window dimensions for confetti rendering.

- **Socket.IO Integration:**
  - Emits `get_podium` event to request podium data.
  - Listens to `podium` events to receive top groups data.

#### App

- **Location:** `src/App.js`
- **Purpose:** 
  - Sets up the routing for the application and applies theming.
- **Key Functionalities:**
  - **Routing:** Defines routes for LiveFeed (`/`), Results (`/results`), and Podium (`/podium`).
  - **Theming:** Applies a custom Material-UI theme to the entire application.

### State Management

The frontend primarily uses React's built-in state management via `useState` and side effects via `useEffect`. For managing real-time data and maintaining the Socket.IO connection, `useRef` is utilized to persist the socket instance across re-renders.

### Real-Time Communication

- **Socket.IO Client:**
  - Establishes a connection to the backend server at `http://localhost:5000`.
  - Listens for various events to update the UI in real-time.
  - Ensures cleanup of the socket connection upon component unmounting to prevent memory leaks.

- **Key Events:**
  - **From Server:**
    - `new_frame`: Receives new video frames and accuracy data.
    - `play_sound`: Triggers sound playback on the client.
    - `update_rankings`: Updates the rankings list in real-time.
    - `time_limit`: Sets the time limit for the streaming session.
    - `time_up`: Notifies the client that the session has ended.
    - `podium`: Provides the top three groups for the podium display.
  - **From Client:**
    - `start_stream`: Initiates the streaming session with the provided group name.
    - `get_podium`: Requests the podium data.

### Styling and Theming

- **Material-UI (MUI):**
  - Utilized for consistent and responsive UI components.
  - Custom themes are defined in `App.js` to set primary and secondary colors.

- **CSS:**
  - **File:** `src/styles.css`
  - **Purpose:** 
    - Defines global styles and specific styles for components like the podium.
    - Implements animations for the podium steps to create an expandable effect.

- **Responsive Design:**
  - The layout adapts to different screen sizes using Material-UI's Grid system.

### Assets

- **Sounds:**
  - `titacSound`: Used in the LiveFeed component for sound playback.
  - `dingSound`: Used in the Podium component for celebratory sounds.

- **Images:**
  - `trophyImage`: Displayed in the Podium component to represent the first-place trophy.

- **Directory:** `src/assets/`

---

## Backend

### Architecture

The backend leverages **Flask** coupled with **Flask-SocketIO** to handle HTTP requests and real-time WebSocket communications. It processes video frames, calculates accuracy metrics using a YOLOv5 model, and maintains competition data in an SQLite database.

### Key Modules

#### app.py

- **Description:** 
  - Serves as the main application file, initializing the Flask app and Socket.IO server.
  - Manages client connections, streaming sessions, and real-time data emissions.

- **Key Functionalities:**
  - **Initialization:**
    - Sets up the Flask app with a secret key.
    - Configures Socket.IO with threading mode and CORS settings.
    - Initializes the camera (real or mock based on arguments).
    - Sets up logging for debugging and monitoring.
  - **Database Initialization:**
    - Creates the `groups` table if it doesn't exist.
  - **Socket.IO Event Handlers:**
    - `connect`: Handles new client connections and emits current rankings.
    - `get_podium`: Responds to podium data requests.
    - `start_stream`: Manages the streaming session, processes frames, updates accuracies, and handles session termination.
    - `disconnect`: Logs client disconnections.
  - **Utility Functions:**
    - `emit_rankings`: Retrieves and emits the latest rankings to all connected clients.

- **Running the Server:**
  - Executes `socketio.run` to start the server on `0.0.0.0:5000`.
  - Supports an optional `mock` argument to run in mock mode.

#### camera.py

- **Description:** 
  - Defines the `Camera` class responsible for capturing and processing video frames.
  - Supports both real camera feeds and mock data for testing purposes.

- **Key Functionalities:**
  - **Initialization:**
    - Loads the YOLOv5 model for object detection in normal mode.
    - Sets the confidence threshold for detections.
  - **stream_frames Method:**
    - In **Real Mode:**
      - Fetches images from a specified camera URL.
      - Processes the image using the YOLOv5 model to detect objects.
      - Encodes the processed frame to JPEG and then to Base64 for transmission.
      - Calculates accuracy based on detection confidence.
    - In **Mock Mode:**
      - Generates dummy frames with text.
      - Produces random accuracy values for simulation.
    - Yields a tuple of `(frame, accuracy)` for each processed frame.
  - **generate_mock_frame Method:**
    - Creates a dummy image with the text "Teste" for testing purposes.

### Database Schema

- **Database:** `database.db`
- **Table:** `groups`
  - **Columns:**
    - `name` (TEXT, Primary Key): Name of the participating group.
    - `max_accuracy` (REAL): Highest accuracy achieved by the group.

- **Functionality:**
  - Stores each group's maximum accuracy to maintain persistent rankings.
  - Updates the `max_accuracy` when a group achieves a higher accuracy during streaming.

### Real-Time Communication

- **Socket.IO Integration:**
  - Enables real-time, bidirectional communication between the backend and multiple frontend clients.
  - Handles events related to streaming, rankings, and session management.

- **Key Events:**
  - **From Client:**
    - `start_stream`: Initiates a streaming session for a specific group.
    - `get_podium`: Requests the top three groups for podium display.
  - **From Server:**
    - `update_rankings`: Sends updated rankings to all connected clients.
    - `podium`: Provides the top three groups to clients requesting podium data.
    - `new_frame`: Transmits new video frames and accuracy metrics.
    - `play_sound`: Instructs clients to play a sound upon achieving certain conditions (e.g., 100% accuracy).
    - `time_limit`: Notifies clients of the session's time limit.
    - `time_up`: Informs clients that the streaming session has ended.

### Model Integration

- **YOLOv5 Model:**
  - **Purpose:** Performs object detection on video frames to calculate accuracy.
  - **Loading:**
    - Loaded via `torch.hub.load` with a custom model specified by the `path` variable (`best.pt`).
  - **Usage:**
    - Processes each frame to detect objects.
    - Calculates accuracy based on detection confidence (`results.xyxy`).

- **Mock Mode:**
  - Bypasses the actual model to provide simulated frames and random accuracy values for testing.

### Running Modes

1. **Normal Mode:**
   - Captures real video frames from a specified camera URL.
   - Processes frames using the YOLOv5 model to detect objects and calculate accuracy.
   - Suitable for production environments with access to a camera feed.

2. **Mock Mode:**
   - Generates dummy frames and random accuracy values.
   - Facilitates testing without relying on an actual camera feed or model.
   - Activated by passing the `mock` argument when running `app.py`:

     ```bash
     python app.py mock
     ```

---

## Deployment

To deploy the **FrontDrone** application, consider the following steps:

1. **Choose Deployment Platforms:**
   - **Frontend:** Deploy using platforms like **Vercel**, **Netlify**, or **AWS Amplify**.
   - **Backend:** Deploy on **Heroku**, **AWS EC2**, **DigitalOcean**, or similar services.

2. **Configure Environment Variables:**
   - Set necessary environment variables for both frontend and backend, such as API endpoints and secret keys.

3. **Set Up a Production Database:**
   - While SQLite is suitable for development, consider using a more robust database like **PostgreSQL** for production.

4. **Secure the Application:**
   - Implement HTTPS for secure communication.
   - Protect sensitive data and ensure secure Socket.IO connections.

5. **Scale as Needed:**
   - Monitor application performance and scale resources based on demand.

---

## Testing

### Frontend Testing

- **Unit Tests:**
  - Utilize **Jest** and **React Testing Library** to write unit tests for React components.
- **Integration Tests:**
  - Test the interaction between components and Socket.IO events.
- **End-to-End Tests:**
  - Use tools like **Cypress** to simulate user interactions and validate application workflows.

### Backend Testing

- **Unit Tests:**
  - Test individual functions and classes, especially the `Camera` class and database interactions.
- **Integration Tests:**
  - Test the interaction between Flask routes, Socket.IO events, and the database.
- **Mocking:**
  - Use mock objects to simulate camera inputs and Socket.IO clients for isolated testing.

---

## Extending the Project

To enhance or extend the **FrontDrone** project, consider the following:

1. **Authentication:**
   - Implement user authentication to manage group participation securely.

2. **Enhanced Metrics:**
   - Introduce additional metrics beyond accuracy, such as speed or efficiency.

3. **Admin Dashboard:**
   - Create an admin interface to manage groups, view detailed statistics, and control streaming sessions.

4. **Persistent Storage:**
   - Transition to a more scalable database solution for handling increased data and concurrency.

5. **Deployment Enhancements:**
   - Set up CI/CD pipelines for automated testing and deployment.
   - Implement load balancing and failover mechanisms for high availability.

6. **Mobile Responsiveness:**
   - Optimize the frontend for mobile devices to allow participants and viewers to access the platform on various devices.

---

## Troubleshooting

### Common Issues

1. **Socket.IO Connection Errors:**
   - **Symptoms:** Frontend fails to connect to the backend; no real-time updates.
   - **Solutions:**
     - Ensure the backend server is running and accessible at `http://localhost:5000`.
     - Check for CORS issues and verify that `cors_allowed_origins="*"` is set in the backend.
     - Confirm that the correct Socket.IO client version is used.

2. **Backend Server Not Starting:**
   - **Symptoms:** Errors when running `app.py`; server does not start.
   - **Solutions:**
     - Verify that all dependencies in `requirements.txt` are installed.
     - Ensure that the `best.pt` model file exists and is correctly referenced.
     - Check for port conflicts on port `5000`.

3. **Database Errors:**
   - **Symptoms:** Issues with reading from or writing to the database; missing tables.
   - **Solutions:**
     - Ensure that the backend initializes the database correctly on the first run.
     - Check file permissions for `database.db`.
     - Verify SQLite is properly installed and accessible.

4. **Frontend Not Displaying Data:**
   - **Symptoms:** Live feed or rankings are not showing; UI elements are missing.
   - **Solutions:**
     - Confirm that the frontend is successfully connecting to the backend.
     - Check the browser console for JavaScript errors.
     - Ensure that the backend is emitting the necessary events.

### Debugging Tips

- **Logging:**
  - The backend uses Python's `logging` module. Check console outputs for debug information.
- **Browser Developer Tools:**
  - Utilize the browser's console and network tabs to monitor frontend behavior and Socket.IO connections.
- **Network Issues:**
  - Ensure that firewall settings allow communication on the designated ports.
- **Dependency Versions:**
  - Conflicting or incompatible package versions can cause issues. Ensure all dependencies are up-to-date and compatible.

---

## FAQs

**Q1: How do I run the backend in mock mode?**

**A1:** Navigate to the backend directory and run:

```bash
python app.py mock
```

This starts the backend with simulated camera input and random accuracy values.

---

**Q2: Can I change the streaming duration?**

**A2:** Yes. In `app.py`, locate the `time_limit` variable within the `handle_start_stream` function and adjust its value (currently set to 50 seconds).

```python
time_limit = 50  # Time limit in seconds
```

---

**Q3: How do I add more groups to the competition?**

**A3:** Groups are dynamically added when they start streaming. Ensure each group provides a unique name when initiating the stream. The backend handles insertion into the database.

---

**Q4: What if the live feed is not showing any frames?**

**A4:** Check the following:

- Backend server is running and connected to a camera (or in mock mode).
- Frontend is successfully connected to the backend via Socket.IO.
- Verify that the camera URL in `camera.py` is correct and accessible.
- Ensure the YOLOv5 model (`best.pt`) is correctly loaded.

---

**Q5: How can I deploy this application to a production environment?**

**A5:** Refer to the [Deployment](#deployment) section above for guidelines on deploying both frontend and backend components to suitable platforms.

---

**Q6: Is user authentication implemented?**

**A6:** Currently, the application does not implement user authentication. Consider adding authentication mechanisms if required for your use case.

---

**Q7: How do I reset the competition data?**

**A7:** To reset the data, you can delete the `database.db` file located in the backend directory. Upon restarting the backend, a new database will be initialized.

```bash
rm database.db  # On Unix-based systems
del database.db # On Windows
```

**Note:** This will erase all existing competition data.

---

**Q8: Can I integrate a different object detection model?**

**A8:** Yes. Replace the YOLOv5 model loading in `camera.py` with your desired model. Ensure compatibility in processing and output formatting.

---

**Q9: How do I change the backend server port?**

**A9:** In `app.py`, modify the `socketio.run` parameters:

```python
socketio.run(app, host='0.0.0.0', port=YOUR_DESIRED_PORT, allow_unsafe_werkzeug=True)
```

Replace `YOUR_DESIRED_PORT` with the port number you wish to use.

---

**Q10: Who do I contact for support or feature requests?**

**A10:** Please reach out via the [Contact](#contact) section or open an issue in the repository's issue tracker.

---

---

Thank you for using the **FrontDrone** project! We hope this documentation helps you understand and effectively utilize the application. For further assistance, feel free to reach out through the provided contact channels.