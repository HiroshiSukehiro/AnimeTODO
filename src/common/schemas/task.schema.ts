export const typeDef = 
`enum TaskStateEnum {
    PENDING
    IN_WORK
    COMPLETED
}

type Task {
    id: Int!
    authorId: Int!
    name: String!
    description: String
    expires: DateTime!
    isCompleted: Boolean!
    status: TaskStateEnum!
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean
    author: User!
}

input NewTask {
    authorId: Int!
    name: String!
    description: String!
    expires: DateTime!
    isCompleted: Boolean!
    status: TaskStateEnum!
}

input UpdateTask {
    id: Int!
    name: String
    description: String
    expires: String
    isCompleted: Boolean
    status: TaskStateEnum
}

type Query {
    tasks: [Task!]
    task(id: Int!): Task
}

type Mutation {
    createTask(input: NewTask!): Task
    updateTask(input: UpdateTask!): Task
    deleteTask(input: Int!): Task
}

scalar DateTime`