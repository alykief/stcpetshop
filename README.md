## Technologies
- Express
- MongoD
- Mongoose 
- Node.js

## Approach
#### Set-Up
When setting up, I knew I would be utilizing multiple different technologies, so I pre-emptively installed them all. This included doing an npm init for the folder, and then doing an install of Express, EJS, Mongoose, Mongo and Method-Override. This set me up for success with all basic files being installed properly. I then went through and created my folders, Models (for my Schema), Public (for my CSS files), Views (for my CRUD EJS files) and of course my server.js file in my main folder. 

#### The Code
I began in my server.js file, and started making the routes that I knew I wanted to have. In order to create CRUD/7 RESTful Routes, I knew I would need to have routes directing to my new.ejs, show.ejs, index.ejs and edit.ejs along with Put, Post and Delete Routes. As I created each route, I went to the associated EJS file and filled in the proper information, as I've been taught throughout all of the reps in General Assembly WDIR. I found this portion to be quite obtainable and easy. Issues arose within my code: 
[X] Edit Route
[X] Delete Route
[X] Show Route 

### Styling
Before doing any CSS, I knew that I would want to reach a stretch goal of utilizing Partials, at least for Header items. I set up the head.ejs and nav.ejs Partials. I then linked all of the .ejs files to the Partials and started on my app.css stylesheet. I knew that I wanted to have a simple layout with the logo and item photos as the clear focus of the page. The color scheme I leaned towards was neutral with pops of pastel colors to highlight the photos that are being displayed. I created a very simple layout that I felt would be best suited for this style of shop. I curated the buttons and then moved onto the forms. The one issue that I ran into with styling was the Nav Bar. I wanted a vertical Nav Bar floated to the right of the page that would stick regardless of whether you scrolled down the page or not. Still working on getting that active, since I only have two links in my Nav Bar it is proving quite difficult to make it a full length display. 

## Unsolved Problems
Originally, I wanted to create a log-in feature where users could log-in and see the pets that they own, and message other pet owners for advice. As of Monday, I have yet to obtain that functionality, but will continue working with the TA in order to achieve success. 

## Links
[STC Pet Shop on Heroku](https://still-sands-93918.herokuapp.com/pets)

[STC Pet Shop on GitHub](http://github.com/alykief/stcpetshop)
