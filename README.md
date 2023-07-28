# NASA Mars Rover Photo Viewer

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Tech Stak](#tech-stack)
- [Contribution](#contribution)
- [Acknoledgements](#acknowledgements)
- [License](#license)
- [Contact](#contact)

## Description

Welcome to the NASA Mars Rover Photo Viewer! This web application connects to the [NASA API](https://api.nasa.gov/) to fetch photos from various Mars rovers. Users can explore captivating images captured by rovers such as Curiosity, Opportunity, and Spirit. Let's dive into the key features and functionalities of the app:

## Features

- Browse Mars Rover Photos: Explore a vast collection of photos taken by the Mars rovers Curiosity, Opportunity, and Spirit.
- Pagination: Photos are displayed in pages, with a maximum of 25 photos per page, making it easy to navigate through the extensive photo archive.
- Camera Filters: Users can apply filters to view photos taken by a specific camera on the rovers.
- Latest Photos by Default: Upon launching the app, users are greeted with the latest photos taken on the current day.
- Search by Earth Day Date: Users have the option to search for photos based on a specific Earth Day date (e.g., 2020-09-22).
- Search by Sol Date: Users can also search for photos based on the Martian "Sol" date (e.g., 2890).
- Test Coverage: The project includes a suite of tests to ensure the app functions reliably and consistently.
- Favorite Searches: Users can save their favorite search parameters as bookmarks, which can be recalled in the future. The app supports local storage for saving these bookmarks.

## Installation

Follow these steps to get the app up and running on your local machine:

1. Clone the repository:

    ```bash
        git clone https://github.com/your-username/nasa-mars-rover-photo-viewer.git 
    ```

2. Install dependencies:

    ```bash
        npm install
    ```

3. Run the development server:

    ```bash
        npm run dev
    ```

4. Open your web browser and navigate to:

    ```url
        http://127.0.0.1:5173/NASA_image_searcher
    ```

## Environment Variables

📢 ALERT! Do not use '<' or '>' in your `.env` file

🚧 The following environment variables need to be [set in the `.env` file](./.envexample) as this example:

```plaintext
VITE_NASA_API_KEY=# Get an API_KEY in <https://api.nasa.gov>
VITE_NASA_URL_ROVERS=<https://api.nasa.gov/mars-photos/api/v1/rovers/>
```

## Tech Stack

- React: Frontend JavaScript library for building user interfaces.
- Axios: HTTP client for making API requests.
- React Router: For managing routing within the app.
- Jest and React Testing Library: For writing unit tests.
- ESLint: Linter for maintaining a professional coding style and consistency.

## Contribution

Contributions to the project are welcome! If you find any issues or have suggestions for improvements, feel free to submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgements

Special thanks to the NASA API for providing access to the fascinating world of Mars exploration through their incredible photo archives.

## Contact

If you have any questions or suggestions regarding this project, feel free to reach out:

- **Author**: Guillermo Andrada
- **Email**: <guillermoandrada@gmail.com>
- **GitHub**: [GuilloSGit](https://github.com/GuilloSGit)
- **LinkedIn**: [Guillermo Andrada](https://www.linkedin.com/in/guillermo-david-andrada/)
- **WhatsApp**: [Direct Message](https://wa.me/5492645240612?text=I%20have%20been%20looking%20at%20the%20repository%3A%0Ahttps%3A%2F%2Fgithub.com%2FElianaPranzetti%2FgithubGuilloSGit-ensolvers-challenge.git%0AI%20would%20like%20to%20discuss%20this%20further.)

Let the Martian adventure begin! 🚀🪐
