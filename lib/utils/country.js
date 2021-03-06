const COUNTRIES = [
  { name: 'Afghanistan', code: 'AF', otherNames: [] },
  { name: 'Albania', code: 'AL', otherNames: [] },
  { name: 'Algeria', code: 'DZ', otherNames: [] },
  { name: 'Andorra', code: 'AD', otherNames: [] },
  { name: 'Angola', code: 'AO', otherNames: [] },
  { name: 'Argentina', code: 'AR', otherNames: [] },
  { name: 'Armenia', code: 'AM', otherNames: [] },
  { name: 'Australia', code: 'AU', otherNames: [] },
  { name: 'Austria', code: 'AT', otherNames: [] },
  { name: 'Azerbaijan', code: 'AZ', otherNames: [] },
  { name: 'Bahrain', code: 'BH', otherNames: [] },
  { name: 'Bangladesh', code: 'BD', otherNames: [] },
  { name: 'Belarus', code: 'BY', otherNames: [] },
  { name: 'Belgium', code: 'BE', otherNames: [] },
  { name: 'Belize', code: 'BZ', otherNames: [] },
  { name: 'Benin', code: 'BJ', otherNames: [] },
  { name: 'Bermuda', code: 'BM', otherNames: [] },
  { name: 'Bhutan', code: 'BT', otherNames: [] },
  { name: 'Bolivia, Plurinational State of', code: 'BO', otherNames: ['Bolivia'] },
  { name: 'Bosnia and Herzegovina', code: 'BA', otherNames: [] },
  { name: 'Botswana', code: 'BW', otherNames: [] },
  { name: 'Brazil', code: 'BR', otherNames: [] },
  { name: 'Brunei Darussalam', code: 'BN', otherNames: ['Brunei'] },
  { name: 'Bulgaria', code: 'BG', otherNames: [] },
  { name: 'Burkina Faso', code: 'BF', otherNames: [] },
  { name: 'Burundi', code: 'BI', otherNames: [] },
  { name: 'Cambodia', code: 'KH', otherNames: [] },
  { name: 'Cameroon', code: 'CM', otherNames: [] },
  { name: 'Canada', code: 'CA', otherNames: [] },
  { name: 'Cape Verde', code: 'CV', otherNames: ['Cabo Verde'] },
  { name: 'Cayman Islands', code: 'KY', otherNames: [] },
  { name: 'Central African Republic', code: 'CF', otherNames: [] },
  { name: 'Chad', code: 'TD', otherNames: [] },
  { name: 'Chile', code: 'CL', otherNames: [] },
  { name: 'China', code: 'CN', otherNames: ['Mainland China'] },
  { name: 'Colombia', code: 'CO', otherNames: [] },
  { name: 'Congo', code: 'CG', otherNames: ['Republic of the Congo', 'Congo (Brazzaville)'] },
  { name: 'Congo, the Democratic Republic of the', code: 'CD', otherNames: ['Congo (Kinshasa)'] },
  { name: 'Costa Rica', code: 'CR', otherNames: [] },
  { name: 'Côte d\'Ivoire', code: 'CI', otherNames: ['Cote d\'Ivoire', 'Ivory Coast'] },
  { name: 'Croatia', code: 'HR', otherNames: [] },
  { name: 'Cuba', code: 'CU', otherNames: [] },
  { name: 'Curaçao', code: 'CW', otherNames: ['Curacao'] },
  { name: 'Cyprus', code: 'CY', otherNames: [] },
  { name: 'Czech Republic', code: 'CZ', otherNames: [] },
  { name: 'Denmark', code: 'DK', otherNames: [] },
  { name: 'Djibouti', code: 'DJ', otherNames: [] },
  { name: 'Dominica', code: 'DM', otherNames: [] },
  { name: 'Dominican Republic', code: 'DO', otherNames: [] },
  { name: 'Ecuador', code: 'EC', otherNames: [] },
  { name: 'Egypt', code: 'EG', otherNames: [] },
  { name: 'El Salvador', code: 'SV', otherNames: [] },
  { name: 'Equatorial Guinea', code: 'GQ', otherNames: [] },
  { name: 'Eritrea', code: 'ER', otherNames: [] },
  { name: 'Estonia', code: 'EE', otherNames: [] },
  { name: 'Ethiopia', code: 'ET', otherNames: [] },
  { name: 'Falkland Islands (Malvinas)', code: 'FK', otherNames: [] },
  { name: 'Faroe Islands', code: 'FO', otherNames: [] },
  { name: 'Fiji', code: 'FJ', otherNames: [] },
  { name: 'Finland', code: 'FI', otherNames: [] },
  { name: 'France', code: 'FR', otherNames: [] },
  { name: 'French Guiana', code: 'GF', otherNames: [] },
  { name: 'French Polynesia', code: 'PF', otherNames: [] },
  { name: 'Gabon', code: 'GA', otherNames: [] },
  { name: 'Gambia', code: 'GM', otherNames: ['The Gambia', 'Gambia, The'] },
  { name: 'Georgia', code: 'GE', otherNames: [] },
  { name: 'Germany', code: 'DE', otherNames: [] },
  { name: 'Ghana', code: 'GH', otherNames: [] },
  { name: 'Gibraltar', code: 'GI', otherNames: [] },
  { name: 'Greece', code: 'GR', otherNames: [] },
  { name: 'Greenland', code: 'GL', otherNames: [] },
  { name: 'Grenada', code: 'GD', otherNames: [] },
  { name: 'Guadeloupe', code: 'GP', otherNames: [] },
  { name: 'Guam', code: 'GU', otherNames: [] },
  { name: 'Guatemala', code: 'GT', otherNames: [] },
  { name: 'Guernsey', code: 'GG', otherNames: [] },
  { name: 'Guinea', code: 'GN', otherNames: [] },
  { name: 'Guinea-Bissau', code: 'GW', otherNames: [] },
  { name: 'Guyana', code: 'GY', otherNames: [] },
  { name: 'Haiti', code: 'HT', otherNames: [] },
  { name: 'Holy See (Vatican City State)', code: 'VA', otherNames: ['Holy See', 'Vatican City'] },
  { name: 'Honduras', code: 'HN', otherNames: [] },
  { name: 'Hong Kong', code: 'HK', otherNames: ['Hong Kong SAR'] },
  { name: 'Hungary', code: 'HU', otherNames: [] },
  { name: 'Iceland', code: 'IS', otherNames: [] },
  { name: 'India', code: 'IN', otherNames: [] },
  { name: 'Indonesia', code: 'ID', otherNames: [] },
  { name: 'Iran, Islamic Republic of', code: 'IR', otherNames: ['Iran', 'Iran (Islamic Republic of)'] },
  { name: 'Iraq', code: 'IQ', otherNames: [] },
  { name: 'Ireland', code: 'IE', otherNames: ['Republic of Ireland'] },
  { name: 'Isle of Man', code: 'IM', otherNames: [] },
  { name: 'Israel', code: 'IL', otherNames: [] },
  { name: 'Italy', code: 'IT', otherNames: [] },
  { name: 'Jamaica', code: 'JM', otherNames: [] },
  { name: 'Japan', code: 'JP', otherNames: [] },
  { name: 'Jersey', code: 'JE', otherNames: [] },
  { name: 'Jordan', code: 'JO', otherNames: [] },
  { name: 'Kazakhstan', code: 'KZ', otherNames: [] },
  { name: 'Kenya', code: 'KE', otherNames: [] },
  { name: 'Kiribati', code: 'KI', otherNames: [] },
  { name: 'Korea, Democratic People\'s Republic of', code: 'KP', otherNames: [] },
  { name: 'Korea, Republic of', code: 'KR', otherNames: ['South Korea', 'Republic of Korea', 'Korea, South'] },
  { name: 'Kuwait', code: 'KW', otherNames: [] },
  { name: 'Kyrgyzstan', code: 'KG', otherNames: [] },
  { name: 'Lao People\'s Democratic Republic', code: 'LA', otherNames: [] },
  { name: 'Latvia', code: 'LV', otherNames: [] },
  { name: 'Lebanon', code: 'LB', otherNames: [] },
  { name: 'Lesotho', code: 'LS', otherNames: [] },
  { name: 'Liberia', code: 'LR', otherNames: [] },
  { name: 'Libya', code: 'LY', otherNames: [] },
  { name: 'Liechtenstein', code: 'LI', otherNames: [] },
  { name: 'Lithuania', code: 'LT', otherNames: [] },
  { name: 'Luxembourg', code: 'LU', otherNames: [] },
  { name: 'Macao', code: 'MO', otherNames: ['Macau', 'Macao SAR'] },
  { name: 'Macedonia, the Former Yugoslav Republic of', code: 'MK', otherNames: ['North Macedonia'] },
  { name: 'Madagascar', code: 'MG', otherNames: [] },
  { name: 'Malawi', code: 'MW', otherNames: [] },
  { name: 'Malaysia', code: 'MY', otherNames: [] },
  { name: 'Maldives', code: 'MV', otherNames: [] },
  { name: 'Mali', code: 'ML', otherNames: [] },
  { name: 'Malta', code: 'MT', otherNames: [] },
  { name: 'Martinique', code: 'MQ', otherNames: [] },
  { name: 'Mauritania', code: 'MR', otherNames: [] },
  { name: 'Mauritius', code: 'MU', otherNames: [] },
  { name: 'Mexico', code: 'MX', otherNames: [] },
  { name: 'Micronesia, Federated States of', code: 'FM', otherNames: [] },
  { name: 'Moldova, Republic of', code: 'MD', otherNames: ['Moldova', 'Republic of Moldova'] },
  { name: 'Monaco', code: 'MC', otherNames: [] },
  { name: 'Mongolia', code: 'MN', otherNames: [] },
  { name: 'Montenegro', code: 'ME', otherNames: [] },
  { name: 'Morocco', code: 'MA', otherNames: [] },
  { name: 'Mozambique', code: 'MZ', otherNames: [] },
  { name: 'Myanmar', code: 'MM', otherNames: [] },
  { name: 'Namibia', code: 'NA', otherNames: [] },
  { name: 'Nepal', code: 'NP', otherNames: [] },
  { name: 'Netherlands', code: 'NL', otherNames: [] },
  { name: 'New Zealand', code: 'NZ', otherNames: [] },
  { name: 'Nicaragua', code: 'NI', otherNames: [] },
  { name: 'Niger', code: 'NE', otherNames: [] },
  { name: 'Nigeria', code: 'NG', otherNames: [] },
  { name: 'North Ireland', code: 'ND', otherNames: [] },
  { name: 'Norway', code: 'NO', otherNames: [] },
  { name: 'Oman', code: 'OM', otherNames: [] },
  { name: 'Pakistan', code: 'PK', otherNames: [] },
  { name: 'Palau', code: 'PW', otherNames: [] },
  { name: 'Palestine, State of', code: 'PS', otherNames: ['Palestine', 'occupied Palestinian territory'] },
  { name: 'Panama', code: 'PA', otherNames: [] },
  { name: 'Papua New Guinea', code: 'PG', otherNames: [] },
  { name: 'Paraguay', code: 'PY', otherNames: [] },
  { name: 'Peru', code: 'PE', otherNames: [] },
  { name: 'Philippines', code: 'PH', otherNames: [] },
  { name: 'Poland', code: 'PL', otherNames: [] },
  { name: 'Portugal', code: 'PT', otherNames: [] },
  { name: 'Puerto Rico', code: 'PR', otherNames: [] },
  { name: 'Qatar', code: 'QA', otherNames: [] },
  { name: 'Romania', code: 'RO', otherNames: [] },
  { name: 'Russian Federation', code: 'RU', otherNames: ['Russia'] },
  { name: 'Rwanda', code: 'RW', otherNames: [] },
  { name: 'Samoa', code: 'WS', otherNames: [] },
  { name: 'San Marino', code: 'SM', otherNames: [] },
  { name: 'Sao Tome and Principe', code: 'ST', otherNames: [] },
  { name: 'Saudi Arabia', code: 'SA', otherNames: [] },
  { name: 'Senegal', code: 'SN', otherNames: [] },
  { name: 'Serbia', code: 'RS', otherNames: [] },
  { name: 'Seychelles', code: 'SC', otherNames: [] },
  { name: 'Sierra Leone', code: 'SL', otherNames: [] },
  { name: 'Singapore', code: 'SG', otherNames: [] },
  { name: 'Slovakia', code: 'SK', otherNames: [] },
  { name: 'Slovenia', code: 'SI', otherNames: [] },
  { name: 'Solomon Islands', code: 'SB', otherNames: [] },
  { name: 'Somalia', code: 'SO', otherNames: [] },
  { name: 'South Africa', code: 'ZA', otherNames: [] },
  { name: 'South Sudan', code: 'SS', otherNames: [] },
  { name: 'Spain', code: 'ES', otherNames: [] },
  { name: 'Sri Lanka', code: 'LK', otherNames: [] },
  { name: 'Sudan', code: 'SD', otherNames: [] },
  { name: 'Suriname', code: 'SR', otherNames: [] },
  { name: 'Swaziland', code: 'SZ', otherNames: ['Eswatini'] },
  { name: 'Sweden', code: 'SE', otherNames: [] },
  { name: 'Switzerland', code: 'CH', otherNames: [] },
  { name: 'Syrian Arab Republic', code: 'SY', otherNames: [] },
  { name: 'Taiwan, Province of China', code: 'TW', otherNames: ['Taiwan', 'Taipei and environs', 'Taiwan*'] },
  { name: 'Tajikistan', code: 'TJ', otherNames: [] },
  { name: 'Tanzania, United Republic of', code: 'TZ', otherNames: ['Tanzania'] },
  { name: 'Thailand', code: 'TH', otherNames: [] },
  { name: 'Timor-Leste', code: 'TL', otherNames: ['East Timor'] },
  { name: 'Togo', code: 'TG', otherNames: [] },
  { name: 'Tonga', code: 'TO', otherNames: [] },
  { name: 'Trinidad and Tobago', code: 'TT', otherNames: [] },
  { name: 'Tunisia', code: 'TN', otherNames: [] },
  { name: 'Turkey', code: 'TR', otherNames: [] },
  { name: 'Turkmenistan', code: 'TM', otherNames: [] },
  { name: 'Tuvalu', code: 'TV', otherNames: [] },
  { name: 'Uganda', code: 'UG', otherNames: [] },
  { name: 'Ukraine', code: 'UA', otherNames: [] },
  { name: 'United Arab Emirates', code: 'AE', otherNames: [] },
  { name: 'United Kingdom', code: 'GB', otherNames: ['UK', 'Channel Islands'] },
  { name: 'United States', code: 'US', otherNames: ['US'] },
  { name: 'Uruguay', code: 'UY', otherNames: [] },
  { name: 'Uzbekistan', code: 'UZ', otherNames: [] },
  { name: 'Vanuatu', code: 'VU', otherNames: [] },
  { name: 'Venezuela, Bolivarian Republic of', code: 'VE', otherNames: ['Venezuela'] },
  { name: 'Viet Nam', code: 'VN', otherNames: ['Vietnam'] },
  { name: 'Yemen', code: 'YE', otherNames: [] },
  { name: 'Zambia', code: 'ZM', otherNames: [] },
  { name: 'Zimbabwe', code: 'ZW', otherNames: [] }
]

const getNameByCode = code => {
  const country = COUNTRIES.find(item => item.code === code)
  if (country) {
    return country.name
  }
  return null
}

const getCodeByName = name => {
  let country = COUNTRIES.find(item => item.name === name)
  if (country) {
    return country.code
  }
  country = COUNTRIES.find(item => item.otherNames.indexOf(name) !== -1)
  if (country) {
    return country.code
  }
  return null
}

module.exports = {
  getNameByCode,
  getCodeByName
}
