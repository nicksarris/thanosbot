__author__ = 'Nick Sarris (ngs5st)'

import math
import time
import json
import requests
import random

from thanos_utils import *

def thanosSnap(tokenId, groupId, nickname):

    output = {}
    blacklisted = ["Thanos", "Nick Sarris"]

    # Step 1: Creating ThanosBot
    createdData = createBots(tokenId, groupId)
    if createdData["errors"] != "":
        output["errors"] = createdData["errors"]
        output["message"] = "Error Creating ThanosBot..."
        return output

    # Step 2: Updating Nickname
    updatedNickname = updateNickname(tokenId, groupId, "Thanos")
    if updatedNickname["errors"] != "":
        output["errors"] = updatedNickname["errors"]
        output["message"] = "Error Changing Nickname..."
        return output

    # Step 3: Selecting Users
    selectedUsers = getSelectedUsers(tokenId, groupId, blacklisted)
    if selectedUsers["errors"] != "":
        output["errors"] = selectedUsers["errors"]
        output["message"] = "Error Selecting Users..."

    # Step 4: Removing Users
    removedUsers = removeSelectedUsers(tokenId, groupId, selectedUsers["users"])
    if removedUsers["errors"] != "":
        output["errors"] = removedUsers["errors"]
        output["message"] = "Error Removing Users..."

    # Step 5: Reverting Nickname
    updatedNickname = updateNickname(tokenId, groupId, nickname)
    if updatedNickname["errors"] != "":
        output["errors"] = updatedNickname["errors"]
        output["message"] = "Error Changing Nickname..."
        return output

    # Step 6: Generate Message
    messageData = sendMessage(tokenId, createdData["bot_id"])
    if messageData["errors"] != "":
        output["errors"] = messageData["errors"]
        output["message"] = "Error Sending Message..."
        return output

    # Step 7: Deleting ThanosBot
    destroyedData = destroyBots(tokenId, createdData["bot_id"])
    if destroyedData["errors"] != "":
        output["errors"] = destroyedData["errors"]
        output["message"] = "Error Creating ThanosBot..."
        return output

    output["message"] = "Successfully Removed Half of all Users"
    output["errors"] = ""
    return output
