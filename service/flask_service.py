import warnings
warnings.filterwarnings('ignore')

import json
from flask import Flask, request
from flask_cors import CORS, cross_origin

from thanos_service import *
from thanos_utils import *

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
api = CORS(app, resources = {r"/*": {"origins": "*"}})

"""
Endpoints:
==============================================================================

--- Bot Endpoints ---
/bots/<groupId>/create       - Create a ThanosBot in Group of provided GroupID
/bots/<botId>/destroy        - Destroy a ThanosBot of provided BotID

--- Group Endpoints ---
/groups                      - Find All Groups that User is in
/groups/<groupName>          - Find GroupID given Group Name as a Parameter
/groups/<groupId>/nickname   - Change Nickname of User in Group
/groups/<groupId>/users      - Select Half of All Users in Group (To Remove)
/groups/<groupId>/remove     - Remove ALL Users Passed in POST Request Data
/groups/<botId>/message      - Send Ending Message After "Snap" Occurs

--- Thanos Endpoints ---
/thanos/<groupId>/<nickname> - Perform a Thanos Snap on a provided GroupID

==============================================================================
"""

"""
Bot Endpoints
==============================================================================
"""

@app.route('/bots/<groupId>/create', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceCreateBots(groupId):
    output = {}
    tokenId = request.args.get('token')

    if tokenId == "":
        output["bot_id"] = ""
        output["errors"] = "Invalid Token ID"
        return json.dumps(output)

    createdData = createBots(tokenId, groupId)
    output["bot_id"] = createdData["bot_id"]
    output["errors"] = createdData["errors"]
    return json.dumps(output)

@app.route('/bots/<botId>/destroy', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceDestroyBots(groupId, botId):
    output = {}
    tokenId = request.args.get('token')

    if tokenId == "":
        output["message"] = ""
        output["errors"] = "Invalid Token ID"
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

@app.route('/groups', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceFindGroups():
    output = {}
    tokenId = request.args.get('token')

    if tokenId == "":
        output["groups"] = []
        output["groupsID"] = []
        output["errors"] = "Invalid Token ID"
        return json.dumps(output)

    currentGroups = findGroups(tokenId)
    output["groups"] = currentGroups["groups"]
    output["groupsID"] = currentGroups["groupsID"]
    output["errors"] = currentGroups["errors"]
    return json.dumps(output)

@app.route('/groups/<groupName>', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceFindGroupId(groupName):
    output = {}
    tokenId = request.args.get('token')

    if tokenId == "":
        output["groups"] = ""
        output["errors"] = "Invalid Token ID"
        return json.dumps(output)

    currentGroupId = findGroupId(tokenId, groupName)
    output["group_id"] = currentGroupId["group_id"]
    output["errors"] = currentGroupId["errors"]
    return json.dumps(output)

@app.route('/groups/<groupId>/nickname', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceUpdateNickname(groupId):
    output = {}
    tokenId = request.args.get('token')
    nickname = request.args.get('nickname')

    if tokenId == "":
        output["nickname"] = ""
        output["errors"] = "Invalid Token ID"
        return json.dumps(output)

    if nickname == "":
        output["nickname"] = ""
        output["errors"] = "Invalid Nickname"
        return json.dumps(output)

    updatedNickname = updateNickname(tokenId, groupId, nickname)
    output["nickname"] = updatedNickname["nickname"]
    output["errors"] = updatedNickname["errors"]
    return json.dumps(output)

@app.route('/groups/<groupId>/users', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceGetSelectedUsers(groupId):
    output = {}
    tokenId = request.args.get('token')
    blacklisted = ["Thanos", "Nick Sarris"]

    if tokenId == "":
        output["users"] = ""
        output["errors"] = "Invalid Token ID"
        return json.dumps(output)

    selectedUsers = getSelectedUsers(tokenId, groupId, blacklisted)
    output["users"] = selectedUsers["users"]
    output["errors"] = selectedUsers["errors"]
    return json.dumps(output)

@app.route('/groups/<groupId>/remove', methods = ["POST"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceRemoveSelectedUsers(groupId):
    output = {}
    tokenId = request.args.get('token')
    selectedUsers = [str(request.get_json()["selectedUsers"])]

    if tokenId == "":
        output["users"] = ""
        output["errors"] = "Invalid Token ID"
        return json.dumps(output)

    removedUsers = removeSelectedUsers(tokenId, groupId, selectedUsers)
    output["users"] = removedUsers["users"]
    output["errors"] = removedUsers["errors"]
    return json.dumps(output)

@app.route('/groups/<botId>/message', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceSendMessage(botId):
    output = {}
    tokenId = request.args.get('token')

    if tokenId == "":
        output["message"] = ""
        output["errors"] = "Invalid Token ID"
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

@app.route('/thanos/<groupId>/snap', methods = ["GET"])
@cross_origin(origin = '*',headers = ['Content-Type','Authorization'])
def serviceThanos(groupId):
    output = {}
    tokenId = request.args.get('token')

    if tokenId == "":
        output["message"] = ""
        output["errors"] = "Invalid Token ID"
        return json.dumps(output)

    thanosData = thanosSnap(tokenId, groupId)
    output["message"] = thanosData["message"]
    output["errors"] = thanosData["errors"]
    return output

"""
==============================================================================
"""

def main():
    currentPort = 3001
    app.run(host = '0.0.0.0', port = currentPort, threaded = True)

if __name__ == '__main__':

    main()
