const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require("graphql/error")
const { v1: uuid } = require('uuid')

require('dotenv').config()

const startServer = require('./server')

const PORT = process.env.PORT || 4000

startServer(PORT)

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-1234543",
    street: "Tapiolankatu d A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Venla Ruuska",
    street: "Nallemaentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  }
]



const typeDefs =  /* GraphQL */ `
  type Address {
    street: String!
    city: String!
  }
  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
  
  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  },
  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) => persons.find(p => p.name === args.name),
    allPersons(root, args) {
      if (!args.phone) {
        return persons
      }
      return persons.filter(person => 
        args.phone === 'YES'
        ? person.phone
        : !person.phone
      )
    }
  },
  Person: {
    address: ({ street, city }) => {
      return {
        street,
        city
      }
    }
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find(p => p.name === args.name))
      {
        throw new GraphQLError(`Name must be unique: ${args.name}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.named
          }
        })
      }
      const person = { ...args, id: uuid()}
      persons = persons.concat(person)
      return person
    },
    editNumber: (root, args) => {
      const person = persons.find(p => p.name === args.name)
      if(!person) {
        return null
      }
      const updatedPerson = {...person, phone: args.phone}
      persons = persons.map(p => p.name === args.name ? updatedPerson : p )
      return updatedPerson
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})
  
  
startStandaloneServer( server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})