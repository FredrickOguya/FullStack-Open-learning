const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require("graphql/error")
const { v1: uuid } = require('uuid')

require('dotenv').config()
const connectToDatabase = require('./db')
const startServer = require('./server')
const MONGODB_URI = process.env.MONGODB_URI

const PORT = process.env.PORT || 3003

const main = async () => {
  await connectToDatabase(MONGODB_URI)
  startServer(PORT)
}

main()