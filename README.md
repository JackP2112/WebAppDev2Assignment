# BSc (Hons.) Level 8 - Assignment 1 - Single Page app.

Name: Jack Power

## Overview.

The app is a media manager designed to keep track of all kinds of media. It allows you to catalogue media such as books, movies and series based on their relevant attributes. You can then filter based on these and the media status, a ternary state indicating if you have queued, are currently consuming, or have completed said media. Less generically, for a book for example, it indicates that you are either going to read, currently reading, or have read the book. The app now persists data to a mongoDB back end with most CRUD functionality.

### Features

- Add media (allows for cover image URL or file upload)

- Filter media based on title, type and status (in future will allow filtering tags for creators, genre, etc.)

- View media attributes

- Delete media

### Other future features

- Export selected media to JSON or copy titles to clipboard

- Option to automatically fetch media data from web on creation

- Multiple select and subsequent deletion or mass update

## Setup.

- Clone github repository

~~~
git clone https://github.com/JackP2112/WebAppDev2Assignment
~~~

- Run npm install to install dependencies, there are now two package.json files to install for front and back end

~~~
npm install
~~~

- Install mongoDB and run the mongod server, db here in the project root

~~~
mongod --dbpath db
~~~

- Start both the back and front end from their respective roots

~~~
npm run start
~~~

## Data Model Design.

The data model consists of media items and their associated cover images. Each item is a JavaScript object of the same format seen below. The types are predefined in the program with the hope of eventually being extensible by the user. Creators are stored in an array of embedded documents, each having a role and a name. The image has been extracted into its own document to improve the readability of the model and to avoid carrying the large amount of data where it is not needed.

~~~
{
     "type": "book",
     "title": "20,000 Leagues Under the Sea",
     "releaseDate": "1870-07-01",
     "creators": [
          {
               "role": "author",
               "name": "Jules Verne"
          }
     ]
     "genres": ["science fiction","adventure"],
     "comments": ["get hard copy"],
     "status": 1
}

{
     "media": "mongo-id-of-media",
     "data": "base64-image-data"
}
~~~

## UI Design.

![][main]

>>  Shows a card for every media item. This view can be filtered based on title, media type and status, as seen below.

![][filter_title]

>> Filter by title

![][filter_type]

>> Filter by media type

![][filter_status]

>> Filter by status

![][select]

>> Selection can be toggled on the toolbar, allowing the cards to be selected and subsequently deleted (editing not implemented yet).

![][export]

>> A dropdown export menu allows for items (entire list or just selected) to be exported (to file or to clipboard) in JSON format or just comma-separated titles. (functionality not implemented yet)

![][view_item]

>> When not in selection mode, clicking a card shows media attributes in detail.

![][add_item]

>> A form to add a new item. (Currently creates item and appends it to local cache, full functionality alongside premade items but no persistence yet)

## Routing.

- / - displays all media items (subject to filtering) - cover image, title and first creator only.

- /add-item - form to add new item.

- /item/:id - detailed view for media item.

## Storybook.

![][stories]

## Backend.

An express back end allows routing to interact with a mongoDB database. RESTful http requests created via axios specify CRUD actions to be performed on the database. Payloads are divided between the media items and image data which are kept in sync by the backend.


[main]: ./img/main.png

[filter_title]: ./img/filter_title.png

[filter_type]: ./img/filter_type.png

[filter_status]: ./img/filter_status.png

[select]: ./img/select.png

[add_item]: ./img/add_item.png

[view_item]:  ./img/view_item.png

[export]: ./img/export.png

[stories]: ./img/stories.png
