/*a. Receives up to 3 parameters
b. 1st parameter is the HTML element string name to be created (h1, p, button, etc)
c. Set a default value for the 1st parameter to “p”
d. 2nd parameter is the textContent of the element to be created
e. Default value of the 2nd parameter is “”
f. 3rd parameter is a className if one is to be applied (optional)
g. Use document.createElement() to create the requested HTML element
h. Set the other desired element attributes.
i. Return the created element.
 */
function createElemWithText(htmlElement = "p", textContent = "", className = ""){
    let element = document.createElement(htmlElement);
    element.textContent = textContent;
    element.className = className;
    
    return element;
}

/*a. Test users JSON data available here: https://jsonplaceholder.typicode.com/users
b. For testing (not in function) you may want to define users with the test data.
c. Receives users JSON data as a parameter
d. Returns undefined if no parameter received
e. Loops through the users data
f. Creates an option element for each user with document.createElement()
g. Assigns the user.id to the option.value
h. Assigns the user.name to the option.textContent
i. Return an array of options elements
*/
function createSelectOptions(users){
    let optionResults = [];

    if (users == null || users == undefined){
        return undefined;
    }

    users.forEach((item) => {
        let optionEle = document.createElement("option");
        optionEle.setAttribute("value", item.id);
        optionEle.textContent = item.name;
        optionResults.push(optionEle);
    });
    return optionResults;
}

/*a. Receives a postId as the parameter
b. Selects the section element with the data-post-id attribute equal to the postId
received as a parameter
c. Use code to verify the section exists before attempting to access the classList
property
d. At this point in your code, the section will not exist. You can create one to test if
desired.
e. Toggles the class 'hide' on the section element
f. Return the section element
*/
function toggleCommentSection(postId){
    if (postId == null || postId == undefined){
        return undefined;
    }
    let section = document.querySelector(`section[data-post-id="${postId}"]`);
    if (section != null || section != undefined){
        section.classList.toggle("hide");
    }
    return section;
}

/*a. Receives a postId as the parameter
b. Selects the button with the data-post-id attribute equal to the postId received as a
parameter
c. If the button textContent is 'Show Comments' switch textContent to 'Hide
Comments'
d. If the button textContent is 'Hide Comments' switch textContent to 'Show
Comments'
e. Suggestion (not required) for above: try a ternary statement
f. Return the button element
*/
function toggleCommentButton(postId){
    if (postId == null || postId == undefined){
        return undefined;
    }
    let button = document.querySelector(`button[data-post-id="${postId}"]`);
    if (button) {
        if (button.textContent == "Show Comments"){
            button.textContent = "Hide Comments";
        } else {
            button.textContent = "Show Comments";
        }
    }
    return button;
}

/*a. Receives a parentElement as a parameter
b. Define a child variable as parentElement.lastElementChild
c. While the child exists…(use a while loop)
d. Use parentElement.removeChild to remove the child in the loop
e. Reassign child to parentElement.lastElementChild in the loop
f. Return the parentElement
*/
function deleteChildElements(parentElement){
    const isDOM = parentElement instanceof Element
    if (isDOM == false) {
        return undefined;
    }

    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
    return parentElement;
}

/*NOTE: The above functions had no dependency on other functions. They were very
self-contained which is ideal. That is not always possible though. We will try to limit
dependencies as we go. The next several functions have small dependencies*/

/*a. Selects all buttons nested inside the main element
b. If buttons exist:
c. Loop through the NodeList of buttons
d. Gets the postId from button.dataset.postId
e. Adds a click event listener to each button (reference addEventListener)
f. The listener calls an anonymous function (see cheatsheet)
g. Inside the anonymous function: the function toggleComments is called with the
event and postId as parameters
h. Return the button elements which were selected
i. You may want to define an empty toggleComments function for now. Not all tests
will pass for addButtonListeners until toggleComments exists. I recommend
waiting on the logic inside the toggleComments function until we get there.
*/
function addButtonListeners(){
    let buttons = document.querySelector("main").querySelectorAll("button");
    

    if (buttons){
        buttons.forEach((item) => {
            item.addEventListener(
                "click",
                function (x) {
                    toggleComments(x, item.dataset.postId);
                },
                false
            )
        });
    }
    return buttons;
}

