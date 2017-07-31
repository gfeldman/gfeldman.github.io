---
layout: post
title:  "First Steps in Akka"
categories: scala akkka reactive 
permalink: /blog/FirstAkka
---

The purpose of this post is to understand the basics of the actor model in Akka. We will build a basic download manager that uses actors to download files in parallel. 
I originally wrote this code to download [trip data][nyc-taxi] from the NYC Taxi and Limousine Commission. The trip data is split into monthly csv files for three types of cabs (Yellow, Green, and For-Hire Vehicles). I needed a way to programmatically download the files for all cab types for a year. Wanting to learn Akka, this is what I came up with. 

At a high level, the actor system will be made up of three actors that work together by sending messages to each other. First, we will have a download checker, which checks if the file has been downloaded already; second, we have the file download actor, which actually downloads the file; and finally we have the download supervisor that will coordinate between the file checker and the downloader actors. 

<style>
figcaption { 
    display: block;
    text-align: center;
}
</style>
<figure>
<img src="{{site.url}}/Illustrations/FirstAkka/ActorSys.jpg">
<figcaption>Figure 1: A rough sketch of the actor system we are building.</figcaption>
</figure>


## Defining The Actors ##

Each of these actors extends the akka Actor class obtained by the following import: 
```scala
import akka.actor.Actor
``` 

To extend the actor class we need to define two things: 
1.  The messages the actor will handle, and  
2.  a receive function, which determines the actors behavior when a message comes in.

We specify each of the actors mentioned above in turn. 


### The Download Checker Actor ###

When a download message comes in, the download supervisor will forward it to a download checker actor. Our download checker actor will be very simplistic:

* If the file does not exist, the actor will send a message to its supervisor to start the download. 
* If the file exists and the local file size differs from the remote file size, the actor will delete it and then send a message to its supervisor to start the download. 
* If the file exists and the local and remote file sizes match, the actor will send a message to its supervisor to skip this file.

The implementation is sketched below: 

```scala

object DownloadChecker {
  /*
  * Companion object to encapsulate the messages the actor can
  * send and receive, and the functions that the actor can apply.
  */

  // Messages
  case class CheckFile(dl: Download)
  case class Go(dl: Download)
  case class Skip(dl: Download)

  // ... Actor functions ... 
  // (see GitHub repo for details)
}


class DownloadChecker extends Actor {

  import DownloadChecker._
  def receive = {
    case CheckFile(dl) if !fileExists(dl) => {
      sender() ! Go(dl)
    }
    case CheckFile(dl) if fileExists(dl) && !fileSizeEqual(dl) => {
      new File(dl.destFile).delete()
      sender() ! Go(dl)
    }
    case CheckFile(dl) if fileExists(dl) && fileSizeEqual(dl) => {
      sender() ! Skip(dl)
    }
  }
```
### The File Downloader Actor ###

When the supervisor actor receives a "Go" message from the download checker, the supervisor will send a message to the file download actor to actually download the file.

The implementation is sketched below: 
```scala
object FileDownloader {
  /*
  * Companion object to encapsulate the messages the actor can
  * send and receive, and the functions that the actor can apply.
  */

  // Messages
  case class DownloadFile(dl: Download)

  // ... Actor functions ... 
  // (see GitHub repo for details)
}

class FileDownloader extends Actor {
  import FileDownloader._
  def receive = {
    case DownloadFile(dl: Download) => fileDownloader(dl.url, dl.destFile)
  }
}

```

### The Download Supervisor Actor ###

When a download message comes in we use the download supervisor actor to route messages and coordinate the download. The download supervisor sends a "CheckDownload" message to the download checker actor, and depending on the message it receives in return, may send a message to the file downloader actor to start the download. 

The implementation is sketched below:
```scala
class DownloadSupervisor(checker: ActorRef, downloader: ActorRef) extends Actor  {
  import scala.concurrent.ExecutionContext.Implicits.global
  implicit val timeout = Timeout(10 seconds)

  def receive = {
    case dl: Download =>
      checker ? DownloadChecker.CheckFile(dl) map {
        case DownloadChecker.Go(dl) => {
          downloader ! FileDownloader.DownloadFile(dl)
        }
        case DownloadChecker.Skip(dl) => {
          println(s"Skipping file  ${dl.destFile.split("/").last}")
        }
      }
  }
}
```


## Making the Actors Work Together ##

### Starting the Actor System ###

### Using a Pool for Parallelism ###
### Stopping the Actor System ###

## Conclusion ##



[nyc-taxi]: http://www.nyc.gov/html/tlc/html/about/trip_record_data.shtml

