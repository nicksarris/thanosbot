import warnings
warnings.filterwarnings('ignore')

from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

import json
from thanos_service import *
from thanos_utils import *

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
api = CORS(app, resources = {r"/*": {"origins": "*"}})

"""
Endpoints:
==============================================================================

--- Activity Endpoints ---
/api/activity/active             - Checks to make sure Flask service is active

--- Bot Endpoints ---
/api/bots/<groupId>/create       - Create a ThanosBot in Group of provided GroupID
/api/bots/<botId>/destroy        - Destroy a ThanosBot of provided BotID

--- Group Endpoints ---
/api/groups                      - Find All Groups that User is in
/api/groups/<groupName>          - Find GroupID given Group Name as a Parameter
/api/groups/<groupId>/nickname   - Change Nickname of User in Group
/api/groups/<groupId>/users      - Select Half of All Users in Group (To Remove)
/api/groups/<groupId>/remove     - Remove ALL Users Passed in POST Request Data
/api/groups/<botId>/message      - Send Ending Message After "Snap" Occurs

--- Thanos Endpoints ---
/api/thanos/<groupId>/<nickname> - Perform a Thanos Snap on a provided GroupID

==============================================================================
"""

"""
Activity Endpoints
==============================================================================
"""

@app.route('/api/activity/active', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def checkActivity():
    output = {"active": True};
    return json.dumps(output)

"""
==============================================================================
"""

"""
Bot Endpoints
==============================================================================
"""

@app.route('/api/bots/<groupId>/create', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceCreateBots(groupId):
    output = {}
    tokenId = request.args.get('token')

    if tokenId == "":
        output["bot_id"] = ""
        output["errors"] = "Invalid Access Token"
        return json.dumps(output)

    createdData = createBots(tokenId, groupId)
    output["bot_id"] = createdData["bot_id"]
    output["errors"] = createdData["errors"]
    return json.dumps(output)

@app.route('/api/bots/<botId>/destroy', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceDestroyBots(groupId, botId):
    output = {}
    tokenId = request.args.get('token')

    if tokenId == "":
        output["message"] = ""
        output["errors"] = "Invalid Access Token"
        return json.dumps(output)

    destroyedData = destroyBots(tokenId, botId)
    output["message"] = destroyedData["message"]
    output["errors"] = destroyedData["errors"]
    return json.dumps(output)

"""
==============================================================================
"""

"""
Group Endpoints
==============================================================================
"""

@app.route('/api/groups', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceFindGroups():
    output = {}
    tokenId = request.args.get('token')

    if tokenId == "":
        output["groups"] = []
        output["groupsID"] = []
        output["errors"] = "Invalid Access Token"
        return json.dumps(output)

    currentGroups = findGroups(tokenId)
    output["groups"] = currentGroups["groups"]
    output["groupsID"] = currentGroups["groupsID"]
    output["errors"] = currentGroups["errors"]
    return json.dumps(output)

@app.route('/api/groups/<groupName>', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceFindGroupId(groupName):
    output = {}
    tokenId = request.args.get('token')

    if tokenId == "":
        output["groups"] = ""
        output["errors"] = "Invalid Access Token"
        return json.dumps(output)

    currentGroupId = findGroupId(tokenId, groupName)
    output["group_id"] = currentGroupId["group_id"]
    output["errors"] = currentGroupId["errors"]
    return json.dumps(output)

@app.route('/api/groups/<groupId>/nickname', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceUpdateNickname(groupId):
    output = {}
    tokenId = request.args.get('token')
    nickname = request.args.get('nickname')

    if tokenId == "":
        output["nickname"] = ""
        output["errors"] = "Invalid Access Token"
        return json.dumps(output)

    if nickname == "":
        output["nickname"] = ""
        output["errors"] = "Invalid Nickname"
        return json.dumps(output)

    updatedNickname = updateNickname(tokenId, groupId, nickname)
    output["nickname"] = updatedNickname["nickname"]
    output["errors"] = updatedNickname["errors"]
    return json.dumps(output)

@app.route('/api/groups/<groupId>/users', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceGetSelectedUsers(groupId):
    output = {}
    tokenId = request.args.get('token')
    blacklisted = ["Nick Sarris"]

    if tokenId == "":
        output["users"] = ""
        output["errors"] = "Invalid Access Token"
        return json.dumps(output)

    selectedUsers = getSelectedUsers(tokenId, groupId, blacklisted)
    output["users"] = selectedUsers["users"]
    output["errors"] = selectedUsers["errors"]
    return json.dumps(output)

@app.route('/api/groups/<groupId>/remove', methods = ["POST"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceRemoveSelectedUsers(groupId):
    output = {}
    tokenId = request.args.get('token')
    selectedUsers = [str(request.get_json()["selectedUsers"])]

    if tokenId == "":
        output["users"] = ""
        output["errors"] = "Invalid Access Token"
        return json.dumps(output)

    removedUsers = removeSelectedUsers(tokenId, groupId, selectedUsers)
    output["users"] = removedUsers["users"]
    output["errors"] = removedUsers["errors"]
    return json.dumps(output)

@app.route('/api/groups/<botId>/message', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceSendMessage(botId):
    output = {}
    tokenId = request.args.get('token')

    if tokenId == "":
        output["message"] = ""
        output["errors"] = "Invalid Access Token"
        return json.dumps(output)

    messageData = sendMessage(tokenId, botId)
    output["message"] = removedUsers["message"]
    output["errors"] = removedUsers["errors"]
    return json.dumps(output)

"""
==============================================================================
"""

"""
Thanos Endpoints
==============================================================================
"""

@app.route('/api/thanos/<groupId>/snap', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceThanos(groupId):
    output = {}
    tokenId = request.args.get('token')
    blacklistedGroups = ["50177759", "39872008", "28679901"]

    if tokenId == "":
        output["message"] = ""
        output["errors"] = "Invalid Access Token"
        return json.dumps(output)

    if groupId in blacklistedGroups:
        output["message"] = ""
        output["errors"] = "The Attempted Group is Immune to the Snap"
        return json.dumps(output)

    thanosData = thanosSnap(tokenId, groupId)
    output["message"] = thanosData["message"]
    output["errors"] = thanosData["errors"]
    return json.dumps(output)

"""
==============================================================================
"""

def main():
    currentPort = 3001
    app.run(host = '0.0.0.0', port = currentPort, threaded = True)

if __name__ == '__main__':

    main()
