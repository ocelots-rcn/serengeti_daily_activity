let dailyData = {};
let dailySpeciesList = null;

axios.get('../data/daily.json').then((response) => {
  dailyData = response.data;
    // Populate selection list
    let species = document.getElementById('DailySpecies');
    Object.keys(dailyData.species).sort().forEach( (val) => {
        let newOption = new Option(val, val);
        species.add(newOption,undefined);
    });

    dailySpeciesList = new SlimSelect({
        select: '#DailySpecies'
    });

    // Needs a little delay
    setTimeout(() => {dailySpeciesList.set(dailyData.groups['predator'])}, 500);
});

// Update graph when selections changes
const dailyPlot = () => {
    let pdata = [];
    let selected = dailySpeciesList.selected();

    if(selected.length > 0) {
        selected.forEach( (species) => {
        let plotd = {
            y: dailyData.species[species].sort(),
            name: species,
            type: 'violin'
        };
        pdata.push(plotd);
        });
    }
    Plotly.newPlot('DailyPlot', pdata, {yaxis: {title: 'Time of Day of Observations (24 H)', range: [0, 24], tick0: 0, dtick: 4}, xaxis: {title: 'Species'}}, {responsive: true});
}

const dailyClearList = () => {
    dailySpeciesList.set(['']);
}

// Quick load helper
const dailyQuickLoad = (key) => {
    dailySpeciesList.set(dailyData.groups[key]);
}