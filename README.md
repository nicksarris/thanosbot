# ThanosBot

---

Hosted: https://thanosbot.com

This repository contains a GroupMe Bot/Web Application that allows for the user to perform a "Thanos Snap" on any group that they are currently in. As explained by Marvel, a "Thanos Snap" in this regard will quickly and painlessly randomly remove half of all users in the aforementioned group. This project is solely meant as a learning experience and should not be used for malicious purposes in any manner.

---

### Documentation: 

The backend of this project is Python/Flask, while the frontend is ReactJS. Regarding individual endpoints, they are broken down into four separate groups: "Activity", "Bot", "Group", and "Thanos". Each of these groups help to perform individual tasks that allow for the user to ultimately perform the "Snap". A description of each is below.

- **Activity** - A single endpoint that allows for the user to monitor the API's status.
- **Bot** - Endpoints that deal with the creation/destruction of ThanosBot.
- **Group** - Endpoints that deal with all group functionality, including selecting the users to "Snap".
- **Thanos** - A single endpoint that performs the "Snap" when called.

In spite of the fact that only two endpoints are used in order to perform the "Snap" on the hosted Web Application (**/api/groups**, **/api/thanos/<groupId>**), all are active and will return the requested data when queried. 

---

### Endpoints: 

Descriptions of each endpoint associated with the project are below. Each description will include the main URL of the endpoint, individual parameters, and the expected output. The current base URL is as follows:

<pre>
http://thanosbot/api/
</pre>

**Activity** - Checks to make sure Flask service is active

<pre>
Method: GET 
URL: /api/activity/active

Parameters: N/A
Response: {
  active: True, (affirmative showing that API is active)
}
</pre>

**Bots** - Create a ThanosBot in Group of provided GroupID

<pre>
Method: GET 
URL: /api/bots/&lt;groupId&gt;/create?token=&lt;tokenID&gt;

Parameters: {
  groupID: ID of selected group
  tokenID: GroupMe 'Access Token'
}

Response: {
  botID: &lt;botID&gt;, (ID associated with created bot)
  errors: &lt;errors&gt;, (any errors that arise during call)
}
</pre>

**Bots** - Destroy a ThanosBot of provided BotID

<pre>
Method: GET
URL: /api/bots/&lt;botID&gt;/destroy?token=&lt;tokenID&gt;

Parameters: {
  botID: ID of selected bot
  tokenID: GroupMe 'Access Token'
}

Response: {
  message: &lt;message&gt;, (output message)
  errors: &lt;errors&gt;, (any errors that arise during call)
}
</pre>

**Groups** - Find All Groups that User is in

<pre>
Method: GET 
URL: /api/groups?token=&lt;tokenID&gt;

Parameters: {
  tokenID: GroupMe 'Access Token'
}

Response: {
  groups: &lt;groups&gt;, (groups associated with user)
  groupsID: &lt;groupsID&gt;, (groupIDs associated with groups)
  errors: &lt;errors&gt;, (any errors that arise during call)
}
</pre>

**Groups** - Find GroupID given Group Name as a Parameter

<pre>
Method: GET 
URL: /api/groups/&lt;groupName&gt;?token=&lt;tokenID&gt;

Parameters: {
  groupName: Name of selected group
  tokenID: GroupMe 'Access Token'
}

Response: {
  groups: &lt;groups&gt;, (group associated with groupName)
  errors: &lt;errors&gt;, (any errors that arise during call)
}
</pre>

**Groups** - Change Nickname of User in Group

<pre>
Method: GET 
URL: /api/groups/&lt;groupID&gt;/nickname?nickname=&lt;nickname&gt;,token=&lt;tokenID&gt;

Parameters: {
  groupID: ID of selected group
  nickname: Desired nickname
  tokenID: GroupMe 'Access Token'
}

Response: {
  nickname: &lt;nickname&gt;, (requested/updated nickname)
  errors: &lt;errors&gt;, (any errors that arise during call)
}
</pre>

**Groups** - Select Half of All Users in Group

<pre>
Method: GET 
URL: /api/groups/&lt;groupID&gt;/users?token=&lt;tokenID&gt;

Parameters: {
  groupID: ID of selected group
  tokenID: GroupMe 'Access Token'
}

Response: {
  users: &lt;users&gt;, (list of half of users in group)
  errors: &lt;errors&gt;, (any errors that arise during call)
}
</pre>

**Groups** - Remove ALL Users Passed in POST Request Data

<pre>
Method: POST
URL: /api/groups/&lt;groupID&gt;/remove?token=&lt;tokenID&gt;

POST_Data: {
  selectedUsers: list of users to remove
}

Parameters: {
  groupID: ID of selected group
  tokenID: GroupMe 'Access Token'
}

Response: {
  users: &lt;users&gt;, (all users removed from group)
  errors: &lt;errors&gt;, (any errors that arise during call)
}
</pre>

**Groups** - Send Ending Message After "Snap" Occurs

<pre>
Method: GET
URL: /api/groups/&lt;botID&gt;/message?token=&lt;tokenID&gt;

Parameters: {
  botID: ID of selected bot
  tokenID: GroupMe 'Access Token'
}

Response: {
  message: &lt;message&gt;, (output message)
  errors: &lt;errors&gt;, (any errors that arise during call)
}
</pre>

**Thanos** - Perform a "Thanos Snap" on a provided GroupID

<pre>
Method: GET
URL: /api/thanos/&lt;groupID&gt?token=&lt;tokenID&gt;

Parameters: {
  groupID: ID of selected group
  tokenID: GroupMe 'Access Token'
}

Response: {
  message: &lt;message&gt;, (output message)
  errors: &lt;errors&gt;, (any errors that arise during call)
}
</pre>
