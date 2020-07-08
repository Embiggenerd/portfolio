const slideData = [
  {
    name: "Angular Todos",
    description: "A MEAN app with authentication that has full crud functionality.",
    challenges: [
      "Learned how to build an Angular app.",
      "Brought testing coverage above 90%.",
      "Learned different design patterns. For instance, using services to hold state.",
      "Became familiar with RXJS"
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
    name: "Go-Ribit",
    description: 'A rewrite of Ribbit. A learning exercize \
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
    imgSrc: "gifs/go-ribbit_3.gif",
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
      "Wrote a backend in typescript with object oriented style and \
      maintained testability.",
      "Orchestration with docker-compose especially suited for \
      compiling typescript.",
      "Travis CI and microservices testing.",
      "Delt with the challenges of microservices error handling."
    ],
    sources: [
      '<a target="_blank" href="https://mherman.org/blog/developing-and-testing-microservices-with-docker">MHerman tutorial</a>',
    ],
    imgSrc: "gifs/weather-app_1.gif",
    imgHref: "https://github.com/Embiggenerd/weather_app2",
    title: "Github Repository"
  },
  {
    name: "Dockerized Go Todos",
    description: 'A dockerized todos app written using only the standard go \
    library and plain SQL queries, with go templates for the front \
    end.',
    challenges: [
      "First dockerized application.",
      "Built cache buster, used no frameworks.",
      "The go language, and learning to read source and documentation \
      in general.",
      "Learned raw SQL and postgres.",
      "Sessions and a cache buster for CSS files completely from scratch."
    ],
    sources: [
      '<a target="_blank" href="https://golang.org/doc/">The go documentation</a>',
      'Various blogs and stackoverflow questions.',
      '<a target="_blank" href="https://github.com/Embiggenerd/dockerizedGoTodos">Github repository</a>'
    ],
    imgSrc: "gifs/dockerized-go-todos_1.gif",
    imgHref: "https://github.com/Embiggenerd/dockerizedGoTodos",
    title: "Github Repository"
  },
  {
    name: "Ribit",
    description: 'An original social network that calculates total reading hours, \
    and awards users with "ribbits" they can use to lower the \
    visibility, and therefore the total reading hours of their \
    competition. They are also allowed to buy ribbits through \
    stripe, though their total reading hours do not change. \
    Visibility of content is based on reading hours.',
    challenges: [
      "Used react component hooks creatively to implement reading hours.",
      "Integrated stripe payment in a way that makes sense.",
      "First non-trivial app.",
      "The general difficulty of executing on an original idea."
    ],
    sources: [
      '<a target="_blank" href="https://www.udemy.com/node-with-react-fullstack-web-development/">Dave griders mern stack course</a>',
      'Various blogs and stackoverflow questions.',
      '<a target="_blank" href="https://github.com/Embiggenerd/ribbit">Github repository</a>',
      '<a target="_blank" href="https://cryptic-chamber-20731.herokuapp.com/">Ribbit</a>'
    ],
    imgSrc: "gifs/ribbit_2.gif",
    imgHref: "https://cryptic-chamber-20731.herokuapp.com/",
    title: "Deployed app"
  },
  {
    name: "React Todos TDD",
    description: 'A MERN stack todos list application focused on testing.',
    challenges: [
      "Wrote the backend in a way that is testable by abstracting methods into imported services.",
      "Nearly 100% testing coverage in front and back end, with unit and integration tests.",
      "Different branches show different testing strategies.",
      "CSS written with BEM methodology, with variables, and with different CSS files for both flex and float based approach.",
      "React component style based on small components composed to use props.children to avoid drilling deep to pass props.",
    ],
    sources: [
      '<a target="_blank" href="https://www.youtube.com/channel/UC0BAd8tPlDqFvDYBemHcQPQ">Fredrik Christensons approach to writing applications</a>',
      '<a target="_blank" href="https://www.youtube.com/user/kentdoddsfamily">Kent C Dodds approach to testingreact</a>',
      '<a target="_blank" href="https://github.com/Embiggenerd/todos_tdd/tree/react-final">Github repository</a>',
    ],
    imgSrc: "gifs/todos-tdd_1.gif",
    imgHref: "https://react-todos-tdd.herokuapp.com/",
    title: "Deployed app"
  },
  {
    name: "React Todos JWT",
    description: 'A MERN stack todos list application focused on being different.',
    challenges: [
      "Used JWT and local storage for authentication. (not suitable \
        for real world)",
      "Only react-router is used for authorization.",
      "Learned to write a front end using typescript with the strictest settings.",
      "Used large, highly configurable components, instead of composing smaller ones.",
      "Used of mongoose methods instead of independent \
      services to maintain testability.",
    ],
    sources: [
      '<a target="_blank" href="https://www.youtube.com/watch?v=zx6jnaLuB9Q&list=PLSpJkDDmpFZ7GowbJE-mvX09zY9zfYatI">Codeworkrs series on node backend</a>',
      '<a target="_blank" href="https://blog.cloudboost.io/learn-how-to-create-a-simple-blog-with-react-node-c05fa6889de3">Simple react tutorial</a>',
      '<a target="_blank" href="https://www.typescriptlang.org/docs/home.html">Typescript documentation</a>',
      '<a target="_blank" href="https://github.com/Embiggenerd/todos-jwt-typescript">Github repository</a>'
    ],
    imgSrc: "gifs/todos-jwt-typescript_1.gif",
    imgHref: "https://obscure-coast-57866.herokuapp.com/",
    title: "Deployed app"
  },
]