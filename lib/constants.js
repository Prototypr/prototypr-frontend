import {Robot, Swatches, HandEye, Wheelchair, FlowArrow,BoundingBox,GitBranch} from 'phosphor-react'
const PAGE_SIZE = 12;

const ICON_SIZE = 32
export const EXAMPLE_PATH = "cms-strapi";
export const CMS_NAME = "Prototypr";
export const CMS_URL = "https://prototypr.io/";
export const HOME_OG_IMAGE_URL =
  "http://www.prototypr.io/wp-content/uploads/2020/04/Screenshot-2020-04-20-at-16.30.37.png";

export const NAV_OFFSET = 'pt-[96px]'
export const SIDEBAR_STICKY_OFFSET = 'pt-24'

export const TOTAL_STATIC_POSTS = 50

export const jobTypes = [
  {
    "Name":"Full-time",
    "value":'fulltime'
  },
  {
    "Name":"Part-time",
    "value":'parttime'
  },
  {
    "Name":"Contractor",
    "value":'contract'
  },
  {
    "Name":"Internship",
    "value":'internship'
  },
  {
    "Name":"Volunteer",
    "value":'volunteer'
  },
]
export const sponsorTypes = [
  {
    "Name":"Full Sponsorship ($600 / week)",
    "value":'banner'
  },
  {
    "Name":"Link ($400 / week)",
    "value":'link'
  },
  // {
  //   "Name":"Full Sponsorship",
  //   "value":'combo'
  // },
]

export const topics = [
  {
    name: "navbar.submenu1.title4",
    slug: "accessibility",
    imageSrc:
      "https://images.unsplash.com/photo-1574887427561-d3d5d58c9273?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    imageAlt: "UX topic",
    color: "from-blue-default to-purple-500",
  },
  {
    name: "navbar.submenu1.title6",
    slug: "code",
    imageSrc:
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    imageAlt: "Coding",
    color: "from-teal-600 to-blue-600",
  },
  {
    name: "Artificial Intelligence",
    slug: "ai",
    imageSrc:
      "https://images.unsplash.com/photo-1599059919177-1960faea6655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    imageAlt: "AI topic",
    color: "from-orange-600 to-purple-500",
  },
  {
    name: "navbar.submenu1.title5",
    slug: "ui",
    imageSrc:
      "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
    imageAlt: "UX topic",
    color: "from-purple-600 to-red-600",
  },
  {
    name: "navbar.submenu1.title2",
    slug: "ux",
    imageSrc:
      "https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
    imageAlt: "UX topic",
    color: "from-green-600 to-blue-600",
  },
  {
    name: "topicSpotlight.tabs.userResearch",
    slug: "user-research",
    imageSrc:
      "https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    imageAlt: "UX topic",
    color: "from-orange-600 to-red-400",
  },
  {
    name: "topicSpotlight.tabs.vr",
    slug: "vr",
    imageSrc:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dnJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    imageAlt: "UX topic",
    color: "from-red-500 to-yellow-600",
  },
  // {
  //   name: "Web 3",
  //   slug: "web3",
  //   imageSrc:
  //     "https://images.unsplash.com/photo-1644215529308-7877e68eb0b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
  //   imageAlt: "UX topic",
  // },
];

