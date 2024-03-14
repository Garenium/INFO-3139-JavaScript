const schema =`
type Results {
    results: String
},
type Query {
    project1_setup: Results,
    alerts: [Alert],
    advisories: [Advisory],
    list_alerts_for_region(region: String): [Alert],
    list_alerts_for_subregion(subregion: String): [Alert],
    list_advisories_by_name(name: String): [Advisory]
    regions: [String],
    subregions: [String],
    travellers: [String],
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