#!/bin/bash
###############################################################################
#### Interactive bash script to customize and generate license boilerplate ####
###############################################################################
# Usage:  ./generateBoilerplate.sh   (then just follow the prompts)
#
# Revisions:
#   2022-06-06  Chris Rider   Created. First version to be basic/interactive.
#
# TO-DO:
# - Input and data validation / Error checking
# - Ability to specify a different output path and/or filename for license
# - Read pre-defined configuration
#
###############################################################################
# Copyright 2022 Chris Rider (csrider@gmail.com)
#
# This Source Code Form is subject to the terms of the Mozilla Public License,
# v. 2.0. If a copy of the MPL was not distributed with this file, You can 
# obtain one at http://mozilla.org/MPL/2.0/.
###############################################################################

## Configure
LICENSE_SRC_DIR="./src/licenseTemplates"
OUT_LICENSE_DIR="./output"
OUT_LICENSE_FILENAME="LICENSE.txt"
TAG_YEAR="<YEAR>"
TAG_NAME="<NAME>"
TAG_EMAIL="<EMAIL>"

## Styling
# (resource: https://misc.flogisoft.com/bash/tip_colors_and_formatting)
SBeg='\033['; SJoin=';'; SEnd='m'
SNormal='0'; SBold='1'; SDim='2'; SItalic='3'; SUnderline='4'; SBlink='5'; SReverse='7'; SInvisible='8'
CDefault='39'; CBlack='30'; CDGray='90'; CLGray='37'; CWhite='97'
CRed='31'; CLRed='91'; CGreen='32'; CLGreen='92'; CBlue='34'; CLBlue='94'
CYellow='33'; CLYellow='93'; CCyan='36'; CLCyan='96' CMagenta='35'; CLMagenta='95'
STYNOR="${SBeg}${SNormal}${SEnd}"; STYBLD="${SBeg}${SBold}${SEnd}"; STYDIM="${SBeg}${SDim}${SItalic}"
STYITA="${SBeg}${SItalic}${SEnd}"; STYUND="${SBeg}${SUnderline}${SEnd}"
COLBLCK="${SBeg}${CBlack}${SEnd}"; COLWHIT="${SBeg}${CWhite}${SEnd}"
COLDGRY="${SBeg}${CDGray}${SEnd}"; COLLGRY="${SBeg}${CLGray}${SEnd}"
COLRED="${SBeg}${CRed}${SEnd}"; COLGRN="${SBeg}${CGreen}${SEnd}"; COLBLU="${SBeg}${CBlue}${SEnd}"
COLLRED="${SBeg}${CLRed}${SEnd}"; COLLGRN="${SBeg}${CLGreen}${SEnd}"; COLLBLU="${SBeg}${CLBlue}${SEnd}"
COLYLW="${SBeg}${CYellow}${SEnd}"; COLMAG="${SBeg}${CMagenta}${SEnd}"; COLCYN="${SBeg}${CCyan}${SEnd}"
COLLYLW="${SBeg}${CLYellow}${SEnd}"; COLLMAG="${SBeg}${CLMagenta}${SEnd}"; COLLCYN="${SBeg}${CLCyan}${SEnd}"
SCDEF="${SBeg}${SNormal}${SJoin}${CDefault}${SEnd}"

## Initialize shell variables
CURRENT_YEAR=$(date +'%Y')
LIC_CHOICES_FILENAMES=(); for LICENSE_FILE in $LICENSE_SRC_DIR*/*.txt; do LIC_CHOICES_FILENAMES+=($LICENSE_FILE); done
LIC_CHOICES_NUMBERS=(); for LICENSE_FILE in ${LIC_CHOICES_FILENAMES[@]}; do LIC_CHOICES_NUMBERS+=($LICENSE_FILE); done

## Show start of program
clear
printf "${SCDEF}"
printf "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╍╍┅┅┉┉\n"
printf "┃ ${STYBLD}Software License Boilerplate Wizard - v1.0.0${SCDEF}\n"
printf "┃ ${STYITA}${COLLGRY}Copyright © %s  Chris Rider (csrider@gmail.com)${SCDEF}\n" $CURRENT_YEAR
printf "┠────────────────────────────────────────────────────────────────────────╌╌┄┄┈┈\n"

## Show available license template options
printf "┃ ${STYBLD}Available license templates:${SCDEF} ${STYITA}${COLLGRY}(you may add more to %s/)${SCDEF}\n" $LICENSE_SRC_DIR
for LICENSE_FILE in ${LIC_CHOICES_FILENAMES[@]}; do
  printf "┃   ${COLLCYN}%d)${SCDEF} %s\n" $((FILE_CHOICE++ +1)) $(echo ${LICENSE_FILE#$LICENSE_SRC_DIR/} | cut -d'.' -f1)
done

## Allow user to choose one of the available options, then get chosen file and output a confirmation
printf "┃   ${STYBLD}${COLLCYN}Your choice? ⟶${SCDEF}   "; read -r -n1 LICENSE_FILE_CHOICE
CHOSEN_TEMPLATE_FILE=${LIC_CHOICES_FILENAMES[$((LICENSE_FILE_CHOICE-1))]}
CHOSEN_TEMPLATE_NAME=`echo ${CHOSEN_TEMPLATE_FILE#$LICENSE_SRC_DIR/} | cut -d'.' -f1`
printf "  ${STYITA}${COLLGRN}Proceeding with selection (%s)${SCDEF}\n" $CHOSEN_TEMPLATE_NAME

## Allow user to enter personal information for copyright lines
printf "┃ ${STYBLD}Your information...${SCDEF}\n"
printf "┃    ${STYBLD}${COLLCYN}Full Name ⟶${SCDEF}   "; read USER_NAME
printf "┃   ${STYBLD}${COLLCYN}Your Email ⟶${SCDEF}   "; read USER_EMAIL

## Show customized copyright preview
RESULT_COPYRIGHT_TEXT=$(printf "Copyright %s  %s (%s)" $CURRENT_YEAR "$USER_NAME" "$USER_EMAIL")
printf "┃   ${STYITA}${COLLGRN}Copyright Preview:${SCDEF}  %s\n" "$RESULT_COPYRIGHT_TEXT"

## Show progress
printf "┃ ${STYBLD}Processing...${SCDEF}\n"

## Copy specified license file to output and rename
printf "┃   Making a copy of the license file... "
cp "$CHOSEN_TEMPLATE_FILE" "$OUT_LICENSE_DIR/$OUT_LICENSE_FILENAME"
printf "${STYITA}${COLLGRN}done!${SCDEF}\n"

## Edit the necessary parts in the output file with user information and year
printf "┃   Applying your information to the new license file... "
sed --in-place "s/$TAG_YEAR/$CURRENT_YEAR/" "$OUT_LICENSE_DIR/$OUT_LICENSE_FILENAME"
sed --in-place "s/$TAG_NAME/$USER_NAME/" "$OUT_LICENSE_DIR/$OUT_LICENSE_FILENAME"
sed --in-place "s/$TAG_EMAIL/$USER_EMAIL/" "$OUT_LICENSE_DIR/$OUT_LICENSE_FILENAME"
printf "${STYITA}${COLLGRN}done!${SCDEF}\n"
printf "┃\n"

## Summary and exit
printf "┃ ${STYBLD}${COLLGRN}Finished! Your license file is ready ⟶${SCDEF}   %s/%s\n" $OUT_LICENSE_DIR $OUT_LICENSE_FILENAME
printf "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╍╍┅┅┉┉\n"