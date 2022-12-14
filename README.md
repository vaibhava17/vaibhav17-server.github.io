<a name="readme-top"></a>

[![MIT License][license-shield]](./LICENSE)
[![LinkedIn][linkedin-shield]](https://linkedin.com/in/vaibhava17)

<br />
<div align="center">
  <a href="https://vaibhava17-server.herokuapp.com/">
    <img src="./public/img/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Portfolio Server</h3>

  <p align="center">
   A backend server for portfolio website.
   <br />With simple APIs for faster integration and developing.
    <br />
    <a href="https://github.com/vaibhava17/vaibhava17-server"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://vaibhava17-server.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/vaibhava17/vaibhav17-server.github.io/issues">Report Bug</a>
  </p>
</div>



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
        <li><a href="#optional prerequisites">Optional prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[<img src="./public/img/preview.jpg" alt="Logo" width="auto">](https://vaibhava17-server.herokuapp.com/)

This is a fast and easy to use backend server. build using node js and express. If you're looking for a ready to use server for your amazing application you can use it. Do changes as you need.

Of course, no one will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have contributed to expanding this server!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

<a href="https://nodejs.org/en/">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" width="auto" height="auto"> </a>
<a href="https://expressjs.com/">
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" width="auto" height="auto"> </a>
<a href="https://www.mongodb.com/">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" width="auto" height="auto"> </a>
<a href="https://www.heroku.com/">
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" alt="Heroku" width="auto" height="auto"> </a>
<a href="https://www.npmjs.com/">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm" width="auto" height="auto"> </a>
<a href="https://www.npmjs.com/package/mongoose">
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongodb&logoColor=white" alt="Mongoose" width="auto" height="auto"> </a>
<a href="https://www.npmjs.com/package/jsonwebtoken">
  <img src="https://img.shields.io/badge/JSON_Web_Token-D63AFF?style=for-the-badge&logo=json&logoColor=white" alt="JSON Web Token" width="auto" height="auto"> </a>
<a href="https://www.npmjs.com/package/bootstrap">
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" width="auto" height="auto"> </a>
<a href="https://www.npmjs.com/package/axios">
  <img src="https://img.shields.io/badge/Axios-000000?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" width="auto" height="auto"> </a>
<a href="https://www.npmjs.com/package/twilio">
  <img src="https://img.shields.io/badge/Twilio-FF6F00?style=for-the-badge&logo=twilio&logoColor=white" alt="Twilio" width="auto" height="auto"> </a>


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Account for database

* This app has 2-Factor Authentication using [Twilio](https://www.twilio.com/). So you need to create a twilio account and get the credentials. You can also use [Nexmo](https://www.nexmo.com/) for 2FA or just change the code in `services\user.service.js` for login function.

### Optional prerequisites

* [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) Account for deployment

### Installation

To get a local copy up and running follow these simple steps.

1. Clone the repo
   ```sh
   git clone https://github.com/vaibhava17/vaibhava17-server.github.io.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create `.env` and Add
   ```env
    PORT=3030
    NODE_ENV=development
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=123456
    SALT_ROUNDS=10
    OTP_CHARACTERS=abc123
    OTP_LENGTH=6
    API_URL="http://localhost:3030"

    <!-- For 2-Factor Authentication -->
    TWILIO_ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    TWILIO_PHONE_NUMBER=your_twilio_phone_number

    <!-- For Deplyment on Heroku -->
    HEROKU_APP_NAME=your_heroku_app_name
    HEROKU_API_KEY=your_heroku_api_key
    HEROKU_EMAIL=your_heroku_email

    <!-- For github projects link -->
    GH_API_URL=https://api.github.com/repos
    ```
4. Run Server
    ```
    npm run dev
    ```
5. Open `http://localhost:3030` with your browser to see the result.
6. You can also use the dummy data in to test the server.
    ```
    npm run data:import
    ```
    ```
    npm run data:destroy
    ```
  _Check `TODO` comments in `data\user.data.js` before running these dummy data commands._

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

* Portfolio Website
* Blog Website
* Gallery Website
* E-commerce Website & many more.

_For existing APIs Documentation, Follow this [link](https://vaibhava17-server.herokuapp.com/api-docs)_

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

See the [open issues](https://github.com/vaibhava17/vaibhav17-server.github.io/issues) for a full list of proposed features (and known issues).


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See [LICENSE](https://github.com/vaibhava17/vaibhav17-server.github.io/blob/master/LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

<samp>
  <a href="https://twitter.com/_vaibhava__" target="_blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="_vaibhava__" height="30" width="40" /></a> . 
  <a href="https://www.linkedin.com/in/vaibhava17/" target="_blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="vaibhav98a" height="30" width="40" /></a> . 
  <a href="https://dev.to/vaibhava17" target="_blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/devto.svg" alt="vaibhava17" height="30" width="40" /></a>
</samp>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br/>

<div align="center" style="font-weight: bold">

Made with ❤️ by [Vaibhav](https://vaibhava17.github.io)

</div>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/vaibhav17/vaibhava17-server.github.io.svg?style=for-the-badge
[contributors-url]: https://github.com/vaibhava17/vaibhav17-server.github.io/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/vaibhava17/vaibhav17-server.github.io.svg?style=for-the-badge
[forks-url]: https://github.com/vaibhava17/vaibhav17-server.github.io/network/members
[stars-shield]: https://img.shields.io/github/stars/vaibhava17/vaibhav17-server.github.io.svg?style=for-the-badge
[stars-url]: https://github.com/vaibhava17/vaibhav17-server.github.io/stargazers
[issues-shield]: https://img.shields.io/github/issues/vaibhava17/vaibhav17-server.github.io.svg?style=for-the-badge
[issues-url]: https://github.com/vaibhava17/vaibhav17-server.github.io/issues
[license-shield]: https://img.shields.io/github/license/vaibhava17/vaibhav17-server.github.io.svg?style=for-the-badge
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/vaibhava17
