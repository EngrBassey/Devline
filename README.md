# ALX Foundations Portfolio Project

### Devline

<i>Connecting aspiring techies with willing teachers for collaborative learning.</i>

## Introduction

Welcome to DevLine, a platform designed to connect students with mentors for personalized learning. With DevLine, students can easily find mentors who have knowledge in any specific topic they they want to learn and request mentorship sessions with no cost at all. Mentors, on the other hand, as a way of giving back to the community, can showcase their expertise and help students grow in their chosen fields.

---

Link to Deployed Site: http://devline.live <br />
Final Project Blog Article

Authors:
[Prisca Chidimma Maduka](https://github.com/Priceless-P)
[Bassey Samuel](https://github.com/EngrBassey)
[Israel Udofia](https://github.com/israeludofia1990)

## Installation

To install, clone the repository

```bash
git clone  https://github.com/EngrBassey/Devline.git
```

```bash
cd backend
pip install -r requirements.txt
touch .env
```

In the .env file in, set the following variables

```txt
ENVIRONMENT_CONFIGURATION='backend.config.DevConfig' (For dev environment)
SECRET_KEY = 'your random secret key'
DEV_DATABASE_URL='postgresql://username@localhost/devline' (can be mysql instead of postgres)
PROD_DATABASE_URL=''
```

After that, cd into dev_react which is our frontend directory and run

```bash
npm install
npm start
```

Access the application at http://localhost:3000.

## Usage

**Signing Up:** Students and mentors can sign up for accounts on the platform.

**Browsing Mentors:** Students can browse through a list of available mentors and their subjects of expertise.

**Requesting Mentorship:** Students can select a mentor and send a mentorship request.

**Accepting Requests:** Mentors can view and accept/reject mentorship requests from students.

**Pairing:** Once a mentorship request is accepted, the mentor and student are paired up for sessions.
**Review:** The student can optionally review the mentor after each session.


## Contributing

We welcome contributions to improve DevLine. To contribute, please:

- Fork the repository on GitHub.
- Make your changes in a feature branch.
- Submit a pull request with a clear description of your changes.

## Related Projects

Check out these related projects:

- [LearningHub](https://learninghub.sap.com/): A platform for online learning and collaboration.
- [CodeMentor](https://www.codementor.io/): Connects aspiring coders with experienced mentors.

## Licensing
MIT license
