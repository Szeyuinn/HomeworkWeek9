// Load the GeoJSON and CSV files
Promise.all([
    fetch('malaysia.state copy.geojson').then(response => response.json()),  // Load GeoJSON
    fetch('forest_reserve_state copy.csv').then(response => response.text())  // Load CSV
]).then(([geoJSONData, csvData]) => {

    // Parse the CSV data using PapaParse (https://www.papaparse.com/)
    const parsedData = Papa.parse(csvData, { header: true }).data;

    // Filter the data for the year 2021
    const latestYearData = parsedData.filter(d => d.date === "2021-01-01");

    // Prepare data for Vega-Lite (convert into key-value pairs for lookup)
    const forestAreaLookup = latestYearData.reduce((lookup, row) => {
        lookup[row.state] = +row.area;  // Convert area to number
        return lookup;
    }, {});

    // Create the Vega-Lite choropleth map
    const chart = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        description: "Choropleth Map of Malaysia's Forest Reserves by State (2021)",
        width: 600,
        height: 400,
        projection: {
            type: "topojson"
        },
        data: {
            values: geoJSONData,  // Load the GeoJSON data
            format: {
                type: "json",
                property: "features"
            }
        },
        mark: {
            type: "geoshape"
        },
        encoding: {
            color: {
                field: "properties.name",  // State name from GeoJSON
                type: "quantitative",
                scale: { scheme: "greens" },  // Use color scale for forest area
                title: "Forest Area (hectares)"
            },
            tooltip: [
                { field: "properties.name", title: "State" },
                { field: "forest_area", title: "Forest Area (hectares)" }
            ]
        },
        transform: [
            {
                lookup: "properties.name",  // Use state name from GeoJSON
                from: {
                    data: {
                        values: latestYearData
                    },
                    key: "state",  // Lookup key from CSV
                    fields: ["area"]  // Field from CSV to use
                },
                as: "forest_area"  // Create a new field for forest area
            }
        ]
    };

    // Embed the chart into the HTML
    vegaEmbed("#vis", chart).then(result => {
        console.log("Map rendered successfully!");
    }).catch(console.error);

});
