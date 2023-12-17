<!-- Readme template from https://github.com/othneildrew/Best-README-Template -->
<a name="readme-top"></a>


[![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/tareek/)



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/t4rm/weather_app">
    <img src="public/assets/images/brand/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Weather °Cast</h3>

  <p align="center">
    Weather, forecast and much more brought together in one app.
    <br />
    <a href="https://weather.mechkenetarek.com"><strong>Visit the website »</strong></a>
    <br />
    <br />
    <a href="https://github.com/t4rm/weather_app/assets/video/demo.mp4">View Demo</a>
    ·
    <a href="https://github.com/t4rm/weather_app/issues">Report Bug</a>
    ·
    <a href="https://github.com/t4rm/weather_app/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Weather Cast Screen Shot][product-screenshot]](https://weather.mechkenetarek.com)

Get blazzing fast meteo, forecast (up to 14days) and details such as air quality and wind speed informations all in one page.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![ChartJs][Chart.js]][Chart.js-url]
* ![Html][Html5]
* ![Css][Css3]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free trial API Key at [https://www.weatherapi.com/](https://www.weatherapi.com/)
2. Clone the repo
   ```sh
   git clone https://github.com/t4rm/weather_app.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `example.env` and rename it to `.env`
   ```js
   REACT_APP_KEY=your_api_key
   ```
5. Start the React project
   ```sh
   npm run start
   ```
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

* Get actual weather by accepting the navigator to know your location
  
* Optionally enter an IP Address, ZIP Code (UK & US only), City, Country :
  
  ![image][search]

* Click the see more button to get the next 7 day of the forecast :

  ![image][seemore]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Mechkene Tarek - contact@mechkenetarek.com

Project Link: [https://github.com/t4rm/weather_app](https://github.com/t4rm/weather_app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Vladyslav Sharlovych](https://dribbble.com/shots/19266713-Weather-Forecast-Dashboard)
* [Yann Armelin](https://yqnn.github.io/svg-path-editor/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->



[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/tareek/
[product-screenshot]: public/assets/images/brand/screenshot.png
[Html5]: https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white
[Css3]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Chart.js]: https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white
[Chart.js-url]: https://www.chartjs.org/
[seemore]: public/assets/readme/seemore.gif
[search]: public/assets/readme/search.png
