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
import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import Config from '../../utils/config';
import '../../stylesheets/css/main.css';
import axios from 'axios';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import Modal from '../Modal/Modal.js';
import viewArrow from '../../resources/images/right-arrow.svg'

function commanNumber (number) {

}

class LoCCard extends Component {
  constructor(props) {
		super(props);
		this.state = {
      redirect: false,
      showModal: false,
      toggleChecked: false,
      toggleDisabled: false
		}

    this.handleOnClick = this.handleOnClick.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.config = new Config();
	}

  handleOnClick() {
    this.props.callback(this.props.letter, false);
    this.setState({redirect: true});
  }

  showModal() {
    this.setState({
      showModal: true
    });
  }

  hideModal() {
    this.setState({
      showModal: false
    });
  }

  shipProduct(letterId, evidenceHash) {
    let letter = "resource:org.example.loc.LetterOfCredit#" + letterId;
    axios.post(this.config.restServer.httpURL+'/ShipProduct', {
      "$class": "org.example.loc.ShipProduct",
      "loc": letter,
      "evidence": evidenceHash,
      "transactionId": "",
      "timestamp": "2018-03-13T11:25:08.043Z" // the transactions seem to need this field filled in; when submitted the correct time will replace this value
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({
      toggleDisabled: true
    });
  }

  receiveProduct(letterId) {
    let letter = "resource:org.example.loc.LetterOfCredit#" + letterId;
    axios.post(this.config.restServer.httpURL+'/ReceiveProduct', {
      "$class": "org.example.loc.ReceiveProduct",
      "loc": letter,
      "transactionId": "",
      "timestamp": "2018-03-13T11:25:08.043Z" // the transactions seem to need this field filled in; when submitted the correct time will replace this value
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({
      toggleDisabled: true
    });
  }

  generateStatus(bill, chargeFlag) {
    let status = '';
    if (chargeFlag) {
      switch (bill.confirmStatus) {
      case 'YES':
        status = '수금 완료';
        break;
      case 'NO':
        status = '미수금';
        break;
      default:
        status = '수금 진행중..';
        break;
      }
    } else {
      switch (bill.confirmStatus) {
      case 'YES':
        status = '대금 지급 완료';
        break;
      case 'NO':
        status = '미지급 대금';
        break;
      default:
        status = '대금 지급중..';
        break;
      }
    }
    return status.toUpperCase();
  }

  generateCardContents(bill, user) {
    let contents;
    let newMessage = "";
    console.log(bill);
    // if(!this.props.letter.approval.includes("bob")){
    //   newMessage = "NEW";
    // }
    //generate new LoC cards
    if (user === 'bob') {
      contents = (
        <div className = "LoCCardBob">
          <div>
            <h2>{newMessage}</h2>
            <h2>{'번호: ' + bill.billId}</h2>
            <p>품목: <b>{bill.items[0].name}</b></p>
          <p>개수: <b>{bill.items[0].quantity.toLocaleString()}</b></p>
          <p>미지급 개수: <b>{bill.items[0].remain.toLocaleString()}개</b></p>
          <p>미지급 금액: <b>₩{((bill.items[0].remain)*bill.items[0].price).toLocaleString()}</b></p>
            <div className = "toggleContainer hide">
              <Toggle className='customToggle' defaultChecked={false} disabled/>
              <span className="shipText">Ship Product</span>
            </div>
          </div>
          <img class="viewButtonBob" src={viewArrow} alt="View Letter of Credit" onClick={() => this.handleOnClick()}/>
        </div>
      );
    }
    else { // if the current user is not bob then it must be alice
      contents = (
        <div className = "LoCCard">
          <div>
          <h2>{this.generateStatus(bill, true)}</h2>
            <h2>{'번호: ' + bill.billId}</h2>
          <p>품목: <b>{bill.items[0].name}</b></p>
          <p>개수: <b>{bill.items[0].quantity.toLocaleString()}</b></p>
          <p>미수금 개수: <b>{bill.items[0].remain.toLocaleString()}개</b></p>
          <p>미수금 금액: <b>₩{((bill.items[0].remain)*bill.items[0].price).toLocaleString()}</b></p>
            <div className = "toggleContainer hide">
                <Toggle className='customToggle customToggleAlice' defaultChecked={false} icons={false} disabled/>
                <span className="shipText">Receive Product</span>
              </div>
            <button className="viewButton" onClick={() => this.handleOnClick()}>
              <p className="buttonText"><span>View Letter Of Credit</span></p>
            </button>
          </div>
        </div>
      );
    }
    let shippingText;
    let checked = bill.confirmStatus !== 'YES';
    //generate accepted LoC cards
    if (user === 'bob') {
      if (bill.confirmStatus !== 'DEPENDING') {
        // generating a hash from the timestamp
        let idStyle;
        shippingText = "Ship Product";
        if (bill.confirmStatus !== 'YES'){
          idStyle = "LoCCardBobAccepted";
          this.state.toggleChecked = true;
          this.state.toggleDisabled = true;
          shippingText = "Product Shipped";
        }
        let hash = new Date().getTime().toString(24);
          // <!--            <Modal show={this.state.showModal} modalType={'SHIP'} cancelCallback={this.hideModal} yesCallback={() => {this.shipProduct(letter.letterId, hash)}}/> -->
        contents = (
          <div className = "LoCCardBob" id= {idStyle}>
            <div>
              <h2>{this.generateStatus(bill)}</h2>
              <h2>{'번호: ' + bill.letterId}</h2>
              <p>Product Type: <b>{bill.itmes[0].name}</b></p>
              <div className = "toggleContainer">
                <Toggle className='customToggle' checked={checked} defaultChecked={this.state.toggleChecked} onChange={this.showModal} disabled ={this.state.toggleDisabled} />
                <span className="shipText">{shippingText}</span>
              </div>
                <img class="viewButtonBob" src={viewArrow} alt="View Letter of Credit" onClick={this.handleOnClick}/>
            </div>
          </div>
        );
      }
    } else {
      if (bill.confirmStatus !== 'DEPENDING' && bill.confirmStatus !== 'YES' && bill.confirmStatus !== 'NO') {
        // generating a hash from the timestamp
        shippingText = "Receive Product";
        if (bill.confirmStatus !== 'YES') {
          this.state.toggleChecked = true;
          this.state.toggleDisabled = true;
          shippingText = "Product Received";
        }
          // <!--                <Toggle className='customToggle customToggleAlice' defaultChecked={this.state.toggleChecked} icons={false} onChange={() => {this.receiveProduct(letter.letterId)}} disabled ={this.state.toggleDisabled}/> -->
        contents = (
          <div className = "LoCCard">
            <div>
            <h2>{this.generateStatus(bill, true)}</h2>
              <h2>{'번호: ' + bill.billId}</h2>
              <p>Product Type: <b>{bill.items[0].name}</b></p>
              <div className = "toggleContainer">
                <span className="shipText">{shippingText}</span>
              </div>
              <button className="viewButton" onClick={() => this.handleOnClick()}>
                <p className="buttonText"><span>View Letter Of Credit</span></p>
              </button>
            </div>
          </div>
        );
      }
    }
    return contents;
  }

  render() {
    console.log(this.props.bill);
    if (this.state.redirect) {
      return <Redirect push to={"/" + this.props.user + "/loc/" + this.props.letter.letterId} />;
    }
    return (
        this.generateCardContents(this.props.bill, this.props.user)
    );
  }
}

export default LoCCard;
