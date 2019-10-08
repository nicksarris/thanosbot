__author__ = 'Nick Sarris (ngs5st)'

import math
import time
import json
import requests
import random

def findGroups(tokenId):

    output = {}
    headers = {"content-type": "application/json"}
    url = "https://api.groupme.com/v3/groups?token=" + tokenId
    response = requests.get(url, headers=headers)
    data = json.loads(response.text)["response"]

    if (int(response.status_code) not in [200, 201, 202]):
        output["groups"] = ""
        output["errors"] = data["meta"]["errors"]
        return output

    output["groups"] = []
    for group in data:
        list.append(output["groups"], group["name"])

    return output

def findGroupId(tokenId, groupName):

    output = {}
    headers = {"content-type": "application/json"}
    url = "https://api.groupme.com/v3/groups?token=" + tokenId
    response = requests.get(url, headers=headers)
    data = json.loads(response.text)["response"]

    if (int(response.status_code) not in [200, 201, 202]):
        output["group_id"] = ""
        output["errors"] = data["meta"]["errors"]
        return output

    output["group_id"] = ""
    for group in data:
        if group["name"] == groupName:
            output["group_id"] = group["group_id"]

    if output["group_id"] == "":
        output["errors"] = ["Unable to find correct group"]
        return output

    output["errors"] = ""
    return output

def createBots(tokenId, groupId):

    output = {}
    headers = {"content-type": "application/json"}
    thanosBot = {"bot": {'name': "ThanosBot", 'group_id': groupId}}
    url = "https://api.groupme.com/v3/bots?token=" + tokenId
    response = requests.post(url, data=json.dumps(thanosBot), headers=headers)
    data = json.loads(response.text)

    if (int(response.status_code) not in [200, 201, 202]):
        output["bot_id"] = ""
        output["errors"] = data["meta"]["errors"]
        return output

    output["bot_id"] = data["response"]["bot"]["bot_id"]
    output["errors"] = ""
    return output

def updateNickname(tokenId, groupId, nickname):

    output = {}
    headers = {"content-type": "application/json"}
    nickname = {"membership": {'nickname': nickname}}
    url = "https://api.groupme.com/v3/groups/" + groupId + "/memberships/update?token=" + tokenId
    response = requests.post(url, data=json.dumps(nickname), headers=headers)
    data = json.loads(response.text)

    if (int(response.status_code) not in [200, 201, 202]):
        output["nickname"] = ""
        output["errors"] = data["meta"]["errors"]
        return output

    output["nickname"] = nickname
    output["errors"] = ""
    return output

def getSelectedUsers(tokenId, groupId, blacklisted):

    output = {}
    headers = {"content-type": "application/json"}
    url = "https://api.groupme.com/v3/groups/" + groupId + "?token=" + tokenId
    response = requests.get(url, headers=headers)
    data = json.loads(response.text)["response"]

    if (int(response.status_code) not in [200, 201, 202]):
        output["users"] = ""
        output["errors"] = data["meta"]["errors"]
        return output

    userList = []
    for user in data["members"]:
        if user['nickname'] not in blacklisted:
            list.append(userList, user["id"])

    random.shuffle(userList)
    output["users"] = userList[0: math.ceil(len(userList)/2)]
    output["errors"] = ""
    return output

def removeSelectedUsers(tokenId, groupId, userList):

    output = {}
    output["users"] = []
    output["errors"] = []

    for membershipId in userList:
        headers = {"content-type": "application/json"}
        url = "https://api.groupme.com/v3/groups/" + groupId + "/members/" + \
              membershipId + "/remove?token=" + tokenId

        response = requests.post(url, headers=headers)
        data = json.loads(response.text)

        if (int(response.status_code) not in [200, 201, 202]):
            list.append(output["errors"], data["meta"]["errors"])

        list.append(output["users"], membershipId)

    return output

def sendMessage(tokenId, botId):

    output = {}
    message = "Perfectly balanced, as all things should be... \n\n" + \
              "Check out [Insert Site] for documentation and further " + \
              "information regarding this bot"

    messageData = {"bot_id": botId, 'text': message}
    headers = {"content-type": "application/json"}
    url = "https://api.groupme.com/v3/bots/post?token=" + tokenId
    response = requests.post(url, data=json.dumps(messageData), headers=headers)

    if (int(response.status_code) not in [200, 201, 202]):
        output["message"] = ""
        output["errors"] = "Invalid Bot or Token ID"
        return output

    output["message"] = "Message Successfully Posted"
    output["errors"] = ""
    return output

def destroyBots(tokenId, botId):

    output = {}
    botData = {"bot_id": botId}
    headers = {"content-type": "application/json"}
    url = "https://api.groupme.com/v3/bots/destroy?token=" + tokenId
    response = requests.post(url, data=json.dumps(botData), headers=headers)

    if (int(response.status_code) not in [200, 201, 202]):
        output["message"] = ""
        output["errors"] = "Invalid Bot or Token ID"
        return output

    output["message"] = "Bot Successfully Removed"
    output["errors"] = ""
    return output
