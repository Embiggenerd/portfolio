const slideData = [
  {
    name: "Angular Todos",
    description: "A MEAN app with authentication that has full crud functionality.",
    challenges: [
      "Learn how to build an Angular app.",
      "Testing coverage above 90%.",
      "Learn different design patterns. For instance, using services to hold state.",
      "Get comfortable with RXJS"
    ],
    sources: [
      '<a target="_blank" href="https://angular.io/docs">Angular official docs</a>',
      '<a target="_blank" href="https://github.com/Embiggenerd/todos_tdd/tree/react-final">Github Repo</a>'
    ],
    imgSrc: "gifs/angular_tdd.gif",
    imgHref: "https://infinite-woodland-30059.herokuapp.com/",
    title: "Deployed site"
  },
  {
    name: "Go-Ribbit",
    description: 'A rewrite of <a href="#" id="slide-to-ribbit">Ribbit</a>. A learning exercize \
      that mimicks popular architecture patterns where front end developers can also make APIs, \
      but services are written in more efficient languages.',
    challenges: [
      "First original micro services app.",
      "First automated CI/CD pipeline in Jenkins from scratch with unit, integration, and functional tests.",
      "First React Native application along side web",
      "Configured NginX as a reverse proxy to serve static files in production."
    ],
    sources: [
      '<a target="_blank" href="https://github.com/Embiggenerd/ribbit">Ribbit</a>',
      '<a target="_blank" href="https://github.com/Embiggenerd/go-ribbit">Github repository</a>'
    ],
    imgSrc: "https://igoratakhanov.com/go-ribbit_3.gif",
    imgHref: "https://github.com/Embiggenerd/go-ribbit",
    title: "Github Repository"
  },
  {
    name: "Weather App",
    description: 'A weather app that tells you the weather based on location, with \
      authentication, written in microservices architecture. With help \
      from a tutorial, but rewritten using typescript in the backend, \
      with many added tests and added error handling.', 
    challenges: [
      "Write a backend in typescript with object oriented style and \
      maintain testability.",
      "Orchestration with docker-compose especially suited for \
      compiling typescript.",
      "Travis CI and microservices testing.",
      "Deal with the challenges of microservices error handling."
    ],
    sources: [
      '<a target="_blank" href="https://mherman.org/blog/developing-and-testing-microservices-with-docker">MHerman tutorial</a>',
    ],
    imgSrc: "https://igoratakhanov.com/go-ribbit_3.gif",
    imgHref: "gifs/weather-app_1.gif",
    title: "Github Repository"
  }
]