export const accountLocations = [
  {
    "Name": "Afghanistan",
    "Code": "AF"
  },
  {
    "Name": "Åland Islands",
    "Code": "AX"
  },
  {
    "Name": "Albania",
    "Code": "AL"
  },
  {
    "Name": "Algeria",
    "Code": "DZ"
  },
  {
    "Name": "American Samoa",
    "Code": "AS"
  },
  {
    "Name": "Andorra",
    "Code": "AD"
  },
  {
    "Name": "Angola",
    "Code": "AO"
  },
  {
    "Name": "Anguilla",
    "Code": "AI"
  },
  {
    "Name": "Antarctica",
    "Code": "AQ"
  },
  {
    "Name": "Antigua and Barbuda",
    "Code": "AG"
  },
  {
    "Name": "Argentina",
    "Code": "AR"
  },
  {
    "Name": "Armenia",
    "Code": "AM"
  },
  {
    "Name": "Aruba",
    "Code": "AW"
  },
  {
    "Name": "Australia",
    "Code": "AU"
  },
  {
    "Name": "Austria",
    "Code": "AT"
  },
  {
    "Name": "Azerbaijan",
    "Code": "AZ"
  },
  {
    "Name": "Bahamas",
    "Code": "BS"
  },
  {
    "Name": "Bahrain",
    "Code": "BH"
  },
  {
    "Name": "Bangladesh",
    "Code": "BD"
  },
  {
    "Name": "Barbados",
    "Code": "BB"
  },
  {
    "Name": "Belarus",
    "Code": "BY"
  },
  {
    "Name": "Belgium",
    "Code": "BE"
  },
  {
    "Name": "Belize",
    "Code": "BZ"
  },
  {
    "Name": "Benin",
    "Code": "BJ"
  },
  {
    "Name": "Bermuda",
    "Code": "BM"
  },
  {
    "Name": "Bhutan",
    "Code": "BT"
  },
  {
    "Name": "Bolivia, Plurinational State of",
    "Code": "BO"
  },
  {
    "Name": "Bonaire, Sint Eustatius and Saba",
    "Code": "BQ"
  },
  {
    "Name": "Bosnia and Herzegovina",
    "Code": "BA"
  },
  {
    "Name": "Botswana",
    "Code": "BW"
  },
  {
    "Name": "Bouvet Island",
    "Code": "BV"
  },
  {
    "Name": "Brazil",
    "Code": "BR"
  },
  {
    "Name": "British Indian Ocean Territory",
    "Code": "IO"
  },
  {
    "Name": "Brunei Darussalam",
    "Code": "BN"
  },
  {
    "Name": "Bulgaria",
    "Code": "BG"
  },
  {
    "Name": "Burkina Faso",
    "Code": "BF"
  },
  {
    "Name": "Burundi",
    "Code": "BI"
  },
  {
    "Name": "Cambodia",
    "Code": "KH"
  },
  {
    "Name": "Cameroon",
    "Code": "CM"
  },
  {
    "Name": "Canada",
    "Code": "CA"
  },
  {
    "Name": "Cape Verde",
    "Code": "CV"
  },
  {
    "Name": "Cayman Islands",
    "Code": "KY"
  },
  {
    "Name": "Central African Republic",
    "Code": "CF"
  },
  {
    "Name": "Chad",
    "Code": "TD"
  },
  {
    "Name": "Chile",
    "Code": "CL"
  },
  {
    "Name": "China",
    "Code": "CN"
  },
  {
    "Name": "Christmas Island",
    "Code": "CX"
  },
  {
    "Name": "Cocos (Keeling) Islands",
    "Code": "CC"
  },
  {
    "Name": "Colombia",
    "Code": "CO"
  },
  {
    "Name": "Comoros",
    "Code": "KM"
  },
  {
    "Name": "Congo",
    "Code": "CG"
  },
  {
    "Name": "Congo, the Democratic Republic of the",
    "Code": "CD"
  },
  {
    "Name": "Cook Islands",
    "Code": "CK"
  },
  {
    "Name": "Costa Rica",
    "Code": "CR"
  },
  {
    "Name": "Côte d'Ivoire",
    "Code": "CI"
  },
  {
    "Name": "Croatia",
    "Code": "HR"
  },
  {
    "Name": "Cuba",
    "Code": "CU"
  },
  {
    "Name": "CuraÃ§ao",
    "Code": "CW"
  },
  {
    "Name": "Cyprus",
    "Code": "CY"
  },
  {
    "Name": "Czech Republic",
    "Code": "CZ"
  },
  {
    "Name": "Denmark",
    "Code": "DK"
  },
  {
    "Name": "Djibouti",
    "Code": "DJ"
  },
  {
    "Name": "Dominica",
    "Code": "DM"
  },
  {
    "Name": "Dominican Republic",
    "Code": "DO"
  },
  {
    "Name": "Ecuador",
    "Code": "EC"
  },
  {
    "Name": "Egypt",
    "Code": "EG"
  },
  {
    "Name": "El Salvador",
    "Code": "SV"
  },
  {
    "Name": "Equatorial Guinea",
    "Code": "GQ"
  },
  {
    "Name": "Eritrea",
    "Code": "ER"
  },
  {
    "Name": "Estonia",
    "Code": "EE"
  },
  {
    "Name": "Ethiopia",
    "Code": "ET"
  },
  {
    "Name": "Falkland Islands (Malvinas)",
    "Code": "FK"
  },
  {
    "Name": "Faroe Islands",
    "Code": "FO"
  },
  {
    "Name": "Fiji",
    "Code": "FJ"
  },
  {
    "Name": "Finland",
    "Code": "FI"
  },
  {
    "Name": "France",
    "Code": "FR"
  },
  {
    "Name": "French Guiana",
    "Code": "GF"
  },
  {
    "Name": "French Polynesia",
    "Code": "PF"
  },
  {
    "Name": "French Southern Territories",
    "Code": "TF"
  },
  {
    "Name": "Gabon",
    "Code": "GA"
  },
  {
    "Name": "Gambia",
    "Code": "GM"
  },
  {
    "Name": "Georgia",
    "Code": "GE"
  },
  {
    "Name": "Germany",
    "Code": "DE"
  },
  {
    "Name": "Ghana",
    "Code": "GH"
  },
  {
    "Name": "Gibraltar",
    "Code": "GI"
  },
  {
    "Name": "Greece",
    "Code": "GR"
  },
  {
    "Name": "Greenland",
    "Code": "GL"
  },
  {
    "Name": "Grenada",
    "Code": "GD"
  },
  {
    "Name": "Guadeloupe",
    "Code": "GP"
  },
  {
    "Name": "Guam",
    "Code": "GU"
  },
  {
    "Name": "Guatemala",
    "Code": "GT"
  },
  {
    "Name": "Guernsey",
    "Code": "GG"
  },
  {
    "Name": "Guinea",
    "Code": "GN"
  },
  {
    "Name": "Guinea-Bissau",
    "Code": "GW"
  },
  {
    "Name": "Guyana",
    "Code": "GY"
  },
  {
    "Name": "Haiti",
    "Code": "HT"
  },
  {
    "Name": "Heard Island and McDonald Islands",
    "Code": "HM"
  },
  {
    "Name": "Holy See (Vatican City State)",
    "Code": "VA"
  },
  {
    "Name": "Honduras",
    "Code": "HN"
  },
  {
    "Name": "Hong Kong",
    "Code": "HK"
  },
  {
    "Name": "Hungary",
    "Code": "HU"
  },
  {
    "Name": "Iceland",
    "Code": "IS"
  },
  {
    "Name": "India",
    "Code": "IN"
  },
  {
    "Name": "Indonesia",
    "Code": "ID"
  },
  {
    "Name": "Iran, Islamic Republic of",
    "Code": "IR"
  },
  {
    "Name": "Iraq",
    "Code": "IQ"
  },
  {
    "Name": "Ireland",
    "Code": "IE"
  },
  {
    "Name": "Isle of Man",
    "Code": "IM"
  },
  {
    "Name": "Israel",
    "Code": "IL"
  },
  {
    "Name": "Italy",
    "Code": "IT"
  },
  {
    "Name": "Jamaica",
    "Code": "JM"
  },
  {
    "Name": "Japan",
    "Code": "JP"
  },
  {
    "Name": "Jersey",
    "Code": "JE"
  },
  {
    "Name": "Jordan",
    "Code": "JO"
  },
  {
    "Name": "Kazakhstan",
    "Code": "KZ"
  },
  {
    "Name": "Kenya",
    "Code": "KE"
  },
  {
    "Name": "Kiribati",
    "Code": "KI"
  },
  {
    "Name": "Korea, Democratic People's Republic of",
    "Code": "KP"
  },
  {
    "Name": "Korea, Republic of",
    "Code": "KR"
  },
  {
    "Name": "Kuwait",
    "Code": "KW"
  },
  {
    "Name": "Kyrgyzstan",
    "Code": "KG"
  },
  {
    "Name": "Lao People's Democratic Republic",
    "Code": "LA"
  },
  {
    "Name": "Latvia",
    "Code": "LV"
  },
  {
    "Name": "Lebanon",
    "Code": "LB"
  },
  {
    "Name": "Lesotho",
    "Code": "LS"
  },
  {
    "Name": "Liberia",
    "Code": "LR"
  },
  {
    "Name": "Libya",
    "Code": "LY"
  },
  {
    "Name": "Liechtenstein",
    "Code": "LI"
  },
  {
    "Name": "Lithuania",
    "Code": "LT"
  },
  {
    "Name": "Luxembourg",
    "Code": "LU"
  },
  {
    "Name": "Macao",
    "Code": "MO"
  },
  {
    "Name": "Macedonia, the Former Yugoslav Republic of",
    "Code": "MK"
  },
  {
    "Name": "Madagascar",
    "Code": "MG"
  },
  {
    "Name": "Malawi",
    "Code": "MW"
  },
  {
    "Name": "Malaysia",
    "Code": "MY"
  },
  {
    "Name": "Maldives",
    "Code": "MV"
  },
  {
    "Name": "Mali",
    "Code": "ML"
  },
  {
    "Name": "Malta",
    "Code": "MT"
  },
  {
    "Name": "Marshall Islands",
    "Code": "MH"
  },
  {
    "Name": "Martinique",
    "Code": "MQ"
  },
  {
    "Name": "Mauritania",
    "Code": "MR"
  },
  {
    "Name": "Mauritius",
    "Code": "MU"
  },
  {
    "Name": "Mayotte",
    "Code": "YT"
  },
  {
    "Name": "Mexico",
    "Code": "MX"
  },
  {
    "Name": "Micronesia, Federated States of",
    "Code": "FM"
  },
  {
    "Name": "Moldova, Republic of",
    "Code": "MD"
  },
  {
    "Name": "Monaco",
    "Code": "MC"
  },
  {
    "Name": "Mongolia",
    "Code": "MN"
  },
  {
    "Name": "Montenegro",
    "Code": "ME"
  },
  {
    "Name": "Montserrat",
    "Code": "MS"
  },
  {
    "Name": "Morocco",
    "Code": "MA"
  },
  {
    "Name": "Mozambique",
    "Code": "MZ"
  },
  {
    "Name": "Myanmar",
    "Code": "MM"
  },
  {
    "Name": "Namibia",
    "Code": "NA"
  },
  {
    "Name": "Nauru",
    "Code": "NR"
  },
  {
    "Name": "Nepal",
    "Code": "NP"
  },
  {
    "Name": "Netherlands",
    "Code": "NL"
  },
  {
    "Name": "New Caledonia",
    "Code": "NC"
  },
  {
    "Name": "New Zealand",
    "Code": "NZ"
  },
  {
    "Name": "Nicaragua",
    "Code": "NI"
  },
  {
    "Name": "Niger",
    "Code": "NE"
  },
  {
    "Name": "Nigeria",
    "Code": "NG"
  },
  {
    "Name": "Niue",
    "Code": "NU"
  },
  {
    "Name": "Norfolk Island",
    "Code": "NF"
  },
  {
    "Name": "Northern Mariana Islands",
    "Code": "MP"
  },
  {
    "Name": "Norway",
    "Code": "NO"
  },
  {
    "Name": "Oman",
    "Code": "OM"
  },
  {
    "Name": "Pakistan",
    "Code": "PK"
  },
  {
    "Name": "Palau",
    "Code": "PW"
  },
  {
    "Name": "Palestine, State of",
    "Code": "PS"
  },
  {
    "Name": "Panama",
    "Code": "PA"
  },
  {
    "Name": "Papua New Guinea",
    "Code": "PG"
  },
  {
    "Name": "Paraguay",
    "Code": "PY"
  },
  {
    "Name": "Peru",
    "Code": "PE"
  },
  {
    "Name": "Philippines",
    "Code": "PH"
  },
  {
    "Name": "Pitcairn",
    "Code": "PN"
  },
  {
    "Name": "Poland",
    "Code": "PL"
  },
  {
    "Name": "Portugal",
    "Code": "PT"
  },
  {
    "Name": "Puerto Rico",
    "Code": "PR"
  },
  {
    "Name": "Qatar",
    "Code": "QA"
  },
  {
    "Name": "Réunion",
    "Code": "RE"
  },
  {
    "Name": "Romania",
    "Code": "RO"
  },
  {
    "Name": "Russian Federation",
    "Code": "RU"
  },
  {
    "Name": "Rwanda",
    "Code": "RW"
  },
  {
    "Name": "Saint Barthélemy",
    "Code": "BL"
  },
  {
    "Name": "Saint Helena, Ascension and Tristan da Cunha",
    "Code": "SH"
  },
  {
    "Name": "Saint Kitts and Nevis",
    "Code": "KN"
  },
  {
    "Name": "Saint Lucia",
    "Code": "LC"
  },
  {
    "Name": "Saint Martin (French part)",
    "Code": "MF"
  },
  {
    "Name": "Saint Pierre and Miquelon",
    "Code": "PM"
  },
  {
    "Name": "Saint Vincent and the Grenadines",
    "Code": "VC"
  },
  {
    "Name": "Samoa",
    "Code": "WS"
  },
  {
    "Name": "San Marino",
    "Code": "SM"
  },
  {
    "Name": "Sao Tome and Principe",
    "Code": "ST"
  },
  {
    "Name": "Saudi Arabia",
    "Code": "SA"
  },
  {
    "Name": "Senegal",
    "Code": "SN"
  },
  {
    "Name": "Serbia",
    "Code": "RS"
  },
  {
    "Name": "Seychelles",
    "Code": "SC"
  },
  {
    "Name": "Sierra Leone",
    "Code": "SL"
  },
  {
    "Name": "Singapore",
    "Code": "SG"
  },
  {
    "Name": "Sint Maarten (Dutch part)",
    "Code": "SX"
  },
  {
    "Name": "Slovakia",
    "Code": "SK"
  },
  {
    "Name": "Slovenia",
    "Code": "SI"
  },
  {
    "Name": "Solomon Islands",
    "Code": "SB"
  },
  {
    "Name": "Somalia",
    "Code": "SO"
  },
  {
    "Name": "South Africa",
    "Code": "ZA"
  },
  {
    "Name": "South Georgia and the South Sandwich Islands",
    "Code": "GS"
  },
  {
    "Name": "South Sudan",
    "Code": "SS"
  },
  {
    "Name": "Spain",
    "Code": "ES"
  },
  {
    "Name": "Sri Lanka",
    "Code": "LK"
  },
  {
    "Name": "Sudan",
    "Code": "SD"
  },
  {
    "Name": "Suriname",
    "Code": "SR"
  },
  {
    "Name": "Svalbard and Jan Mayen",
    "Code": "SJ"
  },
  {
    "Name": "Swaziland",
    "Code": "SZ"
  },
  {
    "Name": "Sweden",
    "Code": "SE"
  },
  {
    "Name": "Switzerland",
    "Code": "CH"
  },
  {
    "Name": "Syrian Arab Republic",
    "Code": "SY"
  },
  {
    "Name": "Taiwan, Province of China",
    "Code": "TW"
  },
  {
    "Name": "Tajikistan",
    "Code": "TJ"
  },
  {
    "Name": "Tanzania, United Republic of",
    "Code": "TZ"
  },
  {
    "Name": "Thailand",
    "Code": "TH"
  },
  {
    "Name": "Timor-Leste",
    "Code": "TL"
  },
  {
    "Name": "Togo",
    "Code": "TG"
  },
  {
    "Name": "Tokelau",
    "Code": "TK"
  },
  {
    "Name": "Tonga",
    "Code": "TO"
  },
  {
    "Name": "Trinidad and Tobago",
    "Code": "TT"
  },
  {
    "Name": "Tunisia",
    "Code": "TN"
  },
  {
    "Name": "Turkey",
    "Code": "TR"
  },
  {
    "Name": "Turkmenistan",
    "Code": "TM"
  },
  {
    "Name": "Turks and Caicos Islands",
    "Code": "TC"
  },
  {
    "Name": "Tuvalu",
    "Code": "TV"
  },
  {
    "Name": "Uganda",
    "Code": "UG"
  },
  {
    "Name": "Ukraine",
    "Code": "UA"
  },
  {
    "Name": "United Arab Emirates",
    "Code": "AE"
  },
  {
    "Name": "United Kingdom",
    "Code": "GB"
  },
  {
    "Name": "United States",
    "Code": "US"
  },
  {
    "Name": "United States Minor Outlying Islands",
    "Code": "UM"
  },
  {
    "Name": "Uruguay",
    "Code": "UY"
  },
  {
    "Name": "Uzbekistan",
    "Code": "UZ"
  },
  {
    "Name": "Vanuatu",
    "Code": "VU"
  },
  {
    "Name": "Venezuela, Bolivarian Republic of",
    "Code": "VE"
  },
  {
    "Name": "Viet Nam",
    "Code": "VN"
  },
  {
    "Name": "Virgin Islands, British",
    "Code": "VG"
  },
  {
    "Name": "Virgin Islands, U.S.",
    "Code": "VI"
  },
  {
    "Name": "Wallis and Futuna",
    "Code": "WF"
  },
  {
    "Name": "Western Sahara",
    "Code": "EH"
  },
  {
    "Name": "Yemen",
    "Code": "YE"
  },
  {
    "Name": "Zambia",
    "Code": "ZM"
  },
  {
    "Name": "Zimbabwe",
    "Code": "ZW"
  }
 ];

 export const TAB_ITEMS = [
  {
    slug: "ai",
    toolSlug:'ai',
    name: "topicSpotlight.tabs.ai",
    icon:<Robot size={ICON_SIZE}/>,
    tagline:'The bots are here!'
  },
  {
    slug: "accessibility",
    toolSlug:'accessibility',
    name: "topicSpotlight.tabs.accessibility",
    icon:<Wheelchair size={ICON_SIZE} />,
    tagline:'Design inclusively'
  },

  {
    slug: "branding",
    toolSlug:'color',
    name: "topicSpotlight.tabs.branding",
    icon:<Swatches size={ICON_SIZE} />,
    tagline:'Tell your story'
  },
  {
    slug: "design-psychology",
    toolSlug:'analytics',
    name: "topicSpotlight.tabs.psychology",
    icon:<HandEye size={ICON_SIZE} />,
    tagline:`Analyze your user`
  },
  {
    slug: "product-design",
    toolSlug:'resource',
    name: "topicSpotlight.tabs.productDesign",
    icon:<FlowArrow weight="duotone" size={ICON_SIZE} />,
    tagline:'Kick it off'
  },
  // {
  //   slug: "ux",
  //   name: "topicSpotlight.tabs.userWriting",
  // },
];
 export const TOPICS_PAGE = [
  {
    slug: "accessibility",
    toolSlug:'accessibility',
    name: "topicSpotlight.tabs.accessibility",
    icon:<Wheelchair size={ICON_SIZE} />,
    tagline:'Design inclusively'
  },
  {
    slug: "ai",
    toolSlug:'ai',
    name: "topicSpotlight.tabs.ai",
    icon:<Robot size={ICON_SIZE}/>,
    tagline:'The bots are here!'
  },
  {
    slug: "branding",
    toolSlug:'color',
    name: "topicSpotlight.tabs.branding",
    icon:<Swatches size={ICON_SIZE} />,
    tagline:'Tell your story'
  },
  {
    slug: "design-psychology",
    toolSlug:'analytics',
    name: "topicSpotlight.tabs.psychology",
    icon:<HandEye size={ICON_SIZE} />,
    tagline:`Analyze your user`
  },
  {
    slug: "open-source",
    toolSlug:'open-source',
    name: "topicSpotlight.tabs.openSource",
    icon:<GitBranch size={ICON_SIZE} />,
    tagline:`Analyze your user`
  },
  {
    slug: "product-design",
    toolSlug:'resource',
    name: "topicSpotlight.tabs.productDesign",
    icon:<FlowArrow weight="duotone" size={ICON_SIZE} />,
    tagline:'Kick it off'
  },
  {
    slug: "ux",
    name: "topicSpotlight.tabs.ux",
    icon:<FlowArrow weight="duotone" size={BoundingBox} />
  },
];


