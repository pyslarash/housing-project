import React from 'react';

const StateName = (stateCode) => {
    let stateName;
  
    switch (stateCode) {
      case 'AL':
        stateName = 'Alabama';
        break;
      case 'AK':
        stateName = 'Alaska';
        break;
      case 'AZ':
        stateName = 'Arizona';
        break;
      case 'AR':
        stateName = 'Arkansas';
        break;
      case 'CA':
        stateName = 'California';
        break;
      case 'CO':
        stateName = 'Colorado';
        break;
      case 'CT':
        stateName = 'Connecticut';
        break;
      case 'DE':
        stateName = 'Delaware';
        break;
      case 'DC':
        stateName = 'Washington, D.C.';
        break;
      case 'FL':
        stateName = 'Florida';
        break;
      case 'GA':
        stateName = 'Georgia';
        break;
      case 'HI':
        stateName = 'Hawaii';
        break;
      case 'ID':
        stateName = 'Idaho';
        break;
      case 'IL':
        stateName = 'Illinois';
        break;
      case 'IN':
        stateName = 'Indiana';
        break;
      case 'IA':
        stateName = 'Iowa';
        break;
      case 'KS':
        stateName = 'Kansas';
        break;
      case 'KY':
        stateName = 'Kentucky';
        break;
      case 'LA':
        stateName = 'Louisiana';
        break;
      case 'ME':
        stateName = 'Maine';
        break;
      case 'MD':
        stateName = 'Maryland';
        break;
      case 'MA':
        stateName = 'Massachusetts';
        break;
      case 'MI':
        stateName = 'Michigan';
        break;
      case 'MN':
        stateName = 'Minnesota';
        break;
      case 'MS':
        stateName = 'Mississippi';
        break;
      case 'MO':
        stateName = 'Missouri';
        break;
      case 'MT':
        stateName = 'Montana';
        break;
      case 'NE':
        stateName = 'Nebraska';
        break;
      case 'NV':
        stateName = 'Nevada';
        break;
      case 'NH':
        stateName = 'New Hampshire';
        break;
      case 'NJ':
        stateName = 'New Jersey';
        break;
      case 'NM':
        stateName = 'New Mexico';
        break;
      case 'NY':
        stateName = 'New York';
        break;
      case 'NC':
        stateName = 'North Carolina';
        break;
      case 'ND':
        stateName = 'North Dakota';
        break;
      case 'OH':
        stateName = 'Ohio';
        break;
      case 'OK':
        stateName = 'Oklahoma';
        break;
      case 'OR':
        stateName = 'Oregon';
        break;
      case 'PA':
        stateName = 'Pennsylvania';
        break;
      case 'RI':
        stateName = 'Rhode Island';
        break;
      case 'SC':
        stateName = 'South Carolina';
        break;
      case 'SD':
        stateName = 'South Dakota';
        break;
      case 'TN':
        stateName = 'Tennessee';
        break;
      case 'TX':
        stateName = 'Texas';
        break;
      case 'UT':
        stateName = 'Utah';
        break;
      case 'VT':
        stateName = 'Vermont';
        break;
      case 'VA':
        stateName = 'Virginia';
        break;
      case 'WA':
        stateName = 'Washington';
        break;
      case 'WV':
        stateName = 'West Virginia';
        break;
      case 'WI':
        stateName = 'Wisconsin';
        break;
      case 'WY':
        stateName = 'Wyoming';
        break;
      default:
        stateName = 'Unknown state';
        break;
    }

return stateName;
};
    
export default StateName;