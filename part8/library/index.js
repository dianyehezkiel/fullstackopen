const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!(args.author || args.genre)) {
        return books
      } else if (!args.genre) {
        const byAuthor = (b) => b.author === args.author

        return books.filter(byAuthor)
      } else if (!args.author) {
        const byGenre = (b) => {
          if (b.genres.find((g) => g === args.genre)) {
            return true
          }
          return false
        }

        return books.filter(byGenre)
      }

      const byAuthorAndGenre = (b) => {
        if (b.author !== args.author) {
          return false
        }
        if (b.genres.find((g) => g === args.genre)) {
          return true
        }
        return false
      }

      return books.filter(byAuthorAndGenre)
    },
    allAuthors: () => authors.map((a) => {
      const bookCount = books.reduce((n, b) => {
        if(b.author === a.name) {
          return n + 1
        }
        return n
      }, 0)
      return {
        ...a,
        bookCount
      }
    })
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { ...args, id: uuid()}
      books = books.concat(newBook)
      
      const authorExist = authors.find((a) => a.name === args.author)

      if (!authorExist) {
        const newAuthor = { name: args.author, id: uuid() }
        authors = authors.concat(newAuthor)
      }

      return newBook
    },
    editAuthor: (root, args) => {
      const authorExist = authors.find((a) => a.name === args.name)

      if (!authorExist) {
        return null
      }

      const updatedAuthor = {...authorExist, born: args.setBornTo}

      authors = authors.map((a) => {
        return a.name !== args.name
          ? a
          : updatedAuthor
      })

      const bookCount = books.reduce((n, b) => {
        if(b.author === args.name) {
          return n + 1
        }
        return n
      }, 0)

      return { ...updatedAuthor, bookCount }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})