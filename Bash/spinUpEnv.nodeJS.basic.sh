#!/usr/bin/env bash
########################################################################################################################
##
##  spinUpEnv.nodeJS.basic.sh
## _____________________________________________________________________________________________________________________
##
##  A bash script to automate creation of a basic Node.JS environment.
##
##  USAGE:
##    ./spinUpEnv.nodeJS.basic.sh
##
##  HISTORY:
##    2022-06-19    Chris Rider     Created initial version.
##
##  TODO:
##    Anything commented out below!
##    Implement automated unit testing
## 
## =====================================================================================================================
##
##  Copyright 2022 Chris Rider (csrider@gmail.com)
##
##  This Source Code Form is subject to the terms of the Mozilla Public License v. 2.0. If a copy of the MPL was not 
##  distributed with this file, you can obtain one at http://mozilla.org/MPL/2.0/.
##
########################################################################################################################


########################################################################################################################
###/ Configure This Script!
##/

#SCRIPT_FILENAME=`echo "$0" | cut -d '/' -f 2`
SCRIPT_FILENAME="spinUpEnv.nodeJS.basic.sh"
CURRENT_PATH=`pwd`
DEFAULT_PROJ_PATH="/home/chris/Development"

UNI_CHECKMARK="✔"
UNI_XMARK="✘"

REWRITE_LINE="\r\033[K"

#PATH_SHELL_PRETTIFY="./shellPrettify.sh"                        # Specify path to prettify file for eye candy
spCtrlChar_esc='\033';  spCtrlChar_begin='[';  spCtrlChar_join=';';  spCtrlChar_end='m'
spFmtCode_bright='1';  spFmtCode_dim='2';  spFmtCode_italic='3';  spFmtCodeReset_all='0'
spColorFG_default='39';  spColorFG_darkGray='90'; 
spColorFG_lightRed='91';  spColorFG_lightGreen='92';  spColorFG_lightYellow='93';  spColorFG_lightBlue='94'
spBold="${spCtrlChar_esc}${spCtrlChar_begin}${spFmtCode_bright}${spCtrlChar_end}"
spDim="${spCtrlChar_esc}${spCtrlChar_begin}${spFmtCode_italic}${spCtrlChar_end}"
spItalic="${spCtrlChar_esc}${spCtrlChar_begin}${spFmtCode_italic}${spCtrlChar_end}"
spDkGray="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_darkGray}${spCtrlChar_end}"
spLtRed="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_lightRed}${spCtrlChar_end}"
spLtGreen="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_lightGreen}${spCtrlChar_end}"
spLtYellow="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_lightYellow}${spCtrlChar_end}"
spLtBlue="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_lightBlue}${spCtrlChar_end}"
spEnd="${spCtrlChar_esc}${spCtrlChar_begin}${spFmtCodeReset_all}${spCtrlChar_end}"


########################################################################################################################
###/ Pre-checks and Initializations
##/

## Check if the terminal supports Unicode (UTF-8)
CHARMAP_UTF8="UTF-8"    # what we expect terminal to report if supports unicode
TERM_CHARMAP_SUPPORT=$(locale charmap)
if [ "$TERM_CHARMAP_SUPPORT" != "$CHARMAP_UTF8" ]; then
  echo;  echo "Error: Your terminal does not support Unicode UTF-8, exiting.";  echo
  exit 1
fi

## Import prettify
#source "$PATH_SHELL_PRETTIFY" > /dev/null 2>&1
#CMD_RESULT=$?
#if [ $CMD_RESULT -ne 0 ]; then
#    echo "Error: Shell prettifier could not be loaded. Make sure correct path is sourced."
#    exit $?
#fi

## Check Github CLI existence
#if [ ! "$(command -v gh)" ]; then
#    echo "ERROR: Install gh from https://github.com/cli/cli#installation"
#    exit 1
#fi

## Check Github CLI authentication
#if [[ $(gh auth status) -eq 1 ]]; then
#    echo "ERROR: You must be logged in to Github CLI first: Run 'gh auth login'"
#    exit 1
#fi

