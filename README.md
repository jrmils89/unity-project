# FlowLy
https://flow-ly.herokuapp.com

## Synopsis

FlowLy presents web development categories to users and allows them to create and view flow charts to help develop their understanding of common web development concepts

## Technologies Utilized

FlowLy is a MEAN Stack Application

- The client side is written is AngularJS, HTML, CSS, and some vanilla JS
- Server side it runs a Node.JS server with Express
- The database side is Mongo and the whole application is hosted on Heroku

## Features

- Users can search and browse common web development categories such as HTML, Javascript, ExpressJS, AngularJS, etc.
- Users can submit new categories
- Users can also submit new concepts with flow diagrams for every category, but these concepts are subject to admin approval
- Concepts that receive the most stars are displayed first
- Users can either upload images they make outside the application or they can create a flow chart using the application's basic flow chart maker and upload that image
- Admin users are able to manage the content and users on the site. This allows them to approve concepts and make other users admin users.
- Images are stored using the ospry.io library. This all happens client side and to scale a better solution would be needed.

## The Approach Taken  

- We set the tempo by initially meeting at the end of class on the day we were assigned the project and brainstormed a few solid project ideas but we gave it until the next day for us to decide on an idea
- The next day we were able to decide on an idea within a very short amount of time and then started drawing out wire frames.  We were able to plan out our inital models and our templates / directives and the pages that these directives will render on.  
- By describing our models/collections as well as our views/templates, we were able to proceed with our coding process.
- The first few days of our coding process consisted of:

	 1. Building our server so we could have model data in MongoDB to experiment with
	 2. Implementing user authentication / passport
	 3. Building our directives along with the routes that would establish the connection between client and server

- After we completed the MVP, we moved forward with styling, as well as additional features that we figured wouldn't hurt to add if we had time, like extra CRUD functionality, the ability to create your own flow charts within the application, and other unfulfilled ideas.

## Unsolved Problems, etc.

- Canvas styling was an continues to be a bit of a challenge to get responsive (as it's not designed to do that)
- Our initial wireframes were very good to get us started, but we had to adjust them about halfway through as styling and functionality came together.
- Our flow chart drawer has some issues playing nicely with Firefox at the moment

## Contributors
The site was developed by Levi Tardio, Masha Vainiblat, and Jesse Mills. #unity