#!/bin/bash
################################################################################
##
##  unicodifyString.sh
## _____________________________________________________________________________
##
##  Take the string argument provided, and output unicode equivalent. This will
##  help you easily generate various styled versions of the string.
##
##  Usage:
##  $ unicodifyString.sh "Some string I want to stylize in Unicode!"
##
##  History:
##  2022-06-07  Chris Rider   Created initial version.
## 
## =============================================================================
##
##  Copyright 2022 Chris Rider (csrider@gmail.com)
##
##  This Source Code Form is subject to the terms of the Mozilla Public
##  License, v. 2.0. If a copy of the MPL was not distributed with this file,
##  you can obtain one at http://mozilla.org/MPL/2.0/.
##
################################################################################


## Check if the terminal supports Unicode (UTF-8)
CHARMAP_UTF8="UTF-8"    # what we expect terminal to report if supports unicode
TERM_CHARMAP_SUPPORT=$(locale charmap)
if [ "$TERM_CHARMAP_SUPPORT" != "$CHARMAP_UTF8" ]; then
  echo;  echo "Your terminal does not support Unicode UTF-8, exiting.";  echo
  exit 1
fi

## Parse string argument
INPUT_STRING=$1
if [ -z "$INPUT_STRING" ]; then
  echo;  echo "You must provide a string argument, exiting.";  echo
  exit 1
fi

## Define text styling
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

## Define misc. constants
SCRIPT_TITLE="Unicodify! The script that generates great looking styles"
BYTE_PREFIX_HEX='\x';  BYTE_PREFIX_UTF='\U'

## REFERENCE NOTES
#HEX_A='\x41'        # Assign hex value of 'A' to variable
#echo -e "$HEX_A"    # Print out the glyph for 0x41 (assigned above), which is 'A'
#echo -e '\U1f130'   # Convert hex 0x1f130 to glyph '🄰'
#echo -e '\x30'      # Convert hex 0x0030 to glyph '0'


## Create a master array of basic-latin alpha-numeric hex codes
declare -A UTF_BLATIN_ALPHANUMS;  UTF_BLAT_0=\x30;  UTF_BLAT_9=0x0039;
TEMP='0x30'
for (( val=$UTF_BLAT_0; val <= $UTF_BLAT_9; val+=1 )); do
  printf '\\U%X\n' "$val"
done
exit 1
UTF_BLAT_a='61'; UTF_BLAT_z='7a'; 
UTF_BLAT_A='41'; UTF_BLAT_Z='5a';

## Define mappings to monolithic associative arrays that will be keyed to
## the basic-latin code page (for example: 0,...,9,a,...,z,A,...,Z)
UTF_ENCL_CIRCLE_A='24B6';  UTF_ENCL_CIRCLE_Z='24CF'
UTF_ENCL_CIRCLE_a='24D0';  UTF_ENCL_CIRCLE_z='24E9'
UTF_ENCL_CIRCLE_DIGITS=('24EA' '2460' '2461' '2462' '2463' '2464' '2465' '2466' '2467' '2468')
declare -A LETTERS_BLACK_SQUARE_CAP; HEX_START=   #letters black square: \U1f130 through \U1f149

declare -A LETTERS_WHITE_CIRCLE_CAP   #letters white circle: \U1f150 through \U1f169
declare -A LETTERS_WHITE_SQUARE_CAP   #letters white square: \U1f170 through \U1f189
LETTERS_BLACK_SQUARE_CAP['A']='\U1f130'
LETTERS_BLACK_SQUARE_CAP['B']='\U1f131'
LETTERS_BLACK_SQUARE_CAP['C']='\U1f132'
LETTERS_BLACK_SQUARE_CAP['D']='\U1f133'
LETTERS_BLACK_SQUARE_CAP['E']='\U1f134'
LETTERS_BLACK_SQUARE_CAP['F']='\U1f135'
LETTERS_BLACK_SQUARE_CAP['G']='\U1f136'
LETTERS_BLACK_SQUARE_CAP['H']='\U1f137'
LETTERS_BLACK_SQUARE_CAP['I']='\U1f138'
LETTERS_BLACK_SQUARE_CAP['J']='\U1f139'
LETTERS_BLACK_SQUARE_CAP['K']='\U1f13a'
LETTERS_BLACK_SQUARE_CAP['L']='\U1f13b'
LETTERS_BLACK_SQUARE_CAP['M']='\U1f13c'
LETTERS_BLACK_SQUARE_CAP['N']='\U1f13d'
LETTERS_BLACK_SQUARE_CAP['O']='\U1f13e'
LETTERS_BLACK_SQUARE_CAP['P']='\U1f13f'
LETTERS_BLACK_SQUARE_CAP['Q']='\U1f140'
LETTERS_BLACK_SQUARE_CAP['R']='\U1f141'
LETTERS_BLACK_SQUARE_CAP['S']='\U1f142'
LETTERS_BLACK_SQUARE_CAP['T']='\U1f143'
LETTERS_BLACK_SQUARE_CAP['U']='\U1f144'
LETTERS_BLACK_SQUARE_CAP['V']='\U1f145'
LETTERS_BLACK_SQUARE_CAP['W']='\U1f146'
LETTERS_BLACK_SQUARE_CAP['X']='\U1f147'
LETTERS_BLACK_SQUARE_CAP['Y']='\U1f148'
LETTERS_BLACK_SQUARE_CAP['Z']='\U1f149'
echo -e ${LETTERS_BLACK_SQUARE_CAP[$INPUT_STRING]}

## Define visual elements
VIS_TOP="╭──────────────────────────────────────────────────────────────────────────────╮"
VIS_VER="│"
VIS_DIV="│──────────────────────────────────────────────────────────────────────────────"
VIS_BOT="╰──────────────────────────────────────────────────────────────────────────────╯"

## Render start of the script
printf "${VIS_TOP}\n"
printf "${VIS_VER} ${STYBLD}${STYITA}%s${SCDEF}\n" "$SCRIPT_TITLE"
printf "${VIS_DIV}\n"

## Render main body of the script
printf "${VIS_VER} You provided the following string to convert:\n"
printf "${VIS_VER}   \"%s\"\n" "$INPUT_STRING"
printf "${VIS_VER}\n"
printf "${VIS_VER} Which unicode character set to convert your string to?\n"

## Render conversions
#for i in "${LETTERS_WHITE_SQUARE[@]}"; do
#  echo -e $i
#done


## Render end of the script
printf "${VIS_BOT}\n"




: '
fast_chr() {
    local __octal
    local __char
    printf -v __octal '%03o' $1
    printf -v __char \\$__octal
    REPLY=$__char
}

function unichr {
    local c=$1    # Ordinal of char
    local l=0    # Byte ctr
    local o=63    # Ceiling
    local p=128    # Accum. bits
    local s=''    # Output string

    (( c < 0x80 )) && { fast_chr "$c"; echo -n "$REPLY"; return; }

    while (( c > o )); do
        fast_chr $(( t = 0x80 | c & 0x3f ))
        s="$REPLY$s"
        (( c >>= 6, l++, p += o+1, o>>=1 ))
    done

    fast_chr $(( t = p | c ))
    echo -n "$REPLY$s"
}

## test harness
for (( i=0x2500; i<0x2600; i++ )); do
    unichr $i
done
'