# WizardGram Introduction
This app is now deprciated and a newer version is now being worked on here: https://github.com/mrsashemi/wrk-website

This app is loose a clone of the instagram user page designed to be used for an artist to show case their work. 

## Description
This project began as something completely different. The original project was actually a personal art website with a shopping cart, the scope of which was reduced into a simpler app an artist can use to showcase art and have users interact with their work in unique ways. This manifested itself into an instagram clone that was redesigned for artists.

## Current Status
This Project is actively being worked on. I've recently cleaned the Front End by introducing a Redux Toolkit store, moving the data fetching to RTK Query, and introduced render props which significantly cleaned up the UI. My primary focus now is optimizing the back end. I've begun load testing and have already identified some bottlenecks with my queries. Most notably with the relational table matching posts with images and classes. The cascade when deleting and inner join when fetching all posts is incredibly slow, but can be fixed by indexing the foreign keys. I am also playing around with setting up a load balancer as a reverse proxy to increase client requests with low response times. 

Although the app is set up only so the artist can create posts and not the site visiters, the idea of optimizing the backend is in the event I create a feature for generative art that allows visiters to use art algorithms to create their own posts that would then get sent to the artist to post should they choose. I am also interested in seeing how the browser handles hundreds of thousands of images with a lot of different CSS information, and finding ways to optimize displaying those posts. 

## Features
Features are similar to that of instagram. The app drops users onto a home page that resembles that of an instagram user page. However, instead of sections for posts, reels, and tags, there are sections for artworks, photography, and generative. Authentication is currently set up currently such that only the artist can access the page, however, that will be adjusted so only the artist can access the post pages. 

A user is able to click on a post to go to a page where they can scroll through all the posts of a particular type. Comments are not available, but a very simple liking system is. Users can also click and hold onto a post to have it expand into a pop up post. Clicking on the pop up will take the user to a page for the single post. 

There are modals set up for creating posts, which is accessible from the home page. There is also a modal is for editing posts, which is accessible from either the scroll page or the single post page by clicking on the menu button of a post. From this menu posts can be deleted, or updated. 

All calls are being made to an Express server, from which I have set up controllers for CRUD posts, CRUD images (which are being stored in AWS S3 buckets), CRUD users, and CRUD image classes. 

## Process
I began by looking at instagram and very basically identifying the different containers for the app, and creating tickets for myself in pivotal tracker of what needs to be done to create a basic layout. I focused first on creating components for the basic user home section, followed by the scroll section, single post section, and finally the sections for creating, editing, and updating posts. I followed an agile workflow of updating the tracker, working in short sprints, and then taking a short break to review what was completed and if anything needs to cleaning before moving onto the next section. 

The rest of the app followed a similar trajectory. Upon finishing the layout and setting up authentication, I then focused on building out the different microservices for images, posts, and classes in the express server followed by slowly updating the UI as I completed a service. First I needed to get images to populate from S3 into a grid in order to upload and select an image to be turned into a post. Then I needed to set up editing of posts, which required saving class information in a postgres table. Finally, I had to publish the post. I used to a relational table joining posts, images, and classes and ran multiple requests back to back in order to generate a single post. 

With the app finally working as intended, the next step is to clean up the UI. The thing immediately noticeable to me was the amount of state being passed through context and how often I was using useEffect hooks to make calls to the API (not React 18 best practices). At this point, I set up Redux Toolkit and RTK Query to clean up the UI. I also introduced render props specifically because I kept reusing the same image component over and over again. 

With the app finally looking a lot cleaner, I'm now at the point where I'm focused on optimizing the backend. I intend on rebuilding the posts service with a few different database types (MongoDB and Neo4j as opposed to just postgres). In addition to load testing postgres, I'd like to see how other databases perform and test them against each other.




