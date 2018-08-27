/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {combineReducers} from 'redux'
import * as actions from '../actions/actions'

const initialState = {
  applicant: {
    name: 'Alice Hamilton',
    companyName: 'QuickFix IT',
    IBAN: 'IT60 9876 5321 9090',
    swiftCode: 'BKDOIT60',
    bankName: 'Bank of Dinero'
  },
  beneficiary: {
    name: 'Bob Appleton',
    companyName: 'Conga Computers',
    IBAN: 'US22 1234 5678 0101',
    swiftCode: 'EWBKUS22',
    bankName: 'Eastwood Banking'
  },
  productDetails: {
    type: "None",
    quantity: 0,
    pricePerUnit: 0,
    total: 0
  },
  rules: [
    {ruleText: "정확한 양의 물품이 인도되어야 합니다."},
    {ruleText: "물품을 구매한 날로부터 30일 이내에 결제를 해야합니다."},
    {ruleText: "물품이 손상되지 않고 예상대로 작동 하여야 합니다."}
  ]
}

const getLetterInputReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_APPLICANT:
      return { ...state, applicant: action.payload };
    case actions.GET_BENEFICIARY:
      return { ...state, beneficiary: action.payload };
    case actions.GET_PRODUCT_DETAILS:
      return { ...state, productDetails: action.payload };
    case actions.GET_RULES:
      return { ...state, rules: [...state.rules, action.payload] };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
   getLetterInputReducer
})

export default rootReducer;
