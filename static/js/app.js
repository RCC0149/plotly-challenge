// Create fucntion to build plots 
function buildPlots (id) {
    d3.json("../../samples.json").then((data) => {
        // console.log(data)
        var samples = data.samples
        var data1 = samples.filter(meta => meta.id.toString() === id)
        data1 = data1[0]
        console.log(data1)
        var ids = data1.otu_ids.slice(0,10)
        var values = data1.sample_values.slice(0,10)
        var labels = data1.otu_labels.slice(0,10)

// Create horizontal bar chart
        var trace1 = {
            x: values.reverse(),
            y: ids.reverse(),
            type: "bar",
            orientation: "h",
            marker: {color: "blue"},
            text: labels.reverse()
        }
        var plot = [trace1]

        var layout1 = {
            title: "Top 10 OTUs",
            xaxis: {title: "Sample Values"},
            yaxis: {title: "OTU IDs"},
            height: 700,
            width: 800
        }

    Plotly.newPlot("bar", plot, layout1)

// Create bubble graph
        var trace2 = {
            x: data1.otu_ids,
            y: data1.sample_values,
            mode: "markers",
            marker: {
                size: data1.sample_values,
                color: data1.otu_ids
            },
            text: data1.otu_labels
        }

        var layout2 = {
            xaxis:{title: "OTU IDs"},
            yaxis:{title: "Sample Values"},
            height: 600,
            width: 1000
        }

        var plot2 = [trace2]

    Plotly.newPlot("bubble", plot2, layout2)
        
    })
}

// Create a function to grab Demo Info
function getDemoInfo(id) {
    d3.json("../../samples.json"). then ((data) => {
        var metadata = data.metadata
        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() === id) [0]

        var demographicInfo = d3.select("#sample-metadata")
        demographicInfo.html("")

        Object.entries(result).forEach((key) => {
            demographicInfo.append("h6").text(key[0].toUpperCase() + ":" + key[1] + "\n")
        })
    })
}

// Create fucntion for change of evnet
function optionChanged(id) {
    buildPlots(id)
    getDemoInfo(id)
}

// Create function for initial data 
function init() {
    var drop = d3.select("#selDataset")

    d3.json("../../samples.json"). then ((data) => {
        data.names.forEach(function(name) {
            drop.append("option").text(name).property("value")
        })
// Display the data 
        buildPlots(data.names[0])
        getDemoInfo(data.names[0])
    })
}

init()