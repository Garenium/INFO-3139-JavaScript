const schema = `
type Country {
    Name: String
    Code: String
}

type Query {
    countries: [Country]
    countrybycode(Code: String): Country
    countrybyname(Name: String): Country
}

type Mutation {
    addcountry(Name: String, Code: String): Country
}
`;
export { schema };
