<h1 align="center">
	<img alt="LPROT" title="Rocketshoes" src="./public/lprot.jpg" />
</h1>

# Orsini

![Badge](https://img.shields.io/badge/license-APACHE-informational?style=for-the-bade) ![Badge](https://img.shields.io/badge/React-v17.0.2-61dafb?logo=react) ![Badge](https://img.shields.io/badge/current_version-v0.1.0-informational?color=5F9EA0)

## About
This repository contains the code for the __Orsini__ backend module of the __Fast Data Collection__ project. 
# Table of contents
- [Orsini](#orsini)
  - [About](#about)
- [Table of contents](#table-of-contents)
- [Status](#status)
- [Features](#features)
- [How to install and run this application](#how-to-install-and-run-this-application)
  - [Prerequisites](#prerequisites)
  - [Installing and running a test locally](#installing-and-running-a-test-locally)
- [Author and Acknowledgements](#author-and-acknowledgements)
# Status
This is currently a work in progress in its early stages. Features will be added in frequently.
# Features
* Acquire oscillography data from a Kafka stream and parse it to working memory objects
* Beams the parsed data to clients via a web-socket implemented with socket.io
# How to install and run this application
## Prerequisites
To run this code you will need the latest versions of [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) installed on your machine.
## Installing and running a test locally
First you will need to have a Kafka topic set up and running on address localhost:9092. Then, run the following commands:
```bash
# Clone this respository
$ git clone <https://github.com/Gabriel-f-r-bojikian/orsini-backend.git>

# Move into the newly created folder
$ cd orsini

# Install all dependencies
$ npm install

# Run the mock data generator
$ npm run integrationTest

# Run the back-end server
$ npm run index
```
# Author and Acknowledgements
Autorship attribuition: Gabriel Bojikian

My links for contact are:
[![Github Badge](https://img.shields.io/badge/-Gabriel-181717?style=flat-square&logo=github&logoColor=white&link=https://github.com/Gabriel-f-r-bojikian)](https://github.com/Gabriel-f-r-bojikian) [![Linkedin Badge](https://img.shields.io/badge/-Gabriel-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/gabriel-fernandes-rosa-bojikian-688b84164/)](https://www.linkedin.com/in/gabriel-fernandes-rosa-bojikian-688b84164/) [![Gmail Badge](https://img.shields.io/badge/-gabriel.bojikian.dev@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:gabriel.bojikian.dev@gmail.com)](mailto:gabriel.bojikian.dev@gmail.com)
