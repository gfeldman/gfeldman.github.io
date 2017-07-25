let data = [];

let margin = {top: 30, right: 30, bottom: 30, left: 30};

let width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


let circSize = 7;


function render(error,data){

    if(error) console.warn(error)

    data.forEach( d=> {
        d.x = +d.x;
        d.y = +d.y;
        d.x1 = +d.x1;
        d.y1 = +d.y1;
        d.x2 = +d.x2;
        d.y2 = +d.y2;
    });

    let upperX = d3.max(data,d => d.x)*1.1;
    let xScale = d3.scaleLinear()
        .domain([0,upperX])
        .nice()
        .range([0,width]);


    let upperY = d3.max(data,d => d.y)*1.1;
    let yScale = d3.scaleLinear()
        .domain([0,upperY])
        .nice()
        .range([height,0]);

    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    colorScale.domain(d3.map(data, d => d.group).keys());



    let grps = Array.from(d3.map(data, d => d.group).keys());



    let svgs = new Map(grps.map(w => [w,d3.select("div#scatterplots").append("svg")
        .attr("width",  '48%')
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")]
));

    function renderGroup(grp){

     let svg = svgs.get(grp);

        var background = svg.selectAll(".background")
            .data(["All"])
            .enter()
            .append("rect")
            .attr("x",0)
            .attr("y",0)
            .attr("height",height)
            .attr("width",width)
            .attr("fill","WhiteSmoke");

    // Scales and Axes
    let xAxis = d3.axisBottom(xScale)
        .tickSize(-height);
    let yAxis = d3.axisLeft(yScale)
        .tickSize(-width);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);


    // Plot points
    let circleGroup =svg.selectAll(".circle-group")
        .data(data.filter(d => d.group === grp))
        .enter()
        .append("g")
        .attr("class", "circle-group")
        .attr("transform", (d) => "translate(" + xScale(d.x) + "," + yScale(d.y) + ")" )
        .attr("xval",d => d.x).attr("yval",d=>d.y)
        .attr("x1", d => d.x1).attr("y1",d=>d.y1)
        .attr("x2",d=>d.x2).attr("y2",d=>d.y2);

    // set radius of circles
    circleGroup.append("circle")
        .attr("r", circSize)
        .attr("x1",d => d.x)
        .attr("y1",0)
        .attr("x2",d => d.x)
        .attr("y2",20)
    // set color based on group

    // color scheme


    circleGroup
        .attr("fill",(d) => colorScale(d.group));


        let ldata = [0,3.0,20,3.0+0.5*20];
            var trendline = svg.data(data.filter(d => d.group === grp)).append("g")
                .attr("class","trendline");

        trendline
            .append("line")
            .attr("x1", xScale(ldata[0]))
            .attr("y1",yScale(ldata[1]))
            .attr("x2", xScale(ldata[2]))
            .attr("y2", yScale(ldata[3]))
            .attr("stroke", "black")
            .attr("stroke-width", 2);


        background.on("click", () => {

                svg.selectAll(".circle-group")
                    .select("circle")
                    .attr("r", circSize)
                svg.select(".trendline")
                    .transition()
                    .select("line")
                    .attr("x1", xScale(ldata[0]))
                    .attr("y1", yScale(ldata[1]))
                    .attr("x2", xScale(ldata[2]))
                    .attr("y2", yScale(ldata[3]))

            }


        )
        circleGroup.on("click",function() {

            svg.selectAll(".circle-group")
                .select("circle")
                .attr("r",circSize);

            d3.select(this)
                .transition()
                .select("circle")
                .attr("r",0)

            svg.select(".trendline")
                .transition()
                .select("line")
                .attr("x1",  d => xScale(d3.select(this).attr('x1')))
                .attr("y1", d => yScale(d3.select(this).attr('y1')))
                .attr("x2",  d => xScale(d3.select(this).attr('x2')))
                .attr("y2", d => yScale(d3.select(this).attr('y2')))
        })



    }

    grps.map(g => renderGroup(g));


}


d3.tsv('../data/Anscombe/quartet_with_reg.tsv',render);