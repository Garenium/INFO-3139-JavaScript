const schema =`
type Results {
    results: String
},
type Query {
    project1_setup: Results,
    alerts: [Alert],
    advisories: [Advisory],
    region(region: String): [Alert],
    subregion(subregion: String): [Alert],
    traveller(name: String): [Advisory]
    regions_unique: [String],
    subregions_unique: [String],
    travellers_unique: [String],
},
type Alert {
    country: String
    name: String
    text: String
    date: String
    region: String
    subregion: String
},
type Advisory {
    name: String
    country: String
    text: String
    date: String
},
type Mutation {
    add_advisory(name: String, country: String): Advisory
}`
export { schema };