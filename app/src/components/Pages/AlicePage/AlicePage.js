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
import React, { Component } from 'react';
import '../../../stylesheets/css/main.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import UserDetails from '../../UserDetails/UserDetails.js';
import LoCCard from '../../LoCCard/LoCCard.js';
import LoCApplyCard from '../../LoCCard/LoCApplyCard.js';
import Config from '../../../utils/config';
const { Company } = require('block-cnr');

const company = new Company();
class AlicePage extends Component {
  constructor(props) {
		super(props);
		this.state = {
			userDetails: {},
			letters: [],
			gettingLetters: false,
			switchUser: this.props.switchUser,
			callback: this.props.callback,
      redirect: false,
      redirectTo: ''
		}
		this.handleOnClick = this.handleOnClick.bind(this);
		this.config = new Config();
	}

  handleOnClick(user) {
    this.state.switchUser(user);
    this.setState({redirect: true, redirectTo: user});
  }

	componentDidMount() {
		document.title = "Alice - Bank of Dinero";
		// open a websocket
		this.connection = new WebSocket(this.config.restServer.webSocketURL);
		this.connection.onmessage = ((evt) => {
			this.getLetters();
		});

		// make rest calls
		this.getUserInfo();
		this.getLetters();
	}

	componentWillUnmount() {
		this.connection.close();
	}

	getUserInfo() {
		let userDetails = {};

    company.get()
      .then(res => {
        let data = res[0];
        userDetails = {
          companyName: data.companyName,
          userName: data.userName,
          bankName: data.bankAccount.bankName,
          accountName: data.bankAccount.accountName,
          accountNumber: data.bankAccount.accountNumber
        };
        this.setState ({
          userDetails: userDetails
        });
      })
      .catch(err => {
        console.log(err);
      });
	}

	getLetters() {
		this.setState({gettingLetters: true});
		axios.get(this.config.restServer.httpURL+'/LetterOfCredit')
      .then(response => {
			  // sort the LOCs by descending ID (will display the most recent first)
			  response.data.sort((a,b) => b.letterId.localeCompare(a.letterId));
			  // only want to display the first 5 LOCs
			  let activeLetters = response.data.slice(0,5);
        this.setState ({
				  letters: activeLetters,
				  gettingLetters: false
			  });
		  })
		  .catch(error => {
			  console.log(error);
		  });
	}

	generateCard(i) {
		return (
        <LoCCard user="alice" letter={this.state.letters[i]} callback={this.state.callback} pageType={"view"}/>
    );
	}

  render() {
    if (this.state.redirect) {
      return <Redirect push to={"/" + this.state.redirectTo} />;
    }

		if(this.state.userDetails.companyName && !this.state.gettingLetters) {
      let username = `[${this.state.userDetails.companyName}] ${this.state.userDetails.userName}`;

    	let cardsJSX = [];
    	if(this.state.letters.length) {
				for(let i = 0; i < this.state.letters.length; i++) {
					cardsJSX.push(this.generateCard(i));
				}
				cardsJSX.push(<div className="cardSpace">&nbsp;</div>);
			}

			return (
    		  <div id="alicePageContainer" className="alicePageContainer">
    		  <div id="aliceHeaderDiv" className="flexDiv aliceHeaderDiv">
    		  <span className="aliceUsername">{username}</span>
    		  <div id="aliceMenu" className="aliceMenuItems">
    		  <span> 정보 변경 </span>
    		  <span> 거래 내역 보기 </span>
    		  <span> 거래 하기 </span>
    		  <span className="currentBalance"> 현재 잔액: 15,000 만원 </span>
    		  </div>
    		  </div>
    		  <div id="infoDiv" className="flexDiv infoDiv">
    		  <div id="aliceWelcomeDiv" className="aliceWelcomeDiv">
    		  <h1 className = "aliceWelcomeMessage"> {this.state.userDetails.userName}님 환영합니다! </h1>
    		  <UserDetails companyName={this.state.userDetails.companyName} userName={this.state.userDetails.userName} bankName={this.state.userDetails.bankName} accountName={this.state.userDetails.accountName} accountNumber={this.state.userDetails.accountNumber}/>
					</div>
					</div>
    		  <div className="locDiv">
    		  <LoCApplyCard user="alice" callback={this.state.callback} />
					{cardsJSX}
    		</div>
				  </div>
			);
  	} else {
			return (
			    <div id="aliceLoadingContainer" className="alicePageContainer">
				  <span className="loadingSpan">Loading...</span>
			    </div>
			);
		}
	}
}

export default AlicePage;
