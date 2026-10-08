---
title: De/Bunking
subtitle: Some considerations after four days of teaching experimental cartography and putting up a show
slug: debunking
authors:
  - Francesca Morini
categories:
  - workshop
  - erasmus
  - 3D printing
  - cartography
date: 2026
---

Recently I have been to Liepāja in Latvia to take part to [UPDATE](https://2026.updatefestival.lv/en), the Media Art and Technologies Festival. Together with two wonderful colleagues, Myriel and Kerstin, we run a [four-day workshop](https://2026.updatefestival.lv/en/workshops/debunking) mixing together experimental cartography and speculative design to understand and reimagine one piece of Liepāja local history: the Artillery battery No. 1. These fortifications were built at the beginning of the 20th century by the Russian tsarist army as coastal defence battery, but were never put to use. These bunkers were built directly at the Baltic sea, north of Karosta, a military territory. They were dug only few meters behind the shoreline and were connected through underground tunnels. During the Soviet occupation, the fortifications were partially in use for military operations. In the decades after, the fortifications have been abandoned and the bunkers started to collapse into the sea, due to coastal erosion.

![](/uploads/debunking/earth-bunkers.png)
_The Artillery battery No. 1 as seen from Google Earth._

Now, what remains of the bunkers sits directly on the shore. The buildings are quickly disappearing in the sea. This in-between state is what attracted our attention: how do the history of this place interacts with us? What stories can be told about Artillery battery no.1 so that it is not forgotten?

### Monday

We brought these questions to the students joining the workshop and decided to find interconnected ways to tell the story of Artillery battery no.1. To do it, we started by looking for data. On day one, I gave an extensive tutorial on how to gather satellite imagery and data. Using the battery as case studies, I went through the most common and publicly available tools, like the great [Copernicus Browser](https://browser.dataspace.copernicus.eu). I thought it would be nice for them to gather impressions about the battery before visiting. To make things even more concrete, I dedicated quite some time to a step-by-step tutorial on how to load LiDAR point clouds in QGIS, convert it into a raster, and generate a .stl file for 3D printing. We tested it with data from the battery, and went from this:

![](/uploads/debunking/stl-preview.gif)

To this:

![](/uploads/debunking/test-print.png)

To – after 18 hours of printing – this:

![[print_result.png]]

I tend to be conservative when I give technical tutorials, because I am always afraid of not being able to cover enough ground, especially when specific tools are in the picture. However, the pipeline for this turned out to be quite straightforward and plugins like DEMtoD3 make things very beginner-friendly. (Also having four full days and enough equipment/technical support for them to figure out what they want to do helps ;)). In the end, we did not print more contour tiles – as the focus shifted away from pure cartography towards physicalization. Nevertheless, I still think the experiment was really interesting and everyone was excited to have something tangible to work with. Also, it is always nice to try out a familiar tool with people that have never used it before.

### Tuesday

![](/uploads/debunking/data-collection.png)
_Working with the data collection templates_

After our geeky Monday, we took the entire day to go out to the bunkers on Tuesday. Under the experienced guidance of Myriel and after a rich historical input by our local guide Rīta, students dedicated the entire day collecting data and exploring (safely!) the bunkers. I also got carried away and ended up taking a lot of 3D scans of the areas with the excuse of making additional material for the participants to work on.

![[ScreenRecording_10-03-2026 08-12-59_1.mp4]]
_Screencapture from Polycam of the 3D scan I took from a bunker. I have a couple of them, if anyone wants them drop me an email/DM on Linkedin._

Obviously, they were totally fine. They did not need my data at all and I knew it. It was just too cool to be there and I really wanted to see how far I could map the area without falling into the sea.

![](/uploads/debunking/bunkers-visit.png)
_Exploring decaying bunkers on the beach_

I was truly surprised by the extent of the data collection. Our product design trio, Annie, Noah and Aljoscha, ended up collecting rubble, rocks, bones, and even fossils. Nelina started interviewing visitors, locals and foreigners walking up and down the forts, asking for their impressions and opinions on the area. Agota, Fred and Niköla took photos, sound samples, videos and 3D scans of the area. After six full hours of work, we decided to call it a day and return home.

![](/uploads/debunking/artifacts.jpg)
_Some of the collected artifacts, photo by Annie Fürstenberg_

### Wednesday

The day started with a collective discussion and feedback round. We brought together all the collected data and ideas.

![](/uploads/debunking/workshop.png)
_Some of the shared brainstorming_

The group decided pretty quick to work on a unique project as outcome of the workshop: an exhibition piece documenting the changing nature of the landscape, mixing an historical approach to the history of the battery with a playful way to experience the materiality of the bunkers. We did not set any expectation in terms of technique or technology, but we made sure to figure that out pretty quickly. After one hour of shared brainstorming, two groups emerged and started working on the two different parts of the projects:

- Nelina, Niköla, Agota and Fred started working on the history of the battery, using traditional cartography, projection, sound, photography and code.
- Annie, Noah and Aljoscha decided to build toys made of sand, rubble, and cement. Miniatures of the bunkers to be touched, rearranged, and played with.

### Thursday and Friday

The last two days were dedicated to the set up of the exhibition. Unfortunately, Kerstin, Myriel and I had to go back to Berlin and left on Thursday afternoon. We had a last huddle with the group to figure out the set up and orchestration of the piece, but to be honest we could have not been there. At that point, after working together and building confidence, the team was very well aligned and everyone was proactive and productive. I really appreciate when that happens, it is not always the case. It is more common with small groups, but it also depends a lot on who joins. In this case we were really lucky and I think the activities we designed help in enforcing this team feeling even more.

Here's the final result. The base piece is a 7 meters long map of the coast hanging from the ceiling and stretching from the room. The map has been conceptualized, designed and printed by Nelina. I supported a little by providing the base map as a highly detailed .svg file using OSM data as a base.

![](/uploads/debunking/debunking.png)

She took it and created this very cool base layer where the history of the bunker is explained and where visitors were invited to chart their ideas for the future of these bunkers:

![](/uploads/debunking/debunking2.png)

Niköla printed large images of the bunkers and arranged them on the wall around the base layer. She collected sample of plants, and weaved them into the photos, exaggerating the takeover of the natural landscape over the human-made concrete structure. Agota projected a loop animating the 3D scans of the battery, distorting the space through the digital lense.

![](/uploads/debunking/debunking3.png)

The part of the map stretched on the floor was used by Annie, Noah and Aljoscha as a playground. They positioned the miniature version of the bunkers, arranging them to recreate the original battery. Visitors had been invited to play with the shapes, creating new arrangements and structures. However, the brittle nature of sand mixed with concrete made the task difficult. The models disintegrated in the hands of visitors, just the original full-sized bunkers.

![](/uploads/debunking/debunking4.png)

In other words, I can only say that the outcome of the workshop was really cool. We started with a broad idea and some brief theoretical and practical inputs. We brought in data visualization (me), speculative design & experimental cartography (Myriel), and cultural heritage theory (Kerstin). The team completed the picture with its unique set of skills and interests: product design, information visualization, creative coding, photography and exhibition design. It was very satisfying to see the project take shape and grow in unexpected directions.

**Teaching:** Myriel Milicevic, Francesca Morini, Kerstin Neumann

**Team:** Agota Balčiūnaitė, Aljoscha Fischer, Annie Fürstenberg, Noah Hüther, Frederic Mann, Nelina Neumann, Nelina Neumann, Niköla Šūmākere

Thanks to Maija Demitere, Rita Kapeniece-Klauža and Rogier Gerben Jupijn for all their knowledge, support, and savvyiness.
