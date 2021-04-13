// Create fucntion to build plots 
function buildPlots (id) {
    d3.json("samples.json").then((data) => {
        console.log(data)
        var ids = data.samples[0].otu_ids
        var sampleValues = data.samples[0].sample_values.slice(0,10).reverse()
        var labels = data.samples[0].otu_labels.slice(0,10)

        var otu = (data.samples[0].otu_ids.slice(0,10)).reverse()
        var otuId = otu.map(d => "OTU" + d)
            console.log(`OTU_labels: ${otuId}`)
        var labels = data.samples[0].otu_labels.slice(0,10)
            console.log(`OTU_labels: ${labels}`)

// Create horizontal bar chart
        var trace1 = {
            x: sampleValues,
            y: otuId,
            type: "bar",
            orientation: "h",
            marker: {
                color: "blue"
            },
            text: labels
        }
        var plot = [trace1]

        var layout1 = {
            title: "Top 10 OTUs",
            yaxis: {
                tickmode: "linear"
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        }

    Plotly.newPlot("bar", plot, layout1)

// Create bubble graph
        var trace2 = {
            x: data.samples[0].otu_ids,
            y: data.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: data.samples[0].sample_values,
                color: data.samples[0].otu_ids
            },
            text: data.samples[0].otu_labels
        }

        var layout2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        }

        var plot2 = [trace2]

    Plotly.newPlot("bubble", plot2, layout2)
        
    })
}

// Create a function to grab Demo Info
function getDemoInfo(id) {
    d3.json("samples.json"). then ((data) => {
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

    d3.json("samples.json"). then ((data) => {
        data.names.forEach(function(name) {
            drop.append("option").text(name).property("value")
        })
// Display the data 
        buildPlots(data.names[0])
        getDemoInfo(data.names[0])
    })
}

init()