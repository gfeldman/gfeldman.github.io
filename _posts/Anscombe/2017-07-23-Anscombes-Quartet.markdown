---
layout: post
title:  "Visualization of Anscombe's Quartet"
date:   2017-07-24 01:30:00
categories: d3 statistics visualization dataviz anonymization
permalink: /blog/AnscombesQuartet
---

[Anscombe's quartet](https://en.wikipedia.org/wiki/Anscombe%27s_quartet) consists of four datasets that have very similar summary statistics, but different visual appearance. For this reason, the collection of datasets is considered the "hello world" example in data visualization. 


<style type="text/css">
    td {
        text-align: center;
    }
</style>

{% include_relative html/sumstats.html %} 


## Scatter Plots ##
Below is an interactive d3 visualiztion of the data for each of the datasets along with their associated regression line. If you click on one of the points, you will see how the regression line changes when that point is omitted. Clicking anywhere else in the plot will revert to the original configuration. 

<script src='../bower_components/d3/d3.min.js'></script>
<div id="scatterplots"></div>

<style>
	{% include_relative d3/scatterplots.css %}
</style>
<script type="text/javascript">
	{% include_relative d3/scatterplots.js %}
</script>

## Generating New Datasets ##

Sangit Chatterjee and Aykut Firat follow up on Anscombe's quartet in their paper titled ["Generating Data with Identical Statistics but Dissimilar Graphics"](http://dx.doi.org/10.1198/000313007X220057). In this paper, the authors propose an algorithm to generate an output dataset with identical summary statistics to a given input dataset. Such an algorithm may be useful in applications of data anonymization or generating test datasets for a machine learning algorithm. We may explore these topics in another post. Stay tuned.
