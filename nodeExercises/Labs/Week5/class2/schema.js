const schema = `
type Query {
    users: [User],
    userbyname(name: String): User
},
type User {
    name: String
    age: Int
    email: String
}
type Mutation {
    adduser(name: String, age: Int, email: String): User
}
`;
export { schema };
