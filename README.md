# public_chat
Chat, where unauthenticated users can post text and everyone else can read them. Posts stored in database, and users can get or create posts by using REST API.

Heroku demo: https://public-chat-eleken.herokuapp.com/

API methods available on:
*/api/posts/create* - POST-method

*/api/posts/* - GET-method

So, if you want to get all posts, you can make GET-query to https://public-chat-eleken.herokuapp.com/api/posts (using Postman, for example).

For make tests you can run *npm test* in root directory.
