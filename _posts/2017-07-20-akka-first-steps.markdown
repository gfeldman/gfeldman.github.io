---
layout: post
title:  "First Steps in Akka"
date:   2017-07-01 01:30:00
categories: scala akkka reactive 
permalink: /blog/FirstAkka
---

The purpose of this post is to understand the basics of the actor model in Akka. We will build a basic download manager that uses actors to download files in parallel. 
I originally wrote this code to download [trip data][nyc-taxi] from the NYC Taxi and Limousine Commission. The trip data is split into monthly csv files for three types of cabs (Yellow, Green, and For-Hire Vehicles). I needed a way to programmatically download the files for all cab types for a year. Wanting to learn Akka, this is what I came up with. 

- Disclaimer: The purpose of this post is to understand the basics of the actor system in Akka. Efficiency is not the primary concern. There are more efficient ways to write a download manager without introducing the complexity of the actor system. 

With that out of the way, let's begin. 

## The Actors ##

![Table]

### The Message ###

### The Checker Actor ### 

### The Downloader Actor ###

### The Download Supervisor ###

## Making the Actors Work Together ##

### Starting the Actor System ###
### Stopping the Actor System ###

## Conclusion ##



[nyc-taxi]: http://www.nyc.gov/html/tlc/html/about/trip_record_data.shtml

