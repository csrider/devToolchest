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
##  PROCEDURE/OVERVIEW:
##    Create directory
##    Git init, Github repo create
##    Npm init
##
##  HISTORY:
##    2022-06-19    Chris Rider     Created initial version.
##
##  TODO:
##      
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

#PATH_SHELL_PRETTIFY="./shellPrettify.sh"                        # Specify path to prettify file for eye candy
spCtrlChar_esc='\033';  spCtrlChar_begin='[';  spCtrlChar_join=';';  spCtrlChar_end='m'
spFmtCode_bright='1';  spFmtCode_dim='2';  spFmtCode_italic='3';  spFmtCodeReset_all='0'
spColorFG_default='39';  spColorFG_darkGray='90';  spColorFG_lightRed='91';  spColorFG_lightGreen='92'
spBold="${spCtrlChar_esc}${spCtrlChar_begin}${spFmtCode_bright}${spCtrlChar_end}"
spDim="${spCtrlChar_esc}${spCtrlChar_begin}${spFmtCode_italic}${spCtrlChar_end}"
spItalic="${spCtrlChar_esc}${spCtrlChar_begin}${spFmtCode_italic}${spCtrlChar_end}"
spDkGray="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_darkGray}${spCtrlChar_end}"
spLtRed="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_lightRed}${spCtrlChar_end}"
spLtGreen="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_lightGreen}${spCtrlChar_end}"
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

function handleInitProjectDirectory {
    printf "  %s...   " "Creating directory for project"

    mkdir "$projFullDir" > /dev/null 2>&1
    
    if [ -d "$projFullDir" ]; then
        printf "$spLtGreen%s $spBold%s$spEnd\n" "$UNI_CHECKMARK" "DONE"
    else
        printf "$spLtRed%s $spBold%s$spEnd\n" "$UNI_XMARK" "ERROR (aborting)"
        exit 1
    fi
}

function createGitIgnore {
    cd $projFullDir > /dev/null 2>&1
    
    touch .gitignore > /dev/null 2>&1

    cd "$CURRENT_PATH" > /dev/null 2>&1
}

function handleInitGit {
    echo $promptInitGit
    if [[ $promptInitGit =~ ^[Yy]$ ]]; then
        printf "  %s...   " "Initializing local Git repository"

        cd $projFullDir > /dev/null 2>&1

        git init -b main > /dev/null 2>&1
        createGitIgnore
        git add . #> /dev/null 2>&1
        git commit -m "Initial commit by $SCRIPT_FILENAME" #> /dev/null 2>&1

        cd "$CURRENT_PATH" > /dev/null 2>&1

        if [ -d "$projectName" ]; then
            printf "$spLtGreen%s $spBold%s$spEnd\n" "$UNI_CHECKMARK" "DONE"
        else
            printf "$spLtRed%s $spBold%s$spEnd\n" "$UNI_XMARK" "ERROR"
        fi
    fi
}

function handleInitGithub {
    if [[ $promptInitGithub =~ ^[Yy]$ ]]; then
        printf "  %s...   " "Initializing remote Github repository"

        cd $projFullDir > /dev/null 2>&1

        gh repo create "$projectName" --private --source=. --license=MPL-2.0 --remote=upstream --push # > /dev/null 2>&1

        cd "$CURRENT_PATH" > /dev/null 2>&1

        #TODO STILL
        #if [ -d "$projFullDir" ]; then
        #    printf "$spLtGreen%s $spBold%s$spEnd\n" "$UNI_CHECKMARK" "DONE"
        #else
        #    printf "$spLtRed%s $spBold%s$spEnd\n" "$UNI_XMARK" "ERROR"
        #fi
    fi
}

function handleInitNodeJS {
    printf "  %s...   " "Initializing Node.JS"

    cd $projFullDir > /dev/null 2>&1

    npm init -y > /dev/null 2>&1
    npm install jest > /dev/null 2>&1

    cd "$CURRENT_PATH" > /dev/null 2>&1

    if [ -f "$projFullDir/package.json" ]; then
            printf "$spLtGreen%s $spBold%s$spEnd\n" "$UNI_CHECKMARK" "DONE"
        else
            printf "$spLtRed%s $spBold%s$spEnd\n" "$UNI_XMARK" "ERROR"
        fi
}

function handleOpenCodium {
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
printf "  $spBold%s$spEnd  " "Absolute Path For New Project Dir ⭢";  read -i "$DEFAULT_PROJ_PATH" -e promptProjectPath;
printf "  $spBold%s$spEnd  " "Enter New Project's Name ⭢";           read promptProjectName
printf "  $spBold%s$spEnd  " "Init Local Git Repo? (y/n) ⭢";         read -n 1 -r promptInitGit;  printf "\n"
#printf "  $spBold%s$spEnd" "Init Github Repo? (y/n):  ";  read -n 1 -r promptInitGithub;  printf "\n"
#printf "  $spBold%s$spEnd" "Open Codium After? (y/n): ";  read -n 1 -r promptOpenCodium;  printf "\n"

projFullDir="$promptProjectPath/$promptProjectName"

## Perform the tasks
handleInitProjectDirectory      #init project directory
handleInitGit                   #init local Git repo (first, so npm init can use its config)
#handleInitGithub                #init Github repo
#handleInitNodeJS                #init Node.JS
#handleOpenCodium                #handle opening an IDE for the project

# Inform completion
echo
printf "  %s\n\n" "Complete! Be sure to update the package.json file if you desire."