export const ProductListData = [
  {
    title: "Obsidian Canvas",
    slug:'obsidian-canvas',
    description: "Easily visualize and make sense of your ideas",
    image:
      "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/11e11ee480da2a5ff39551e333f0a6ec.jpg?updated_at=2023-01-05T22%3A07%3A03.315Z%3Fw%3D256&q=75&format=webp&compress=true&dpr=2&w=70",
  },
  {
    title: "Bloom Objects",
    slug:'bloom-objects',
    description: "Abstract 3D illustrations",
    image:
      "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/9c94a6d7a9d541dfe7a188e0c767aa7d.jpg?updated_at=2023-01-05T16%3A00%3A22.365Z%3Fw%3D256&q=75&format=webp&compress=true&dpr=2&w=70",
  },
  {
    title: "Microsoft Bing Image Creator",
    slug:'microsoft-bing-image-creator',
    description: "Generate AI images with DALL-E",
    image:
      "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/c41fbc86e63824c71c1d5eeb691a46b6.png?w=256&q=75&format=webp&compress=true&dpr=2",
  },
  {
    title: "Stark",
    description: "Build products that are accessible, ethical, and inclusive.",
    slug:'stark',
    image:
      "https://wp.prototypr.io/wp-content/uploads/2021/01/www_prototypr_io_HcsoZ-150x150.?w=256&q=75&format=auto&compress=true&dpr=2",
  },
  {
    title: "The Design System Encyclopedia",
    slug:'the-design-system-encyclopedia',
    description:
      "The Design Encyclopedia is a vast collection of meticulously documented design tokens, components, page layouts, interaction patterns, and visualizations.",
    image:
      "https://wp.prototypr.io/wp-content/uploads/2020/09/Frame-1-33-150x150.png?w=256&q=75&format=auto&compress=true&dpr=2",
  },
];