/*a. Selects all buttons nested inside the main element
b. Loops through the NodeList of buttons
c. Gets the postId from button.dataset.id
d. Removes the click event listener from each button (reference
removeEventListener)
e. Refer to the addButtonListeners function as this should be nearly identical
f. Return the button elements which were selected
*/
function removeButtonListeners(){
    let buttons = document.querySelector("main").querySelectorAll("button");
    buttons.forEach((item) => {
        item.removeEventListener(
            "click",
            function (x) {
                toggleComments(x, item.dataset.postId);
            },
            false
        )
    });
    return buttons;
}

/*a. Depends on the createElemWithText function we created
b. Receives JSON comments data as a parameter
c. Creates a fragment element with document.createDocumentFragment()
d. Loop through the comments
e. For each comment do the following:
f. Create an article element with document.createElement()
g. Create an h3 element with createElemWithText('h3', comment.name)
h. Create an paragraph element with createElemWithText('p', comment.body)
i. Create an paragraph element with createElemWithText('p', `From:
${comment.email}`)
j. Append the h3 and paragraphs to the article element (see cheatsheet)
k. Append the article element to the fragment
l. Return the fragment element*/
function createComments(comments){

    if (comments == null || comments == undefined){
        return undefined;
    }

    let fragment = document.createDocumentFragment();

    comments.forEach((item) => {
        let article = document.createElement("article");
        let h3 = createElemWithText('h3', item.name);
        let body = createElemWithText('p', item.body);
        let email = createElemWithText('p', `From: ${item.email}`);
        article.append(h3);
        article.append(body);
        article.append(email);
        fragment.append(article);
    });
    
    return fragment;
}

/*a. Depends on the createSelectOptions function we created
b. Receives the users JSON data as a parameter
c. Selects the #selectMenu element by id
d. Passes the users JSON data to createSelectOptions()
e. Receives an array of option elements from createSelectOptions
f. Loops through the options elements and appends each option element to the
select menu
g. Return the selectMenu element*/
function populateSelectMenu(users){
    if (users == null || users == undefined){
        return undefined;
    }

    let selectMenu = document.getElementById("selectMenu");
    let options = createSelectOptions(users);

    options.forEach((item) => selectMenu.append(item));

    return selectMenu;

}

/*NOTE: The next functions use Async / Await to request data from an API. We cover this in
Week 13. I do not recommend proceeding beyond this point until you have completed the
learning module for Week 13.*/

/*a. Fetches users data from: https://jsonplaceholder.typicode.com/ (look at
Resources section)
b. Should be an async function
c. Should utilize a try / catch block
d. Uses the fetch API to request all users
e. Await the users data response
f. Return the JSON data
*/

async function getUsers(){
    try{
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        return await response.json();  
      } 
      catch(error){
        return;
      }
}

/*a. Receives a user id as a parameter
b. Fetches post data for a specific user id from:
https://jsonplaceholder.typicode.com/ (look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request all posts for a specific user id
f. Await the users data response
g. Return the JSON data
*/
async function getUserPosts(userId){
    if (userId == null || userId == undefined){
        return undefined;
    }

    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userId);
        return await response.json();
    } catch(error){
        return;
    }
}

/*a. Receives a user id as a parameter
b. Fetches data for a specific user id from: https://jsonplaceholder.typicode.com/
(look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request a specific user id
f. Await the user data response
g. Return the JSON data*/
async function getUser(userId){
    if (userId == null || userId == undefined){
        return undefined;
    }

    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users/" + userId);
        return await response.json();
    } catch(error){
        return;
    }
}

/*a. Receives a post id as a parameter
b. Fetches comments for a specific post id from:
https://jsonplaceholder.typicode.com/ (look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request all comments for a specific post id
f. Await the users data response
g. Return the JSON data
*/
async function getPostComments(userId){
    if (userId == null || userId == undefined){
        return undefined;
    }

    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/comments?postId=" + userId);
        return await response.json();
    } catch(error){
        return;
    }
}

