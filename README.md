# BSc (Hons.) Level 8 - Assignment 1 - Single Page app.

Name: Jack Power

## Overview.

The app is a media manager designed to keep track of all kinds of media. It allows you to catalogue media such as books, movies and series based on their relevant attributes. You can then filter based on these and the media status, a ternary state indicating if you have queued, are currently consuming, or have completed said media. Less generically, for a book for example, it indicates that you are either going to read, currently reading, or have read the book. Ideally the app will be hooked into a back-end server which will allow persistance of media and its status.

### Features

- Add media (allows for cover image URL or file upload)

- Filter media based on title, type and status (in future will allow filtering tags for creators, genre, etc.)

- View media attributes

- Multiple select and subsequent deletion (in future also can update)

### Other future features

- Export selected media to JSON or copy titles to clipboard

- Option to automatically fetch media data from web on creation

## Setup.

- Clone github repository

~~~
git clone https://github.com/JackP2112/WebAppDev2Assignment
~~~

- Run npm install to install dependencies

~~~
npm install
~~~

- Start the JSON server on port 3001 from the project root (where media.json is)

~~~
json-server media.json -p 3001
~~~

- Start the node server and run the app

~~~
npm run start
~~~

## Data Model Design.

The data model consists only of media items. Each item is a JavaScript object of the same format seen below. The types are predefined in the program with the hope of eventually being extensible by the user. The creators array contains a nested array for each creator role, i.e., director, writer etc. The image link currently may be a URL or a JavaScript file uploaded on creation. This eventually will be replaced with back-end server interaction.

~~~
{
     "type": "book",
     "title": "20,000 Leagues Under the Sea",
     "releaseDate": "1870-07-01",
     "creators": [["author", "Jules Verne"]],
     "genres": ["science fiction","adventure"],
     "image": "https://upload.wikimedia.org/wikipedia/commons/1/10/Houghton_FC8_V5946_869ve_-_Verne%2C_frontispiece.jpg",
     "comments": ["get hard copy"],
     "status": 1
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

A JSON-server supplies premade media objects to the app on start. The source JSON was intended to be made dynamic but time constraints prohibited this. Ultimately this will be replaced with a more sophisticated back-end server that will allow full CRUD.


[main]: ./img/main.png

[filter_title]: ./img/filter_title.png

[filter_type]: ./img/filter_type.png

[filter_status]: ./img/filter_status.png

[select]: ./img/select.png

[add_item]: ./img/add_item.png

[view_item]:  ./img/view_item.png

[export]: ./img/export.png

[stories]: ./img/stories.png
