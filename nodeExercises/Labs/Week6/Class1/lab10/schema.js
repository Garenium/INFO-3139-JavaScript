const schema = `
type Country {
    name: String
    code: String
}

type Alert {
    country: String
    name: String
    text: String
    date: String
    region: String
    subregion: String
}

type Query {
    countries: [Country]
    alerts: [Alert]
    countrybycode(code: String): [Country]
    countrybyname(name: String): [Country]
    alertsforregion(region: String): [Alert]
    alertsforsubregion(subregion: String): [Alert]
}
`;
export { schema };