/*NOTE: The next functions will depend on the async API data functions we just created.
Therefore, these functions will also need to be async. When they call the API functions, they will
need to await data from those functions*/

/*a. Dependencies: getPostComments, createComments
b. Is an async function
c. Receives a postId as a parameter
d. Creates a section element with document.createElement()
e. Sets an attribute on the section element with section.dataset.postId
f. Adds the classes 'comments' and 'hide' to the section element
g. Creates a variable comments equal to the result of await
getPostComments(postId);
h. Creates a variable named fragment equal to createComments(comments)
i. Append the fragment to the section
j. Return the section element
*/
async function displayComments(postID){
    if (postID == null || postID == undefined){
        return undefined;
    }

    let section = document.createElement("section");
    section.dataset.postId = postID;
    section.classList.add("comments");
    section.classList.add("hide");

    let comments = await getPostComments(postID);
    let fragment = createComments(comments);
    section.append(fragment);

    return section;
}


/*a. Dependencies: createElemWithText, getUser, displayComments
b. Is an async function
c. Receives posts JSON data as a parameter
d. Create a fragment element with document.createDocumentFragment()
e. Loops through the posts data
f. For each post do the following:
g. Create an article element with document.createElement()
h. Create an h2 element with the post title
i. Create an p element with the post body
j. Create another p element with text of `Post ID: ${post.id}`
k. Define an author variable equal to the result of await getUser(post.userId)
l. Create another p element with text of `Author: ${author.name} with
${author.company.name}`
m. Create another p element with the author’s company catch phrase.
n. Create a button with the text 'Show Comments'
o. Set an attribute on the button with button.dataset.postId = post.id
p. Append the h2, paragraphs, button, and section elements you have created to
the article element.
q. Create a variable named section equal to the result of await
displayComments(post.id);
r. Append the section element to the article element
s. After the loop completes, append the article element to the fragment
t. Return the fragment element
*/
async function createPosts(posts){
    if (posts == null || posts == undefined){
        return undefined;
    }

    let fragment = document.createDocumentFragment();

    for(let i in posts){
        let post = posts[i];
        let article = document.createElement("article");
        let h2 = createElemWithText('h2', post.title);
        let body = createElemWithText('p', post.body);
        let id = createElemWithText('p', `Post ID: ${post.id}`);
        let author = await getUser(post.userId);
        let elemAuthor = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
        let catchPhrase = createElemWithText('p', author.company.catchPhrase);
        let button = createElemWithText('button', 'Show Comments');
        button.dataset.postId = post.id;

        article.append(h2, body, id, elemAuthor, catchPhrase, button);
        let section = await displayComments(post.id);
        article.append(section);
        fragment.append(article);
    }

    return fragment;

}

/*a. Dependencies: createPosts, createElemWithText
b. Is an async function
c. Receives posts data as a parameter
d. Selects the main element
e. Defines a variable named element that is equal to:
i. IF posts exist: the element returned from await createPosts(posts)
ii. IF post data does not exist: create a paragraph element that is identical to
the default paragraph found in the html file.
iii. Optional suggestion: use a ternary for this conditional
f. Appends the element to the main element
g. Returns the element variable
*/
async function displayPosts(posts){
    let main = document.querySelector("main");
    let element;

    if (posts == null || posts == undefined){
        element = createElemWithText('p', "Select an Employee to display their posts.", "default-text");
    } else {
        element = await createPosts(posts);
    }
    main.append(element);
    return element;
}

/*NOTE: This is the last group of functions. I call them “procedural functions” because they exist
to pull the other functions together in an order that allows the web app to function as it should.
This means their sole purpose is to call dependencies with the correct data in the proper order.
*/