## FUTURE: allow name/dir of project to be specified in command line
## Parse string argument
#INPUT_STRING=$1
#if [ -z "$INPUT_STRING" ]; then
#  echo;  echo "You must provide a string argument, exiting.";  echo
#  exit 1
#fi


########################################################################################################################
###/ Functions for Main Program
##/

#function confirmTasksToPerform {
    #printf "$spBorderLeft $spBold%s$spEnd\n" "Do You Confirm the following?"
    #printf "$spBorderLeft  %s: $spBold%s$spEnd\n" "Project Name" "$promptProjectName"
    #printf "$spBorderLeft  %s: $spBold%s/%s$spEnd\n" "Full Path" `pwd` "$promptProjectName"
    #printf "$spBorderLeft  %s: $spBold%s$spEnd\n" "Initialize local Git" "$promptInitGit"
    #printf "$spBorderLeft  %s: $spBold%s$spEnd\n" "Initialize remote Github" "$promptInitGithub"
#}

function spinnerOn() {
    local SPINNER_CHARS='/-\|'
    printf "   "
    while true; do
        printf '\b\b%.1s ' "$SPINNER_CHARS"
        sleep 0.2
        SPINNER_CHARS=${SPINNER_CHARS#?}${SPINNER_CHARS%???}
    done
}
function spinnerOff() {
    kill $SPINNER_PROCESS >/dev/null 2>&1
    printf "\b\b"
}
## SPINNER USAGE EXAMPLE
#spinnerOn & SPINNER_PROCESS=$!
#sleep 3    #some work to do
#spinnerOff

function handleInitProjectDirectory() {
    local statusLine="Creating directory for project"
    printf " ${spBold}${spLtYellow}%s$spEnd" "$statusLine"

    # Create the directory
    mkdir "$projFullDir" >/dev/null 2>&1
    
    # Verify the setup and report
    if [ -d "$projFullDir" ]; then
        printf "${REWRITE_LINE} %s  $spLtGreen%s %s$spEnd\n" "$statusLine" "$UNI_CHECKMARK" "DONE"
    else
        printf "${REWRITE_LINE} %s  $spLtRed%s %s$spEnd\n" "$statusLine" "$UNI_XMARK" "ERROR (aborting)"
        exit 1
    fi
}

function handleInitGit() {
    if [[ $promptInitGit =~ ^[Yy]$ ]]; then
        local statusLine="Initializing local Git repository..."
        printf " ${spBold}${spLtYellow}%s$spEnd" "$statusLine"

        # Change to project directory
        cd $projFullDir >/dev/null 2>&1

        # Start progress indicator
        printf "${REWRITE_LINE} ${spBold}${spLtYellow}%s$spEnd $spItalic%s$spEnd" \
            "$statusLine" "Working"
        spinnerOn & SPINNER_PROCESS=$!

        # Create local Git repo
        git init -b main >/dev/null 2>&1

        # Create initial files (we will commit them at the end)
        touch .gitignore > /dev/null 2>&1
            git add .gitignore >/dev/null 2>&1
        printf "# About %s\n\n(automatically generated by %s)\n" "$promptProjectName" "$SCRIPT_FILENAME" >README.md
            git add README.md >/dev/null 2>&1

        # Do the initial commit
        git commit -m "Initial commit by $SCRIPT_FILENAME" >/dev/null 2>&1

        # Stop progress indicator
        spinnerOff

        # Return to original directory
        cd "$CURRENT_PATH" >/dev/null 2>&1

        # Verify the setup and report
        if [ -d "$projFullDir" ]; then
            printf "${REWRITE_LINE} %s  $spLtGreen%s %s$spEnd\n" "$statusLine" "$UNI_CHECKMARK" "DONE"
        else
            printf "${REWRITE_LINE} %s  $spLtRed%s %s$spEnd\n" "$statusLine" "$UNI_XMARK" "ERROR"
        fi
    fi
}

function handleInitGithub() {
    if [[ $promptInitGithub =~ ^[Yy]$ ]]; then
        local statusLine="Initializing remote Github repository..."
        printf " ${spBold}${spLtYellow}%s$spEnd" "$statusLine"

        # Change to project directory
        cd $projFullDir >/dev/null 2>&1

        # Start progress indicator
        printf "${REWRITE_LINE} ${spBold}${spLtYellow}%s$spEnd $spItalic%s$spEnd" \
            "$statusLine" "Working"
        spinnerOn & SPINNER_PROCESS=$!

        # Create remote Github repo
        gh repo create "$promptProjectName" \
            --private --source="$projFullDir/" --license=MPL-2.0 --remote=upstream --push # >/dev/null 2>&1

        # Stop progress indicator
        spinnerOff

        # Return to original directory
        cd "$CURRENT_PATH" >/dev/null 2>&1

        #TODO STILL
        # Verify the setup and report
        #if [ -d "$projFullDir" ]; then
        #    printf "${REWRITE_LINE}  %s  $spLtGreen%s %s$spEnd\n" "$statusLine" "$UNI_CHECKMARK" "DONE"
        #else
        #    printf "${REWRITE_LINE}  %s  $spLtRed%s %s$spEnd\n" "$statusLine" "$UNI_XMARK" "ERROR"
        #fi
    fi
}

function handleInitNodeJS() {
    local statusLine="Initializing Node.JS..."
    printf " ${spBold}${spLtYellow}%s$spEnd" "$statusLine"

    # Change to project directory
    cd $projFullDir >/dev/null 2>&1

    # Init Node.JS
    printf "${REWRITE_LINE} ${spBold}${spLtYellow}%s$spEnd $spItalic%s$spEnd" \
        "$statusLine" "Initializing Node core"
    spinnerOn & SPINNER_PROCESS=$!
    npm init -y >/dev/null 2>&1
    spinnerOff

    # Download and install jest testing modules
    printf "${REWRITE_LINE} ${spBold}${spLtYellow}%s$spEnd $spItalic%s$spEnd" \
        "$statusLine" "Downloading and installing jest (always unit-test!)"
    spinnerOn & SPINNER_PROCESS=$!
    npm install --save-dev jest >/dev/null 2>&1    #ensure jest is only in dev-dependencies
    spinnerOff

    # Modify package.json as needed
    if [ ! "$(command -v npe)" ]; then
        printf "${REWRITE_LINE} ${spBold}${spLtYellow}%s$spEnd $spItalic%s$spEnd" \
            "$statusLine" "Downloading and installing npe"
        spinnerOn & SPINNER_PROCESS=$!
        npm install -g npe >/dev/null 2>&1          #ensure npe is installed (to easily edit package.json)
        spinnerOff
    fi
    printf "${REWRITE_LINE} ${spBold}${spLtYellow}%s$spEnd $spItalic%s$spEnd" \
        "$statusLine" "Downloading and installing npe"
    spinnerOn & SPINNER_PROCESS=$!
    npe scripts.test jest >/dev/null 2>&1
    spinnerOff

    # Create initial starter/test files
    printf "${REWRITE_LINE} ${spBold}${spLtYellow}%s$spEnd $spItalic%s$spEnd" \
        "$statusLine" "Creating starter files"
    spinnerOn & SPINNER_PROCESS=$!
    printf "%s\n%s\n%s\n\n%s\n" \
        "function index(a, b) {" \
        "  return a + b;" \
        "}" \
        "module.exports = index;" \
        > index.js
    printf "%s\n\n%s\n%s\n%s\n" \
        "const index = require('./index');" \
        "test('First test file adds 1 and 2, then returns a value of 3', () => {" \
        "  expect(index(1,2)).toBe(3);" \
        "});" \
        > index.test.js
    spinnerOff

    # Update local Git repo
    printf "${REWRITE_LINE} ${spBold}${spLtYellow}%s$spEnd $spItalic%s$spEnd" \
        "$statusLine" "Updating local git repo"
    spinnerOn & SPINNER_PROCESS=$!
    echo "node_modules" >>.gitignore
    git add .gitignore >/dev/null 2>&1
    git add package*.json >/dev/null 2>&1
    git add index*.js >/dev/null 2>&1
    git commit -m "Added Node.js by $SCRIPT_FILENAME" >/dev/null 2>&1
    spinnerOff

    # Return to original directory
    cd "$CURRENT_PATH" >/dev/null 2>&1

    # Verify the setup and report
    if [ -f "$projFullDir/package.json" ]; then
        printf "${REWRITE_LINE} %s  $spLtGreen%s %s$spEnd\n" "$statusLine" "$UNI_CHECKMARK" "DONE"
    else
        printf "${REWRITE_LINE} %s  $spLtRed%s %s$spEnd\n" "$statusLine" "$UNI_XMARK" "ERROR"
    fi
}

## NOTE: need to decide how to handle npm-test output, parsing, etc.
function handleTests() {
    local statusLine="Running tests..."
    printf " ${spBold}${spLtYellow}%s$spEnd" "$statusLine"

    # Change to project directory
    cd $projFullDir >/dev/null 2>&1

    # Run initial tests
    printf "${REWRITE_LINE} ${spBold}${spLtYellow}%s$spEnd $spItalic%s$spEnd" \
        "$statusLine" "Initial unit testing"
    spinnerOn & SPINNER_PROCESS=$!
    unitTestResult="$(npm test | grep 'Tests:')" >/dev/null 2>&1
    spinnerOff

    # Return to original directory
    cd "$CURRENT_PATH" >/dev/null 2>&1

    # Verify the setup and report
    #if [ -f "$projFullDir/package.json" ]; then
    #    printf "${REWRITE_LINE} %s  $spLtGreen%s %s$spEnd\n" "$statusLine" "$UNI_CHECKMARK" "DONE"
    #    printf "  Initial unit test result: %s\n" "$(cat /tmp/unittests)"
    #else
    #    printf "${REWRITE_LINE} %s  $spLtRed%s %s$spEnd\n" "$statusLine" "$UNI_XMARK" "ERROR"
    #fi
}

function handleOpenCodium() {
    printf "$spBorderLeft %s...   " "Opening Codium IDE"

    #TODO STILL
}


########################################################################################################################
###/ Main Program
##/

## Generate output header
printf "╭────────────────────────────────────────────────╮\n"
printf "│ ${spBold}Create a basic Node.JS development environment${spEnd} │\n"
printf "│ ${spItalic}${spDkGray}By Chris Rider${spEnd}                                 │\n"
printf "╰────────────────────────────────────────────────╯\n"

## Generate prompts for project information
printf " ${spBold}${spLtBlue}%s$spEnd  " \
    "Absolute Path For New Project Dir ⭢"
    read -i "$DEFAULT_PROJ_PATH" -e promptProjectPath;
printf " ${spBold}${spLtBlue}%s$spEnd  " \
    "         Enter New Project's Name ⭢"
    read promptProjectName
printf " ${spBold}${spLtBlue}%s$spEnd  " \
    "       Init Local Git Repo? (y/n) ⭢"
    read -n 1 -r promptInitGit;  printf "\n"
#printf "  $spBold%s$spEnd" "Init Github Repo? (y/n):  ";  read -n 1 -r promptInitGithub;  printf "\n"
#printf "  $spBold%s$spEnd" "Open Codium After? (y/n): ";  read -n 1 -r promptOpenCodium;  printf "\n"

echo

projFullDir="$promptProjectPath/$promptProjectName"

## Perform the tasks
handleInitProjectDirectory      #init project directory
handleInitGit                   #init local Git repo (first, so npm init can use its config)
#handleInitGithub                #init Github repo
handleInitNodeJS                #init Node.JS
#handleTests                     #perform and verify tests
#handleOpenCodium                #handle opening an IDE for the project

# Inform completion
echo
printf " $spBold%s$spEnd\n ($spItalic%s$spEnd)\n\n" \
    "Setup complete!" \
    "Be sure to update the $projFullDir/package.json file if you desire."