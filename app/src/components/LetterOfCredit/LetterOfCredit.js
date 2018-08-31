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
import '../../stylesheets/css/main.css';
import { Redirect } from 'react-router-dom';
import DetailsCard from '../DetailsCard/DetailsCard.js';
import BlockChainDisplay from '../BlockChainDisplay/BlockChainDisplay.js';
import axios from 'axios';
import { connect } from "react-redux";
import { getProductDeatils } from "../../actions/actions";
import Config from '../../utils/config';
import backButtonIcon from '../../resources/images/left-arrow.svg'
import Stepper from '../../components/Stepper/Stepper.js';
import Modal from '../../components/Modal/Modal.js'
const _ = require('lodash');
const { Company, Bill, Charge } = require('block-cnr');

const company = new Company();
const bill = new Bill();
const charge = new Charge();

class LetterOfCredit extends Component {
  constructor(props) {
    super(props);

    let letter = {};
    let isApply = this.props.isApply;

    // check if there's a letter stored in local storage, meaning page has been refreshed
    // console.log(localStorage.getItem('letter'));
    // if(localStorage.getItem('letter')) {
    //   letter = JSON.parse(localStorage.getItem('letter'));
    // }
    // else {
    //   // if nothing has been stored then letter is being opened for the first time - use props
    //   letter = this.props.letter;
    //   // store that in local storage in case of a refresh
    //   // can only store strings so need to stringify letter object
    //   localStorage.setItem('letter', JSON.stringify(this.props.letter));
    // }

    // check if letter is an empty object and if it is, manually set isApply to true
    // in order to handle a refresh of the create page
    if(Object.keys(letter).length === 0 && letter.constructor === Object) {
      isApply = true;
    }

    this.state = {
      isApply: isApply,
      letter: letter,
      company: this.props.company,
      user: this.props.match.params.name,
      billId: this.props.match.params.id,
      bill: {},
      userDetails: {},
      sourceDetails: {},
      targetDetails: {},
      transactions: [],
      disableButtons: false,
      redirect: false,
      redirectTo: '',
      showModal: false
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.config = new Config();
	}

  handleOnClick(user) {
    this.props.callback(user);
    this.setState({redirect: true, redirectTo: user});
  }

  componentWillMount() {
    axios.get(this.config.restServer.httpURL+'/system/historian')
    .then((response) => {
      let relevantTransactions = [];
      let transactionTypes = ["InitialApplication", "Approve", "Reject", "ShipProduct", "ReceiveProduct", "ReadyForPayment", "Close"];
      response.data.forEach((i) => {
        let transactionLetter = ((i.eventsEmitted.length) ? decodeURIComponent(i.eventsEmitted[0].loc.split("#")[1]) : undefined);
        let longName = i.transactionType.split(".")
        let name = longName[longName.length - 1];

        if(transactionTypes.includes(name) && this.state.letter.letterId === transactionLetter) {
          relevantTransactions.push(i);
        }
      });
      relevantTransactions.sort((a,b) => {
        // creating a new date object to account for daylight savings
        a.transactionTimestamp = new Date(a.transactionTimestamp);
        b.transactionTimestamp = new Date(b.transactionTimestamp);
        return a.transactionTimestamp - b.transactionTimestamp;
      });

      this.setState ({
        transactions: relevantTransactions
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    let user = this.props.match.params.name;
    let id = this.props.match.params.id;
    document.title = (user === "matias" ? "Matías" : user.charAt(0).toUpperCase() + user.substr(1)) + " - " + (id === "create" ? "Create LoC" : id);
		this.getUserInfo();
    this.getBills();
  }

  getBills () {
    if (this.state.billId) {
      bill.get()
        .then(res => {
          let data = res.filter(elem => elem.billId == this.state.billId)[0];
          if (_.isObject(data)){
            this.setState ({
              bill: data
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
    }
  }

	getUserInfo() {
		let userDetails = {};
		let sourceDetails = {};
		let targetDetails = {};
    // if (this.state.billId) {
    //   bill.get()
    //     .then(res => {
    //       let data = res.filter(elem => elem.billId == this.state.billId)[0];
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // } else {
    // }

    company.get()
      .then(res => {
        let sourceData = res[0];
        let targetData = res[1];
        let data = res[0];
        userDetails = {
          companyName: data.companyName,
          userName: data.userName,
          bankName: data.bankAccount.bankName,
          accountName: data.bankAccount.accountName,
          accountNumber: data.bankAccount.accountNumber
        };
        sourceDetails = {
          companyName: sourceData.companyName,
          userName: sourceData.userName,
          bankName: sourceData.bankAccount.bankName,
          accountName: sourceData.bankAccount.accountName,
          accountNumber: sourceData.bankAccount.accountNumber
        };
        targetDetails = {
          companyName: targetData.companyName,
          userName: targetData.userName,
          bankName: targetData.bankAccount.bankName,
          accountName: targetData.bankAccount.accountName,
          accountNumber: targetData.bankAccount.accountNumber
        };
        document.title = this.state.user == 'alice' ? sourceDetails.userName : targetDetails.userName;
        this.setState ({
          userDetails: userDetails,
          sourceDetails: sourceDetails,
          targetDetails: targetDetails
        });
      })
      .catch(err => {
        console.log(err);
      });
	}

  componentWillUnmount() {
    // clear local storage when moving away from component
    localStorage.clear();
  }

  showModal(tx) {
    // work out what transaction will be made if the yes button is clicked
    let callback;
    if (tx == 'CHARGE') {
      callback = () => {
        this.hideModal();
      }
      this.Charge(this.state.bill.items);
    }

    // if (tx === 'YES') {
    //   callback = () => {
    //     this.hideModal();
    //     this.charge(this.props.productDetails.type, this.props.productDetails.quantity, this.props.productDetails.pricePerUnit, this.props.rules)
    //   };
    // } else if (tx === txTypes.APPROVE) {
    //   callback = () => {
    //     this.hideModal();
    //     this.approveLOC(this.state.letter.letterId, this.state.user)
    //   };
    // } else if (tx === txTypes.REJECT) {
    //   callback = () => {
    //     this.hideModal();
    //     this.rejectLOC(this.state.letter.letterId)
    //   }
    // } else if (tx === txTypes.PAY) {
    //   callback = () => {
    //     this.hideModal();
    //     this.payLOC(this.state.letter.letterId)
    //   }
    // } else {
    //   callback = () => {
    //     this.hideModal();
    //     this.closeLOC(this.state.letter.letterId)
    //   }
    // }

    this.setState({
      showModal: true,
      modalType: tx,
      modalFunction: callback
    });
  }

  Charge (items) {
    charge.Charge({
      source: "0",
      target: "1",
      items: items,
      paymentDate: "2018-09-26"
    });
  }

  hideModal() {
    this.setState({
      showModal: false
    });
  }

  createRules() {
    let rules = [];
    let ruleIndex = 1;
    this.props.rules.map((i) => {
      if (i.ruleText !== "") {
        rules.push({
          "$class": "org.example.loc.Rule",
          "ruleId": "rule"+ruleIndex,
          "ruleText": i.ruleText
        });
      ruleIndex++;
      }
    });
    return rules;
  }

  createLOC(type, quantity, price, rules) {
    this.setState({
      disableButtons: true
    });
    let currentTime = new Date().toLocaleTimeString().split(":").join('');
    axios.post(this.config.restServer.httpURL+'/InitialApplication', {
      "$class": "org.example.loc.InitialApplication",
      "letterId": ("L" + currentTime),
      "applicant": "resource:org.example.loc.Customer#alice",
      "beneficiary": "resource:org.example.loc.Customer#bob",
      "rules": this.createRules(),
      "productDetails": {
        "$class": "org.example.loc.ProductDetails",
        "productType": type,
        "quantity": quantity,
        "pricePerUnit": price.toFixed(2)
      }
    })
    .then(() => {
      this.setState({
        disableButtons: false
      });
      this.props.getProductDeatils({
        type: "",
        quantity: 0,
        pricePerUnit: 0,
        total: 0
      });
      this.handleOnClick(this.state.user);
    })
    .catch(error => {
      console.log(error);
    });
  }

  approveLOC(letterId, approvingParty) {
    let resourceURL = "resource:org.example.loc.Customer#";

    if (approvingParty === 'ella' || approvingParty === 'matias') {
      resourceURL = "resource:org.example.loc.BankEmployee#";
    }

    if(!this.state.letter.approval.includes(this.state.user)) {
      this.setState({
        disableButtons: true
      });
      let letter = "resource:org.example.loc.LetterOfCredit#" + letterId;
      axios.post(this.config.restServer.httpURL+'/Approve', {
        "$class": "org.example.loc.Approve",
        "loc": letter,
        "approvingParty": resourceURL+approvingParty
      })
      .then(() => {
        this.setState({
          disableButtons: false
        });
        this.handleOnClick(this.state.user);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  rejectLOC(letterId) {
    this.setState({
      disableButtons: true
    });
    let letter = "resource:org.example.loc.LetterOfCredit#" + letterId;
    axios.post(this.config.restServer.httpURL+'/Reject', {
      "$class": "org.example.loc.Reject",
      "loc": letter,
      "closeReason": "Letter has been rejected"
    })
    .then(() => {
      this.setState({
        disableButtons: false
      });
      this.handleOnClick(this.state.user);
    })
    .catch(error => {
      console.log(error);
    });
  }

  payLOC(letterId) {
    this.setState({
      disableButtons: true
    });
    let letter = "resource:org.example.loc.LetterOfCredit#" + letterId;
    axios.post(this.config.restServer.httpURL+'/ReadyForPayment', {
      "$class" : "org.example.loc.ReadyForPayment",
      "loc": letter
    })
    .then(() => {
      this.setState({
        disableButtons: false
      });
      this.handleOnClick(this.state.user);
    })
    .catch(error => {
      console.log(error);
    });
  }

  closeLOC(letterId) {
    this.setState({
      disableButtons: true
    });
    let letter = "resource:org.example.loc.LetterOfCredit#" + letterId;
    axios.post(this.config.restServer.httpURL+'/Close', {
      "$class": "org.example.loc.Close",
      "loc": letter,
      "closeReason": "Letter has been completed."
    })
    .then(() => {
      this.setState({
        disableButtons: false
      });
      this.handleOnClick(this.state.user);
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={"/" + this.state.redirectTo} />;
    }

    if (_.isString(_.get(this.state, 'sourceDetails.companyName')) && (_.isString(_.get(this.state, 'bill.billId')) || this.state.billId=='create')) {
      let isCreate = this.state.billId == 'create';
      let activeStep = 0;
      switch (_.get(this.state, 'bill.confirmStatus')) {
      case 'YES':
        activeStep = 3;
        break;
      case 'DEPENDING':
        activeStep = 2;
        break;
      case 'NO':
        activeStep = 1;
        break;
      default:
        activeStep = 0;
        break;
      }

      let productDetails = this.props.productDetails;
      let rules = this.props.rules;
      let buttonJSX = (<div/>);
      if (!this.state.isApply) {
        productDetails = {
          type: this.state.letter.productDetails.productType,
          quantity: this.state.letter.productDetails.quantity,
          pricePerUnit: this.state.letter.productDetails.pricePerUnit
        };
        rules = this.state.letter.rules;
        let isAwaitingApproval = (
          this.state.letter.status === 'AWAITING_APPROVAL' &&
            (!this.state.letter.approval.includes('resource:org.example.loc.Customer#'+this.state.user) &&
             (!this.state.letter.approval.includes('resource:org.example.loc.BankEmployee#'+this.state.user)))
        );
        if (isAwaitingApproval) {
          buttonJSX = (
              <div class="actions">
              <button disabled={this.state.disableButtons} onClick={() => {this.showModal('REJECT')}}>I reject the application</button>
              <button disabled={this.state.disableButtons} onClick={() => {this.showModal('APPROVE')}}>I accept the application</button>
              </div>
          );
        } else if (this.state.letter.status === 'RECEIVED' && this.state.user === 'matias') {
          buttonJSX = (
              <div class="actions">
              <button disabled={this.state.disableButtons} onClick={() => {this.showModal('PAY')}}>Ready for Payment</button>
              </div>
          );
        } else if (this.state.letter.status === 'READY_FOR_PAYMENT' && this.state.user === 'ella') {
          buttonJSX = (
              <div class="actions">
              <button disabled={this.state.disableButtons} onClick={() => {this.showModal('CLOSE')}}>Close this Letter of Credit</button>
              </div>
          );
        } else {
          buttonJSX = (<div/>);
        }
      } else {
        buttonJSX = (
            <div class="actions">
            <button disabled={false} onClick={() => {this.showModal('CHARGE')}}>청구 하기</button>
            </div>
        );
      }

      let username = (this.state.user.charAt(3) === 'i') ? 'Matías' : this.state.user.charAt(0).toUpperCase() + this.state.user.slice(1);
      if (username === 'Alice') username += ' - 청구인';
      else username += ' - 지급인';

      if (!this.state.disableButtons) {
        return (
            <div class="LCcontainer">
            <Modal show={this.state.showModal} modalType={this.state.modalType} user={this.state.user} cancelCallback={()=>{this.hideModal()}} yesCallback={this.state.modalFunction}/>
            <div class="LCHeader">
            <div>
            <img class="backButton" src={backButtonIcon} alt="go back" onClick={() => {if(!this.state.disableButtons){this.handleOnClick(this.state.user)}}}/>
            </div>
            <p class="loc-text">Block C&R</p>
            <p class="username-txt">{username}</p>
            </div>
            <table className="contentTable">
            <tr>
            <td> <h1>청구서 상세</h1> </td>
            <td colspan="2"> <Stepper steps= {['청구서 작성','수금 요청', '수금 진행중..','수금 완료']} activeStep={activeStep}/> </td>  
            </tr>
            <tr>
            <td> <DetailsCard disabled={true} type="Person" title="청구사 정보" data={this.state.sourceDetails}/> </td>
            <td> <DetailsCard disabled={true} type="Person" title="지급사 정보" data={this.state.targetDetails}/> </td>
            <td> <DetailsCard type="Product" title="물품 상세" isCreate={isCreate} data={this.state.bill} canEdit={this.state.isApply} user={this.state.user}/> </td>
            <td className="blockchainCell" rowspan="2"> <BlockChainDisplay transactions={this.state.transactions}/> </td>
            </tr>
            <tr>
            <td colspan="3"> <DetailsCard type="Rules" data={rules} canEdit={this.state.isApply}/> </td>
            </tr>
            </table>
            {buttonJSX}
          { this.state.disableButtons && <div class="statusMessage"> 기다려 주세요... </div> }
          </div>
        );
      } else {
        return (
            <div class="LCcontainer">
            <span className="waitText">기다려 주세요...</span>
            </div>
        );
      }
    } else {
      return (
          <div id="ellaLoadingContainer" className="ellaPageContainer">
				  <span className="ellaLoadingSpan">불러오는 중...</span>
          </div>
			);
    }
  }
}

const mapStateToProps = state => {
  return {
    applicant: state.getLetterInputReducer.applicant,
    beneficiary: state.getLetterInputReducer.beneficiary,
    productDetails: state.getLetterInputReducer.productDetails,
    rules: state.getLetterInputReducer.rules
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductDeatils: productDetails => dispatch(getProductDeatils(productDetails))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LetterOfCredit);