/*a. Dependencies: toggleCommentSection, toggleCommentButton
b. Receives 2 parameters: (see addButtonListeners function description)
i. The event from the click event listener is the 1st param
ii. Receives a postId as the 2nd parameter
c. Sets event.target.listener = true (I need this for testing to be accurate)
d. Passes the postId parameter to toggleCommentSection()
e. toggleCommentSection result is a section element
f. Passes the postId parameter to toggleCommentButton()
g. toggleCommentButton result is a button
h. Return an array containing the section element returned from
toggleCommentSection and the button element returned from
toggleCommentButton: [section, button]
*/
function toggleComments(event, postID){
    if (postID == null || postID == undefined){
        return undefined;
    }
    if (event == null || event == undefined){
        return undefined;
    }

    let results = [];
    event.target.listener = true;
    results.push(toggleCommentSection(postID));
    results.push(toggleCommentButton(postID));
    return results;
}

/*a. Dependencies: removeButtonListeners, deleteChildElements, displayPosts,
addButtonListeners
b. Is an async function
c. Receives posts JSON data as a parameter
d. Call removeButtonListeners
e. Result of removeButtonListeners is the buttons returned from this function
f. Call deleteChildElements with the main element passed in as the parameter
g. Result of deleteChildElements is the return of the main element
h. Passes posts JSON data to displayPosts and awaits completion
i. Result of displayPosts is a document fragment
j. Call addButtonListeners
k. Result of addButtonListeners is the buttons returned from this function
l. Return an array of the results from the functions called: [removeButtons, main,
fragment, addButtons]*/
async function refreshPosts(posts){
    if (posts == null || posts == undefined){
        return undefined;
    }

    let results = [];

    let removeButtons = removeButtonListeners();
    results.push(removeButtons);
    let main = deleteChildElements(document.querySelector("main"));
    results.push(main);
    let fragment = await displayPosts(posts);
    results.push(fragment);
    let addButton = addButtonListeners();
    results.push(addButton);

    return results;
}

/*a. Dependencies: getUserPosts, refreshPosts
b. Should be an async function
c. Automatically receives the event as a parameter (see cheatsheet)
d. Disables the select menu when called into action (disabled property)
e. Defines userId = event.target.value || 1; (see cheatsheet)
f. Passes the userId parameter to await getUserPosts
g. Result is the posts JSON data
h. Passes the posts JSON data to await refreshPosts
i. Result is the refreshPostsArray
j. Enables the select menu after results are received (disabled property)
k. Return an array with the userId, posts and the array returned from refreshPosts:
[userId, posts, refreshPostsArray]*/
async function selectMenuChangeEventHandler(event){
    if (event == null || event == undefined){
        return undefined;
    }
    
    let userID = event?.target?.value || 1;
    let posts = await getUserPosts(userID);
    let refreshPostsArray = await refreshPosts(posts);

    let results = [];
    results.push(userID);
    results.push(posts);
    results.push(refreshPostsArray);
    return results;
}

/*a. Dependencies: getUsers, populateSelectMenu
b. Should be an async function
c. No parameters.
d. Call await getUsers
e. Result is the users JSON data
f. Passes the users JSON data to the populateSelectMenu function
g. Result is the select element returned from populateSelectMenu
h. Return an array with users JSON data from getUsers and the select element
result from populateSelectMenu: [users, select]
*/
async function initPage(){
    let users = await getUsers();
    let select = populateSelectMenu(users);
    let results = [];
    results.push(users);
    results.push(select);
    return results;
}

/*a. Dependencies: initPage, selectMenuChangeEventHandler
b. Call the initPage() function.
c. Select the #selectMenu element by id
d. Add an event listener to the #selectMenu for the “change” event
e. The event listener should call selectMenuChangeEventHandler when the change
event fires for the #selectMenu
f. NOTE: All of the above needs to be correct for you app to function correctly.
However, I can only test if the initApp function exists. It does not return anything.
*/
async function initApp(){
    initPage();
    let menu = document.getElementById("selectMenu");
    menu.addEventListener("change", selectMenuChangeEventHandler, false);
}

document.addEventListener("DOMContentLoaded", initApp);

/*NOTE: There is one last step to get your app to function correctly. I cannot test for this, but you
must apply it to call the script into action.
*** This must be underneath the definition of initApp in your file.
1. Add an event listener to the document.
2. Listen for the “DOMContentLoaded” event.
3. Put initApp in the listener as the event handler function.
4. This will call initApp after the DOM content has loaded and your app will be started.*/
