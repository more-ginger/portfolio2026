---
title: De/Bunking
subtitle: Some considerations after four days of teaching experimental cartography and putting up a show
slug: debunking
badge: '/uploads/debunking/badge.svg'
authors:
  - Francesca Morini
categories:
  - workshop
  - erasmus
  - 3D printing
  - cartography
date: 2026
---

Recently I have been to Liepāja in Latvia to take part in [UPDATE](https://2026.updatefestival.lv/en), the Media Art and Technologies Festival. Together with two wonderful colleagues, [Myriel Milicevic](https://www.fh-potsdam.de/hochschule-karriere/personen/myriel-milicevic) and [Kerstin Niemann](https://www.fh-potsdam.de/hochschule-karriere/personen/kerstin-niemann), we ran a [four-day workshop](https://2026.updatefestival.lv/en/workshops/debunking) mixing together experimental cartography and speculative design to understand and reimagine one piece of Liepāja local history: Artillery battery no. 1 No. 1. These fortifications were built at the beginning of the 20th century by the Russian tsarist army as a coastal defence battery, but were never put to use. The array of bunkers was built directly on the coast of the Baltic sea, north of Karosta, a military territory. They were dug only a few meters behind the shoreline and connected through underground tunnels. During the Soviet occupation, the fortifications were partially in use for military operations. In the decades after, the fortifications have been abandoned and the bunkers started to collapse into the sea, due to coastal erosion.

![](/uploads/debunking/earth-bunkers.webp)
_Artillery battery no. 1 No. 1 as seen from Google Earth_

Now, what remains of the bunkers sits directly on the shore. The buildings are quickly disappearing in the sea. This in-between state is what attracted our attention: how does the history of this place interact with us? What stories can be told about Artillery battery no. 1 so that it is not forgotten?

## Monday

These questions were our starting point for our work with the students. On Monday, Kerstin provided a historical overview of the battery, Myriel gave an input on cartography and its experimental applications. I started by looking for data. I gave an extensive tutorial on how to gather satellite imagery and data. Using Artillery battery no. 1 as a case study, I went through the most common and publicly available tools, like the great [Copernicus Browser](https://browser.dataspace.copernicus.eu) and showed how to obtain satellite data in a variety of ways and formats. In addition, I thought it would be nice for them to gather impressions about the battery before visiting. To make theory quickly actionable, I dedicated quite some time to a step-by-step tutorial on how to load LiDAR point clouds in QGIS, convert them into a raster, and generate a .stl file for 3D printing. We tested it with data from the battery, and went from this:

![](/uploads/debunking/point-cloud.webp)

To exporting this 3D-print ready file:

![](/uploads/debunking/stl-preview.gif)

Imported it and calibrated the machine (thanks Rogier!):

![](/uploads/debunking/test-print.webp)

To – after 18 hours of printing – this:

![](/uploads/debunking/printed-bunkers.webp)

I tend to be conservative when I give technical tutorials, because I am always afraid of not being able to cover enough ground, especially when specific tools are in the picture. However, the pipeline for this turned out to be quite straightforward and plugins like DEMto3D make things very beginner-friendly. (Also having four full days and enough equipment/technical support for them to figure out what they want to do helps ;)). In the end, we did not print more contour tiles – as the focus shifted away from pure cartography towards physicalization. Nevertheless, I still think the experiment was really interesting and everyone was excited to have something tangible to work with. Also, it is always nice to try out a familiar tool with people who have never used it before.

## Tuesday

![](/uploads/debunking/data-collection.webp)
_Working with the data collection templates_

After our geeky Monday, we took the entire day to go out to the bunkers on Tuesday. Under the experienced guidance of Myriel and after a rich historical input by our local guide Rita, students dedicated the entire day to collecting data and exploring (safely!) the bunkers. I also got carried away and ended up taking a lot of 3D scans of the areas with the excuse of making additional material for the participants to work on.

<video autoplay muted loop playsinline>
  <source src="/uploads/debunking/polycam.mp4" type="video/mp4">
</video>

_Screen capture from Polycam of the 3D scan I took from a bunker. I have a couple of them; if anyone wants them, drop me an email/DM on LinkedIn_

Obviously, they were totally fine. They did not need my data at all and I knew it. It was just too cool to be there and I really wanted to see how far I could map the area without falling into the sea.

![](/uploads/debunking/bunkers-visit.webp)
_Exploring decaying bunkers on the beach_

I was truly surprised by the extent of the data collection. Our product design trio, Annie, Noah and Aljoscha, ended up collecting rubble, rocks, bones and even fossils. Nelina started interviewing visitors, locals and foreigners walking up and down the forts, asking for their impressions and opinions on the area. Agota, Fred and Niköla took photos, sound samples, videos and 3D scans of the area. After six full hours of work, we decided to call it a day and return home.

![](/uploads/debunking/artifacts.webp)
_Some of the collected artifacts, photo by Annie Fürstenberg_

## Wednesday

The day started with a collective discussion and feedback round. We brought together all the collected data and ideas.

![](/uploads/debunking/workshop.webp)
_Some of the shared brainstorming_

The group decided pretty quickly to work on a unique project as the outcome of the workshop: an exhibition piece documenting the changing nature of the landscape, mixing an historical approach to the history of Artillery battery no. 1 no. 1 with a playful way to experience the materiality of the bunkers. We did not set any expectation in terms of technique or technology, but we made sure to figure that out pretty quickly. After one hour of shared brainstorming, two groups emerged and started working on the two different parts of the project:

- Nelina, Niköla, Agota and Fred started working on the history of Artillery Artillery battery no. 1 no. 1, using traditional cartography, projection, sound, photography and code.
- Annie, Noah and Aljoscha decided to build toys made of sand, rubble and cement. Miniatures of the bunkers to be touched, rearranged, and played with.

## Thursday and Friday

The last two days were dedicated to the setup of the exhibition. Unfortunately, Kerstin, Myriel and I had to go back to Berlin and left on Thursday afternoon. We had a last huddle with the group to figure out the setup and orchestration of the piece, but to be honest we need not have been there. At that point, after working together and building confidence, the team was very well aligned and everyone was proactive and productive. I really appreciate when that happens, it is not always the case. It is more common with small groups, but it also depends a lot on who joins. In this case we were really lucky and I think the activities we designed helped reinforce this team feeling even more.

Here's the final result. The base piece is a 7-meter-long map of the coast hanging from the ceiling and stretching into the room. The map has been conceptualized, designed and printed by Nelina. I helped a little by providing the base map as a highly detailed .svg file using OSM data as a base.

![](/uploads/debunking/debunking.webp)
_The complete setup. Shelves and interactive station not visible_

She took it and created this very cool base layer where the history of the bunker was explained and where visitors were invited to chart their ideas for the future of these bunkers:

![](/uploads/debunking/bunkers1.webp)
_The 7-meter-long map designed by Nelina, inviting visitors to re-design the future shoreline of Artillery Artillery battery no. 1 No. 1_

The part of the map stretched on the floor was used by Annie, Noah and Aljoscha as a playground. They positioned the miniature version of the bunkers, arranging them to recreate the original battery. Visitors were invited to play with the shapes, creating new arrangements and structures. However, the brittle nature of sand mixed with cement made the task difficult. The models disintegrated in the hands of visitors, just like the original full-sized bunkers.

![](/uploads/debunking/bunkers5.webp)
_Annie, Noah and Aljoscha built miniatures of bunkers mixing cement with gravel and sand from the original Artillery battery no. 1_

To complete the piece, Agota projected a loop animating the 3D scans of Artillery battery no. 1, distorting the mapped physical space through a digital and artistic lens. Fred created a small digital prototype using satellite imagery to show the transformation of the coast in real time. Niköla printed large images of the bunkers and arranged them on the wall around the base layer. She collected samples of plants and wove them into the photos, exaggerating the takeover of the natural landscape over the human-made cement structure. Others were placed as ordered samples, terrariums and aquariums on shelves surrounding the map:

![](/uploads/debunking/bunkers3.webp)
![](/uploads/debunking/bunkers4.webp)
_The sample collection curated by Niköla and Fred_

After four days of working, this was the result. We started with a broad idea and some brief theoretical and practical inputs. We brought in inputs on data visualization & remote sensing (me), speculative design & experimental cartography (Myriel), and cultural heritage theory (Kerstin). The students built on top of this base with their unique set of skills and interests: product design, information visualization, creative coding, photography and exhibition design. It was very satisfying to see the project take shape and grow in unexpected directions.

**Teaching:** Myriel Milicevic, Francesca Morini, Kerstin Niemann

**Team:** Agota Balčiūnaitė, Aljoscha Fischer, Annie Fürstenberg, Noah Hüther, Frederic Mann, Nelina Neumann, Niköla Šūmākere

Thanks to Maija Demitere, Rita Kapeniece-Klauža and Rogier Gerben Jupijn for all their knowledge, support, and savviness.

More about UPDATE Festival can be found [here](https://2026.updatefestival.lv/en).
