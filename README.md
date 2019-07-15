# Flash Study

Flash study is a web app for users to create, store, and review flash cards for any subject! Users can create categories and then begin adding a stack of cards with questions on one side and answers on the other. Users can also choose to use the Leitner system.

In this system, cards that are answered correctly will be moved up to a higher tier of card buckets and ones that are answered incorrectly will be moved back to the lowest tier. Cards in higher buckets will be reviewed less often than lower level cards, allowing users to focus on questions that they are having the most difficulty remembering and practice spaced repitition to maximize their learning!

## Technology

### Back End

Flash Study's back-end uses NestJS, self described as:

> A progressive Node.js framework for building efficient, reliable and scalable server-side applications.

Along with PostgresQL and utilizing typeORM for database storage of user and card info.

---

### Front End

Initial plans are for Flash Study's front end to be built using React with Redux for state managment.

---

## Roadmap

- [x] Finish NestJS API routes for cards and users
- [ ] Write unit tests for API
- [ ] Begin work on React front end