export const ProductListData2 = [
  {
    title: "Feenancy 3D Icons",
    description: "Customizable Fintech 3D Icons",
    slug:'feenancy-3d-icons',
    image:
      "https://wp.prototypr.io/wp-content/uploads/2021/01/556129ef-c783-40c0-b1e1-f4adfbef4a70-150x150.gif?w=256&q=75&format=auto&compress=true&dpr=2",
  },
  {
    title: "Toy Faces 3D",
    description: "Fun diverse library of 3D avatars",
    slug:'toy-faces-3d-avatar-library',
    image:
      "https://wp.prototypr.io/wp-content/uploads/2021/01/static1_squarespace_com_ueDe0-150x150.?w=256&q=75&format=auto&compress=true&dpr=2",
  },
  {
    title: "Maze Templates",
    slug:'maze-templates',
    description: "Go from idea to action with Templates",
    image:
      "https://prototypr-media.sfo2.digitaloceanspaces.com/wp-content/uploads/2021/06/Screenshot-2021-06-21-at-21.44.33.png?w=256&q=75&format=webp&compress=true&dpr=2",
  },
  {
    title: "Cabana 4",
    slug:'cabana-4',
    description: "Latest Design System for Sketch",
    image:
      "https://wp.prototypr.io/wp-content/uploads/2020/11/3348b430-1d8b-48a7-94fc-24840be0863e.jpeg?w=256&q=75&format=auto&compress=true&dpr=2",
  },
  {
    title: "Magicul",
    description: "Design file converter.",
    slug:'magicul-convert-any-ui-ux-design-file',
    image:
      "https://prototypr-media.sfo2.digitaloceanspaces.com/wp-content/uploads/2021/06/Screenshot-2021-06-29-at-12.25.34.png?w=256&q=75&format=webp&compress=true&dpr=2",
  },
];